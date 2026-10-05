'use strict';
// Local HTTP smoke test: verifies static hosting and declared asset reachability.
// This is not a full browser automation or a live GitHub Pages/iOS test.
const fs = require('fs');
const path = require('path');
const http = require('http');
const assert = require('assert');
const root = path.resolve(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const sw = fs.readFileSync(path.join(root, 'service-worker.js'), 'utf8');
const version = (html.match(/v(\d+\.\d+\.\d+) · October 2026/) || [])[1];
assert.ok(version, 'visible version metadata must be present');
assert.ok(sw.includes(`const CACHE='mindplan-v${version}'`), 'service-worker cache must match visible version');
const localRefs = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/g)]
  .map(m => m[1]).filter(u => !/^(?:https?:|mailto:|#|data:|javascript:)/i.test(u));
const precacheMatch = sw.match(/const FILES=\[(.*?)\];/);
assert.ok(precacheMatch, 'service-worker precache list missing');
const precache = [...precacheMatch[1].matchAll(/["']([^"']+)["']/g)].map(m => m[1]);
const paths = [...new Set(['/', ...localRefs, ...precache].map(raw => {
  if (raw === './' || raw === '/') return '/';
  return '/' + raw.replace(/^\.\//, '').replace(/^\//, '').split(/[?#]/)[0];
}))];
const mime = file => ({'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml'}[path.extname(file).toLowerCase()] || 'application/octet-stream');
const server = http.createServer((req, res) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.writeHead(400).end('Bad URL'); return; }
  if (pathname === '/') pathname = '/index.html';
  const file = path.resolve(root, '.' + pathname);
  if (!file.startsWith(root + path.sep) && file !== path.join(root, 'index.html')) { res.writeHead(403).end('Forbidden'); return; }
  fs.readFile(file, (err, body) => {
    if (err) { res.writeHead(404).end('Not found'); return; }
    res.writeHead(200, {'Content-Type': mime(file), 'Cache-Control':'no-store'}).end(body);
  });
});
(async () => {
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const base = `http://127.0.0.1:${server.address().port}`;
  const failures = [];
  try {
    for (const p of paths) {
      const response = await fetch(base + encodeURI(p));
      if (!response.ok) failures.push(`${p}: HTTP ${response.status}`);
      else {
        const body = await response.text();
        if (!body.length) failures.push(`${p}: empty response`);
        if (p === '/index.html' && !body.includes(`v${version} · October 2026`)) failures.push(`${p}: version marker missing`);
        if (p === '/service-worker.js' && !body.includes(`mindplan-v${version}`)) failures.push(`${p}: cache marker missing`);
      }
    }
    assert.deepStrictEqual(failures, [], 'HTTP smoke test failures');
    console.log(`PASS: local HTTP deployment smoke test; ${paths.length} unique routes/assets returned non-empty HTTP 200 responses; version ${version}.`);
    console.log('LIMIT: browser interaction, live HTTPS hosting, mobile Safari, printing, service-worker installation, and offline reload still require manual acceptance testing.');
  } finally { server.close(); }
})().catch(err => { console.error(err.stack || err); process.exitCode = 1; server.close(); });

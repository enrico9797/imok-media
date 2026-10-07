const { chromium } = require('playwright');
const fs = require('fs');
const LOGO = fs.readFileSync(__dirname + '/logo.svg', 'utf8').trim();
const F = 'file://' + require('path').join(__dirname, 'node_modules/@fontsource');
const base = `<!doctype html><html><head><meta charset="utf-8"><style>
@font-face{font-family:Fraunces;font-weight:700;src:url(${F}/fraunces/files/fraunces-latin-700-normal.woff2)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:400;src:url(${F}/fraunces/files/fraunces-latin-400-italic.woff2)}
@font-face{font-family:Fraunces;font-style:italic;font-weight:600;src:url(${F}/fraunces/files/fraunces-latin-600-italic.woff2)}
@font-face{font-family:I;font-weight:500;src:url(${F}/inter/files/inter-latin-500-normal.woff2)}
@font-face{font-family:I;font-weight:600;src:url(${F}/inter/files/inter-latin-600-normal.woff2)}
*{box-sizing:border-box;margin:0}
body{width:1080px;height:1350px;overflow:hidden;background:#FFF8F1;font-family:I,sans-serif;color:#2B1D14;position:relative}
.glow{position:absolute;border-radius:50%;filter:blur(110px);opacity:.6}
.g1{width:800px;height:800px;background:#FFD9A8;right:-260px;top:-260px}.g2{width:700px;height:700px;background:#FFE7D2;left:-260px;bottom:-260px}
.brand{position:absolute;left:90px;top:84px;display:flex;align-items:center;gap:18px;font:700 44px Fraunces,serif}.brand svg{width:72px;height:72px}
.foot{position:absolute;left:90px;right:90px;bottom:80px;display:flex;justify-content:space-between;align-items:center;font:600 30px I;color:#6F5E52}
.foot b{color:#2B1D14}
h1{font:700 86px/1.08 Fraunces,serif;letter-spacing:-.01em}
.it{font:italic 400 80px/1.18 Fraunces,serif;color:#4A382C}
.qm{display:inline-block;padding:0 .08em;line-height:.6;font-size:1.5em;font-style:italic;font-weight:600;font-family:Fraunces,serif;background:linear-gradient(90deg,#FFB547,#FF7A45);-webkit-background-clip:text;background-clip:text;color:transparent;vertical-align:-.28em}
.grad{background:linear-gradient(90deg,#FFB547,#FF7A45);-webkit-background-clip:text;background-clip:text;color:transparent}
.chat{background:#EFE7DD;border-radius:44px;padding:34px;box-shadow:0 40px 80px rgba(120,70,30,.16)}
.top{display:flex;align-items:center;gap:16px;font:600 32px I;padding:0 6px 24px}.top svg{width:54px;height:54px}
.b{background:#fff;border-radius:24px;padding:24px 28px;font:500 32px/1.42 I}
.acts{margin:22px -28px -24px;border-top:2px solid #EDE3DA}.acts div{text-align:center;color:#1DA1D6;padding:18px 0;font-weight:500}.acts div+div{border-top:2px solid #EDE3DA}
.me{background:#E7FFDB;margin:18px 0 0 160px}
.sub{font:500 38px/1.45 I;color:#6F5E52}
</style></head><body><div class="glow g1"></div><div class="glow g2"></div><div class="brand">${LOGO}<span>I'm OK</span></div>`;
const foot = `<div class="foot"><span>Start free on <b>WhatsApp</b></span><span><b>getimok.app</b></span></div>`;

// Usage: node tools/render.js posts/2026-10-12/spec.js
// spec.js exports a function ({ LOGO, foot }) => ({ 'file-name': '<html body>' }); PNGs (1080x1350) are written next to it.
const path = require('path');
const specPath = path.resolve(process.argv[2]);
const spec = require(specPath)({ LOGO, foot });
(async () => { const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [n, h] of Object.entries(spec)) {
    const tmp = path.join(__dirname, '_t.html'); fs.writeFileSync(tmp, base + h + '</body></html>');
    await p.goto('file://' + tmp); await p.waitForTimeout(500);
    await p.screenshot({ path: path.join(path.dirname(specPath), n + '.png') }); fs.unlinkSync(tmp);
  }
  await b.close(); })();

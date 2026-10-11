// Blog hero images, 1200x675, in the house style.
// Usage: NODE_PATH=$(npm root -g) node tools/render-blog.js            (renders every entry in blog/img/heroes.js that has no PNG yet)
//        NODE_PATH=$(npm root -g) node tools/render-blog.js <slug> ...  (renders just these, overwriting)
// heroes.js exports { '<slug>': { kicker, title, chat: [{ from: 'bot'|'me', text, acts: ['Done ✅'] }], label } }
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const LOGO = fs.readFileSync(__dirname + '/logo.svg', 'utf8').trim();
const F = 'file://' + path.join(__dirname, 'node_modules/@fontsource');
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const css = `@font-face{font-family:Fraunces;font-weight:700;src:url(${F}/fraunces/files/fraunces-latin-700-normal.woff2)}
@font-face{font-family:I;font-weight:500;src:url(${F}/inter/files/inter-latin-500-normal.woff2)}
@font-face{font-family:I;font-weight:600;src:url(${F}/inter/files/inter-latin-600-normal.woff2)}
*{box-sizing:border-box;margin:0}body{width:1200px;height:675px;overflow:hidden;background:#FFF8F1;font-family:I,sans-serif;color:#2B1D14;position:relative}
.glow{position:absolute;border-radius:50%;filter:blur(110px);opacity:.65}.g1{width:700px;height:700px;background:#FFD9A8;right:-200px;top:-260px}.g2{width:600px;height:600px;background:#FFE7D2;left:-220px;bottom:-300px}
.brand{position:absolute;left:70px;top:58px;display:flex;align-items:center;gap:14px;font:700 32px Fraunces,serif}.brand svg{width:52px;height:52px}
.left{position:absolute;left:70px;top:150px;width:560px}.k{font:600 24px I;color:#B5400F;margin-bottom:16px}
h1{font:700 60px/1.08 Fraunces,serif;letter-spacing:-.01em}
.chat{position:absolute;right:70px;top:90px;width:430px;background:#EFE7DD;border-radius:36px;padding:26px;box-shadow:0 40px 80px rgba(120,70,30,.18)}
.top{display:flex;align-items:center;gap:12px;font:600 22px I;padding:0 4px 18px}.top svg{width:38px;height:38px}
.b{background:#fff;border-radius:18px;padding:16px 18px;font:500 22px/1.4 I;margin-top:12px;max-width:92%}.me{background:#E7FFDB;margin-left:auto}
.acts{margin:14px -18px -16px;border-top:2px solid #EDE3DA}.acts div{text-align:center;color:#1DA1D6;padding:12px 0}.acts div+div{border-top:2px solid #EDE3DA}
.foot{position:absolute;left:70px;bottom:52px;font:600 22px I;color:#6F5E52}.foot b{color:#2B1D14}`;
const page = (h) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}</style></head><body><div class="glow g1"></div><div class="glow g2"></div>
<div class="brand">${LOGO}<span>I'm OK</span></div><div class="left"><div class="k">${esc(h.kicker || 'Guide')}</div><h1>${esc(h.title)}</h1></div>
${h.chat ? `<div class="chat"><div class="top">${LOGO} I'm OK</div>${h.chat.map((m) => `<div class="b${m.from === 'me' ? ' me' : ''}">${esc(m.text).replace(/\n/g, '<br>')}${m.acts ? `<div class="acts">${m.acts.map((a) => `<div>${esc(a)}</div>`).join('')}</div>` : ''}</div>`).join('')}</div>` : ''}
<div class="foot">getimok.app/<b>blog</b></div></body></html>`;
const dir = path.join(__dirname, '..', 'blog', 'img');
const heroes = require(path.join(dir, 'heroes.js'));
const only = process.argv.slice(2);
(async () => {
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1200, height: 675 } });
  for (const [slug, h] of Object.entries(heroes)) {
    const out = path.join(dir, `${slug}.png`);
    if (only.length ? !only.includes(slug) : fs.existsSync(out)) continue;
    const tmp = path.join(__dirname, '_b.html'); fs.writeFileSync(tmp, page(h));
    await p.goto('file://' + tmp); await p.waitForTimeout(400);
    await p.screenshot({ path: out }); fs.unlinkSync(tmp); console.log('rendered', slug);
  }
  await b.close();
})();

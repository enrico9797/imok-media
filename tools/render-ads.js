// Ad creatives and print pieces, in the house style.
// Usage: NODE_PATH=$(npm root -g) node tools/render-ads.js [name ...]   -> ads/<name>.png
// Feed ads 1080x1350 (Meta 4:5), stories 1080x1920, print at 300dpi.
const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const LOGO = fs.readFileSync(__dirname + '/logo.svg', 'utf8').trim();
const F = 'file://' + path.join(__dirname, 'node_modules/@fontsource');
const QR = (n) => fs.readFileSync(path.join(__dirname, '..', 'ads', 'qr', n + '.svg'), 'utf8').replace(/<\?xml[^>]*\?>/, '').replace(/width="[^"]*" height="[^"]*"/, 'width="100%" height="100%"');
const WA = '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm0 18.2c-1.5 0-3-.4-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2c0 1.3.9 2.5 1 2.7.1.2 1.8 2.8 4.4 3.9 1.6.7 2.3.8 3.1.6.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.5-.3z"/></svg>';
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const nl = (s) => esc(s).replace(/\n/g, '<br>');

const base = `@font-face{font-family:Fr;font-weight:700;src:url(${F}/fraunces/files/fraunces-latin-700-normal.woff2)}
@font-face{font-family:Fr;font-weight:600;src:url(${F}/fraunces/files/fraunces-latin-600-normal.woff2)}
@font-face{font-family:Fr;font-weight:600;font-style:italic;src:url(${F}/fraunces/files/fraunces-latin-600-italic.woff2)}
@font-face{font-family:I;font-weight:500;src:url(${F}/inter/files/inter-latin-500-normal.woff2)}
@font-face{font-family:I;font-weight:600;src:url(${F}/inter/files/inter-latin-600-normal.woff2)}
@font-face{font-family:I;font-weight:700;src:url(${F}/inter/files/inter-latin-700-normal.woff2)}
*{box-sizing:border-box;margin:0}body{overflow:hidden;background:#FFF8F1;font-family:I,sans-serif;color:#2B1D14;position:relative}
.glow{position:absolute;border-radius:50%;filter:blur(120px);opacity:.7}
.brand{display:flex;align-items:center;gap:14px;font:700 34px Fr,serif}.brand svg{width:56px;height:56px}
h1{font:700 84px/1.04 Fr,serif;letter-spacing:-.015em}h1 em{font-style:normal;background:linear-gradient(90deg,#FFA63D,#FF6B3D);-webkit-background-clip:text;color:transparent}
.ph{background:#EFE7DD;border-radius:40px;padding:26px 26px 30px;box-shadow:0 40px 90px rgba(120,70,30,.20)}
.ph .lab{font:600 22px I;color:#7A6658;padding:0 6px 6px}
.top{display:flex;align-items:center;gap:12px;font:600 24px I;padding:2px 6px 14px}.top svg{width:40px;height:40px}
.b{background:#fff;border-radius:20px;padding:18px 20px;font:500 27px/1.38 I;margin-top:14px;max-width:90%}.me{background:#DDF7C9;margin-left:auto;width:max-content}
.acts{margin:16px -20px -18px;border-top:2px solid #EDE3DA}.acts div{text-align:center;color:#1A8FC4;padding:13px 0;font-weight:600}.acts div+div{border-top:2px solid #EDE3DA}
.cta{display:inline-flex;align-items:center;gap:16px;background:#1FA855;color:#fff;font:700 36px I;border-radius:999px;padding:26px 46px;box-shadow:0 14px 30px rgba(31,168,85,.30)}.cta svg{width:42px;height:42px}
.sub{font:600 26px I;color:#7A6658}`;

const bubble = (m) => `<div class="b${m.me ? ' me' : ''}">${nl(m.t)}${m.acts ? `<div class="acts">${m.acts.map((a) => `<div>${esc(a)}</div>`).join('')}</div>` : ''}</div>`;
const phone = (lab, msgs, extra = '') => `<div class="ph" ${extra}>${lab ? `<div class="lab">${esc(lab)}</div>` : ''}<div class="top">${LOGO} I'm OK</div>${msgs.map(bubble).join('')}</div>`;

// ---------- Feed (1080x1350) and story (1080x1920) ----------
function social(a, story) {
  const W = 1080, H = story ? 1920 : 1350;
  const pad = 76, topY = story ? 230 : 70;
  const lines = a.lines || 3; const p1t = story ? 700 : (lines === 2 ? 390 : 480); const p2t = story ? 1200 : p1t + 365;
  const css = `${base}body{width:${W}px;height:${H}px}
  .g1{width:760px;height:760px;background:${a.glow || '#FFD9A8'};right:-260px;top:-300px}.g2{width:640px;height:640px;background:#FFE7D2;left:-260px;bottom:-280px}
  .head{position:absolute;left:${pad}px;right:${pad}px;top:${topY}px}.head .brand{margin-bottom:${story ? 54 : 34}px}
  h1{font-size:${a.size || (story ? 92 : 80)}px}
  .p1{position:absolute;left:${pad}px;width:${story ? 880 : 680}px;top:${p1t}px}${story ? '.b{font-size:34px}.top{font-size:28px}.top svg{width:46px;height:46px}.ph .lab{font-size:26px}' : ''}
  .p2{position:absolute;right:${pad - 10}px;width:${story ? 780 : 620}px;top:${p2t}px;transform:rotate(1.5deg)}
  .p2 .b{font-size:${story ? 32 : 25}px}
  .foot{position:absolute;left:${pad}px;bottom:${story ? 290 : 70}px;display:flex;align-items:center;gap:26px}
  .foot .sub{line-height:1.35}`;
  const html = `<div class="glow g1"></div><div class="glow g2"></div>
  <div class="head"><div class="brand">${LOGO}<span>I'm OK</span></div><h1>${a.h}</h1></div>
  <div class="p1">${phone(a.lab1, story ? a.chat1 : a.chat1.filter((m) => !m.me))}</div>
  ${a.chat2 ? `<div class="p2">${phone(a.lab2, a.chat2)}</div>` : ''}
  <div class="foot"><div class="cta">${WA}Start free on WhatsApp</div>${story ? '' : `<div class="sub">No app<br>to download</div>`}</div>`;
  return { css, html, W, H, scale: 1 };
}

const ADS = {
  'parents-tablets': {
    h: "Mum's tablets at 9.<br><em>You'll know she's taken them.</em>",
    lab1: "Mum's phone", chat1: [{ t: '⏰ Reminder from Emily\n\nTake your blood pressure tablet 💊', acts: ['Done ✅'] }, { t: 'Done ✅', me: 1 }],
    lab2: "Emily's phone", chat2: [{ t: '✅ Mum took her tablet at 9:04am 💊' }],
  },
  'parents-abroad': {
    lines: 2, h: 'Far from Mum and Dad?<br><em>Help with what matters.</em>', size: 70, glow: '#FFE0B8',
    lab1: "Dad's phone", chat1: [{ t: '⏰ Reminder from John\n\nDoctor at 2:30 today. Leave by 2 🩺', acts: ['Done ✅'] }, { t: 'Done ✅', me: 1 }],
    lab2: "John's phone, 1,500 km away", chat2: [{ t: '✅ Dad tapped Done at 1:52pm 🩺' }],
  },
  'couples-bins': {
    h: 'Stop being<br><em>the household reminder.</em>', glow: '#FFD3B0',
    lab1: "Sam's phone", chat1: [{ t: '⏰ Reminder from Emily\n\nBins go out tonight 🗑️', acts: ['Done ✅'] }, { t: 'Done ✅', me: 1 }],
    lab2: "Emily's phone", chat2: [{ t: '✅ Sam put the bins out at 8:41pm 🗑️' }],
  },
  'flatmates-rent': {
    lines: 2, h: "Rent's due on the 1st.<br><em>Nobody has to chase.</em>",
    lab1: "Sam's phone", chat1: [{ t: '⏰ Reminder from Emily\n\nPay your share of the rent 🏠', acts: ['Done ✅'] }, { t: 'Done ✅', me: 1 }],
    lab2: "Emily's phone", chat2: [{ t: '✅ Sam paid the rent at 9:12am 🏠' }],
  },
  'living-alone': {
    h: 'Living alone?<br><em>One tap a day, so someone would notice.</em>', size: 74, glow: '#FFDDB5',
    lab1: "John's phone", chat1: [{ t: "Good morning John ☀️ Tap below to let Emily know you're okay.", acts: ["I'm OK ✅"] }, { t: "I'm OK ✅", me: 1 }],
    lab2: "Emily's phone, only if he misses it", chat2: [{ t: "⚠️ John hasn't checked in today. His check-in was due at 9am." }],
  },
  'home-safe': {
    lines: 2, h: 'Home safe?<br><em>Mum will know.</em>',
    lab1: "Emily's phone", chat1: [{ t: '⏰ Reminder from Mum\n\nLet me know you got home safe 🏡', acts: ['Done ✅'] }, { t: 'Done ✅', me: 1 }],
    lab2: "Mum's phone", chat2: [{ t: '✅ Emily got home at 11:48pm 🏡' }],
  },
  'goals-gym': {
    lines: 2, h: 'Remind each other.<br><em>Actually do it.</em>', glow: '#FFD6A0',
    lab1: "John's phone", chat1: [{ t: '⏰ Reminder from Sam\n\nGym at 6. Leg day, no excuses 💪', acts: ['Done ✅'] }, { t: 'Done ✅', me: 1 }],
    lab2: "Sam's phone", chat2: [{ t: '✅ John went to the gym at 6:05pm 💪' }],
  },
};

// ---------- Print ----------
function sticker() {   // 100mm round, for your own wheelie bin
  const css = `${base}body{width:600px;height:600px;background:transparent}
  .c{position:absolute;inset:0;border-radius:50%;background:#FFF8F1;border:10px solid #FF8A45;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:40px}
  .c h1{font-size:62px;line-height:1}.c p{font:600 25px/1.3 I;color:#5C4A3E;margin:12px 0 16px}.q{width:170px;height:170px;background:#fff;padding:10px;border-radius:16px}
  .u{font:700 24px I;margin-top:12px;display:flex;align-items:center;gap:8px}.u svg{width:30px;height:30px}`;
  const html = `<div class="c"><h1>Bin night?</h1><p>Get a reminder<br>on WhatsApp. Free.</p><div class="q">${QR('bin')}</div><div class="u">${LOGO}getimok.app</div></div>`;
  return { css, html, W: 600, H: 600, scale: 2, omitBackground: true };
}
function flyerFront() {   // A6 (105x148mm), letterboxes and noticeboards
  const css = `${base}body{width:620px;height:874px}
  .g1{width:520px;height:520px;background:#FFD9A8;right:-200px;top:-220px}.g2{width:420px;height:420px;background:#FFE7D2;left:-200px;bottom:-200px}
  .in{position:absolute;inset:44px}.brand{font-size:26px;gap:10px}.brand svg{width:42px;height:42px}
  h1{font-size:44px;margin:22px 0 0}.ph{margin-top:30px;border-radius:28px;padding:18px 18px 22px}.top{font-size:18px}.top svg{width:30px;height:30px}
  .b{font-size:20px;padding:13px 15px;border-radius:15px;margin-top:10px}.acts{margin:12px -15px -13px}.acts div{padding:9px 0}.ph .lab{font-size:16px}
  .ph2{margin:-14px 0 0 110px;transform:rotate(1.5deg)}.ph{margin-top:24px}`;
  const html = `<div class="glow g1"></div><div class="glow g2"></div><div class="in"><div class="brand">${LOGO}<span>I'm OK</span></div>
  <h1>Help Mum remember her tablets.<br><em>Straight from WhatsApp.</em></h1>
  ${phone("Mum's phone", [{ t: '⏰ Reminder from Emily\n\nTake your blood pressure tablet 💊', acts: ['Done ✅'] }])}
  <div class="ph2">${phone("Emily's phone", [{ t: '✅ Mum took her tablet at 9:04am' }])}</div></div>`;
  return { css, html, W: 620, H: 874, scale: 2 };
}
function flyerBack() {
  const css = `${base}body{width:620px;height:874px}.in{position:absolute;inset:48px}
  h2{font:700 40px/1.1 Fr,serif;margin-bottom:26px}.st{display:flex;gap:18px;margin-bottom:22px}.n{flex:none;width:44px;height:44px;border-radius:50%;background:#2B1D14;color:#fff;font:700 22px I;display:flex;align-items:center;justify-content:center}
  .st b{display:block;font:700 23px I;margin-bottom:3px}.st span{font:500 20px/1.4 I;color:#5C4A3E}
  .q{display:flex;align-items:center;gap:22px;margin-top:30px;background:#fff;border-radius:24px;padding:20px}.q .qr{width:170px;height:170px;flex:none}.q p{font:600 21px/1.4 I}.q p b{display:block;font:700 26px I;margin-bottom:6px}
  .u{position:absolute;left:48px;bottom:40px;display:flex;align-items:center;gap:10px;font:700 22px I}.u svg{width:34px;height:34px}`;
  const html = `<div class="in"><h2>Set it up in a minute</h2>
  <div class="st"><div class="n">1</div><div><b>Tell I'm OK what to remind</b><span>"Remind Mum to take her tablet every day at 9."</span></div></div>
  <div class="st"><div class="n">2</div><div><b>They tap Done</b><span>The reminder arrives on their WhatsApp. No app to download.</span></div></div>
  <div class="st"><div class="n">3</div><div><b>You know it's done</b><span>And if they forget, you'll know that too.</span></div></div>
  <div class="q"><div class="qr">${QR('flyer')}</div><p><b>Scan to start</b>Free for you and two people. Works on any phone with WhatsApp.</p></div></div>
  <div class="u">${LOGO}getimok.app</div>`;
  return { css, html, W: 620, H: 874, scale: 2 };
}
function poster() {   // A4, for pub and community noticeboards (with permission)
  const css = `${base}body{width:1240px;height:1754px}
  .g1{width:900px;height:900px;background:#FFD3B0;right:-300px;top:-320px}.g2{width:800px;height:800px;background:#FFE7D2;left:-320px;bottom:-300px}
  .in{position:absolute;inset:90px}.brand{font-size:40px}.brand svg{width:64px;height:64px}
  h1{font-size:118px;margin-top:60px}.lead{font:500 40px/1.4 I;color:#5C4A3E;margin-top:30px;max-width:900px}
  .ph{width:900px;margin-top:70px;padding:34px}.ph .b{font-size:42px;padding:24px 26px}.ph .acts{margin:20px -26px -24px}.ph .acts div{padding:18px 0}.top{font-size:32px}.top svg{width:50px;height:50px}.ph .lab{font-size:28px}
  .q{display:flex;align-items:flex-end;justify-content:flex-end;gap:30px;margin-top:40px}.q .qr{width:360px;height:360px;background:#fff;padding:16px;border-radius:24px}
  .q p{font:700 40px/1.25 I;text-align:right;margin-bottom:10px}.q p span{display:block;font:600 30px I;color:#7A6658;margin-top:8px}`;
  const html = `<div class="glow g1"></div><div class="glow g2"></div><div class="in"><div class="brand">${LOGO}<span>I'm OK</span></div>
  <h1>Who reminds<br>your flatmate<br><em>about the rent?</em></h1>
  <p class="lead">Set it once. They get a WhatsApp reminder and tap Done. You know it's done, and nobody has to chase.</p>
  ${phone("Sam's phone", [{ t: '⏰ Reminder from Emily\n\nPay your share of the rent 🏠', acts: ['Done ✅'] }])}
  <div class="q"><p>Scan to start.<span>Free on WhatsApp.</span></p><div class="qr">${QR('poster')}</div></div></div>`;
  return { css, html, W: 1240, H: 1754, scale: 2 };
}

const JOBS = {};
for (const [k, a] of Object.entries(ADS)) { JOBS[`feed-${k}`] = () => social(a, false); }
JOBS['story-parents-tablets'] = () => social(ADS['parents-tablets'], true);
JOBS['story-living-alone'] = () => social(ADS['living-alone'], true);
JOBS['story-parents-abroad'] = () => social(ADS['parents-abroad'], true);
JOBS['print-bin-sticker'] = sticker; JOBS['print-flyer-front'] = flyerFront; JOBS['print-flyer-back'] = flyerBack; JOBS['print-poster-a4'] = poster;

const out = path.join(__dirname, '..', 'ads');
const only = process.argv.slice(2);
(async () => {
  const b = await chromium.launch();
  for (const [name, fn] of Object.entries(JOBS)) {
    if (only.length && !only.includes(name)) continue;
    const j = fn();
    const p = await b.newPage({ viewport: { width: j.W, height: j.H }, deviceScaleFactor: j.scale });
    const tmp = path.join(__dirname, '_ad.html');
    fs.writeFileSync(tmp, `<!doctype html><html><head><meta charset="utf-8"><style>${j.css}</style></head><body>${j.html}</body></html>`);
    await p.goto('file://' + tmp); await p.waitForTimeout(350);
    await p.screenshot({ path: path.join(out, name + '.png'), omitBackground: !!j.omitBackground });
    await p.close(); fs.unlinkSync(tmp); console.log('rendered', name);
  }
  await b.close();
})();

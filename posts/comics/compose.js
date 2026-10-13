// Comic compositor: AI panel (no words) + house-style text on top, rendered with Playwright.
// Runs where the panels are: node compose.js  (expects p1.png..p15.png and logo.svg next to it)
const { chromium } = require('playwright');
const fs = require('fs');
const LOGO = fs.readFileSync(__dirname + '/logo.svg', 'utf8').trim();
const css = `<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,500;1,9..144,600&family=Inter:wght@500;600;700&display=block" rel="stylesheet"><style>
*{box-sizing:border-box;margin:0}body{width:1080px;height:1350px;position:relative;overflow:hidden;font-family:Inter,sans-serif;color:#2B1D14;background:#FFF7EE}
.bg{position:absolute;inset:0;width:1080px;height:1350px;object-fit:cover}
.t{position:absolute;left:86px;right:150px;top:88px;font:700 76px/1.08 Fraunces,serif;letter-spacing:-.01em;text-wrap:balance}
.t em{font-style:italic;font-weight:600;background:linear-gradient(90deg,#FFB547,#FF7A45);-webkit-background-clip:text;background-clip:text;color:transparent;padding-right:.08em}
.sub{position:absolute;left:86px;right:120px;font:600 34px/1.35 Inter;color:#5E4A3C}
.pg{position:absolute;right:62px;top:54px;font:600 28px Inter;color:#8A766A}
.sp{position:absolute;background:#fff;border:4px solid #3A2A1E;border-radius:30px;padding:20px 28px;font:600 36px/1.3 Inter;box-shadow:0 10px 30px rgba(60,30,10,.12)}
.sp:after{content:"";position:absolute;width:30px;height:30px;background:#fff;border-right:4px solid #3A2A1E;border-bottom:4px solid #3A2A1E}
.sp.dl:after{left:60px;bottom:-19px;transform:rotate(45deg)}.sp.dr:after{right:60px;bottom:-19px;transform:rotate(45deg)}
.sp.th{border-radius:60px}.sp.th:after{display:none}
.card{position:absolute;background:#EFE7DD;border-radius:34px;padding:22px;box-shadow:0 24px 60px rgba(60,30,10,.22)}
.card .top{display:flex;align-items:center;gap:12px;font:600 26px Inter;padding:0 6px 14px}.card .top svg{width:40px;height:40px}
.b{background:#fff;border-radius:20px;padding:18px 22px;font:500 29px/1.4 Inter}
.acts{margin:16px -22px -18px;border-top:2px solid #EDE3DA}.acts div{text-align:center;color:#1DA1D6;padding:12px 0;font-weight:500}
.me{position:absolute;background:#E7FFDB;border-radius:22px;padding:18px 26px;font:500 34px/1.35 Inter;box-shadow:0 14px 36px rgba(60,30,10,.18)}
.lab{font:600 22px Inter;color:#6F5E52;margin-bottom:8px}
.pagec{position:absolute;background:#fff;border-radius:30px;padding:22px 28px;box-shadow:0 24px 60px rgba(60,30,10,.22);display:flex;gap:20px;align-items:center}
.ok{flex:none;width:56px;height:56px;border-radius:50%;background:#E5F6EC;color:#1FA855;display:grid;place-items:center;font:700 30px Inter}
.pagec .h{font:600 22px Inter;color:#8A766A}.pagec .m{font:600 31px Inter;margin-top:2px}.pagec .d{font:500 25px Inter;color:#6F5E52;margin-top:2px}
.pill{position:absolute;background:#fff;border-radius:999px;padding:14px 26px;font:600 28px Inter;box-shadow:0 14px 36px rgba(60,30,10,.18)}
.t.band{left:56px;right:56px;background:rgba(255,247,238,.94);padding:22px 30px;border-radius:30px;box-shadow:0 14px 40px rgba(60,30,10,.18)}
.big{position:absolute;font:italic 600 110px Fraunces,serif;background:linear-gradient(90deg,#FFB547,#FF7A45);-webkit-background-clip:text;background-clip:text;color:transparent;transform:rotate(-8deg)}
</style>`;
const card = (x, y, w, inner) => `<div class="card" style="left:${x}px;top:${y}px;width:${w}px"><div class="top">${LOGO} I'm OK</div>${inner}</div>`;
const rem = (text, from = 'Emily') => `<div class="b">${from ? `⏰ Reminder from ${from}<br><br>` : '⏰ '}<b>${text}</b><div class="acts"><div>Done ✅</div></div></div>`;
const pagec = (x, y, w, h, m, d) => `<div class="pagec" style="left:${x}px;top:${y}px;width:${w}px"><span class="ok">✓</span><div><div class="h">${h}</div><div class="m">${m}</div><div class="d">${d}</div></div></div>`;
const sp = (x, y, w, txt, k = 'dl') => `<div class="sp ${k}" style="left:${x}px;top:${y}px;${w ? `width:${w}px` : ''}">${txt}</div>`;
const me = (x, y, txt, lab = '') => `<div class="me" style="left:${x}px;top:${y}px">${lab ? `<div class="lab">${lab}</div>` : ''}${txt}</div>`;
const S = (img, pg, title, rest = '') => `${img ? `<img class="bg" src="file://${__dirname}/${img}">` : ''}${pg ? `<div class="pg">${pg}</div>` : ''}<div class="t">${title}</div>${rest}`;
const SB = (...a) => S(...a).replace('class="t"', 'class="t band"');   // title on a cream band, for dark or busy panels
const getimok = `<div class="pill" style="right:60px;bottom:56px">Start free at <b>getimok.app</b></div>`;

const slides = {
  // Thu 22 Oct: Mum vs the 9am tablet
  'mum-1': S('p1.png', '1/4', 'Did Mum take her <em>tablets?</em>', `${sp(596, 392, 450, 'Should I call again? That\'s the third time today…', 'th')}${me(86, 1110, 'remind Mum every day at 9 to take her tablets', 'So Emily asked I\'m OK:')}`),
  'mum-2': S('p2.png', '2/4', '9:00am. <em>Mum\'s phone.</em>', `${card(600, 330, 420, rem('Take your tablets 💊'))}${sp(70, 360, 0, 'I know, I know.', 'dr')}`),
  'mum-3': S('p3.png', '3/4', 'Done. <em>With a flourish.</em>', `${me(640, 330, 'Done ✅')}`),
  'mum-4': S('p4.png', '4/4', 'Emily, <em>finally relaxed.</em>', `${pagec(86, 300, 700, "Emily's page · Today", 'Mum took her tablets', 'Done at 9:04am')}<div class="me" style="left:86px;top:1120px;background:#fff"><div class="lab">Mum</div>Satisfied? 😏</div>${getimok}`),
  // Wed 28 Oct: Dad and the Done button
  'dad-1': S('p5.png', '1/4', '9:00am. <em>Dad\'s phone buzzes.</em>', `${card(60, 360, 400, rem('Water the tomatoes 🍅'))}`),
  'dad-2': S('p6.png', '2/4', 'Dad has <em>one</em> goal.', `${sp(560, 300, 440, 'Personal best, here we come.', 'dl')}`),
  'dad-3': S('p7.png', '3/4', '0.8 seconds. <em>New record.</em>', `${me(70, 340, 'Done ✅')}`),
  'dad-4': S('p8.png', '4/4', 'Meanwhile, <em>in London.</em>', `<div class="sub" style="top:290px">Dad 1, reminders 0.</div>${pagec(86, 1080, 760, "Emily's page · Today", 'Dad watered the tomatoes', 'Done at 9:00am')}${getimok}`),
  // Thu 29 Oct: the scariest sound (two panels)
  'bins-1': SB('p9.png', '1/2', 'The scariest sound of <em>Halloween week:</em>', `<div class="big" style="left:560px;top:420px">rumble…</div><div class="sub" style="top:1180px;color:#2B1D14">6:02am. The bin lorry. The bins are still in.</div>`),
  'bins-2': SB('p10.png', '2/2', 'Unless you set <em>one reminder.</em>', `${card(560, 990, 460, rem('Bins out tonight 🗑️', ''))}`),
  // Sat 31 Oct: What's really scary (6 slides)
  'hw-1': S('p11.png', '1/6', 'Forget ghosts. <em>This</em> is what\'s really scary.', `<div class="sub" style="top:1180px;color:#2B1D14">Swipe 👉</div>`),
  'hw-2': SB('p12.png', '2/6', '11:40pm. <em>No text from Sam.</em>', `${pagec(86, 1100, 860, 'Then: ', 'Sam: Text me when you\'re home', 'Done at 11:52pm ✅ Home safe')}`),
  'hw-3': SB('p13.png', '3/6', 'Did Dad take <em>his pills?</em>', `${pagec(86, 1100, 860, 'Then:', 'Dad: Take your evening pills', 'Done at 9:02pm')}`),
  'hw-4': SB('p14.png', '4/6', 'Rent day. <em>Who paid?</em>', `${pagec(86, 1100, 860, 'Then:', 'John: Pay your half of the rent', 'Done at 9:14am')}`),
  'hw-5': SB('p15.png', '5/6', 'Walking home <em>from a party.</em>', `${pagec(86, 1060, 900, 'Your safety word', 'One secret word to I\'m OK', 'alerts your people at once, with where you are')}`),
  'hw-6': `<div style="position:absolute;inset:0;background:radial-gradient(circle at 80% 10%,#FFD9A8,transparent 55%),radial-gradient(circle at 10% 95%,#FFE7D2,transparent 55%)"></div><div class="pg">6/6</div>
    <div style="position:absolute;left:86px;top:84px;display:flex;align-items:center;gap:16px;font:700 44px Fraunces,serif"><span style="width:70px;height:70px;display:block">${LOGO.replace('<svg', '<svg width="70" height="70"')}</span>I'm OK</div>
    <div class="t" style="top:360px;font-size:96px">Happy <em>Halloween</em> 🎃</div>
    <div class="sub" style="top:640px;font-size:40px;color:#2B1D14">The only scares you need are the fun ones.</div>
    <div class="sub" style="top:780px;font-size:36px">Reminders on WhatsApp. They tap Done. You see it's done.</div>
    <div class="pill" style="left:86px;top:960px;font-size:36px;padding:22px 36px;background:linear-gradient(90deg,#FFB547,#FF7A45);color:#fff">Start free at getimok.app</div>`,
};

(async () => {
  const only = process.argv.slice(2);
  const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [n, h] of Object.entries(slides)) {
    if (only.length && !only.some((o) => n.startsWith(o))) continue;
    fs.writeFileSync(__dirname + '/_t.html', `<!doctype html><html><head><meta charset="utf-8">${css}</head><body>${h}</body></html>`);
    await p.goto('file://' + __dirname + '/_t.html', { waitUntil: 'networkidle' }); await p.evaluate(() => document.fonts.ready); await p.waitForTimeout(300);
    await p.screenshot({ path: `${__dirname}/out/${n}.jpg`, type: 'jpeg', quality: 90 });
  }
  await b.close();
})();

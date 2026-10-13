module.exports = ({ LOGO, foot }) => {
  // Week of 19 Oct to 1 Nov: non-comic posts (comics are composited separately, see comics.js)
  const css = `<style>
    h1,.it,.sub,.b,.card,.pill,.lbl{text-wrap:balance}
    .done{display:inline-flex;align-items:center;gap:12px;font:600 30px I;color:#1FA855;background:#fff;border-radius:999px;padding:16px 28px;box-shadow:0 20px 50px rgba(120,70,30,.10)}
    .card{background:#fff;border-radius:32px;padding:32px 38px;display:flex;gap:28px;align-items:center;box-shadow:0 20px 50px rgba(120,70,30,.08)}
    .card .t{font:600 40px I}.card .d{font:500 31px/1.4 I;color:#6F5E52;margin-top:6px}
    .lbl{font:600 28px I;letter-spacing:.08em;text-transform:uppercase;color:#B4541F;margin-bottom:18px}
    .num{flex:none;width:76px;height:76px;border-radius:50%;background:linear-gradient(135deg,#FFB547,#FF7A45);color:#fff;display:grid;place-items:center;font:700 38px Fraunces,serif}
    .pg{position:absolute;right:90px;top:100px;font:600 28px I;color:#6F5E52}
    .small{font:500 26px I;color:#6F5E52;margin-top:10px}
    .cap{font:600 26px I;color:#6F5E52;margin:0 0 14px 6px}
    .pagec{background:#fff;border-radius:36px;padding:30px 34px;box-shadow:0 30px 70px rgba(120,70,30,.14)}
    .pagec .hd{font:600 26px I;color:#6F5E52;margin-bottom:16px}
    .row{display:flex;align-items:center;gap:22px;padding:18px 0}.row+.row{border-top:2px solid #F1E3D6}
    .ok{flex:none;width:58px;height:58px;border-radius:50%;background:#E5F6EC;color:#1FA855;display:grid;place-items:center;font:700 32px I}
    .row .t{font:600 32px I}.row .d{font:500 26px I;color:#6F5E52;margin-top:4px}
  </style>`;
  const page = (h) => css + h + foot;
  const chat = (top, inner, extra = '') => `<div class="chat" style="position:absolute;left:90px;right:90px;top:${top}px;${extra}"><div class="top">${LOGO} I'm OK</div>${inner}</div>`;
  const remind = (text, from, btns = ['Done ✅']) => `<div class="b">${from ? `⏰ Reminder from ${from}<br><br>` : ''}<b>${text}</b><div class="acts">${btns.map((b) => `<div>${b}</div>`).join('')}</div></div>`;
  const heading = (top, html, sub = '') => `<div style="position:absolute;left:90px;right:90px;top:${top}px"><h1>${html}</h1>${sub ? `<p class="sub" style="margin-top:26px">${sub}</p>` : ''}</div>`;
  const myPage = (top, rows, title = "Emily's page · Today") => `<div class="pagec" style="position:absolute;left:90px;right:90px;top:${top}px"><div class="hd">${title}</div>${rows.map(([t, d]) => `<div class="row"><span class="ok">✓</span><div><div class="t">${t}</div><div class="d">${d}</div></div></div>`).join('')}</div>`;

  const couples = [
    ['🗑️', 'Bin night', 'Bins out tonight 🗑️', 'Every Tuesday, 7pm'],
    ['💷', 'Bills and rent', 'Rent day: pay your half 💷', 'The 1st of every month, 9am'],
    ['🐶', "The dog's flea treatment", "Biscuit's flea treatment 🐶", 'The 15th of every month, 10am'],
    ['🍝', 'Date night', 'Date night: you\'re booking 🍝', 'Every Friday, 6pm'],
  ];
  const coupleSlides = Object.fromEntries(couples.map(([e, t, msg, when], i) => [`06${'bcde'[i]}-couples-${i + 1}`, page(`<div class="pg">${i + 2} / 5</div>
    <div style="position:absolute;left:90px;right:90px;top:260px"><div class="lbl">Reminder ${i + 1} of 4</div><h1>${e} ${t}</h1></div>
    ${chat(560, `<div class="cap">On Sam's WhatsApp</div>${remind(msg, 'Emily')}`)}
    <div style="position:absolute;left:90px;top:1050px"><span class="done">🗓️ ${when}</span></div>`)]));

  return {
    // Mon 19 Oct 18:00 · Looking after family: Dad's appointment
    '01-appointment': page(`${heading(200, `Doctor at 10.<br>Reminder at <span class="grad">9.</span>`)}
    ${chat(420, `<div class="cap">On Dad's WhatsApp</div>${remind('Doctor at 10am. Time to set off 🚌', 'Emily')}<div class="b me">Done ✅</div>`, 'right:170px')}
    ${myPage(1020, [["Dad's on his way", 'Doctor at 10am · done at 9:06am']])}`),

    // Tue 20 Oct 18:00 · How it works: set one up in a minute (carousel)
    '02a-minute': page(`<div class="pg">1 / 3</div>${heading(230, `Set one up in <span class="grad">a minute.</span>`, 'Just tell I\'m OK who, what and when.')}
    ${chat(560, `<div class="b me" style="margin-left:120px">remind Dad every Tuesday at 7pm to put the bins out</div>
      <div class="b" style="margin-top:18px"><b>Here's the reminder 👇</b><br><br>👤 Dad<br>📝 Put the bins out<br>🔁 Every Tuesday at 7pm<div class="acts"><div>Send to Dad</div></div></div>`)}`),
    '02b-yes': page(`<div class="pg">2 / 3</div>${heading(230, `Dad says yes <span class="grad">once.</span>`, 'One tap. No app to download.')}
    ${chat(560, `<div class="cap">On Dad's WhatsApp</div><div class="b">Hi Dad 👋<br><br>Emily has set up a reminder for you on I'm OK:<br><br>⏰ <b>Put the bins out</b><br>🗓 every Tuesday at 7pm<div class="acts"><div>Yes, remind me 👍</div><div>No thanks</div></div></div>`)}`),
    '02c-every': page(`<div class="pg">3 / 3</div>${heading(200, `Then it just <span class="grad">arrives.</span>`, 'Every Tuesday at 7pm, on WhatsApp.')}
    ${chat(450, `${remind('Put the bins out 🗑️', 'Emily')}<div class="b me">Done ✅</div>`, 'right:170px')}
    ${myPage(1010, [['Dad put the bins out', 'Tuesday · done at 7:12pm']])}`),

    // Fri 23 Oct 18:00 · Daily I'm OK: night shift
    '03-nightshift': page(`${heading(210, `Night shift?<br>One tap when <span class="grad">home.</span>`)}
    ${chat(470, `<div class="b">Morning John ☀️ Your daily I'm OK. Home and all well?<div class="acts"><div>I'm OK ✅</div><div>I need something</div></div></div>
      <div class="b me">I'm OK ✅</div>`)}
    <p class="sub" style="position:absolute;left:90px;right:90px;top:1090px;font-size:32px">You pick the time, say 7am. If John doesn't tap it, Emily is told.</p>`),

    // Sat 24 Oct 10:00 · Seasonal: clocks go back tonight
    '04-clocks': page(`${heading(190, `Clocks go back <span class="grad">tonight.</span>`, 'An extra hour in bed. Your reminders don\'t mind.')}
    <div style="position:absolute;left:90px;top:470px;width:300px;height:300px;border-radius:50%;background:#fff;box-shadow:0 30px 70px rgba(120,70,30,.14);display:grid;place-items:center">
      <svg viewBox="0 0 100 100" width="230" height="230"><circle cx="50" cy="50" r="46" fill="none" stroke="#F1E3D6" stroke-width="4"/>${[...Array(12)].map((_, i) => `<line x1="50" y1="8" x2="50" y2="14" stroke="#B4541F" stroke-width="3" stroke-linecap="round" transform="rotate(${i * 30} 50 50)"/>`).join('')}<line x1="50" y1="50" x2="50" y2="26" stroke="#2B1D14" stroke-width="5" stroke-linecap="round" transform="rotate(60 50 50)"/><line x1="50" y1="50" x2="50" y2="18" stroke="#FF7A45" stroke-width="4" stroke-linecap="round"/><circle cx="50" cy="50" r="4" fill="#2B1D14"/></svg></div>
    <div style="position:absolute;left:440px;right:90px;top:530px"><p class="sub" style="font-size:36px">2am becomes 1am.<br><b style="color:#2B1D14">Mum's 9am tablet still arrives at 9am.</b></p></div>
    ${chat(830, `${remind('Take your tablet 💊', 'Emily')}`)}`),

    // Sun 25 Oct 10:00 · Useful list: reminders couples actually need
    '06a-couples-cover': page(`<div class="pg">1 / 5</div>
    <div style="position:absolute;left:90px;right:90px;top:330px"><div class="lbl">Save this 📌</div>
      <h1 style="font-size:100px">Reminders couples <span class="grad">actually</span> need</h1>
      <p class="sub" style="margin-top:40px">The reminder comes from I'm OK, not from you. Fewer "did you…?" texts.</p>
      <p class="sub" style="margin-top:40px;font-weight:600;color:#2B1D14">Swipe 👉</p></div>`),
    ...coupleSlides,

    // Mon 26 Oct 18:00 · Far from home: 1,000 miles from Mum
    '07-faraway': page(`${heading(200, `1,000 miles away.<br>Still in the <span class="grad">loop.</span>`)}
    ${chat(420, `<div class="cap">On Mum's WhatsApp, in Rome</div>${remind('Take your tablet 💊', 'Emily')}<div class="b me">Done ✅</div>`, 'right:170px')}
    ${myPage(1020, [['Mum took her tablet', 'Done at 9:05am, her time']], "Emily's page · London")}`),

    // Tue 27 Oct 18:00 · How it works: Plus, plainly
    '08-plus': page(`${heading(200, `What <span class="grad">Plus</span> adds.`, 'Free covers 2 people. Plus is for when you want more.')}
    <div style="position:absolute;left:90px;right:90px;top:470px;display:grid;gap:22px">
      <div class="card"><span style="font-size:52px">✅</span><div><div class="t">A message every time it's done</div><div class="d">“Mum: Take your tablet, done at 9:04am”</div></div></div>
      <div class="card"><span style="font-size:52px">👋</span><div><div class="t">A gentle nudge if they forget</div><div class="d">Before you're told it was missed.</div></div></div>
      <div class="card"><span style="font-size:52px">👨‍👩‍👧</span><div><div class="t">Up to 6 people</div><div class="d">With up to 5 reminders a day each.</div></div></div>
      <div style="margin-top:6px"><span class="done">Try it free for 7 days</span></div>
    </div>`),

    // Fri 30 Oct 18:00 · Safety word: Halloween party, calm
    '09-party': page(`${heading(190, `Off to a Halloween <span class="grad">party?</span>`, 'Set a safety word before you go.')}
    <div style="position:absolute;left:90px;right:90px;top:500px;display:grid;grid-template-columns:1fr 1fr;gap:26px">
      <div><div class="cap">John's phone</div><div class="chat" style="padding:24px"><div class="b me" style="margin:0 0 0 60px">pumpkin</div><div class="b" style="margin-top:14px;font-size:27px">👍<div class="acts" style="margin:16px -28px -24px"><div style="padding:12px 0">📍 Send location</div></div></div></div></div>
      <div><div class="cap">Emily's phone</div><div class="chat" style="padding:24px"><div class="b" style="font-size:27px">🆘 John sent his safety word and may need help.<br><br>📞 +44 7700 900123<div class="acts" style="margin:16px -28px -24px"><div style="padding:12px 0">I'm on it</div></div></div></div></div>
    </div>
    <p class="sub" style="position:absolute;left:90px;right:90px;top:1060px;font-size:32px">One secret word only you know. Free for everyone. Not an emergency service: for emergencies, call 999.</p>`),

    // Sun 1 Nov 10:00 · Seasonal: hello November
    '10-november': page(`${heading(200, `Hello, <span class="grad">November</span> 🍂`, 'Three reminders worth setting this month.')}
    <div style="position:absolute;left:90px;right:90px;top:500px;display:grid;gap:22px">
      <div class="card"><span style="font-size:52px">💉</span><div><div class="t">Book the flu jab</div><div class="d">For Mum and Dad, once, this week</div></div></div>
      <div class="card"><span style="font-size:52px">🔥</span><div><div class="t">Boiler service</div><div class="d">Before the first cold snap</div></div></div>
      <div class="card"><span style="font-size:52px">☎️</span><div><div class="t">A call to Gran</div><div class="d">Every Sunday at 5pm</div></div></div>
    </div>
    <p class="sub" style="position:absolute;left:90px;right:90px;top:1060px;font-size:32px">They get it on WhatsApp and tap Done. You see it's done.</p>`),
  };
};

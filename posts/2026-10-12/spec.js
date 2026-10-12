module.exports = ({ LOGO, foot }) => {
  // Shared bits (house style from posts/2026-10, reminders-first message)
  const css = `<style>
    h1,.it,.sub,.b,.card,.pill,.lbl{text-wrap:balance}
    .done{display:inline-flex;align-items:center;gap:12px;font:600 30px I;color:#1FA855;background:#fff;border-radius:999px;padding:16px 28px;box-shadow:0 20px 50px rgba(120,70,30,.10)}
    .warn{color:#B4541F}
    .card{background:#fff;border-radius:32px;padding:32px 38px;display:flex;gap:28px;align-items:center;box-shadow:0 20px 50px rgba(120,70,30,.08)}
    .card .t{font:600 40px I}.card .d{font:500 31px/1.4 I;color:#6F5E52;margin-top:6px}
    .lbl{font:600 28px I;letter-spacing:.08em;text-transform:uppercase;color:#B4541F;margin-bottom:18px}
    .num{flex:none;width:76px;height:76px;border-radius:50%;background:linear-gradient(135deg,#FFB547,#FF7A45);color:#fff;display:grid;place-items:center;font:700 38px Fraunces,serif}
    .pg{position:absolute;right:90px;top:100px;font:600 28px I;color:#6F5E52}
    .small{font:500 26px I;color:#6F5E52;margin-top:10px}
  </style>`;
  const page = (h) => css + h + foot;
  const chat = (top, inner, extra = '') => `<div class="chat" style="position:absolute;left:90px;right:90px;top:${top}px;${extra}"><div class="top">${LOGO} I'm OK</div>${inner}</div>`;
  const remind = (text, from) => `<div class="b"><b>${text}</b>${from ? `<div class="small">Reminder from ${from}</div>` : ''}<div class="acts"><div>Done ✅</div></div></div>`;
  const heading = (top, html, sub = '') => `<div style="position:absolute;left:90px;right:90px;top:${top}px"><h1>${html}</h1>${sub ? `<p class="sub" style="margin-top:26px">${sub}</p>` : ''}</div>`;

  // Saturday carousel: 5 reminders for your parents
  const list = [
    ['💊', 'Their tablets', 'Take your tablet 💊', 'Every day, 9am'],
    ['🩺', 'Appointments', 'Doctor at 10am. Time to set off 🚗', 'Once, the morning of'],
    ['🗑️', 'Bin night', 'Bins out tonight 🗑️', 'Every Tuesday, 7pm'],
    ['☎️', 'A Sunday call', 'Give Emily a ring ☎️', 'Every Sunday, 5pm'],
    ['🔥', 'The boiler service', 'Book the boiler service 🔥', 'Every year, in October'],
  ];
  const listSlides = Object.fromEntries(list.map(([e, t, msg, when], i) => [`08${'bcdef'[i]}-parents-${i + 1}`, page(`<div class="pg">${i + 2} / 6</div>
    <div style="position:absolute;left:90px;right:90px;top:260px"><div class="lbl">Reminder ${i + 1} of 5</div><h1>${e} ${t}</h1></div>
    <div class="chat" style="position:absolute;left:90px;right:90px;top:560px"><div class="top">${LOGO} I'm OK</div>
      <div class="b" style="font-size:24px;color:#6F5E52;background:transparent;padding:0 6px 16px">On Mum's WhatsApp</div>
      ${remind(msg)}
    </div>
    <div style="position:absolute;left:90px;top:1010px"><span class="done">🗓️ ${when}</span></div>`)]));

  return {
    // Mon 12:00 (pin): who it's for
    '01-who': page(`${heading(250, `Who it's <span class="grad">for</span>`)}
    <div style="position:absolute;left:90px;right:90px;top:420px;display:grid;gap:28px">
    ${[['💛', 'For your family', 'Tablets and appointments for Mum and Dad, near or far.'],
       ['🏠', 'For each other', 'Partners, flatmates, siblings: bins, rent, the dog.'],
       ['🌙', 'For people living alone', 'The daily I\'m OK: one tap says all is well.']]
      .map(([e, t, d]) => `<div class="card"><span style="font-size:60px">${e}</span><div><div class="t">${t}</div><div class="d">${d}</div></div></div>`).join('')}
    <p class="sub" style="margin-top:16px;font-size:34px">Reminders on WhatsApp. They tap Done. You see it's done.</p>
    </div>`),

    // Mon 12:10 (pin): how it works carousel
    '02a-setup': page(`<div class="pg">1 / 3</div>${heading(240, `Set it up in <span class="grad">one chat.</span>`)}
    ${chat(400, `<div class="b">Who should I remind? 💛</div>
      <div class="b me" style="margin-top:14px">Mum</div>
      <div class="b" style="margin-top:14px">What should the reminder say?</div>
      <div class="b me" style="margin-top:14px">Take your tablet 💊</div>
      <div class="b" style="margin-top:14px">And when?</div>
      <div class="b me" style="margin-top:14px">Every day at 9am</div>`)}`),
    '02b-done': page(`<div class="pg">2 / 3</div>${heading(250, `They tap <span class="grad">Done</span><br>on WhatsApp.`)}
    ${chat(580, `${remind('Take your tablet 💊', 'Emily')}
      <div class="b me">Done ✅</div>`)}
    <p class="sub" style="position:absolute;left:90px;right:90px;top:1100px;font-size:32px">No app to download. Mum says yes once, with one tap.</p>`),
    '02c-seen': page(`<div class="pg">3 / 3</div>${heading(250, `You see it's <span class="grad">done.</span>`)}
    <div style="position:absolute;left:90px;right:90px;top:500px;display:grid;gap:26px">
      <div class="card"><span style="font-size:56px">✅</span><div><div class="t">Mum took her tablet</div><div class="d">Done at 9:05am</div></div></div>
      <div class="card"><span style="font-size:56px">⚠️</span><div><div class="t">Not done?</div><div class="d">If Mum doesn't tap Done, I'm OK lets you know.</div></div></div>
    </div>
    <p class="sub" style="position:absolute;left:90px;right:90px;top:960px">Once, every day, some days, every month or every year.</p>`),

    // Mon 12:20 (pin): welcome
    '03-welcome': page(`<div style="position:absolute;left:90px;right:90px;top:230px">
      <p class="it" style="font-size:60px"><span class="qm">“</span>Remind your loved ones about important things. Straight from <span style="white-space:nowrap">WhatsApp.<span class="qm" style="vertical-align:-.42em;margin-left:8px">”</span></span></p></div>
    ${chat(560, `${remind('Take your tablet 💊', 'Emily')}<div class="b me">Done ✅</div>`, 'right:200px')}
    <div style="position:absolute;right:90px;top:1070px"><span class="done">✅ Mum took her tablet at 9:05am</span></div>`),

    // Tue 18:00: missed one
    '04-missed': page(`${heading(250, `Missed one?<br>You'll <span class="grad">know.</span>`)}
    ${chat(560, `<div class="b">⚠️ <b>John hasn't tapped Done yet</b> for “Take your tablet 💊”.<div class="small">It was due at 9am.</div></div>`)}
    <p class="sub" style="position:absolute;left:90px;right:90px;top:940px">When it's done, it's done. You only hear from I'm OK when it matters.</p>`),

    // Wed 18:00: alarm chaos meme
    '05-alarms': page(`${heading(230, `My phone alarms,<br>a <span class="grad">tragedy.</span>`)}
    <div style="position:absolute;left:90px;right:90px;top:480px;background:#1C1C1E;border-radius:44px;padding:20px 40px;box-shadow:0 40px 80px rgba(40,20,10,.25)">
      ${[['07:00', 'IMPORTANT'], ['07:05', 'IMPORTANT 2'], ['07:10', 'ACTUALLY IMPORTANT'], ['08:55', 'Mum tablets??']]
        .map(([t, l], i) => `<div style="display:flex;justify-content:space-between;align-items:center;padding:10px 0;${i ? 'border-top:2px solid #333' : ''}"><div><div style="font:500 48px/1.15 I;color:#fff;letter-spacing:-.02em">${t}</div><div style="font:500 28px I;color:#9a9a9f">${l}</div></div><div style="width:96px;height:58px;border-radius:999px;background:#34C759;position:relative"><div style="position:absolute;right:4px;top:4px;width:50px;height:50px;border-radius:50%;background:#fff"></div></div></div>`).join('')}
    </div>
    <p class="sub" style="position:absolute;left:90px;right:90px;top:1010px;font-size:34px">Alarms only remind <b>you</b>. I'm OK reminds Mum, and shows you when she's done.</p>`),

    // Thu 18:00: bins, two panels
    '06-bins': page(`${heading(200, `Bin day, <span class="grad">two ways.</span>`)}
    <div style="position:absolute;left:90px;right:90px;top:360px">
      <div class="lbl">Before</div>
      <div class="chat" style="padding:20px 26px;display:grid;gap:8px">
        ${['Did you put the bins out?', 'Did you put the bins out??', 'SAM. The bins.', 'I can hear the lorry 🚛'].map((m) => `<div class="b me" style="margin:0 0 0 auto;max-width:560px;padding:10px 22px;font-size:28px">${m}</div>`).join('')}
      </div>
      <div class="lbl" style="margin-top:28px">After</div>
      <div class="chat" style="padding:20px 26px"><div class="top" style="padding-bottom:12px">${LOGO} I'm OK</div>
        <div class="b" style="padding:18px 24px"><b>Bins out tonight 🗑️</b><div class="acts" style="margin:16px -24px -18px"><div style="padding:12px 0">Done ✅</div></div></div>
      </div>
      <div style="margin-top:20px"><span class="done">✅ Sam put the bins out at 7:42pm</span></div>
    </div>`),

    // Fri 18:00: daily I'm OK
    '07-daily': page(`${heading(240, `Living alone?<br>One tap <span class="grad">a day.</span>`)}
    ${chat(520, `<div class="b">Evening John 🌙 Your daily I'm OK. All well today?<div class="acts"><div>I'm OK ✅</div></div></div>
      <div class="b me">I'm OK ✅</div>`)}
    <p class="sub" style="position:absolute;left:90px;right:90px;top:990px;font-size:34px">One tap says all is well. If John goes quiet, Emily is told.</p>`),

    // Sat 10:00: useful list carousel
    '08a-parents-cover': page(`<div class="pg">1 / 6</div>
    <div style="position:absolute;left:90px;right:90px;top:330px"><div class="lbl">Save this 📌</div>
      <h1 style="font-size:100px">5 reminders worth setting for your <span class="grad">parents</span></h1>
      <p class="sub" style="margin-top:40px">They get it on WhatsApp and tap Done. You see it's done.</p>
      <p class="sub" style="margin-top:40px;font-weight:600;color:#2B1D14">Swipe 👉</p></div>`),
    ...listSlides,

    // Sun 10:00: safety word explainer
    '09-safety-word': page(`${heading(220, `What's a <span class="grad">safety word?</span>`)}
    <div style="position:absolute;left:90px;right:90px;top:470px;display:grid;gap:20px">
      ${[['Pick one secret word', 'A word only you know.'],
         ['Send it to I\'m OK on WhatsApp', 'Walking home late, a bad date, any time you feel unsafe.'],
         ['Your people know you need them', "They're alerted at once, with your number and, if you like, where you are."]]
        .map(([t, d], i) => `<div class="card"><span class="num">${i + 1}</span><div><div class="t">${t}</div><div class="d">${d}</div></div></div>`).join('')}
      <div style="margin-top:4px"><span class="done">💛 Free for everyone</span></div>
    </div>`),
  };
};

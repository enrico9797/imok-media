module.exports = ({ LOGO, foot }) => {
  // 22, 28, 29 and 31 Oct: chat-screenshot versions of the comic and Halloween slots
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
  const bubble = (who, text, x, y, w, green = false) => `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px"><div class="cap">${who}</div><div class="b${green ? ' me' : ''}" style="margin:0;${green ? '' : ''}">${text}</div></div>`;
  const slide = (n, lbl, title, scary, relief) => page(`<div class="pg">${n} / 7</div>
    <div style="position:absolute;left:90px;right:90px;top:250px"><div class="lbl">${lbl}</div><h1>${title}</h1><p class="sub" style="margin-top:22px">${scary}</p></div>
    ${relief}`);
  return {
    // Thu 22 Oct 18:00 · Looking after family: Mum vs the 9am tablet
    '01-iknow': page(`${heading(200, `"I know,<br>I <span class="grad">know.</span>"`, 'Mum, every morning at 9.')}
    ${chat(470, `<div class="cap">On Mum's WhatsApp</div>${remind('Take your tablets 💊', 'Emily')}<div class="b me">Done ✅</div>`, 'right:170px')}
    ${myPage(990, [['Mum: Take your tablets', 'Done at 9:04am']])}`),
    // Wed 28 Oct 18:00 · How it works: Dad and the Done button
    '02-dadwins': page(`${heading(200, `Dad's new hobby:<br>beating the <span class="grad">reminder.</span>`)}
    ${chat(470, `<div class="cap">On Dad's WhatsApp · 9:00am</div>${remind('Water the tomatoes 🍅', 'Emily')}<div class="b me">Done ✅ 🏆</div>`, 'right:170px')}
    ${myPage(990, [['Dad: Water the tomatoes', 'Done at 9:00am, again']], "Emily's page · London")}`),
    // Thu 29 Oct 18:00 · Seasonal lead-up (funny): the bin lorry
    '03-binlorry': page(`${heading(200, `The scariest sound this week? <span class="grad">The bin lorry.</span>`)}
    <div style="position:absolute;left:90px;right:90px;top:560px;display:grid;grid-template-columns:1fr 1fr;gap:30px">
      <div class="pagec" style="text-align:center;padding:50px 30px"><div style="font:600 30px I;color:#6F5E52">6:02am</div><div style="font-size:140px;margin:20px 0">🚛</div><div style="font:600 34px I">Rumble rumble.<br>Bins still in.</div></div>
      <div class="chat" style="padding:26px"><div class="top" style="font-size:26px;padding-bottom:16px">${LOGO} I'm OK</div><div class="cap" style="font-size:22px">The night before, 7pm</div><div class="b" style="font-size:28px">⏰ Reminder from Emily<br><br><b>Bins out tonight 🗑️</b><div class="acts"><div>Done ✅</div></div></div><div class="b me" style="margin:14px 0 0 60px;font-size:28px">Done ✅</div></div>
    </div>
    <p class="sub" style="position:absolute;left:90px;right:90px;top:1130px">One reminder the night before. Sleep through the lorry.</p>`),
    // Sat 31 Oct 10:00 · Happy Halloween: "What's really scary" carousel
    '04a-scary-cover': page(`<div class="pg">1 / 7</div>${heading(330, `Forget ghosts.<br>This is what's <span class="grad">really scary.</span> 🎃`, 'Swipe, if you dare 👉')}`),
    '04b-scary-parents': slide(2, 'Looking after Mum', 'Did Mum take her tablets?', 'The 9am guessing game. 👻', myPage(760, [['Mum: Take your tablets', 'Done at 9:05am']])),
    '04c-scary-flatmates': slide(3, 'Flatmates', 'Rent day. Nobody says a word.', 'The group chat goes silent. 🦇', myPage(760, [['Sam: Pay your share of the rent', 'Done at 9:12am']], "Emily's page · The 1st")),
    '04d-scary-teens': slide(4, 'Teenagers', 'Seen at 11:42pm. No reply.', 'Is he home yet? 🕸️', myPage(760, [['Sam: Text me when you\'re home', 'Done at 11:47pm']], "Emily's page · Tonight")),
    '04e-scary-alone': slide(5, 'Living alone', 'A quiet week, and nobody asks.', 'Not this year. 🕯️', chat(760, `<div class="b">Evening John 🌙 Your daily I'm OK. All well today?<div class="acts"><div>I'm OK ✅</div></div></div><div class="b me">I'm OK ✅</div>`)),
    '04f-scary-safety': slide(6, 'Walking home', 'The long way home in the dark.', 'One secret word changes that. 🌙', chat(680, `<div class="b me" style="margin:0 0 0 200px">pumpkin</div><div class="b" style="margin-top:18px">👍<div class="acts"><div>📍 Send location</div></div></div>`) + `<p class="small" style="position:absolute;left:90px;right:90px;top:1110px">Your people are alerted at once. Not an emergency service: for emergencies, call 999.</p>`),
    '04g-scary-end': page(`<div class="pg">7 / 7</div>${heading(330, `Nothing scary about<br><span class="grad">"Done."</span> ✅`, 'Reminders for the people you love, straight from WhatsApp. They tap Done, you know it\'s done.')}`),
  };
};

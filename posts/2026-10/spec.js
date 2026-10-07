module.exports = ({ LOGO, foot }) => ({
  '01-welcome': `<div style="position:absolute;left:90px;right:90px;top:300px">
    <p class="it" style="font-size:70px"><span class="qm">“</span>A daily sign of life<br>from the <span style="white-space:nowrap">people you love<span class="qm" style="vertical-align:-.42em;margin-left:8px">”</span></span></p></div>
    <div style="position:absolute;left:0;right:0;top:680px;display:flex;flex-direction:column;align-items:flex-end;padding:0 90px;gap:22px">
      <div class="b" style="align-self:flex-start;max-width:620px;box-shadow:0 24px 60px rgba(120,70,30,.12)">Good morning Mum ☀️ How are you today?</div>
      <div class="b me" style="margin:0;font-size:46px;padding:26px 40px;box-shadow:0 24px 60px rgba(31,168,85,.18)">I'm OK ✅</div>
      <div style="align-self:flex-start;display:flex;align-items:center;gap:14px;font:600 30px I;color:#1FA855;background:#fff;border-radius:999px;padding:16px 26px;box-shadow:0 20px 50px rgba(120,70,30,.08)">💛 Emily and Sam know you're OK today</div>
    </div>${foot}`,
  '02a-setup': `<div style="position:absolute;left:90px;right:90px;top:250px"><h1>Set up in<br><span class="grad">one chat.</span></h1></div>
    <div class="chat" style="position:absolute;left:90px;right:90px;top:560px"><div class="top">${LOGO} I'm OK</div>
    <div class="b">Who should be in your circle? 💛 They only hear from me if you miss your daily check-in.</div>
    <div class="b me" style="display:flex;align-items:center;gap:20px"><span style="width:64px;height:64px;border-radius:50%;background:#FF7A45;color:#fff;display:grid;place-items:center;font:700 32px Fraunces,serif">E</span><span>Emily<br><span style="font-size:24px;color:#4c7a5c">Contact card</span></span></div>
    <div class="b" style="margin-top:18px">✅ Almost done! I'll check in with you every day at <b>8pm</b> 💛</div></div>${foot}`,
  '02b-daily': `<div style="position:absolute;left:90px;right:90px;top:250px"><h1>One tap a day<br>says <span class="grad">I'm OK.</span></h1></div>
    <div class="chat" style="position:absolute;left:90px;right:90px;top:560px"><div class="top">${LOGO} I'm OK</div>
    <div class="b">Good evening John 🌙 How are you today? Tap below to let Emily know you're okay.<div class="acts"><div>I'm OK ✅</div><div>I need something</div></div></div>
    <div class="b me">I'm OK ✅</div></div>${foot}`,
  '03-missed': `<div style="position:absolute;left:90px;right:90px;top:250px"><h1>If you miss it,<br>your circle <span class="grad">knows.</span></h1></div>
    <div class="chat" style="position:absolute;left:90px;right:90px;top:560px"><div class="top">${LOGO} I'm OK</div>
    <div class="b">⚠️ John hasn't checked in today. His check-in was due at 8pm.<br><br>Give him a call to make sure he's OK.<div class="acts"><div>📞 Call John</div></div></div></div>${foot}`,
  '04-who': `<div style="position:absolute;left:90px;right:90px;top:250px"><h1>Who it's <span class="grad">for</span></h1>
    <div style="margin-top:70px;display:grid;gap:28px">
    ${[['💛', 'For the people you love', 'A parent, a child living away, a friend far away.'], ['🏠', 'For people living alone', 'Someone will notice if you go quiet.'], ['🤝', 'For each other', 'Partners, friends, siblings. One tap a day.']]
      .map(([e, t, d]) => `<div style="background:#fff;border-radius:32px;padding:34px 38px;display:flex;gap:28px;align-items:center;box-shadow:0 20px 50px rgba(120,70,30,.08)"><span style="font-size:60px">${e}</span><div><div style="font:600 40px I">${t}</div><div style="font:500 32px/1.4 I;color:#6F5E52;margin-top:6px">${d}</div></div></div>`).join('')}
    </div></div>${foot}`,
});

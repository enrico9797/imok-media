module.exports = {
  'help-ageing-parent-remember': { kicker: 'Looking after parents', title: 'Helping parents remember',
    chat: [{ text: '⏰ Reminder from Emily\n\nTake your morning tablets 💊', acts: ['Done ✅'] }, { from: 'me', text: 'Done ✅' }] },
  'whatsapp-reminders': { kicker: 'Reminders that get done', title: 'Reminders on WhatsApp',
    chat: [{ text: '⏰ Reminder from Sam\n\nBins go out tonight 🗑️', acts: ['Done ✅'] }, { text: '✅ John put the bins out at 7:42pm' }] },
  'living-alone-safely': { kicker: 'Living alone and staying safe', title: 'Living alone, safely',
    chat: [{ text: 'Good morning John ☀️ How are you today? Tap below to let Emily know you\'re okay.', acts: ["I'm OK ✅"] }, { from: 'me', text: "I'm OK ✅" }] },
};

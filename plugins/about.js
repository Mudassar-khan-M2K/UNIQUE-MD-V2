const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
    pattern: "about",
    react: "👑",
    desc: "Get bot owner description and information.",
    category: "main",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let aboutInfo = `
🌟 *About the Bot and Developer* 🌟

---

👤 *Hello, ${pushname}!*

I am *Unique MD Bot*, a WhatsApp bot designed to help you with a variety of tasks. 

---

🧑‍💻 *Developer Information:*
- *Name:* Mr. Wasi
- *Age:* 19
- *Location:* Azad Jammu and Kashmir (AJK)
- *Field of Study:* Software Engineering Student
- *Skills:* Self-taught Developer with expertise in JavaScript, Node.js, and Bot Development

---

🚀 *About the Bot:*
- *Bot Name:* Unique MD Bot
- *Purpose:* This bot is an open-source project, developed for educational purposes, to enhance learning and provide a user-friendly experience with WhatsApp automation.
- *Features:* It offers a variety of commands for entertainment, utility, and educational purposes, such as downloading media, converting files, and more!

---

🎓 *My Mission:*  
The goal is to help people learn by creating open-source tools, and to provide educational resources through this bot. This project serves as a hands-on learning experience for me as a Software Engineering student.

---

🛠 *Bot Development & Open-Source:*
- The bot is built using Node.js and designed to be easily customizable. It can be expanded for various use cases like educational purposes, entertainment, and personal automation.

---

🔗 *Connect with Me:*
- *GitHub*: [Visit My GitHub](https://github.com/SILENTLOVER40/SILENT-SOBX-MD)
- *Twitter*: [@UniqueMD_Bot](https://twitter.com/UniqueMD_Bot)

---

💡 *Thank you for using Unique MD Bot!*  
I hope this bot helps you learn, explore, and make your experience smoother. Your feedback is always appreciated!

> *Powered by Mr. Wasi, Software Engineering Student*
`;

        await conn.sendMessage(from, { image: { url: config.ALIVE_IMG }, caption: aboutInfo }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

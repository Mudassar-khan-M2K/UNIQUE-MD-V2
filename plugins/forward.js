const { cmd } = require('../command');

cmd({
    pattern: "forward",
    desc: "Forwards any message (text, image, video, audio, etc.) to a specified JID.",
    react: "🔁",
    category: "main",
    filename: __filename,
}, async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Ensure the user has provided a target JID (user or group)
        const targetJid = args[0];
        if (!targetJid) return reply("❌ Please provide the JID (user or group) to forward the message to.");

        // Check if the message is quoted (i.e., replying to a message)
        const quotedMessage = quoted ? quoted : m;
        
        // Forward the message to the specified JID
        await conn.forwardMessage(targetJid, quotedMessage, { quoted: mek });

        reply(`✅ Message forwarded to: ${targetJid}`);
    } catch (e) {
        console.error('Error forwarding message:', e);
        reply('❌ An error occurred while trying to forward the message.');
    }
});

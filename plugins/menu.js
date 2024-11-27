const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const fs = require('fs');
const path = require('path');

cmd({
    pattern: "menu",
    react: "🛸",
    alias: ["panel", "commands"],
    desc: "Get bot's command list.",
    category: "main",
    use: '.menu',
    filename: __filename
}, async (conn, mek, m, { from, l, quoted, body, isCmd, umarmd, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {

    try {
        // Function to get a random image from assets
        const getRandomImage = () => {
            const assetsPath = path.join(__dirname, '../assets'); // Path to the assets folder
            const images = fs.readdirSync(assetsPath).filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file)); // Filter image files
            if (images.length === 0) {
                throw new Error("No images found in assets folder!");
            }
            const randomIndex = Math.floor(Math.random() * images.length);
            return path.join(assetsPath, images[randomIndex]); // Return full path of the random image
        };

        // Function to get the voice file
        const getMenuVoice = () => {
            const voicePath = path.join(__dirname, '../assets/menu.mp3'); // Path to the voice file
            if (!fs.existsSync(voicePath)) {
                throw new Error("Menu voice file not found in assets folder!");
            }
            return voicePath;
        };

        // Get a random image
        const randomImage = getRandomImage();
        const menuVoice = getMenuVoice();

        const madeMenu = `
*👾 Hello ${pushname}! Welcome to the Unique MD WhatsApp Bot!*

*⚡ Here are the available commands:*

*💻 Bot Information:*
- *Bot Name*: ${config.BOT_NAME}
- *Bot Uptime*: ${runtime(process.uptime())}
- *Memory Usage*: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
- *Mode*: ${config.MODE}

======================================
*📡 General Commands:*
- *.gpt <text>* - Chat with GPT.
- *.ai <text>* - Get AI responses.
- *.weather <city>* - Get weather updates for any city.
- *.quote* - Get a random quote.
- *.joke* - Receive a joke.

======================================
*🌐 Media Commands:*
- *.yt <url>* - Download YouTube videos.
- *.img <query>* - Search for images.
- *.video <url>* - Download video content.
- *.song <query>* - Search for songs.
- *.play <url>* - Play media from URL.
- *.apk <name>* - Get APK download link.

======================================
*🛠 Admin Commands:*
- *.add <number>* - Add a user to the group.
- *.kick <number>* - Kick a user from the group.
- *.mute* - Mute the group chat.
- *.unmute* - Unmute the group chat.
- *.block <number>* - Block a user.
- *.unblock <number>* - Unblock a user.

======================================
*⚙️ System Commands:*
- *.status* - Check the bot's current status.
- *.system* - View system info of the bot.
- *.restart* - Restart the bot.
- *.shutdown* - Shut down the bot.
- *.clearChats* - Clear chat history.

======================================
*🔗 Useful Links:*
- *GitHub Repository*: [Click Here](https://github.com/your-bot-repo)
- *Support Group*: [Join Here](https://chat.whatsapp.com/yourgroup)

======================================
*🛠 Developer Commands:*
- *.repo* - Get bot's source code link.
- *.owner* - Contact the bot's owner.

======================================
*📅 Updates:*
- Use *.updatecmd* to check for updates.

======================================
*🚀 Enjoy using Unique MD!*
`;

        // Send the menu with the random image
        const imageBuffer = fs.readFileSync(randomImage); // Read the random image file
        await conn.sendMessage(from, { image: imageBuffer, caption: madeMenu }, { quoted: mek });

        // Send the menu voice file
        const voiceBuffer = fs.readFileSync(menuVoice); // Read the voice file
        await conn.sendMessage(from, { audio: voiceBuffer, mimetype: 'audio/mpeg', ptt: true }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`Error: ${e.message}`);
    }
});

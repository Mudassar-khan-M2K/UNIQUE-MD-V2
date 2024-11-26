// Importing file system module and dotenv configuration for environment variables
const fs = require('fs');
// Load environment variables from config.env if it exists
if (fs.existsSync('config.env')) require('dotenv').config({ path: './config.env' });

// Helper function to convert strings to boolean
function convertToBool(text, fault = 'true') {
    return text === fault ? true : false;
}

// Exporting configuration module
module.exports = {
    // Session ID for the bot
    SESSION_ID: process.env.SESSION_ID || "enter your session", 
    
    // Automatic status read (default is false)
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "false",

    // Bot mode: public or private (default is false)
    MODE: process.env.MODE || "private",

    // Automatically convert voice messages to text (default is false)
    AUTO_VOICE: process.env.AUTO_VOICE || "false",

    // Automatically convert images to stickers (default is false)
    AUTO_STICKER: process.env.AUTO_STICKER || "false",

    // Enable automatic replies (default is false)
    AUTO_REPLY: process.env.AUTO_REPLY || "false",

    // Alive image URL (still included but not active)
    ALIVE_IMG: process.env.ALIVE_IMG || "https://telegra.ph/file/2a06381b260c3f096a612.jpg",

    // Alive message displayed when the bot is online
    ALIVE_MSG: process.env.ALIVE_MSG || "HII DEAR IM ONLINE I'M WASI'S WHATSAPP BOT 😊♻️",

    // Anti-link protection (default is false)
    ANTI_LINK: process.env.ANTI_LINK || "false",

    // Anti-bad-word filter (default is false)
    ANTI_BAD: process.env.ANTI_BAD || "false",

    // Prefix for bot commands (default is ".")
    PREFIX: process.env.PREFIX || ".",

    // Fake recording indicator (default is false)
    FAKE_RECORDING: process.env.FAKE_RECORDING || "false",

    // Automatic reactions to messages (default is false)
    AUTO_REACT: process.env.AUTO_REACT || "false",

    // Heart reactions specifically (default is false)
    HEART_REACT: process.env.HEART_REACT || "false",

    // Special reactions for owner messages (default is false)
    OWNER_REACT: process.env.OWNER_REACT || "false",

    // Bot's display name
    BOT_NAME: process.env.BOT_NAME || "➺Wasi Bot࿐",

    // OMDB API key for movie-related features (still included, required for functionality)
    OMDB_API_KEY: process.env.OMDB_API_KEY || "76cb7f39", // omdbapi.com
};

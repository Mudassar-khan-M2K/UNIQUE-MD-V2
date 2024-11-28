const { cmd } = require('../command');
const axios = require('axios');
const { Buffer } = require('buffer');

const GOOGLE_API_KEY = 'AIzaSyDebFT-uY_f82_An6bnE9WvVcgVbzwDKgU'; // Replace with your Google API key
const GOOGLE_CX = '45b94c5cef39940d1'; // Replace with your Google Custom Search Engine ID

cmd({
    pattern: "image",
    alias: ["imgsearch", "gimg"],
    desc: "Search for images using Google and send them directly.",
    react: "🖼️",
    category: "media",
    filename: __filename
},
async (conn, mek, m, { from, quoted, q, reply }) => {
    try {
        if (!q) return reply("❗ *Please provide a search query to fetch images.*");

        reply("🔍 *Searching for images... Please wait.*");

        // Google Image Search API Request
        const searchQuery = encodeURIComponent(q);
        const url = `https://www.googleapis.com/customsearch/v1?q=${searchQuery}&cx=${GOOGLE_CX}&key=${GOOGLE_API_KEY}&searchType=image&num=5`;
        
        const response = await axios.get(url);
        const data = response.data;

        if (!data.items || data.items.length === 0) {
            return reply("❌ *No images found. Please try a different query.*");
        }

        // Prepare buttons for navigation
        const buttons = data.items.map((item, index) => ({
            buttonId: `image_${index}`,
            buttonText: { displayText: `📸 Image ${index + 1}` },
            type: 1
        }));

        await conn.sendMessage(from, {
            text: `📸 *Found ${data.items.length} images for your search!*\n\nClick a button below to view them.`,
            footer: "🤖 Unique MD Bot | Image Search",
            buttons,
            headerType: 1
        });

        // Handle button responses
        const handleImage = async (buttonId) => {
            const index = parseInt(buttonId.split('_')[1]);
            if (!isNaN(index) && data.items[index]) {
                const imageUrl = data.items[index].link;
                const imageResponse = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                const buffer = Buffer.from(imageResponse.data, 'binary');

                await conn.sendMessage(from, {
                    image: buffer,
                    caption: `💗 *Image ${index + 1} of your search!*\n> 🎨 _Unique MD Image Search Powered by Google_ 🌐`,
                    footer: "🖼️ Enjoy your images!"
                }, { quoted: mek });
            } else {
                reply("⚠️ *Invalid image selection!*");
            }
        };

        // Listen for button clicks
        conn.on('chat-update', async (update) => {
            const buttonData = update.message?.buttonsResponseMessage?.selectedButtonId;
            if (buttonData?.startsWith("image_")) {
                await handleImage(buttonData);
            }
        });

    } catch (e) {
        console.error("Error fetching images:", e);
        reply(`❌ *An error occurred:* ${e.message}`);
    }
});

import TelegramBot from "node-telegram-bot-api";
import User from "./model/user.js";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
if (!process.env.BOT_TOKEN) {
    throw new Error("BOT_TOKEN environment variable is required");
}
const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });
// --- Commands ---
bot.onText(/\/start/, async (msg) => {
    try {
        const chatId = msg.chat.id.toString();
        let user = await User.findOne({ chatId });
        if (!user) {
            user = new User({ chatId });
            await user.save();
        }
        await bot.sendMessage(chatId, "👋 Welcome! You'll get jokes every 1 min.\n\nCommands:\nENABLE - Turn jokes on\nDISABLE - Turn jokes off\n/set <minutes> - Set frequency");
    }
    catch (error) {
        console.error("Error in /start command:", error);
    }
});
bot.onText(/ENABLE/i, async (msg) => {
    const chatId = msg.chat.id.toString();
    await User.findOneAndUpdate({ chatId }, { isEnabled: true });
    await bot.sendMessage(chatId, "✅ Jokes enabled!");
});
bot.onText(/DISABLE/i, async (msg) => {
    const chatId = msg.chat.id.toString();
    await User.findOneAndUpdate({ chatId }, { isEnabled: false });
    await bot.sendMessage(chatId, "❌ Jokes disabled!");
});
bot.onText(/\/set (\d+)/, async (msg, match) => {
    const chatId = msg.chat.id.toString();
    const freq = parseInt(match?.[1] || "1", 10);
    await User.findOneAndUpdate({ chatId }, { frequency: freq });
    await bot.sendMessage(chatId, `⏰ Frequency set to ${freq} min(s).`);
});
// --- Joke Scheduler ---
setInterval(async () => {
    try {
        const users = await User.find({ isEnabled: true });
        for (let user of users) {
            const now = new Date();
            if (!user.lastSentAt ||
                now.getTime() - user.lastSentAt.getTime() >=
                    user.frequency * 60 * 1000) {
                try {
                    const jokeApiUrl = process.env.JOKE_API_URL ||
                        "https://official-joke-api.appspot.com/random_joke";
                    const res = await axios.get(jokeApiUrl);
                    const joke = `${res.data.setup}\n\n${res.data.punchline}`;
                    await bot.sendMessage(user.chatId, joke);
                    user.lastSentAt = now;
                    await user.save();
                }
                catch (err) {
                    console.error(`Joke fetch error for user ${user.chatId}:`, err.message);
                }
            }
        }
    }
    catch (error) {
        console.error("Error in joke scheduler:", error);
    }
}, parseInt(process.env.POLLING_INTERVAL || "30000"));
console.log("🤖 Telegram Bot started...");
//# sourceMappingURL=bot.js.map
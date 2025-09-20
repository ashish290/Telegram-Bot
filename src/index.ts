import express from "express";
import dotenv from "dotenv";
import "./bot.js"; // Import bot so it runs
import { connectDB } from "./config/db.js";

dotenv.config();

const StartServer = async () => {
  try {
    const app = express();
    const PORT = process.env.PORT || 3000;

    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      res.send("Telegram Joke Bot is Running");
    });

    await connectDB();

    app.listen(PORT, () =>
      console.log(`🌍 Server running on http://localhost:${PORT}`)
    );
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

StartServer();

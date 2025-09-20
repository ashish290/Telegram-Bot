# Telegram Joke Bot

A Telegram bot that sends jokes to users at configurable intervals.

## Features

- 🤖 Telegram bot integration
- 📊 MongoDB database for user management
- ⏰ Configurable joke frequency
- 🎯 User-specific settings (enable/disable, frequency)
- 🔄 Automatic joke fetching from API
- 🛡️ Comprehensive error handling

## Setup

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
# Telegram Bot Configuration
TELEGRAM_TOKEN=your_telegram_bot_token_here

# MongoDB Configuration
MONGO_URI=mongodb://localhost:27017/telegram-joke-bot

# Server Configuration
PORT=3000

# Joke API Configuration
JOKE_API_URL=https://official-joke-api.appspot.com/random_joke

# Bot Settings
POLLING_INTERVAL=30000
DEFAULT_FREQUENCY=1
```

### 2. Get Telegram Bot Token

1. Message [@BotFather](https://t.me/botfather) on Telegram
2. Use `/newbot` command
3. Follow instructions to create your bot
4. Copy the token to your `.env` file

### 3. Install Dependencies

```bash
npm install
```

### 4. Run the Bot

**Development:**

```bash
npm run dev
```

**Production:**

```bash
npm run build
npm start
```

## Bot Commands

- `/start` - Start the bot and register user
- `ENABLE` - Enable joke notifications
- `DISABLE` - Disable joke notifications
- `/set <minutes>` - Set joke frequency (e.g., `/set 5` for 5 minutes)

## API Endpoints

- `GET /` - Health check endpoint

## Environment Variables

| Variable            | Description                      | Default                       |
| ------------------- | -------------------------------- | ----------------------------- |
| `TELEGRAM_TOKEN`    | Your Telegram bot token          | Required                      |
| `MONGO_URI`         | MongoDB connection string        | Required                      |
| `PORT`              | Server port                      | 3000                          |
| `JOKE_API_URL`      | Joke API endpoint                | official-joke-api.appspot.com |
| `POLLING_INTERVAL`  | Bot polling interval (ms)        | 30000                         |
| `DEFAULT_FREQUENCY` | Default joke frequency (minutes) | 1                             |

## Database Schema

### User Model

```typescript
{
  chatId: string; // Telegram chat ID
  isEnabled: boolean; // Whether jokes are enabled
  frequency: number; // Joke frequency in minutes
  lastSentAt: Date; // Last joke sent timestamp
}
```

## Error Handling

The bot includes comprehensive error handling:

- Database connection errors
- API fetch failures
- Individual user error isolation
- Graceful degradation

## Development

The project uses:

- TypeScript
- Express.js
- MongoDB with Mongoose
- node-telegram-bot-api
- Axios for HTTP requests

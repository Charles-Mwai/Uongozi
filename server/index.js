import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';
import { buildMessages, extractArticle } from '../shared/chatConfig.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;
    console.log(`\nChat Request: "${message ? message.substring(0, 50) : ''}${message && message.length > 50 ? '...' : ''}"`);

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OpenAI API Key is not configured' });
    }

    const messages = buildMessages(message, history);

    try {
        console.log('Calling OpenAI...');
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            temperature: 0.7,
            max_tokens: 1024,
        });

        const botMessage = completion.choices[0].message.content;
        console.log('OpenAI success');

        res.json({
            answer: botMessage,
            article: extractArticle(botMessage),
        });

    } catch (error) {
        console.error('OpenAI API Error:', error.message);
        res.status(500).json({
            error: 'Failed to get response from Katiba AI',
            details: error.message
        });
    }
});

const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`ERROR: Port ${PORT} is already in use by another process.`);
        console.error(`Please stop the other server running in your terminal and try again.`);
        process.exit(1);
    } else {
        console.error('Server error:', error);
        process.exit(1);
    }
});

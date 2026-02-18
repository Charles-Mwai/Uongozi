import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import OpenAI from 'openai';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Katiba AI, a friendly legal expert on the Constitution of Kenya 2010. Your goal is to explain the Constitution in simple, clear, and concise language for Kenyan citizens.

Rules:
1. Speak in plain, friendly language. Avoid legal jargon.
2. You can respond in both English and Kiswahili.
3. Always base your answers on the Constitution of Kenya 2010.
4. If a question is outside the scope of the Kenyan Constitution, politely redirect the user.
5. Always cite the specific Article number(s) naturally within your response.

📋 FORMATTING RULES:
- Use a numbered list (1., 2., 3.). Each number MUST start on a NEW line.
- Use double line breaks between numbered items to ensure they stay separated.
- Keep points short and focused (1-2 sentences per point).
- Do NOT use labels like "Answer:" or "Article Reference:".
- STYLING: Do NOT use markdown bolding (asterisks like **). Use plain text ONLY.
- End with a friendly closing sentence and the article cite at the very bottom.`;

const extractArticle = (text) => {
    if (!text || typeof text !== 'string') return null;
    if (text.includes('Article')) {
        const match = text.match(/Article\s+(\d+[A-Z]?)/i);
        if (match) {
            return match[0];
        }
    }
    return null;
};

app.post('/api/chat', async (req, res) => {
    const { message, history } = req.body;
    console.log(`\nChat Request: "${message ? message.substring(0, 50) : ''}${message && message.length > 50 ? '...' : ''}"`);

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OpenAI API Key is not configured' });
    }

    const messages = [
        { role: 'system', content: SYSTEM_PROMPT },
        ...(history || []).map((msg) => ({
            role: msg.type === 'bot' ? 'assistant' : 'user',
            content: msg.text || '',
        })),
        { role: 'user', content: message || '' },
    ];

    try {
        console.log('Calling OpenAI...');
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini", // Using gpt-4o-mini for fast/cheap responses
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

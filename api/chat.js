import OpenAI from 'openai';
import { buildMessages, extractArticle } from '../shared/chatConfig.js';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, history } = req.body;

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OpenAI API Key is not configured' });
    }

    const messages = buildMessages(message, history);

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: messages,
            temperature: 0.7,
            max_tokens: 1024,
        });

        const botMessage = completion.choices[0].message.content;

        res.status(200).json({
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
}

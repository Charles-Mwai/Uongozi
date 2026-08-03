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

app.post('/api/quiz/generate', async (req, res) => {
    const { category, lang = 'en', count = 5 } = req.body;
    console.log(`\nAI Quiz Generation Request for category "${category}", lang "${lang}"`);

    if (!process.env.OPENAI_API_KEY) {
        return res.status(500).json({ error: 'OpenAI API Key is not configured' });
    }

    const prompt = `You are Katiba AI, an expert on the Constitution of Kenya 2010.
Generate exactly ${count} multiple-choice quiz questions based strictly on the text of the Constitution of Kenya 2010 for the category "${category}".
Return a raw JSON object with a single key "questions" which is an array of question objects.
Each question object MUST have:
- "q": English question text
- "q_sw": Swahili translation of question
- "options": Array of 4 string options in English
- "options_sw": Array of 4 string options in Swahili
- "correct": Number index (0-3) of the correct option
- "explanation": Brief explanation in English citing relevant facts
- "explanation_sw": Brief explanation in Swahili
- "article": Precise Article citation from Constitution of Kenya 2010 (e.g. "Article 49(1)(f) — Rights of Arrested Persons")

JSON format example:
{
  "questions": [
    {
      "q": "Question in English?",
      "q_sw": "Swahili question?",
      "options": ["Opt 1", "Opt 2", "Opt 3", "Opt 4"],
      "options_sw": ["Chaguo 1", "Chaguo 2", "Chaguo 3", "Chaguo 4"],
      "correct": 1,
      "explanation": "English explanation",
      "explanation_sw": "Swahili explanation",
      "article": "Article 10 — National Values"
    }
  ]
}`;

    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                { role: "system", content: "You respond strictly in valid JSON format without markdown code fences." },
                { role: "user", content: prompt }
            ],
            response_format: { type: "json_object" },
            temperature: 0.8,
            max_tokens: 2048,
        });

        const responseText = completion.choices[0].message.content;
        const json = JSON.parse(responseText);

        res.status(200).json(json);
    } catch (error) {
        console.error('AI Quiz Generation Error:', error.message);
        res.status(500).json({
            error: 'Failed to generate AI quiz questions',
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

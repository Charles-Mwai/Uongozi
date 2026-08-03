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

// Import Supabase
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

// In-memory fallback if Supabase table is pending or offline
const memoryStore = new Map();

const LEVEL_TITLE_MAP = {
    1: 'Mwananchi', 2: 'Mzalendo', 3: 'Kiongozi', 4: 'Mtetezi',
    5: 'Msimamizi', 6: 'Walinzi', 7: 'Bingwa', 8: 'Shujaa', 9: 'Mwalimu', 10: 'Rais',
};

const COLOR_PALETTE = ['#f59e0b', '#6366f1', '#ec4899', '#10b981', '#f97316', '#8b5cf6', '#14b8a6', '#ef4444'];

app.post('/api/leaderboard/submit', async (req, res) => {
    const { user_id, nickname, county, gender, level, xp } = req.body;
    if (!user_id || !nickname) {
        return res.status(400).json({ error: 'user_id and nickname are required' });
    }

    const levelTitle = LEVEL_TITLE_MAP[Math.min(level || 1, 10)] || 'Mwananchi';
    const entry = {
        user_id,
        name: nickname,
        county: county || 'Nairobi',
        gender: gender || 'Prefer not to say',
        level: levelTitle,
        xp: Number(xp) || 0,
        weekly_xp: Number(xp) || 0,
        color: COLOR_PALETTE[Math.abs(user_id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % COLOR_PALETTE.length],
        updated_at: new Date().toISOString(),
    };

    memoryStore.set(user_id, entry);

    if (supabase) {
        try {
            await supabase.from('leaderboard').upsert({
                user_id: entry.user_id,
                nickname: entry.name,
                county: entry.county,
                gender: entry.gender,
                level_title: entry.level,
                xp: entry.xp,
                weekly_xp: entry.weekly_xp,
                updated_at: entry.updated_at,
            }, { onConflict: 'user_id' });
        } catch (err) {
            console.warn('Supabase upsert error (using memory store):', err.message);
        }
    }

    res.status(200).json({ success: true, entry });
});

app.get('/api/leaderboard', async (req, res) => {
    const { tab = 'alltime', county } = req.query;
    let list = [];

    if (supabase) {
        try {
            let query = supabase.from('leaderboard').select('*');
            if (tab === 'county' && county) {
                query = query.ilike('county', county.toString());
            }
            if (tab === 'weekly') {
                query = query.order('weekly_xp', { ascending: false });
            } else {
                query = query.order('xp', { ascending: false });
            }
            query = query.limit(100);

            const { data, error } = await query;
            if (!error && data && data.length > 0) {
                list = data.map((item, idx) => ({
                    user_id: item.user_id,
                    name: item.nickname,
                    county: item.county,
                    level: item.level_title,
                    xp: tab === 'weekly' ? item.weekly_xp : item.xp,
                    color: COLOR_PALETTE[Math.abs((item.user_id || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % COLOR_PALETTE.length],
                    rank: idx + 1,
                }));
            }
        } catch (err) {
            console.warn('Supabase fetch error, using memory store:', err.message);
        }
    }

    if (list.length === 0) {
        // Use memory store fallback
        list = Array.from(memoryStore.values());
        if (tab === 'county' && county) {
            list = list.filter(item => item.county.toLowerCase() === county.toString().toLowerCase());
        }
        list.sort((a, b) => b.xp - a.xp);
        list = list.map((item, idx) => ({
            ...item,
            rank: idx + 1,
        }));
    }

    res.status(200).json({ rankings: list });
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

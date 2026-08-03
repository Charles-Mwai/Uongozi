import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { category, lang = 'en', count = 5 } = req.body;

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
- "article": Precise Article citation from Constitution of Kenya 2010 (e.g. "Article 49(1)(f) — Rights of Arrested Persons")`;

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
}

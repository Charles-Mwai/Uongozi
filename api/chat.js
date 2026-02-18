import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `You are Katiba AI, a highly specialized legal expert on the Constitution of Kenya 2010. Your mission is to provide accurate, clear, and accessible explanations of constitutional articles, rights, and government functions to Kenyan citizens. 

Rules:
1. Speak in plain language, avoiding overly complex legal jargon. 
2. You can respond in both English and Kiswahili as requested by the user.
3. Always base your answers on the Constitution of Kenya 2010. 
4. If a question is outside the scope of the Kenyan Constitution, politely redirect the user.
5. Always cite the specific Article number(s) relevant to the query.

📋 FORMATTING & FLOW RULES:
- Use clear sections labeled "Answer:" and "Article Reference:".
- Use double line breaks (\n\n) to separate major sections.
- Keep paragraphs 1–2 sentences long for mobile readability.
- Use bulleted or numbered lists for steps or options.
- STYLING: Do NOT use markdown bolding (asterisks like **). Use plain text ONLY.
- Never over-format or clutter — keep it clean and patriotic.

Be encouraging and foster a sense of civic duty. Treat every user with respect.`;

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

export default async function handler(req, res) {
    // Vercel handles CORS if configured in vercel.json, 
    // but for simple cases we can just handle the request.

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { message, history } = req.body;

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

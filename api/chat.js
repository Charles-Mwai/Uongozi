import OpenAI from 'openai';

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

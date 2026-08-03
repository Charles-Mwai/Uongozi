import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

const LEVEL_TITLE_MAP = {
    1: 'Mwananchi', 2: 'Mzalendo', 3: 'Kiongozi', 4: 'Mtetezi',
    5: 'Msimamizi', 6: 'Walinzi', 7: 'Bingwa', 8: 'Shujaa', 9: 'Mwalimu', 10: 'Rais',
};

export default async function handler(req, res) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).set(CORS_HEADERS).end();
    }

    Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { user_id, nickname, county, gender, level, xp } = req.body || {};

    if (!user_id || !nickname) {
        return res.status(400).json({ error: 'user_id and nickname are required' });
    }

    if (!supabase) {
        console.warn('[leaderboard-submit] Supabase not configured');
        // Return success so the frontend doesn't retry in a loop
        return res.status(200).json({ success: true, source: 'no-op' });
    }

    const levelTitle = LEVEL_TITLE_MAP[Math.min(Number(level) || 1, 10)] || 'Mwananchi';
    const xpValue = Number(xp) || 0;

    const payload = {
        user_id,
        nickname,
        county: county || 'Nairobi',
        gender: gender || 'Prefer not to say',
        level_title: levelTitle,
        xp: xpValue,
        updated_at: new Date().toISOString(),
    };

    // Try upsert with weekly_xp first; if the column doesn't exist, retry without it
    try {
        const { error } = await supabase
            .from('leaderboard')
            .upsert({ ...payload, weekly_xp: xpValue }, { onConflict: 'user_id' });

        if (error) {
            if (error.message.includes('weekly_xp')) {
                // Column doesn't exist yet — upsert without it
                const { error: error2 } = await supabase
                    .from('leaderboard')
                    .upsert(payload, { onConflict: 'user_id' });

                if (error2) {
                    console.error('[leaderboard-submit] Fallback upsert error:', error2.message);
                    // Still return 200 so the client doesn't break
                    return res.status(200).json({ success: false, error: error2.message });
                }
            } else {
                console.error('[leaderboard-submit] Supabase error:', error.message);
                return res.status(200).json({ success: false, error: error.message });
            }
        }

        return res.status(200).json({ success: true });
    } catch (err) {
        console.error('[leaderboard-submit] Unexpected error:', err.message);
        return res.status(200).json({ success: false, error: err.message });
    }
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

const LEVEL_TITLE_MAP = {
    1: 'Mwananchi', 2: 'Mzalendo', 3: 'Kiongozi', 4: 'Mtetezi',
    5: 'Msimamizi', 6: 'Walinzi', 7: 'Bingwa', 8: 'Shujaa', 9: 'Mwalimu', 10: 'Rais',
};

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { user_id, nickname, county, gender, level, xp } = req.body;
    if (!user_id || !nickname) {
        return res.status(400).json({ error: 'user_id and nickname are required' });
    }

    if (!supabase) {
        return res.status(500).json({ error: 'Supabase credentials not configured' });
    }

    const levelTitle = LEVEL_TITLE_MAP[Math.min(level || 1, 10)] || 'Mwananchi';
    const payload = {
        user_id,
        nickname,
        county: county || 'Nairobi',
        gender: gender || 'Prefer not to say',
        level_title: levelTitle,
        xp: Number(xp) || 0,
        weekly_xp: Number(xp) || 0,
        updated_at: new Date().toISOString(),
    };

    try {
        const { data, error } = await supabase.from('leaderboard').upsert(payload, { onConflict: 'user_id' }).select();

        if (error) {
            console.error('Supabase error:', error.message);
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json({ success: true, data });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

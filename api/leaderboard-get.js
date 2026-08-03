import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey) ? createClient(supabaseUrl, supabaseAnonKey) : null;

const COLOR_PALETTE = ['#f59e0b', '#6366f1', '#ec4899', '#10b981', '#f97316', '#8b5cf6', '#14b8a6', '#ef4444'];

export default async function handler(req, res) {
    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!supabase) {
        return res.status(200).json({ rankings: [] });
    }

    const { tab = 'alltime', county } = req.query;

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

        if (error) {
            console.error('Supabase fetch error:', error.message);
            return res.status(500).json({ error: error.message });
        }

        const rankings = (data || []).map((item, idx) => ({
            user_id: item.user_id,
            name: item.nickname,
            county: item.county,
            level: item.level_title,
            xp: tab === 'weekly' ? item.weekly_xp : item.xp,
            color: COLOR_PALETTE[Math.abs((item.user_id || '').split('').reduce((acc, char) => acc + char.charCodeAt(0), 0)) % COLOR_PALETTE.length],
            rank: idx + 1,
        }));

        return res.status(200).json({ rankings });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
}

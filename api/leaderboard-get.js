import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
};

const COLOR_PALETTE = [
    '#f59e0b', '#6366f1', '#ec4899', '#10b981',
    '#f97316', '#8b5cf6', '#14b8a6', '#ef4444',
];

function colorForId(id = '') {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return COLOR_PALETTE[Math.abs(hash) % COLOR_PALETTE.length];
}

export default async function handler(req, res) {
    // Handle CORS preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).set(CORS_HEADERS).end();
    }

    Object.entries(CORS_HEADERS).forEach(([k, v]) => res.setHeader(k, v));

    if (req.method !== 'GET') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    if (!supabase) {
        console.warn('[leaderboard-get] Supabase not configured');
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
            console.error('[leaderboard-get] Supabase error:', error.message);
            // Graceful degradation — return empty rather than 500
            return res.status(200).json({ rankings: [] });
        }

        const rankings = (data || []).map((item, idx) => ({
            user_id: item.user_id,
            name: item.nickname,
            county: item.county,
            level: item.level_title,
            xp: tab === 'weekly' ? (item.weekly_xp ?? item.xp) : item.xp,
            color: colorForId(item.user_id),
            rank: idx + 1,
        }));

        return res.status(200).json({ rankings });
    } catch (err) {
        console.error('[leaderboard-get] Unexpected error:', err.message);
        return res.status(200).json({ rankings: [] });
    }
}

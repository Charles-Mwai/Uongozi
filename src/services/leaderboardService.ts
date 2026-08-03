import { createClient } from '@supabase/supabase-js';
import type { User, LeaderboardEntry } from '../types';
import { getLevelTitle } from '../data/badgeData';

// ---------------------------------------------------------------------------
// Supabase client — reads VITE_ prefixed env vars (works in both dev & prod)
// In dev: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env.local
// In prod: set them as Vercel environment variables
// ---------------------------------------------------------------------------
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const supabase = supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// ---------------------------------------------------------------------------
// localStorage cache — offline fallback and instant local reads
// ---------------------------------------------------------------------------
const LEADERBOARD_KEY = 'uongozi_leaderboard';

const AVATAR_COLORS = [
    '#f59e0b', '#6366f1', '#ec4899', '#10b981',
    '#f97316', '#8b5cf6', '#14b8a6', '#ef4444',
];

function colorForId(id: string): string {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
}

function loadLocalStore(): LeaderboardEntry[] {
    try {
        const raw = localStorage.getItem(LEADERBOARD_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch {
        return [];
    }
}

function saveLocalStore(entries: LeaderboardEntry[]): void {
    try {
        localStorage.setItem(LEADERBOARD_KEY, JSON.stringify(entries));
    } catch {
        // storage full — ignore
    }
}

function upsertLocal(entry: LeaderboardEntry): void {
    const store = loadLocalStore();
    const idx = store.findIndex(e => e.user_id === entry.user_id);
    if (idx >= 0) {
        store[idx] = entry;
    } else {
        store.push(entry);
    }
    saveLocalStore(store);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Saves the user's score to Supabase (primary) and localStorage (cache/fallback).
 */
export async function submitUserScore(user: User): Promise<void> {
    if (!user.user_id || !user.nickname) return;

    const entry: LeaderboardEntry = {
        user_id: user.user_id,
        name: user.nickname,
        level: getLevelTitle(user.level),
        xp: user.xp,
        county: user.county || 'Nairobi',
        color: colorForId(user.user_id),
    };

    // Always update local cache immediately
    upsertLocal(entry);

    if (!supabase) {
        console.warn('[Leaderboard] Supabase not configured — score saved locally only.');
        return;
    }

    try {
        const { error } = await supabase.from('leaderboard').upsert(
            {
                user_id: user.user_id,
                nickname: user.nickname,
                county: user.county || 'Nairobi',
                gender: user.gender || 'Prefer not to say',
                level_title: getLevelTitle(user.level),
                xp: user.xp,
                weekly_xp: user.xp,
                updated_at: new Date().toISOString(),
            },
            { onConflict: 'user_id' }
        );

        if (error) {
            console.warn('[Leaderboard] Supabase upsert failed:', error.message);
        }
    } catch (err) {
        console.warn('[Leaderboard] Supabase unreachable, score cached locally:', err);
    }
}

/**
 * Fetches leaderboard rankings.
 * Priority: Supabase (live) → localStorage (cached/offline).
 */
export async function fetchLeaderboardRankings(
    tab: 'alltime' | 'weekly' | 'county' = 'alltime',
    userCounty?: string
): Promise<LeaderboardEntry[]> {
    if (supabase) {
        try {
            let query = supabase.from('leaderboard').select('*');

            if (tab === 'county' && userCounty) {
                query = query.ilike('county', userCounty);
            }

            if (tab === 'weekly') {
                query = query.order('weekly_xp', { ascending: false });
            } else {
                query = query.order('xp', { ascending: false });
            }

            query = query.limit(100);

            const { data, error } = await query;

            if (!error && data && data.length > 0) {
                const rankings: LeaderboardEntry[] = data.map((item, idx) => ({
                    user_id: item.user_id,
                    name: item.nickname,
                    county: item.county,
                    level: item.level_title,
                    xp: tab === 'weekly' ? item.weekly_xp : item.xp,
                    color: colorForId(item.user_id || ''),
                    rank: idx + 1,
                }));

                // Keep local cache fresh
                saveLocalStore(rankings);
                return rankings;
            }

            if (error) {
                console.warn('[Leaderboard] Supabase fetch error:', error.message);
            }
        } catch (err) {
            console.warn('[Leaderboard] Supabase unreachable, using local cache:', err);
        }
    }

    // Fallback: local cache
    let entries = loadLocalStore();

    if (tab === 'county' && userCounty) {
        entries = entries.filter(
            e => e.county.toLowerCase() === userCounty.toLowerCase()
        );
    }

    return entries
        .sort((a, b) => b.xp - a.xp)
        .map((e, idx) => ({ ...e, rank: idx + 1 }));
}

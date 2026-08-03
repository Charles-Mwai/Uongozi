import type { User, LeaderboardEntry } from '../types';

/**
 * Submits or updates the user's score on the real leaderboard backend API.
 */
export async function submitUserScore(user: User): Promise<void> {
    if (!user.user_id || !user.nickname) return;

    try {
        await fetch('/api/leaderboard/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_id: user.user_id,
                nickname: user.nickname,
                county: user.county || 'Nairobi',
                gender: user.gender || 'Prefer not to say',
                level: user.level,
                xp: user.xp,
            }),
        });
    } catch (err) {
        console.warn('Failed to sync score with leaderboard backend:', err);
    }
}

/**
 * Fetches real live leaderboard rankings from the backend API.
 */
export async function fetchLeaderboardRankings(
    tab: 'alltime' | 'weekly' | 'county' = 'alltime',
    userCounty?: string
): Promise<LeaderboardEntry[]> {
    try {
        const queryParams = new URLSearchParams({
            tab,
            county: userCounty || '',
        });

        const res = await fetch(`/api/leaderboard?${queryParams.toString()}`);
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data.rankings)) {
                return data.rankings;
            }
        }
    } catch (err) {
        console.warn('Failed to fetch live leaderboard, returning empty:', err);
    }
    return [];
}

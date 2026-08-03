import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getLevelTitle } from '../../data/badgeData';
import { fetchLeaderboardRankings } from '../../services/leaderboardService';
import BottomNav from '../ui/BottomNav';
import type { LeaderboardEntry } from '../../types';

const Leaderboard: React.FC = () => {
    const { user } = useApp();
    const [tab, setTab] = useState<'weekly' | 'alltime' | 'county'>('alltime');
    const [liveRankings, setLiveRankings] = useState<LeaderboardEntry[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;
        setIsLoading(true);

        fetchLeaderboardRankings(tab, user.county).then(rankings => {
            if (isMounted) {
                setLiveRankings(rankings);
                setIsLoading(false);
            }
        });

        return () => { isMounted = false; };
    }, [tab, user.county]);

    const sortedList = useMemo(() => {
        let list = [...liveRankings];

        // Ensure current user is in the list
        const currentUserInList = list.find(item => item.user_id === user.user_id || item.name === user.nickname);

        if (!currentUserInList && user.nickname) {
            list.push({
                user_id: user.user_id,
                name: user.nickname,
                level: getLevelTitle(user.level),
                xp: user.xp,
                county: user.county || 'Nairobi',
                color: '#c9a84c',
            });
        }

        // Re-sort by XP descending
        list.sort((a, b) => b.xp - a.xp);

        // Assign positions
        return list.map((item, idx) => ({
            ...item,
            rank: idx + 1,
        }));
    }, [liveRankings, user]);

    const medals = ["🥇", "🥈", "🥉"];
    const userRankEntry = sortedList.find(item => item.user_id === user.user_id || item.name === user.nickname);
    const userRank = userRankEntry?.rank || 1;

    return (
        <div id="leaderboard" className="screen active">
            <header className="lb-header">
                <h2>Hall of Fame</h2>
                <p>Recognizing Kenya's top civic ambassadors</p>

                <div className="tabs">
                    <div className={`tab ${tab === 'weekly' ? 'active' : ''}`} onClick={() => setTab('weekly')}>Weekly</div>
                    <div className={`tab ${tab === 'alltime' ? 'active' : ''}`} onClick={() => setTab('alltime')}>All-Time</div>
                    <div className={`tab ${tab === 'county' ? 'active' : ''}`} onClick={() => setTab('county')}>County</div>
                </div>
            </header>

            <div className="lb-your-rank">
                <div className="rank-badge">{userRank > 0 ? userRank : '1'}</div>
                <div className="rank-info">
                    <h4>{user.nickname || 'Ambassador'}</h4>
                    <p>Ranked #{userRank > 0 ? userRank : '1'} in {user.county || 'Kenya'}</p>
                </div>
                <div className="lb-xp">{user.xp} XP</div>
            </div>

            <div className="lb-list">
                {isLoading ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#b0c4bd' }}>
                        ⚡ Loading real-time rankings...
                    </div>
                ) : sortedList.length === 0 ? (
                    <div style={{ padding: '2rem', textAlign: 'center', color: '#b0c4bd' }}>
                        No rankings yet for this view. Start a quest to take 1st place!
                    </div>
                ) : (
                    sortedList.map((item, index) => {
                        const isUser = item.user_id === user.user_id || item.name === user.nickname;
                        return (
                            <div
                                key={item.user_id || index}
                                className={`lb-item ${isUser ? 'user-highlight' : ''}`}
                                style={isUser ? { background: 'rgba(201,168,76,0.15)', border: '1px solid #c9a84c', borderRadius: '16px' } : {}}
                            >
                                <div className={`lb-rank ${index < 3 ? ['gold', 'silver', 'bronze'][index] : ''}`}>
                                    {index < 3 ? medals[index] : index + 1}
                                </div>
                                <div className="lb-avatar" style={{ backgroundColor: `${item.color || '#c9a84c'}20`, color: item.color || '#c9a84c' }}>
                                    {item.name ? item.name[0].toUpperCase() : 'U'}
                                </div>
                                <div className="lb-info">
                                    <div className="lb-name" style={isUser ? { color: '#c9a84c', fontWeight: '800' } : {}}>
                                        {item.name} {isUser ? '(You)' : ''}
                                    </div>
                                    <div className="lb-level">
                                        <span>{item.level}</span> • <span>{item.county}</span>
                                    </div>
                                </div>
                                <div className="lb-xp">{item.xp} XP</div>
                            </div>
                        );
                    })
                )}
            </div>

            <BottomNav />
        </div>
    );
};

export default Leaderboard;

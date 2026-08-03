import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { getLevelTitle } from '../../data/badgeData';
import BottomNav from '../ui/BottomNav';
import type { LeaderboardEntry } from '../../types';

const Leaderboard: React.FC = () => {
    const { user } = useApp();
    const [tab, setTab] = useState<'weekly' | 'alltime' | 'county'>('alltime');

    const rawMockData: LeaderboardEntry[] = [
        { name: "Wanjiku M.", level: "Mzalendo", xp: 2840, county: "Nairobi", color: "#f59e0b" },
        { name: "Ochieng K.", level: "Kiongozi", xp: 1920, county: "Kisumu", color: "#6366f1" },
        { name: "Aisha H.", level: "Kiongozi", xp: 1750, county: "Mombasa", color: "#ec4899" },
        { name: "Kamau J.", level: "Mtetezi", xp: 980, county: "Nakuru", color: "#10b981" },
        { name: "Fatuma A.", level: "Mtetezi", xp: 820, county: "Kajiado", color: "#f97316" }
    ];

    const sortedList = useMemo(() => {
        const userEntry: LeaderboardEntry = {
            name: `${user.nickname || 'You'} (You)`,
            level: getLevelTitle(user.level),
            xp: user.xp,
            county: user.county || 'Kenya',
            color: '#c9a84c'
        };

        let list = [...rawMockData, userEntry];

        if (tab === 'county' && user.county) {
            list = list.filter(item => item.county.toLowerCase() === user.county.toLowerCase() || item.name.includes('(You)'));
        }

        // Sort descending by XP
        list.sort((a, b) => b.xp - a.xp);
        return list;
    }, [user, tab, rawMockData]);

    const medals = ["🥇", "🥈", "🥉"];
    const userRank = sortedList.findIndex(item => item.name.includes('(You)')) + 1;

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
                <div className="rank-badge">{userRank > 0 ? userRank : '—'}</div>
                <div className="rank-info">
                    <h4>{user.nickname || 'Guest Ambassador'}</h4>
                    <p>Ranked #{userRank > 0 ? userRank : '—'} in {user.county || 'Kenya'}</p>
                </div>
                <div className="lb-xp">{user.xp} XP</div>
            </div>

            <div className="lb-list">
                {sortedList.map((item, index) => {
                    const isUser = item.name.includes('(You)');
                    return (
                        <div key={index} className={`lb-item ${isUser ? 'user-highlight' : ''}`} style={isUser ? { background: 'rgba(201,168,76,0.15)', border: '1px solid #c9a84c', borderRadius: '16px' } : {}}>
                            <div className={`lb-rank ${index < 3 ? ['gold', 'silver', 'bronze'][index] : ''}`}>
                                {index < 3 ? medals[index] : index + 1}
                            </div>
                            <div className="lb-avatar" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                                {item.name[0]}
                            </div>
                            <div className="lb-info">
                                <div className="lb-name" style={isUser ? { color: '#c9a84c', fontWeight: '800' } : {}}>{item.name}</div>
                                <div className="lb-level">
                                    <span>{item.level}</span> • <span>{item.county}</span>
                                </div>
                            </div>
                            <div className="lb-xp">{item.xp} XP</div>
                        </div>
                    );
                })}
            </div>

            <BottomNav />
        </div>
    );
};

export default Leaderboard;


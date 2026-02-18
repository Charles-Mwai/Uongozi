import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import BottomNav from '../ui/BottomNav';
import type { LeaderboardEntry } from '../../types';

const Leaderboard: React.FC = () => {
    const { user } = useApp();
    const [tab, setTab] = useState<'weekly' | 'alltime'>('alltime');

    const lbData: LeaderboardEntry[] = [
        { name: "Wanjiku M.", level: "Mzalendo", xp: 2840, county: "Nairobi", color: "#f59e0b" },
        { name: "Ochieng K.", level: "Kiongozi", xp: 1920, county: "Kisumu", color: "#6366f1" },
        { name: "Aisha H.", level: "Kiongozi", xp: 1750, county: "Mombasa", color: "#ec4899" },
        { name: "Kamau J.", level: "Mtetezi", xp: 980, county: "Nakuru", color: "#10b981" },
        { name: "Fatuma A.", level: "Mtetezi", xp: 820, county: "Kajiado", color: "#f97316" }
    ];

    const medals = ["🥇", "🥈", "🥉"];

    return (
        <div id="leaderboard" className="screen active">
            <header className="lb-header">
                <h2>Hall of Fame</h2>
                <p>Recognizing Kenya's top civic ambassadors</p>

                <div className="tabs">
                    <div className={`tab ${tab === 'weekly' ? 'active' : ''}`} onClick={() => setTab('weekly')}>Weekly</div>
                    <div className={`tab ${tab === 'alltime' ? 'active' : ''}`} onClick={() => setTab('alltime')}>All-Time</div>
                </div>
            </header>

            <div className="lb-your-rank">
                <div className="rank-badge">12</div>
                <div className="rank-info">
                    <h4>{user.nickname || 'Guest Ambassador'}</h4>
                    <p>Ranked #12 in {user.county || 'Kenya'}</p>
                </div>
                <div className="lb-xp">{user.xp} XP</div>
            </div>

            <div className="lb-list">
                {lbData.map((item, index) => (
                    <div key={index} className="lb-item">
                        <div className={`lb-rank ${index < 3 ? ['gold', 'silver', 'bronze'][index] : ''}`}>
                            {index < 3 ? medals[index] : index + 1}
                        </div>
                        <div className="lb-avatar" style={{ backgroundColor: `${item.color}20`, color: item.color }}>
                            {item.name[0]}
                        </div>
                        <div className="lb-info">
                            <div className="lb-name">{item.name}</div>
                            <div className="lb-level">
                                <span>{item.level}</span> • <span>{item.county}</span>
                            </div>
                        </div>
                        <div className="lb-xp">{item.xp} XP</div>
                    </div>
                ))}
            </div>

            <BottomNav />
        </div>
    );
};

export default Leaderboard;

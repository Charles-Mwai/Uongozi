import React from 'react';
import { useApp } from '../../context/AppContext';
import BottomNav from '../ui/BottomNav';

const Profile: React.FC = () => {
    const { user, setCurrentScreen } = useApp();

    const badges = [
        { id: 'mzalendo', name: 'Mzalendo', emoji: '🇰🇪', unlocked: user.xp > 0 },
        { id: 'expert', name: 'Law Expert', emoji: '⚖️', unlocked: user.xp > 1000 },
        { id: 'streaker', name: '7-Day Streak', emoji: '🔥', unlocked: user.streak >= 7 },
        { id: 'voter', name: 'Master Voter', emoji: '🗳️', unlocked: user.answered > 50 }
    ];

    const handleReset = () => {
        if (confirm('Reset all progress? This cannot be undone.')) {
            localStorage.removeItem('uongozi_user');
            window.location.reload();
        }
    };

    const calculateLevelProgress = () => {
        const xpInLevel = user.xp % 1000;
        return (xpInLevel / 1000) * 100;
    };

    return (
        <div id="profile" className="screen active">
            <header className="home-header">
                <div className="home-header-bg"></div>
                <div className="header-top">
                    <div className="header-logo">Ambassador <span>Profile</span></div>
                    <div className="header-avatar" onClick={() => setCurrentScreen('home')}>
                        ←
                    </div>
                </div>

                <div className="user-greeting">
                    <p>Civic Hero Profile</p>
                    <h2>{user.nickname || 'Citizen'}</h2>

                    <div className="xp-bar-container">
                        <div className="xp-bar-fill" style={{ width: `${calculateLevelProgress()}%` }}></div>
                    </div>
                    <div className="xp-label">
                        <span>Level {user.level}</span>
                        <span><strong>{user.xp % 1000}</strong> / 1000 XP</span>
                    </div>
                </div>
            </header>

            <div className="stats-strip">
                <div className="stat-card">
                    <div className="stat-value">{user.xp}</div>
                    <div className="stat-label">Total XP</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{user.streak}</div>
                    <div className="stat-label">Day Streak</div>
                </div>
                <div className="stat-card" onClick={handleReset} style={{ cursor: 'pointer' }}>
                    <div className="stat-value">⚙️</div>
                    <div className="stat-label">Reset</div>
                </div>
            </div>

            <div className="section">
                <div className="section-header">
                    <h3 className="section-title">My Achievements</h3>
                </div>
                <div className="badges-grid">
                    {badges.map(b => (
                        <div key={b.id} className={`badge-item ${!b.unlocked ? 'locked' : ''}`}>
                            <div className="badge-emoji">{b.emoji}</div>
                            <div className="badge-nm">{b.name}</div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="section" style={{ marginTop: '10px' }}>
                <button className="btn-secondary" style={{ color: 'var(--red)', borderColor: 'var(--red)', width: '100%', padding: '12px', borderRadius: '12px', background: 'transparent', border: '1px solid var(--red)', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }} onClick={handleReset}>
                    Reset Profile Data
                </button>
            </div>

            <BottomNav />
        </div>
    );
};

export default Profile;

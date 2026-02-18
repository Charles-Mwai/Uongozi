import React from 'react';
import { useApp } from '../../context/AppContext';
import BottomNav from '../ui/BottomNav';

const Profile: React.FC = () => {
    const { user } = useApp();

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

    return (
        <div id="profile" className="screen active">
            <header className="profile-header">
                <div className="profile-avatar-lg">
                    {user.nickname ? user.nickname[0].toUpperCase() : 'U'}
                </div>
                <h2 className="profile-name">{user.nickname || 'Guest Ambassador'}</h2>
                <div className="profile-level-badge">Level {user.level} Civic Hero</div>
            </header>

            <div className="profile-stats">
                <div className="profile-stat-item">
                    <div className="profile-stat-val">{user.xp}</div>
                    <div className="profile-stat-lbl">XP</div>
                </div>
                <div className="profile-stat-item">
                    <div className="profile-stat-val">#{user.streak}</div>
                    <div className="profile-stat-lbl">Streak</div>
                </div>
                <div className="profile-stat-item" onClick={handleReset} style={{ cursor: 'pointer' }}>
                    <div className="profile-stat-val">⚙️</div>
                    <div className="profile-stat-lbl">Reset</div>
                </div>
            </div>

            <div className="badges-section">
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

            <div className="section" style={{ marginTop: '20px' }}>
                <button className="btn-secondary" style={{ color: 'var(--red)', borderColor: 'var(--red)' }} onClick={handleReset}>
                    Reset Profile Data
                </button>
            </div>

            <BottomNav />
        </div>
    );
};

export default Profile;

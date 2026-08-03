import React from 'react';
import { useApp } from '../../context/AppContext';
import { BADGE_DEFINITIONS, getLevelTitle } from '../../data/badgeData';
import BottomNav from '../ui/BottomNav';

const Profile: React.FC = () => {
    const { user, setCurrentScreen } = useApp();

    const levelTitle = getLevelTitle(user.level);

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

    const quizzesCompleted = user.completedCategories?.length || 0;

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
                    <p>Civic Hero Profile • <strong style={{ color: 'var(--gold)' }}>{levelTitle}</strong></p>
                    <h2>{user.nickname || 'Citizen'}</h2>
                    {(user.county || user.gender) && (
                        <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.55)', marginTop: '4px', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                            {user.county && <span>📍 {user.county}</span>}
                            {user.gender && <span>·  {user.gender === 'Male' ? '👨 Male' : user.gender === 'Female' ? '👩 Female' : '🔒 Prefer not to say'}</span>}
                        </p>
                    )}

                    <div className="xp-bar-container">
                        <div className="xp-bar-fill" style={{ width: `${calculateLevelProgress()}%` }}></div>
                    </div>
                    <div className="xp-label">
                        <span>Level {user.level} ({levelTitle})</span>
                        <span><strong>{user.xp % 1000}</strong> / 1000 XP</span>
                    </div>
                </div>
            </header>


            <div className="stats-strip" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
                <div className="stat-card">
                    <div className="stat-value">{user.xp}</div>
                    <div className="stat-label">Total XP</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{user.streak}🔥</div>
                    <div className="stat-label">Streak</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{quizzesCompleted}/5</div>
                    <div className="stat-label">Quests</div>
                </div>
                <div className="stat-card" onClick={handleReset} style={{ cursor: 'pointer' }}>
                    <div className="stat-value">⚙️</div>
                    <div className="stat-label">Reset</div>
                </div>
            </div>

            <div className="section">
                <div className="section-header">
                    <h3 className="section-title">My Achievements ({user.badges?.length || 0}/{BADGE_DEFINITIONS.length})</h3>
                </div>
                <div className="badges-grid">
                    {BADGE_DEFINITIONS.map(b => {
                        const isUnlocked = user.badges?.includes(b.id) || b.check(user);
                        return (
                            <div
                                key={b.id}
                                className={`badge-item ${!isUnlocked ? 'locked' : ''}`}
                                title={b.description}
                                style={{ position: 'relative', cursor: 'help' }}
                            >
                                <div className="badge-emoji">{b.emoji}</div>
                                <div className="badge-nm">{b.name}</div>
                                <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.6)', marginTop: '2px', lineHeight: '1.2' }}>
                                    {isUnlocked ? 'Unlocked' : b.description}
                                </div>
                            </div>
                        );
                    })}
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


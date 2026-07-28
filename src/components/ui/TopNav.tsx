import React from 'react';
import { useApp } from '../../context/AppContext';
import type { Screen } from '../../types';

const TopNav: React.FC = () => {
    const { currentScreen, setCurrentScreen, user } = useApp();

    const navItems: { label: string; icon: string; screen: Screen }[] = [
        { label: 'Home', icon: '🏠', screen: 'home' },
        { label: 'Rankings', icon: '🏆', screen: 'leaderboard' },
        { label: 'Ask Katiba', icon: '⚖️', screen: 'ask' },
        { label: 'Profile', icon: '👤', screen: 'profile' }
    ];

    return (
        <header className="top-nav-bar">
            <div className="top-nav-brand" onClick={() => setCurrentScreen('home')}>
                <span className="brand-flag">🇰🇪</span>
                <span className="brand-text">Uongo<span>zi</span></span>
            </div>

            <nav className="top-nav-links">
                {navItems.map((item) => (
                    <button
                        key={item.screen}
                        className={`top-nav-link ${currentScreen === item.screen ? 'active' : ''}`}
                        onClick={() => setCurrentScreen(item.screen)}
                    >
                        <span className="top-nav-icon">{item.icon}</span>
                        <span>{item.label}</span>
                    </button>
                ))}
            </nav>

            <div className="top-nav-user" onClick={() => setCurrentScreen('profile')}>
                <div className="top-user-info">
                    <span className="top-user-name">{user.nickname || 'Citizen'}</span>
                    <span className="top-user-xp">⚡ {user.xp} XP</span>
                </div>
                <div className="top-user-avatar">
                    {user.nickname ? user.nickname[0].toUpperCase() : 'U'}
                </div>
            </div>
        </header>
    );
};

export default TopNav;

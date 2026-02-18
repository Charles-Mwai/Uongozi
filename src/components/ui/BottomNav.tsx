import React from 'react';
import { useApp } from '../../context/AppContext';
import type { Screen } from '../../types';

const BottomNav: React.FC = () => {
    const { currentScreen, setCurrentScreen } = useApp();

    const navItems: { label: string; icon: string; screen: Screen }[] = [
        { label: 'Home', icon: '🏠', screen: 'home' },
        { label: 'Rankings', icon: '🏆', screen: 'leaderboard' },
        { label: 'Ask Katiba', icon: '⚖️', screen: 'ask' },
        { label: 'Profile', icon: '👤', screen: 'profile' }
    ];

    return (
        <nav className="bottom-nav">
            {navItems.map((item) => (
                <div
                    key={item.screen}
                    className={`nav-item ${currentScreen === item.screen ? 'active' : ''}`}
                    onClick={() => setCurrentScreen(item.screen)}
                >
                    <span className="nav-icon">{item.icon}</span>
                    <span className="nav-label">{item.label}</span>
                </div>
            ))}
        </nav>
    );
};

export default BottomNav;

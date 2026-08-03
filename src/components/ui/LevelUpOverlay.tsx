import React from 'react';
import { useApp } from '../../context/AppContext';

const LevelUpOverlay: React.FC = () => {
    const { levelUpInfo, clearLevelUp } = useApp();
    if (!levelUpInfo) return null;

    return (
        <div className="levelup-overlay" onClick={clearLevelUp}>
            <div className="levelup-card" onClick={e => e.stopPropagation()}>
                <div className="levelup-burst">✨</div>
                <div className="levelup-label">LEVEL UP!</div>
                <div className="levelup-num">{levelUpInfo.level}</div>
                <div className="levelup-title">{levelUpInfo.title}</div>
                <p className="levelup-sub">You've reached a new rank as a Kenyan civic champion.</p>
                <button className="levelup-btn" onClick={clearLevelUp}>Continue 🚀</button>
            </div>
        </div>
    );
};

export default LevelUpOverlay;

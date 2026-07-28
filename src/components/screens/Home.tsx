import React from 'react';
import { useApp } from '../../context/AppContext';
import { quizData } from '../../data/quizData';
import BottomNav from '../ui/BottomNav';

const Home: React.FC = () => {
    const { user, startQuiz, setCurrentScreen, setInitialQuery } = useApp();
    const [inputValue, setInputValue] = React.useState('');

    const categories = Object.entries(quizData).map(([id, cat]) => ({
        id,
        ...cat
    }));

    const calculateLevelProgress = () => {
        const xpInLevel = user.xp % 1000;
        return (xpInLevel / 1000) * 100;
    };

    const handleHomeSearch = () => {
        if (!inputValue.trim()) return;
        setInitialQuery(inputValue);
        setCurrentScreen('ask');
    };

    return (
        <div id="home" className="screen active">
            <header className="home-header">
                <div className="home-header-bg"></div>
                <div className="header-top">
                    <div className="header-logo">Uongo<span>Zi</span></div>
                    <div className="header-avatar" onClick={() => setCurrentScreen('profile')}>
                        {user.nickname ? user.nickname[0].toUpperCase() : 'U'}
                    </div>
                </div>

                <div className="user-greeting">
                    <p>Welcome back, Ambassador</p>
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
                    <div className="stat-value">{user.streak}</div>
                    <div className="stat-label">Day Streak</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{user.xp}</div>
                    <div className="stat-label">Total XP</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">#12</div>
                    <div className="stat-label">County Rank</div>
                </div>
            </div>

            <div className="home-chat-input-wrapper">
                <div className="home-chat-box">
                    <input
                        type="text"
                        className="home-chat-input"
                        placeholder="Ask anything about the Kenyan Constitution..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleHomeSearch()}
                    />
                </div>
                <button className="home-chat-send-btn" onClick={handleHomeSearch}>
                    <span className="home-send-arrow">↑</span>
                </button>
            </div>

            <div className="section">
                <div className="section-header">
                    <h3 className="section-title">Knowledge Quests</h3>
                    <span className="section-link">View All</span>
                </div>

                <div className="categories-grid">
                    {categories.map((cat) => (
                        <div
                            key={cat.id}
                            className="category-card"
                            onClick={() => startQuiz(cat.id, cat.questions)}
                        >
                            <div className="category-icon" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                                {cat.icon}
                            </div>
                            <div className="category-name">{cat.title}</div>
                            <div className="category-sw">{cat.swTitle || 'Katiba 2010'}</div>
                            <div className="category-progress">
                                <div className="category-progress-fill" style={{ width: '40%', backgroundColor: cat.color }}></div>
                            </div>
                            <div className="category-questions">{cat.questions.length} Questions</div>
                        </div>
                    ))}
                </div>
            </div>

            {user.streak > 0 && (
                <div className="streak-banner">
                    <div className="streak-num">🔥 {user.streak}</div>
                    <div className="streak-text">Building a habit! Come back tomorrow to keep the streak alive.</div>
                </div>
            )}

            <div style={{ height: '80px' }}></div>
            <BottomNav />
        </div>
    );
};

export default Home;

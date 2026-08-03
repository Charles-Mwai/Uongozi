import React, { useMemo, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { quizData } from '../../data/quizData';
import { getLevelTitle } from '../../data/badgeData';
import { getFreshQuestionsForCategory, getDailyChallengeQuestion } from '../../utils/quizUtils';
import { fetchAiQuestions } from '../../services/quizService';
import { fetchLeaderboardRankings } from '../../services/leaderboardService';
import type { LeaderboardEntry } from '../../types';
import BottomNav from '../ui/BottomNav';

const Home: React.FC = () => {
    const { user, startQuiz, setCurrentScreen, setInitialQuery, saveUser, showToast } = useApp();
    const [inputValue, setInputValue] = useState('');
    const [isGeneratingAi, setIsGeneratingAi] = useState(false);

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

    // Daily Challenge question (consistent for everyone on a given day)
    const todayStr = new Date().toDateString();
    const isChallengeDoneToday = user.lastChallengeDate === todayStr;

    const dailyChallengeQuestion = useMemo(() => {
        const allQuestions = categories.flatMap(c => c.questions.map(q => ({ ...q, categoryId: c.id, categoryTitle: c.title })));
        return getDailyChallengeQuestion(allQuestions, todayStr);
    }, [todayStr]);

    const handleStartDailyChallenge = () => {
        if (isChallengeDoneToday) return;
        // Launch a 1-question quiz
        startQuiz((dailyChallengeQuestion as any).categoryId || 'katiba', [dailyChallengeQuestion]);
        // Mark challenge done
        saveUser({ lastChallengeDate: todayStr, xp: user.xp + 25 });
        showToast('🎯 Daily Challenge Started! +25 Bonus XP awarded!', 'xp');
    };

    const handleCategoryClick = (catId: string) => {
        const categoryQuestions = quizData[catId]?.questions || [];
        const freshQuestions = getFreshQuestionsForCategory(categoryQuestions, user.seenQuestionIds, 5);
        const isReplay = user.completedCategories?.includes(catId);
        startQuiz(catId, freshQuestions, isReplay);
    };

    const handleStartAiQuiz = async (catId: string) => {
        setIsGeneratingAi(true);
        showToast('✨ Generating fresh AI questions from Constitution...', 'info');
        const questions = await fetchAiQuestions(catId, user.lang || 'en', 5);
        setIsGeneratingAi(false);
        startQuiz(catId, questions, false, true);
    };

    const [realCountyRank, setRealCountyRank] = useState<number | string>('—');

    React.useEffect(() => {
        if (!user.county || !user.nickname) return;
        fetchLeaderboardRankings('county', user.county).then((rankings: LeaderboardEntry[]) => {
            const index = rankings.findIndex((r: LeaderboardEntry) => r.user_id === user.user_id || r.name === user.nickname);
            if (index !== -1) {
                setRealCountyRank(index + 1);
            } else if (user.xp > 0) {
                setRealCountyRank(rankings.length + 1);
            }
        });
    }, [user.county, user.user_id, user.nickname, user.xp]);

    const levelTitle = getLevelTitle(user.level);

    return (
        <div id="home" className="screen active">
            <header className="home-header">
                <div className="home-header-bg"></div>
                <div className="header-top">
                    <div className="header-logo">
                        <img src="/logo (2).png" alt="Uongozi Logo" className="header-logo-img" />
                        <span>Uongo<span>Zi</span></span>
                    </div>
                    <div className="header-avatar" onClick={() => setCurrentScreen('profile')}>
                        {user.nickname ? user.nickname[0].toUpperCase() : 'U'}
                    </div>
                </div>

                <div className="user-greeting">
                    <p>Welcome back, Ambassador • <strong style={{ color: 'var(--gold)' }}>{levelTitle}</strong></p>
                    <h2>{user.nickname || 'Citizen'}</h2>

                    <div className="xp-bar-container">
                        <div className="xp-bar-fill" style={{ width: `${calculateLevelProgress()}%` }}></div>
                    </div>
                    <div className="xp-label">
                        <span>Level {user.level} ({levelTitle})</span>
                        <span><strong>{user.xp % 1000}</strong> / 1000 XP</span>
                    </div>
                </div>
            </header>

            <div className="stats-strip">
                <div className="stat-card">
                    <div className="stat-value">{user.streak} 🔥</div>
                    <div className="stat-label">Day Streak</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">{user.xp} ⚡</div>
                    <div className="stat-label">Total XP</div>
                </div>
                <div className="stat-card">
                    <div className="stat-value">#{user.xp > 0 ? realCountyRank : '—'}</div>
                    <div className="stat-label">County Rank</div>
                </div>
            </div>

            <div className="home-chat-input-wrapper">
                <div className="home-chat-box">
                    <input
                        type="text"
                        className="home-chat-input"
                        placeholder="Ask Katiba AI about Kenya's Constitution 2010..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleHomeSearch()}
                    />
                </div>
                <button className="home-chat-send-btn" onClick={handleHomeSearch}>
                    <span className="home-send-arrow">↑</span>
                </button>
            </div>

            {/* DAILY CHALLENGE CARD */}
            <div className="daily-challenge-card">
                <div className="daily-challenge-header">
                    <span className="daily-challenge-tag">🎯 Today's Quest Challenge</span>
                    <span className="daily-challenge-xp">+75 XP Bonus</span>
                </div>
                <div className="daily-challenge-title">
                    {user.lang === 'sw' && dailyChallengeQuestion.q_sw ? dailyChallengeQuestion.q_sw : dailyChallengeQuestion.q}
                </div>
                {isChallengeDoneToday ? (
                    <div style={{ color: '#34d399', fontSize: '13px', fontWeight: '700' }}>
                        ✅ Challenge Completed Today! Come back tomorrow.
                    </div>
                ) : (
                    <button className="daily-challenge-btn" onClick={handleStartDailyChallenge}>
                        Take Daily Question ⚡
                    </button>
                )}
            </div>

            <div className="section">
                <div className="section-header">
                    <h3 className="section-title">Constitutional Quests</h3>
                    <span className="section-link">Dynamic Pool</span>
                </div>

                <div className="categories-grid">
                    {categories.map((cat) => {
                        const isDone = user.completedCategories?.includes(cat.id);
                        return (
                            <div
                                key={cat.id}
                                className="category-card"
                                style={{ position: 'relative' }}
                            >
                                <div onClick={() => handleCategoryClick(cat.id)}>
                                    <div className="category-icon" style={{ backgroundColor: `${cat.color}20`, color: cat.color }}>
                                        {cat.icon}
                                    </div>
                                    <div className="category-name">{user.lang === 'sw' && cat.swTitle ? cat.swTitle : cat.title}</div>
                                    <div className="category-sw">{cat.swTitle || 'Katiba 2010'}</div>
                                    <div className="category-progress">
                                        <div className="category-progress-fill" style={{ width: isDone ? '100%' : '0%', backgroundColor: cat.color }}></div>
                                    </div>
                                    <div className="category-questions">
                                        {isDone ? '✅ Replay (Fresh Mix)' : `${cat.questions.length} Questions Bank`}
                                    </div>
                                </div>

                                <button
                                    className="ai-quest-mini-btn"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleStartAiQuiz(cat.id);
                                    }}
                                    disabled={isGeneratingAi}
                                    title="Generate brand new AI questions from Constitution"
                                    style={{
                                        marginTop: '10px',
                                        width: '100%',
                                        padding: '6px 10px',
                                        borderRadius: '8px',
                                        fontSize: '11px',
                                        fontWeight: '700',
                                        border: '1px solid rgba(255, 255, 255, 0.15)',
                                        background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                                        color: '#fff',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '4px'
                                    }}
                                >
                                    Fresh Quest
                                </button>
                            </div>
                        );
                    })}
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



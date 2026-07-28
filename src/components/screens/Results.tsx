import React from 'react';
import { useApp } from '../../context/AppContext';
import { quizData } from '../../data/quizData';

const Results: React.FC = () => {
    const { quizState, setCurrentScreen } = useApp();
    const { score, questions, category } = quizState;
    const categoryTitle = category ? (quizData[category]?.title || category) : 'Constitutional Rights';
    const totalQuestions = questions.length || 5;
    const percentage = Math.round((score / totalQuestions) * 100);

    return (
        <div id="results" className="screen active">
            <div className="results-bg"></div>

            <div className="results-content">
                <div className="score-ring">
                    <svg width="160" height="160">
                        <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.12)" strokeWidth="12" />
                        <circle
                            cx="80" cy="80" r="70"
                            fill="none" stroke="#c9a84c"
                            strokeWidth="12"
                            strokeDasharray={`${(percentage / 100) * 440} 440`}
                            strokeDashoffset="0"
                            strokeLinecap="round"
                            style={{ transition: 'stroke-dasharray 1s ease' }}
                        />
                    </svg>
                    <div className="score-center">
                        <div className="score-num">{score}</div>
                        <div className="score-pct">/{totalQuestions} Correct</div>
                    </div>
                </div>

                <h2 className="results-title">
                    {percentage >= 80 ? '🎉 Outstanding!' : percentage >= 50 ? '✨ Great Work!' : '💪 Keep Learning!'}
                </h2>
                <p className="results-subtitle">
                    You scored {percentage}% in <strong>{categoryTitle}</strong>. Keep practicing to become a certified Civic Ambassador!
                </p>

                <div className="xp-earned">⚡ +{score * 50} XP Gained</div>

                {percentage >= 60 && (
                    <div className="badge-earned">
                        <div className="badge-icon">🎖️</div>
                        <div className="badge-text">
                            <h4>Mzalendo Badge Unlocked!</h4>
                            <p>You've completed the <strong>{categoryTitle}</strong> civic quest.</p>
                        </div>
                    </div>
                )}

                <div className="results-actions">
                    <button className="btn-share-main" onClick={() => alert('Sharing functionality coming soon!')}>
                        <span>📤</span> Share Results
                    </button>
                    <button className="btn-secondary" onClick={() => setCurrentScreen('home')}>
                        Back to Dashboard
                    </button>
                </div>
            </div>

            <div className="flag-strip"></div>
        </div>
    );
};

export default Results;

import React from 'react';
import { useApp } from '../../context/AppContext';

const Results: React.FC = () => {
    const { quizState, setCurrentScreen } = useApp();
    const { score, questions } = quizState;
    const percentage = Math.round((score / questions.length) * 100);

    return (
        <div id="results" className="screen active">
            <div className="results-bg"></div>

            <div className="results-content">
                <div className="score-ring">
                    <svg width="160" height="160">
                        <circle cx="80" cy="80" r="70" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
                        <circle
                            cx="80" cy="80" r="70"
                            fill="none" stroke="#c9a84c"
                            strokeWidth="12"
                            strokeDasharray={`${(percentage / 100) * 440} 440`}
                            strokeLinecap="round"
                        />
                    </svg>
                    <div className="score-center">
                        <div className="score-num">{score}</div>
                        <div className="score-pct">/{questions.length} Correct</div>
                    </div>
                </div>

                <h2 className="results-title">Great Work!</h2>
                <p className="results-subtitle">You've mastered the basics of {quizState.category}. Keep going to unlock the Legend badge!</p>

                <div className="xp-earned">+{score * 50} XP Gained</div>

                <div className="badge-earned">
                    <div className="badge-icon">🎖️</div>
                    <div className="badge-text">
                        <h4>Mzalendo Badge Unlocked!</h4>
                        <p>You've completed your first quest in the {quizState.category} category.</p>
                    </div>
                </div>

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

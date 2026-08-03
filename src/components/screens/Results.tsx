import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { quizData } from '../../data/quizData';

const Results: React.FC = () => {
    const { quizState, setCurrentScreen, awardBadge, startQuiz, showToast, saveUser, user } = useApp();
    const { score, questions, category, isReplay } = quizState;
    const categoryTitle = category ? (quizData[category]?.title || category) : 'Constitutional Rights';
    const totalQuestions = questions.length || 5;
    const percentage = Math.round((score / totalQuestions) * 100);

    const [confettiPieces, setConfettiPieces] = useState<Array<{ id: number; left: number; bg: string; delay: number }>>([]);
    const isPerfectScore = score === totalQuestions;

    useEffect(() => {
        // Auto-award badges
        if (percentage >= 60) {
            if (category === 'rights') {
                awardBadge('haki');
            }
            awardBadge('mwanafunzi');

            // Confetti trigger
            const colors = ['#c9a84c', '#10b981', '#ef4444', '#3b82f6', '#8b5cf6', '#ffffff'];
            const pieces = Array.from({ length: 35 }).map((_, i) => ({
                id: i,
                left: Math.random() * 100,
                bg: colors[Math.floor(Math.random() * colors.length)],
                delay: Math.random() * 0.8
            }));
            setConfettiPieces(pieces);
        }

        // Perfect score bonus
        if (isPerfectScore) {
            awardBadge('shujaa');
            saveUser({ xp: user.xp + 100 });
            showToast('⚡ Perfect Score! +100 Bonus XP awarded!', 'levelup');
        }
    }, []);

    const handleRetake = () => {
        if (!category) return;
        const qList = quizData[category]?.questions || questions;
        startQuiz(category, qList, true);
    };

    const handleShare = async () => {
        const shareData = {
            title: 'UongoZi Civic Quest',
            text: `I just scored ${score}/${totalQuestions} (${percentage}%) in the "${categoryTitle}" quest on UongoZi! Test your constitutional knowledge:`,
            url: window.location.href,
        };

        if (navigator.share) {
            try {
                await navigator.share(shareData);
            } catch {
                // User cancelled or share failed
            }
        } else {
            navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
            showToast('Result copied to clipboard!', 'info');
        }
    };

    const xpEarned = isReplay ? (score * 25) : (score * 50);

    return (
        <div id="results" className="screen active">
            {confettiPieces.length > 0 && (
                <div className="confetti-container">
                    {confettiPieces.map((p) => (
                        <div
                            key={p.id}
                            className="confetti-piece"
                            style={{
                                left: `${p.left}%`,
                                backgroundColor: p.bg,
                                animationDelay: `${p.delay}s`
                            }}
                        />
                    ))}
                </div>
            )}

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
                    {isPerfectScore ? '👑 Perfect Score!' : percentage >= 80 ? '🎉 Outstanding!' : percentage >= 50 ? '✨ Great Work!' : '💪 Keep Learning!'}
                </h2>
                <p className="results-subtitle">
                    You scored {percentage}% in <strong>{categoryTitle}</strong>. Keep practicing to become a certified Civic Ambassador!
                </p>

                <div className="xp-earned" style={{ display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center' }}>
                    <div>⚡ +{xpEarned} XP Gained {isReplay ? '(Half XP Replay)' : ''}</div>
                    {isPerfectScore && <div style={{ fontSize: '13px', color: 'var(--gold-light)' }}>🌟 +100 Bonus XP for Perfect Score!</div>}
                </div>

                {percentage >= 60 && (
                    <div className="badge-earned">
                        <div className="badge-icon">🎖️</div>
                        <div className="badge-text">
                            <h4>Mzalendo Quest Badge Unlocked!</h4>
                            <p>You've completed the <strong>{categoryTitle}</strong> civic quest.</p>
                        </div>
                    </div>
                )}

                <div className="results-actions">
                    <button className="btn-share-main" onClick={handleShare}>
                        <span>📤</span> Share Results
                    </button>
                    <button className="btn-secondary" style={{ backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff', border: '1px solid rgba(255,255,255,0.2)' }} onClick={handleRetake}>
                        🔄 Try Again (Retake)
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


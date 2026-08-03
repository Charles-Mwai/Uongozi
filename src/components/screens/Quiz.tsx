import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { quizData } from '../../data/quizData';

const Quiz: React.FC = () => {
    const { quizState, setQuizState, setCurrentScreen, saveUser, user, showToast } = useApp();
    const { questions, current, answered, category, isReplay, isAiGenerated } = quizState;
    const currentQuestion = questions[current];

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(30);
    const [floatXp, setFloatXp] = useState<number | null>(null);
    const [totalSessionXp, setTotalSessionXp] = useState<number>(0);

    const isAlreadyCompleted = isReplay || (category ? user.completedCategories?.includes(category) : false);
    const baseXpPerQuestion = isAlreadyCompleted ? 25 : 50;

    // Timer effect
    useEffect(() => {
        if (answered || timeLeft <= 0) return;
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    // Time out handling
                    setSelectedOption(null);
                    setIsCorrect(false);
                    setQuizState(q => ({ ...q, answered: true, comboCount: 0 }));
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, [answered, timeLeft, setQuizState]);

    if (!currentQuestion) return null;

    const useSwahili = user.lang === 'sw';
    const displayQuestionText = (useSwahili && currentQuestion.q_sw) ? currentQuestion.q_sw : currentQuestion.q;
    const displayOptions = (useSwahili && currentQuestion.options_sw && currentQuestion.options_sw.length === currentQuestion.options.length)
        ? currentQuestion.options_sw
        : currentQuestion.options;
    const displayExplanation = (useSwahili && currentQuestion.explanation_sw) ? currentQuestion.explanation_sw : currentQuestion.explanation;

    const handleOptionSelect = (index: number) => {
        if (answered) return;

        setSelectedOption(index);
        const correct = index === currentQuestion.correct;
        setIsCorrect(correct);

        let earnedThisQuestion = 0;
        let nextCombo = quizState.comboCount;

        if (correct) {
            nextCombo += 1;
            // Base XP
            earnedThisQuestion = baseXpPerQuestion;
            // Speed bonus (+10 if answered within 10s of start, i.e. timeLeft >= 20)
            if (timeLeft >= 20) {
                earnedThisQuestion += 10;
            }
            // Combo multiplier
            if (nextCombo >= 5) {
                earnedThisQuestion = Math.round(earnedThisQuestion * 2);
            } else if (nextCombo >= 3) {
                earnedThisQuestion = Math.round(earnedThisQuestion * 1.5);
            }

            setFloatXp(earnedThisQuestion);
            setTimeout(() => setFloatXp(null), 1000);
            setTotalSessionXp(prev => prev + earnedThisQuestion);
        } else {
            nextCombo = 0;
        }

        setQuizState(prev => ({
            ...prev,
            answered: true,
            score: correct ? prev.score + 1 : prev.score,
            comboCount: nextCombo
        }));
    };

    const handleNext = () => {
        if (current < questions.length - 1) {
            setQuizState(prev => ({
                ...prev,
                current: prev.current + 1,
                answered: false
            }));
            setSelectedOption(null);
            setIsCorrect(null);
            setTimeLeft(30);
        } else {
            // Quiz finished
            const earnedXP = totalSessionXp || (quizState.score * baseXpPerQuestion);
            const newCompleted = user.completedCategories?.includes(category || '')
                ? user.completedCategories
                : [...(user.completedCategories || []), category || ''];

            // Update category progress
            const updatedProgress = { ...(user.categoryProgress || {}), [category || '']: questions.length };

            saveUser({
                xp: user.xp + earnedXP,
                answered: user.answered + questions.length,
                completedCategories: newCompleted,
                categoryProgress: updatedProgress,
            });

            if (earnedXP > 0) {
                showToast(`+${earnedXP} XP earned in quest!`, 'xp');
            }

            setCurrentScreen('results');
        }
    };

    const getOptionClass = (index: number) => {
        if (!answered) return '';
        if (index === currentQuestion.correct) return 'correct';
        if (index === selectedOption && !isCorrect) return 'wrong';
        return '';
    };

    return (
        <div id="quiz" className="screen active">
            <div className="quiz-header">
                <button className="back-btn" onClick={() => setCurrentScreen('home')}>←</button>
                <div className="quiz-title">{category ? (quizData[category]?.title || category) : ''}</div>
                <div className="quiz-counter">{current + 1}/{questions.length}</div>
            </div>

            <div className="quiz-progress-bar">
                <div
                    className="quiz-progress-fill"
                    style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                ></div>
            </div>

            {/* 30s Timer Fill Bar */}
            <div className="quiz-timer-bar">
                <div
                    className="quiz-timer-fill"
                    style={{ width: `${(timeLeft / 30) * 100}%` }}
                ></div>
            </div>

            <div className="quiz-body">
                <div className="quiz-top-pills">
                    <div className="question-num">Question {current + 1} of {questions.length} • ⏱️ {timeLeft}s</div>
                    <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                        {isAiGenerated && (
                            <span className="replay-pill" style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', color: '#fff' }}>
                                ✨ AI Quest
                            </span>
                        )}
                        {isAlreadyCompleted && (
                            <span className="replay-pill">🔄 Replay (Half XP)</span>
                        )}
                        {quizState.comboCount >= 2 && (
                            <span className="combo-banner">
                                🔥 {quizState.comboCount}x Combo!
                            </span>
                        )}
                    </div>
                </div>

                <h2 className="question-text">{displayQuestionText}</h2>

                <div className="options-list" style={{ position: 'relative' }}>
                    {floatXp !== null && (
                        <div className="xp-popup-container">
                            <div className="xp-popup-float">+{floatXp} XP!</div>
                        </div>
                    )}

                    {displayOptions.map((option, index) => (
                        <button
                            key={index}
                            className={`option-btn ${getOptionClass(index)}`}
                            onClick={() => handleOptionSelect(index)}
                            disabled={answered}
                        >
                            <div className="option-letter">{String.fromCharCode(65 + index)}</div>
                            <div className="option-text">{option}</div>
                        </button>
                    ))}
                </div>

                {answered && (
                    <div className={`feedback-card ${isCorrect ? 'correct-fb' : 'wrong-fb'}`} style={{ display: 'block' }}>
                        <div className="feedback-title">
                            {isCorrect ? '✨ Correct!' : timeLeft === 0 ? '⏰ Time Up!' : '❌ Not quite right'}
                        </div>
                        <p className="feedback-text">{displayExplanation}</p>
                        <div className="article-tag">📖 {currentQuestion.article}</div>
                    </div>
                )}
            </div>

            <button
                className="next-btn"
                style={{ display: answered ? 'block' : 'none' }}
                onClick={handleNext}
            >
                {current === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
            </button>
        </div>
    );
};

export default Quiz;



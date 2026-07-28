import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { quizData } from '../../data/quizData';

const Quiz: React.FC = () => {
    const { quizState, setQuizState, setCurrentScreen, saveUser, user } = useApp();
    const { questions, current, answered } = quizState;
    const currentQuestion = questions[current];

    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    if (!currentQuestion) return null;

    const handleOptionSelect = (index: number) => {
        if (answered) return;

        setSelectedOption(index);
        const correct = index === currentQuestion.correct;
        setIsCorrect(correct);

        setQuizState(prev => ({
            ...prev,
            answered: true,
            score: correct ? prev.score + 1 : prev.score
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
        } else {
            // Quiz finished
            const earnedXP = quizState.score * 50;
            const newCompleted = user.completedCategories?.includes(quizState.category || '')
                ? user.completedCategories
                : [...(user.completedCategories || []), quizState.category || ''];
            saveUser({
                xp: user.xp + earnedXP,
                answered: user.answered + questions.length,
                completedCategories: newCompleted
            });
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
                <div className="quiz-title">{quizState.category ? (quizData[quizState.category]?.title || quizState.category) : ''}</div>
                <div className="quiz-counter">{current + 1}/{questions.length}</div>
            </div>

            <div className="quiz-progress-bar">
                <div
                    className="quiz-progress-fill"
                    style={{ width: `${((current + 1) / questions.length) * 100}%` }}
                ></div>
            </div>

            <div className="quiz-body">
                <div className="question-num">Question {current + 1} of {questions.length}</div>
                <h2 className="question-text">{currentQuestion.q}</h2>

                <div className="options-list">
                    {currentQuestion.options.map((option, index) => (
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
                            {isCorrect ? '✨ Correct!' : '❌ Not quite right'}
                        </div>
                        <p className="feedback-text">{currentQuestion.explanation}</p>
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

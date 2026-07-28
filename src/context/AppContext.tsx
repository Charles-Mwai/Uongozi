import React, { createContext, useContext, useState, useEffect } from 'react';
import type { User, Screen, QuizState, Question } from '../types';

interface AppContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    currentScreen: Screen;
    setCurrentScreen: (screen: Screen) => void;
    quizState: QuizState;
    setQuizState: React.Dispatch<React.SetStateAction<QuizState>>;
    startQuiz: (category: string, questions: Question[]) => void;
    saveUser: (updates: Partial<User>) => void;
    initialQuery: string;
    setInitialQuery: (query: string) => void;
}

const defaultUser: User = {
    name: '',
    nickname: '',
    county: '',
    age: '',
    gender: '',
    lang: 'en',
    xp: 0,
    level: 1,
    streak: 0,
    answered: 0,
    badges: [],
    profileCollected: false,
    completedCategories: [],
    lastActiveDate: ''
};

const defaultQuiz: QuizState = {
    category: null,
    questions: [],
    current: 0,
    score: 0,
    answered: false
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(defaultUser);
    const [currentScreen, setCurrentScreen] = useState<Screen>('langSelect');
    const [quizState, setQuizState] = useState<QuizState>(defaultQuiz);
    const [initialQuery, setInitialQuery] = useState('');

    // Load user from localStorage and update streak
    useEffect(() => {
        const saved = localStorage.getItem('uongozi_user');
        if (saved) {
            const parsed: User = { ...defaultUser, ...JSON.parse(saved) };
            const today = new Date().toDateString();
            const lastActive = parsed.lastActiveDate;

            if (lastActive && lastActive !== today) {
                const lastDate = new Date(lastActive);
                const todayDate = new Date(today);
                const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
                if (diffDays === 1) {
                    parsed.streak += 1;
                } else if (diffDays > 1) {
                    parsed.streak = 1;
                }
            } else if (!lastActive) {
                parsed.streak = 1;
            }

            parsed.lastActiveDate = today;
            localStorage.setItem('uongozi_user', JSON.stringify(parsed));
            setUser(parsed);
            if (parsed.profileCollected) {
                setCurrentScreen('home');
            } else {
                setCurrentScreen('splash');
            }
        }
    }, []);

    const saveUser = (updates: Partial<User>) => {
        const merged = { ...user, ...updates };
        // Auto-calculate level from XP (1000 XP per level)
        merged.level = Math.floor(merged.xp / 1000) + 1;
        // Update last active date
        merged.lastActiveDate = new Date().toDateString();
        setUser(merged);
        localStorage.setItem('uongozi_user', JSON.stringify(merged));
    };

    const startQuiz = (category: string, questions: Question[]) => {
        setQuizState({
            category,
            questions,
            current: 0,
            score: 0,
            answered: false
        });
        setCurrentScreen('quiz');
    };

    return (
        <AppContext.Provider value={{
            user,
            setUser,
            currentScreen,
            setCurrentScreen,
            quizState,
            setQuizState,
            startQuiz,
            saveUser,
            initialQuery,
            setInitialQuery
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within AppProvider');
    return context;
};

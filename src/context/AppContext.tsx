import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { User, Screen, QuizState, Question, Toast } from '../types';
import { BADGE_DEFINITIONS } from '../data/badgeData';
import { shuffleQuestionOptions } from '../utils/quizUtils';
import { submitUserScore } from '../services/leaderboardService';

interface AppContextType {
    user: User;
    setUser: React.Dispatch<React.SetStateAction<User>>;
    currentScreen: Screen;
    setCurrentScreen: (screen: Screen) => void;
    quizState: QuizState;
    setQuizState: React.Dispatch<React.SetStateAction<QuizState>>;
    startQuiz: (category: string, questions: Question[], isReplay?: boolean, isAiGenerated?: boolean) => void;
    saveUser: (updates: Partial<User>) => User;
    awardBadge: (badgeId: string) => void;
    toasts: Toast[];
    showToast: (message: string, type: Toast['type']) => void;
    levelUpInfo: { level: number; title: string } | null;
    clearLevelUp: () => void;
    initialQuery: string;
    setInitialQuery: (query: string) => void;
}

const defaultUser: User = {
    user_id: '',
    name: '',
    nickname: '',
    county: '',
    age: '',
    gender: '',
    lang: 'en',
    xp: 0,
    level: 1,
    streak: 0,
    bestStreak: 0,
    answered: 0,
    badges: [],
    profileCollected: false,
    completedCategories: [],
    lastActiveDate: '',
    lastChallengeDate: '',
    categoryProgress: {},
    seenQuestionIds: [],
};

const defaultQuiz: QuizState = {
    category: null,
    questions: [],
    current: 0,
    score: 0,
    answered: false,
    comboCount: 0,
    isReplay: false,
    isAiGenerated: false,
};

const LEVEL_TITLE_MAP: Record<number, string> = {
    1: 'Mwananchi', 2: 'Mzalendo', 3: 'Kiongozi', 4: 'Mtetezi',
    5: 'Msimamizi', 6: 'Walinzi', 7: 'Bingwa', 8: 'Shujaa', 9: 'Mwalimu', 10: 'Rais',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User>(defaultUser);
    const [currentScreen, setCurrentScreen] = useState<Screen>('langSelect');
    const [quizState, setQuizState] = useState<QuizState>(defaultQuiz);
    const [initialQuery, setInitialQuery] = useState('');
    const [toasts, setToasts] = useState<Toast[]>([]);
    const [toastCounter, setToastCounter] = useState(0);
    const [levelUpInfo, setLevelUpInfo] = useState<{ level: number; title: string } | null>(null);

    // Load user from localStorage and update streak on boot
    useEffect(() => {
        const saved = localStorage.getItem('uongozi_user');
        let parsed: User;

        if (saved) {
            parsed = { ...defaultUser, ...JSON.parse(saved) };
        } else {
            parsed = { ...defaultUser };
        }

        if (!parsed.user_id) {
            parsed.user_id = 'usr-' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
        }
        if (!parsed.seenQuestionIds) parsed.seenQuestionIds = [];

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

        parsed.bestStreak = Math.max(parsed.bestStreak || 0, parsed.streak);
        parsed.lastActiveDate = today;
        localStorage.setItem('uongozi_user', JSON.stringify(parsed));
        setUser(parsed);

        if (parsed.nickname) {
            submitUserScore(parsed);
        }

        if (parsed.profileCollected) {
            setCurrentScreen('home');
        } else {
            setCurrentScreen('splash');
        }
    }, []);

    const showToast = useCallback((message: string, type: Toast['type']) => {
        const id = toastCounter + 1;
        setToastCounter(id);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, 3000);
    }, [toastCounter]);

    const clearLevelUp = useCallback(() => setLevelUpInfo(null), []);

    // Check and auto-award threshold-based badges after any user update
    const checkAndAwardBadges = useCallback((updatedUser: User): string[] => {
        const newBadges: string[] = [];
        for (const badge of BADGE_DEFINITIONS) {
            if (!updatedUser.badges.includes(badge.id) && badge.check(updatedUser)) {
                newBadges.push(badge.id);
            }
        }
        return newBadges;
    }, []);

    const saveUser = useCallback((updates: Partial<User>): User => {
        setUser(prev => {
            const merged = { ...prev, ...updates };
            if (!merged.user_id) {
                merged.user_id = 'usr-' + Math.random().toString(36).substring(2, 9) + Date.now().toString(36);
            }
            merged.level = Math.floor(merged.xp / 1000) + 1;
            merged.lastActiveDate = new Date().toDateString();

            // Check for level-up
            const oldLevel = prev.level;
            if (merged.level > oldLevel) {
                const title = LEVEL_TITLE_MAP[Math.min(merged.level, 10)] || 'Rais';
                setTimeout(() => setLevelUpInfo({ level: merged.level, title }), 600);
            }

            // Auto-award threshold badges
            const newBadges = checkAndAwardBadges(merged);
            if (newBadges.length > 0) {
                merged.badges = [...merged.badges, ...newBadges];
                newBadges.forEach(id => {
                    const def = BADGE_DEFINITIONS.find(b => b.id === id);
                    if (def) {
                        setTimeout(() => showToast(`${def.emoji} ${def.name} badge unlocked!`, 'badge'), 1000);
                    }
                });
            }

            localStorage.setItem('uongozi_user', JSON.stringify(merged));

            // Sync score to live backend leaderboard
            if (merged.nickname) {
                submitUserScore(merged);
            }

            return merged;
        });
        // Return snapshot for callers that need it immediately
        const snap = { ...user, ...updates };
        snap.level = Math.floor(snap.xp / 1000) + 1;
        return snap;
    }, [user, checkAndAwardBadges, showToast]);


    const awardBadge = useCallback((badgeId: string) => {
        setUser(prev => {
            if (prev.badges.includes(badgeId)) return prev;
            const updated = { ...prev, badges: [...prev.badges, badgeId] };
            localStorage.setItem('uongozi_user', JSON.stringify(updated));
            const def = BADGE_DEFINITIONS.find(b => b.id === badgeId);
            if (def) {
                setTimeout(() => showToast(`${def.emoji} ${def.name} badge unlocked!`, 'badge'), 500);
            }
            return updated;
        });
    }, [showToast]);

    const startQuiz = useCallback((category: string, questions: Question[], isReplay = false, isAiGenerated = false) => {
        // Dynamically shuffle options for every question so choices move positions
        const prepared = questions.map(q => shuffleQuestionOptions(q));
        const shuffled = [...prepared].sort(() => Math.random() - 0.5);

        // Record seen question IDs to prevent repeating seen questions in future sessions
        const newQuestionIds = questions.map(q => q.id).filter(Boolean);
        setUser(prev => {
            const updatedSeen = Array.from(new Set([...(prev.seenQuestionIds || []), ...newQuestionIds]));
            const updated = { ...prev, seenQuestionIds: updatedSeen };
            localStorage.setItem('uongozi_user', JSON.stringify(updated));
            return updated;
        });

        setQuizState({
            category,
            questions: shuffled,
            current: 0,
            score: 0,
            answered: false,
            comboCount: 0,
            isReplay,
            isAiGenerated,
        });
        setCurrentScreen('quiz');
    }, []);


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
            awardBadge,
            toasts,
            showToast,
            levelUpInfo,
            clearLevelUp,
            initialQuery,
            setInitialQuery,
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

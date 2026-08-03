export type Screen = 'splash' | 'langSelect' | 'onboarding' | 'home' | 'quiz' | 'results' | 'leaderboard' | 'ask' | 'profile';

export interface User {
  name: string;
  nickname: string;
  county: string;
  age: string;
  gender: string;
  lang: string;
  xp: number;
  level: number;
  streak: number;
  bestStreak: number;
  answered: number;
  badges: string[];
  profileCollected: boolean;
  completedCategories: string[];
  lastActiveDate: string;
  lastChallengeDate: string;
  categoryProgress: Record<string, number>; // categoryId -> questions answered
}

export interface Question {
  q: string;
  options: string[];
  correct: number;
  explanation: string;
  article: string;
}

export interface QuizCategory {
  title: string;
  swTitle?: string;
  color: string;
  icon: string;
  questions: Question[];
}

export interface QuizState {
  category: string | null;
  questions: Question[];
  current: number;
  score: number;
  answered: boolean;
  comboCount: number;
  isReplay: boolean;
}

export interface LeaderboardEntry {
  name: string;
  level: string;
  xp: number;
  county: string;
  color: string;
}

export interface Toast {
  id: number;
  message: string;
  type: 'xp' | 'badge' | 'streak' | 'levelup' | 'info';
}


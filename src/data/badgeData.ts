// Centralized badge definitions — single source of truth for all badge logic

export interface BadgeDefinition {
    id: string;
    name: string;
    emoji: string;
    description: string;
    check: (user: { xp: number; streak: number; answered: number; completedCategories: string[]; profileCollected: boolean; badges: string[] }) => boolean;
}

export const BADGE_DEFINITIONS: BadgeDefinition[] = [
    {
        id: 'mwananchi',
        name: 'Mwananchi',
        emoji: '🇰🇪',
        description: 'Complete your profile to join UongoZi.',
        check: (u) => u.profileCollected,
    },
    {
        id: 'mwanafunzi',
        name: 'Mwanafunzi',
        emoji: '📚',
        description: 'Complete your first quiz category.',
        check: (u) => u.completedCategories.length >= 1,
    },
    {
        id: 'mzalendo',
        name: 'Mzalendo',
        emoji: '🏅',
        description: 'Reach 500 XP.',
        check: (u) => u.xp >= 500,
    },
    {
        id: 'mpiganaji',
        name: 'Mpiganaji',
        emoji: '🔥',
        description: 'Maintain a 7-day login streak.',
        check: (u) => u.streak >= 7,
    },
    {
        id: 'haki',
        name: 'Bingwa wa Haki',
        emoji: '🛡️',
        description: 'Complete the Basic Rights & Freedoms quiz.',
        check: (u) => u.completedCategories.includes('rights'),
    },
    {
        id: 'kiongozi',
        name: 'Kiongozi',
        emoji: '⚖️',
        description: 'Complete all 5 quiz categories.',
        check: (u) => u.completedCategories.length >= 5,
    },
    {
        id: 'expert',
        name: 'Law Expert',
        emoji: '📜',
        description: 'Reach 2,000 XP.',
        check: (u) => u.xp >= 2000,
    },
    {
        id: 'voter',
        name: 'Master Voter',
        emoji: '🗳️',
        description: 'Answer 50 or more questions total.',
        check: (u) => u.answered >= 50,
    },
    {
        id: 'shujaa',
        name: 'Shujaa',
        emoji: '🦁',
        description: 'Score perfectly (5/5) on any quiz category.',
        check: (u) => u.badges.includes('shujaa'),
    },
    {
        id: 'rais',
        name: 'Rais',
        emoji: '👑',
        description: 'Reach Level 10 (10,000 XP).',
        check: (u) => u.xp >= 10000,
    },
];

export const LEVEL_TITLES: Record<number, string> = {
    1: 'Mwananchi',
    2: 'Mzalendo',
    3: 'Kiongozi',
    4: 'Mtetezi',
    5: 'Msimamizi',
    6: 'Walinzi',
    7: 'Bingwa',
    8: 'Shujaa',
    9: 'Mwalimu',
    10: 'Rais',
};

export const getLevelTitle = (level: number): string => {
    return LEVEL_TITLES[Math.min(level, 10)] || 'Rais';
};

import type { Question } from '../types';

/**
 * Shuffles options for a given question and returns a new Question object
 * with re-mapped `correct` index so the answer position changes every time.
 */
export function shuffleQuestionOptions(question: Question): Question {
    const originalOptions = question.options;
    const originalSwOptions = question.options_sw;
    const correctAnswerText = originalOptions[question.correct];

    // Create an array of indices [0, 1, 2, 3] and shuffle them
    const indices = originalOptions.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
    }

    const newOptions = indices.map(i => originalOptions[i]);
    const newSwOptions = originalSwOptions ? indices.map(i => originalSwOptions[i]) : undefined;
    const newCorrectIndex = newOptions.indexOf(correctAnswerText);

    return {
        ...question,
        options: newOptions,
        options_sw: newSwOptions,
        correct: newCorrectIndex,
    };
}

/**
 * Selects a batch of fresh questions for a category.
 * Prioritizes questions that the user has not seen yet.
 */
export function getFreshQuestionsForCategory(
    allCategoryQuestions: Question[],
    seenQuestionIds: string[] = [],
    count: number = 5
): Question[] {
    const unseen = allCategoryQuestions.filter(q => !seenQuestionIds.includes(q.id));

    let pool: Question[];
    if (unseen.length >= count) {
        pool = unseen;
    } else if (unseen.length > 0) {
        // Mix unseen questions with a random sample of seen questions
        const seen = allCategoryQuestions.filter(q => seenQuestionIds.includes(q.id));
        const needed = count - unseen.length;
        const shuffledSeen = [...seen].sort(() => Math.random() - 0.5);
        pool = [...unseen, ...shuffledSeen.slice(0, needed)];
    } else {
        // If all questions have been seen, shuffle all available questions
        pool = [...allCategoryQuestions];
    }

    // Pick 'count' questions randomly from pool
    const selected = [...pool].sort(() => Math.random() - 0.5).slice(0, count);

    // Shuffle options for each selected question
    return selected.map(q => shuffleQuestionOptions(q));
}

/**
 * Deterministically picks a Daily Challenge question based on the date string seed
 */
export function getDailyChallengeQuestion(allQuestions: Question[], dateStr: string): Question {
    if (!allQuestions.length) {
        throw new Error('No questions available for daily challenge');
    }

    let hash = 0;
    for (let i = 0; i < dateStr.length; i++) {
        hash = (hash << 5) - hash + dateStr.charCodeAt(i);
        hash |= 0;
    }
    const index = Math.abs(hash) % allQuestions.length;
    return shuffleQuestionOptions(allQuestions[index]);
}

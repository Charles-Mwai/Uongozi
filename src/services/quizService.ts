import type { Question } from '../types';
import { quizData } from '../data/quizData';
import { getFreshQuestionsForCategory } from '../utils/quizUtils';

/**
 * Service to fetch AI-generated questions grounded in the Constitution of Kenya 2010.
 * Fallbacks seamlessly to the local dynamic constitutional question bank if API call fails or offline.
 */
export async function fetchAiQuestions(category: string, lang: string = 'en', count: number = 5): Promise<Question[]> {
    try {
        const response = await fetch('/api/quiz/generate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ category, lang, count }),
        });

        if (response.ok) {
            const data = await response.json();
            if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
                return data.questions.map((q: any, index: number) => ({
                    id: `ai-${category}-${Date.now()}-${index}`,
                    q: q.q || q.question,
                    q_sw: q.q_sw,
                    options: q.options || [],
                    options_sw: q.options_sw,
                    correct: typeof q.correct === 'number' ? q.correct : 0,
                    explanation: q.explanation || 'Based on the Constitution of Kenya 2010.',
                    explanation_sw: q.explanation_sw,
                    article: q.article || 'Constitution of Kenya 2010',
                    category,
                }));
            }
        }
    } catch (err) {
        console.warn('AI quiz generation failed or offline. Falling back to dynamic question bank:', err);
    }

    // Fallback to local constitutional question bank
    const categoryQuestions = quizData[category]?.questions || [];
    return getFreshQuestionsForCategory(categoryQuestions, [], count);
}

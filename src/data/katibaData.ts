export const katibaAnswers: Record<string, { answer: string; article: string }> = {
    "arrest": {
        answer: "If police arrest you, Article 49 gives you these rights immediately:\n\n• Be told WHY you're being arrested (in your language)\n• Remain silent (you don't have to answer questions)\n• Communicate with a lawyer of your choice\n• Not be compelled to make a confession\n• Be released or taken to court within 24 hours\n\nRemember: You can say 'Mimi nina haki ya kimya' (I have the right to remain silent).",
        article: "Article 49 — Rights of Arrested Persons"
    },
    "mps": {
        answer: "Kenya's National Assembly has 349 Members of Parliament:\n\n• 290 elected constituency representatives\n• 47 women representatives (one per county)\n• 12 nominated members\n\nThe Senate has 67 members:\n• 47 elected county senators\n• 16 nominated women\n• 2 youth representatives\n• 2 persons with disabilities",
        article: "Article 97 & 98 — Composition of Parliament"
    },
    "devolution": {
        answer: "Devolution means transferring power from central government in Nairobi to Kenya's 47 counties. Each county has:\n\n• An elected Governor (executive)\n• A County Assembly (legislature)\n• Its own budget (at least 15% of national revenue)\n• Power over local services: health, agriculture, roads\n\nThe goal: bring services and decisions closer to citizens, not centralize everything in Nairobi.",
        article: "Chapter 11 — Devolved Government"
    },
    "article 10": {
        answer: "Article 10 lists Kenya's National Values and Principles of Governance. ALL state organs and officers MUST apply these:\n\n• Patriotism and national unity\n• Sharing and devolution of power\n• Rule of law, democracy, participation\n• Human dignity, equity, social justice\n• Inclusiveness and non-discrimination\n• Good governance and integrity\n• Sustainable development\n\nThese bind everyone — from the President to your local MCA.",
        article: "Article 10 — National Values and Principles"
    },
    "corruption": {
        answer: "You can report corruption through:\n\n• Ethics and Anti-Corruption Commission (EACC): 0800 720 882 (free)\n• Director of Public Prosecutions (DPP)\n• Kenya Police (though for systemic corruption, EACC is better)\n• Your county assembly representative\n• Directly to the Auditor General for public funds misuse\n\nArticle 73 requires all public officials to maintain integrity. Article 232 demands financial transparency.",
        article: "Article 73 & 232 — Integrity and Transparency"
    }
};

export const getKatibaAnswer = (question: string) => {
    const q = question.toLowerCase();
    if (q.includes('arrest') || q.includes('police') || q.includes('rights if')) return katibaAnswers['arrest'];
    if (q.includes('mp') || q.includes('member') || q.includes('parliament') || q.includes('assembly')) return katibaAnswers['mps'];
    if (q.includes('devolution') || q.includes('county')) return katibaAnswers['devolution'];
    if (q.includes('article 10') || q.includes('national values')) return katibaAnswers['article 10'];
    if (q.includes('corruption') || q.includes('report') || q.includes('bribery')) return katibaAnswers['corruption'];
    return {
        answer: "Great question! The Constitution of Kenya 2010 covers a wide range of rights and governance structures. For the most accurate answer, I recommend visiting:\n\n• kenyalaw.org — Full constitutional text\n• katibainstitute.org — Plain language guides\n\nOr try one of the quiz categories to learn more about this topic!",
        article: "Constitution of Kenya, 2010"
    };
};

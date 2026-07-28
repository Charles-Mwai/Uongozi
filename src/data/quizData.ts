import type { QuizCategory } from '../types';

export const quizData: Record<string, QuizCategory> = {
    rights: {
        title: "Basic Rights & Freedoms",
        swTitle: "Haki za Msingi na Uhuru",
        color: "#16a34a",
        icon: "🛡️",
        questions: [
            {
                q: "Under Article 49 of Kenya's Constitution, when must you be informed of the reason for your arrest?",
                options: ["Within 24 hours", "Promptly, at time of arrest", "Before you're taken to court", "When you request it"],
                correct: 1,
                explanation: "Article 49(1)(a) states that an arrested person has the right to be informed promptly of the reason for arrest, in a language they understand. This is immediate — not hours later.",
                article: "Article 49 — Rights of Arrested Persons"
            },
            {
                q: "How long can police hold you without charging you or presenting you to court?",
                options: ["24 hours", "48 hours", "72 hours", "7 days"],
                correct: 0,
                explanation: "Article 49(1)(f) gives you the right to be released or brought before a court within 24 hours of arrest. If the arrest happens outside court hours, within 24 hours of the next court session.",
                article: "Article 49(1)(f) — Right to appear before court"
            },
            {
                q: "Article 33 of the Constitution protects your right to:",
                options: ["Free healthcare", "Freedom of expression", "Free education", "Own property"],
                correct: 1,
                explanation: "Article 33 protects freedom of expression — the right to seek, receive, or impart information or ideas. This includes freedom of the press and of artistic creativity.",
                article: "Article 33 — Freedom of Expression"
            },
            {
                q: "Which article of Kenya's Constitution outlines the right to education?",
                options: ["Article 40", "Article 43", "Article 50", "Article 27"],
                correct: 1,
                explanation: "Article 43(1)(f) guarantees every person the right to education. This is part of the economic and social rights — including health, housing, food, water and sanitation.",
                article: "Article 43 — Economic and Social Rights"
            },
            {
                q: "The right to protest and picket peacefully is protected under which Article?",
                options: ["Article 36", "Article 37", "Article 38", "Article 39"],
                correct: 1,
                explanation: "Article 37 gives every person the right to assemble, demonstrate, picket, and present petitions to public authorities — as long as it's done peacefully.",
                article: "Article 37 — Assembly, Demonstration, Picketing"
            }
        ]
    },
    voting: {
        title: "Elections & Voting",
        swTitle: "Uchaguzi na Haki ya Kupiga Kura",
        color: "#ea580c",
        icon: "🗳️",
        questions: [
            {
                q: "What is the minimum age to vote in Kenya's general elections?",
                options: ["16 years", "18 years", "21 years", "25 years"],
                correct: 1,
                explanation: "Article 83 of the Constitution states that a person is eligible to vote if they are 18 years or older, is a Kenyan citizen, and is registered as a voter.",
                article: "Article 83 — Qualifications for Voters"
            },
            {
                q: "How often are general elections held in Kenya?",
                options: ["Every 3 years", "Every 4 years", "Every 5 years", "Every 6 years"],
                correct: 2,
                explanation: "Article 101 of the Constitution states that a general election shall be held on the second Tuesday of August every five years.",
                article: "Article 101 — Elections"
            },
            {
                q: "What is the role of the IEBC (Independent Electoral and Boundaries Commission)?",
                options: ["Making laws", "Conducting elections and referenda", "Judging election disputes", "Printing currency"],
                correct: 1,
                explanation: "The IEBC is established under Article 88 to conduct elections and referenda, register voters, settle electoral disputes at the constituency level, and regulate political parties.",
                article: "Article 88 — Independent Electoral Commission"
            },
            {
                q: "In a presidential election, what percentage of votes must the winner receive?",
                options: ["More than 40%", "More than 50% + 25% in 24 counties", "More than 51%", "More than 60%"],
                correct: 1,
                explanation: "Article 138(4) requires the winning presidential candidate to receive more than half of all votes cast AND at least 25% of votes in at least 24 of Kenya's 47 counties.",
                article: "Article 138 — Presidential Elections"
            },
            {
                q: "What happens if no presidential candidate wins outright in the first round?",
                options: ["The incumbent stays", "Parliament picks the winner", "A fresh election is held", "A runoff is held within 30 days"],
                correct: 3,
                explanation: "Article 138(5) states that if no candidate receives the required threshold, a fresh election must be held within 30 days between the top two candidates.",
                article: "Article 138(5) — Presidential Runoff"
            }
        ]
    },
    govt: {
        title: "How Government Works",
        swTitle: "Muundo wa Serikali na Uongozi",
        color: "#2563eb",
        icon: "🏛️",
        questions: [
            {
                q: "Kenya's Constitution establishes how many arms of government?",
                options: ["Two", "Three", "Four", "Five"],
                correct: 1,
                explanation: "Article 1(3) establishes three arms: the Legislature (Parliament), the Executive (President + Cabinet), and the Judiciary (courts). This separation prevents any one branch from having too much power.",
                article: "Article 1(3) — Sovereign Power"
            },
            {
                q: "How many counties does Kenya have under the devolved system?",
                options: ["40", "42", "47", "54"],
                correct: 2,
                explanation: "Kenya has 47 counties established under the First Schedule of the Constitution. Each county has its own assembly, governor, and budget to bring services closer to the people.",
                article: "Article 6 + First Schedule — Devolution"
            },
            {
                q: "What is the Senate's PRIMARY role in Kenya's Parliament?",
                options: ["Passing the national budget", "Protecting county interests", "Appointing judges", "Declaring war"],
                correct: 1,
                explanation: "Article 96 states the Senate protects the interests of the counties and determines questions about county governments. It is specifically built for devolution.",
                article: "Article 96 — Role of the Senate"
            },
            {
                q: "How many Members of the National Assembly are there?",
                options: ["290", "350", "349 (290+47+12)", "210"],
                correct: 2,
                explanation: "The National Assembly has 290 constituency representatives + 47 women representatives (one per county) + 12 nominated members = 349 total members (Article 97).",
                article: "Article 97 — Composition of National Assembly"
            },
            {
                q: "What does 'devolution' mean in Kenya's context?",
                options: ["Removing powers from leaders", "Transferring power & resources to counties", "Dissolving Parliament", "Federalism"],
                correct: 1,
                explanation: "Devolution (Chapter 11) transfers political, administrative and financial powers to county governments, ensuring services and decision-making are closer to citizens, not centralized in Nairobi.",
                article: "Chapter 11 — Devolved Government"
            }
        ]
    },
    budget: {
        title: "Public Budgeting",
        swTitle: "Matumizi ya Pesa za Umma",
        color: "#7c3aed",
        icon: "💰",
        questions: [
            {
                q: "Who is responsible for preparing Kenya's national budget estimates?",
                options: ["The President", "The National Treasury", "Parliament", "The Auditor General"],
                correct: 1,
                explanation: "The National Treasury (Cabinet Secretary for Finance) prepares the budget estimates. But Parliament must debate and approve them through the Appropriations Act under Article 221.",
                article: "Article 221 — Budget Estimates"
            },
            {
                q: "What percentage of audited national revenue must be allocated to county governments?",
                options: ["10%", "At least 15%", "25%", "50%"],
                correct: 1,
                explanation: "Article 203(2) requires that counties receive at least 15% of the most recently audited national revenue annually.",
                article: "Article 203 — Equitable Share"
            },
            {
                q: "What is the NG-CDF (National Government Constituencies Development Fund) used for?",
                options: ["MP salaries", "Constituency development projects", "National defense", "Political campaigns"],
                correct: 1,
                explanation: "The NG-CDF allocates funds directly to constituencies for community development projects — schools, health centers, boreholes, and bursaries.",
                article: "NG-CDF Act, 2015"
            },
            {
                q: "Which office is responsible for auditing government spending and public funds?",
                options: ["National Treasury", "Ethics and Anti-Corruption Commission", "Office of the Auditor General", "Controller of Budget"],
                correct: 2,
                explanation: "The Auditor General (Article 229) audits government accounts and reports to Parliament. They check whether public money was spent legally and transparently.",
                article: "Article 229 — Auditor General"
            },
            {
                q: "Citizens have the right to participate in budget processes under which principle?",
                options: ["Article 10 — National Values", "Article 201 — Principles of Public Finance", "Article 35 — Access to Information", "All of the above"],
                correct: 3,
                explanation: "Article 201(a) and (d) establish public participation and financial transparency as core principles. Article 10 makes public participation a national value. Article 35 gives you the right to information.",
                article: "Article 201 — Principles of Public Finance"
            }
        ]
    },
    katiba: {
        title: "The Constitution of Kenya",
        swTitle: "Katiba ya Kenya 2010",
        color: "#be185d",
        icon: "📜",
        questions: [
            {
                q: "In what year was Kenya's current Constitution promulgated?",
                options: ["2008", "2009", "2010", "2012"],
                correct: 2,
                explanation: "Kenya's Constitution was promulgated on 27 August 2010 after being approved by 67% of voters in a referendum held on 4 August 2010. It replaced the 1969 Constitution.",
                article: "Preamble — Constitution of Kenya 2010"
            },
            {
                q: "What does Article 10 of the Constitution establish?",
                options: ["The right to vote", "National values and principles of governance", "Freedom of movement", "Devolution"],
                correct: 1,
                explanation: "Article 10 lists Kenya's national values: patriotism, democracy, human dignity, equity, social justice, inclusiveness, equality, human rights, non-discrimination, and good governance.",
                article: "Article 10 — National Values and Principles"
            },
            {
                q: "The Constitution declares that sovereign power belongs to:",
                options: ["The President", "Parliament", "The People of Kenya", "The Judiciary"],
                correct: 2,
                explanation: "Article 1(1) is clear: 'All sovereign power belongs to the people of Kenya.' The people exercise this power directly or through elected representatives.",
                article: "Article 1 — Sovereignty of the People"
            },
            {
                q: "How many chapters does Kenya's 2010 Constitution have?",
                options: ["15", "18", "20", "22"],
                correct: 1,
                explanation: "The Constitution of Kenya 2010 has 18 chapters covering everything from the Bill of Rights, devolution, land, environment, leadership, finance, and national security.",
                article: "Structure — Constitution of Kenya 2010"
            },
            {
                q: "What is required to amend protected clauses of the Constitution by popular initiative?",
                options: ["Simple majority in Parliament", "1 million registered voters + county assembly approvals + referendum", "Court approval only", "Cabinet vote"],
                correct: 1,
                explanation: "Article 257 requires 1 million registered voters to sign, approval by at least 24 county assemblies, Parliament vote, and a public referendum.",
                article: "Article 257 — Amendment by Popular Initiative"
            }
        ]
    }
};

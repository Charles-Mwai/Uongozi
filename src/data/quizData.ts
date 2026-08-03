import type { QuizCategory } from '../types';

export const quizData: Record<string, QuizCategory> = {
    rights: {
        title: "Basic Rights & Freedoms",
        swTitle: "Haki za Msingi na Uhuru",
        color: "#16a34a",
        icon: "🛡️",
        questions: [
            {
                id: "rights-1",
                q: "Under Article 49 of Kenya's Constitution, when must you be informed of the reason for your arrest?",
                q_sw: "Chini ya Ibara ya 49 ya Katiba ya Kenya, ni LINI unapapaswa kuarifiwa sababu ya kukamatwa kwako?",
                options: ["Within 24 hours", "Promptly, at time of arrest", "Before you're taken to court", "When you request it"],
                options_sw: ["Ndani ya masaa 24", "Mara moja, wakati wa kukamatwa", "Kabla ya kupelekwa mahakamani", "Ukiiomba tu"],
                correct: 1,
                explanation: "Article 49(1)(a) states that an arrested person has the right to be informed promptly of the reason for arrest, in a language they understand. This is immediate — not hours later.",
                explanation_sw: "Ibara ya 49(1)(a) inasema mtu aliyekamatwa ana haki ya kuarifiwa mara moja sababu ya kukamatwa kwa lugha anayoielewa.",
                article: "Article 49(1)(a) — Rights of Arrested Persons"
            },
            {
                id: "rights-2",
                q: "How long can police hold an arrested person without presenting them to court?",
                q_sw: "Polisi wanaweza kumshikilia mtu aliyekamatwa kwa muda gani kabla ya kumfikisha mahakamani?",
                options: ["24 hours", "48 hours", "72 hours", "7 days"],
                options_sw: ["Masaa 24", "Masaa 48", "Masaa 72", "Siku 7"],
                correct: 0,
                explanation: "Article 49(1)(f) guarantees the right to be released or brought before a court within 24 hours of arrest (or the end of the next court day if outside court hours).",
                explanation_sw: "Ibara ya 49(1)(f) inatoa haki ya kuachiliwa au kufikishwa mahakamani ndani ya masaa 24 baada ya kukamatwa.",
                article: "Article 49(1)(f) — Right to appear before court"
            },
            {
                id: "rights-3",
                q: "Article 33 of the Constitution protects your right to:",
                q_sw: "Ibara ya 33 ya Katiba inalinda haki yako ya:",
                options: ["Free healthcare", "Freedom of expression", "Free education", "Own property"],
                options_sw: ["Afya ya bure", "Uhuru wa kujieleza", "Elimu ya bure", "Kumiliki mali"],
                correct: 1,
                explanation: "Article 33 protects freedom of expression — the right to seek, receive, or impart information, ideas, and artistic creativity.",
                explanation_sw: "Ibara ya 33 inalinda uhuru wa kujieleza — haki ya kutafuta, kupokea au kueneza habari na mawazo.",
                article: "Article 33 — Freedom of Expression"
            },
            {
                id: "rights-4",
                q: "Which article of Kenya's Constitution outlines economic and social rights, including health and education?",
                q_sw: "Ni ibara gani ya Katiba inayoainisha haki za kiuchumi na kijamii kama vile afya na elimu?",
                options: ["Article 40", "Article 43", "Article 50", "Article 27"],
                options_sw: ["Ibara ya 40", "Ibara ya 43", "Ibara ya 50", "Ibara ya 27"],
                correct: 1,
                explanation: "Article 43 guarantees the right to health, adequate housing, sanitation, freedom from hunger, clean water, social security, and education.",
                explanation_sw: "Ibara ya 43 inahakikisha haki ya afya, nyumba bora, maji safi, elimu na hifadhi ya jamii.",
                article: "Article 43 — Economic and Social Rights"
            },
            {
                id: "rights-5",
                q: "The right to protest and picket peacefully and unarmed is protected under which Article?",
                q_sw: "Haki ya kuandamana na kuwasilisha malalamiko kwa amani na bila silaha imelindwa chini ya Ibara gani?",
                options: ["Article 36", "Article 37", "Article 38", "Article 39"],
                options_sw: ["Ibara ya 36", "Ibara ya 37", "Ibara ya 38", "Ibara ya 39"],
                correct: 1,
                explanation: "Article 37 gives every person the right to assemble, demonstrate, picket, and present petitions to public authorities peacefully and unarmed.",
                explanation_sw: "Ibara ya 37 inampa kila mtu haki ya kukusanyika, kuandamana na kuwasilisha maombi kwa amani na bila silaha.",
                article: "Article 37 — Assembly, Demonstration, Picketing"
            },
            {
                id: "rights-6",
                q: "Under Article 25, which of the following rights CANNOT be limited under any circumstance?",
                q_sw: "Chini ya Ibara ya 25, ni haki gani kati ya hizi HAIWEZI kupunguzwa au kuondolewa chini ya hali yoyote?",
                options: ["Freedom of movement", "Freedom from torture and right to fair trial", "Right to privacy", "Right to property"],
                options_sw: ["Uhuru wa kutembea", "Uhuru dhidi ya mateso na haki ya kesi ya haki", "Haki ya faragha", "Haki ya kumiliki mali"],
                correct: 1,
                explanation: "Article 25 strictly specifies absolute rights that cannot be limited: freedom from torture, freedom from slavery, right to a fair trial, and right to habeas corpus.",
                explanation_sw: "Ibara ya 25 inaainisha haki zisizoweza kupunguzwa: uhuru dhidi ya mateso, utumwa, haki ya kesi ya haki na habeas corpus.",
                article: "Article 25 — Absolute Rights"
            },
            {
                id: "rights-7",
                q: "According to Article 35, every citizen has the right of access to:",
                q_sw: "Kulingana na Ibara ya 35, kila raia ana haki ya kupata:",
                options: ["Government financial grants", "Information held by the State", "Free legal counsel in civil suits", "Cabinet meeting minutes"],
                options_sw: ["Ruksa ya fedha kutoka serikalini", "Taarifa zinazoshikiliwa na Dola", "Wakili wa bure kwenye kesi za kiraia", "Kumbukumbu za Baraza la Mawaziri"],
                correct: 1,
                explanation: "Article 35(1) guarantees every citizen the right of access to information held by the State and information required for the exercise of any right.",
                explanation_sw: "Ibara ya 35(1) inahakikisha haki ya kila raia kupata taarifa zinazoshikiliwa na Serikali au Dola.",
                article: "Article 35 — Access to Information"
            },
            {
                id: "rights-8",
                q: "What does Article 53 specify regarding a child's best interests in any matter concerning the child?",
                q_sw: "Ibara ya 53 inasema nini kuhusu maslahi makuu ya mtoto katika jambo lolote linalomgusa?",
                options: ["Secondary to state interests", "Paramount importance in every matter", "Subject to parent preference", "Determined by local chiefs"],
                options_sw: ["Ni ya pili baada ya maslahi ya dola", "Ni ya umuhimu mkuu katika kila jambo", "Inategemea matakwa ya wazazi", "Inaamuliwa na chifu wa eneo"],
                correct: 1,
                explanation: "Article 53(2) mandates that a child's best interests are of paramount importance in every matter concerning the child.",
                explanation_sw: "Ibara ya 53(2) inaamuru kwamba maslahi makuu ya mtoto ni ya umuhimu mkuu katika kila jambo linalomuhusu mtoto.",
                article: "Article 53(2) — Rights of Children"
            },
            {
                id: "rights-9",
                q: "Under Article 54, what minimum percentage of elective and appointive bodies should be reserved for persons with disabilities?",
                q_sw: "Chini ya Ibara ya 54, ni asilimia gani ya chini kabisa ya nafasi za uchaguzi na uteuzi inayopaswa kutengewa watu wenye ulemavu?",
                options: ["2 percent", "5 percent", "10 percent", "15 percent"],
                options_sw: ["Asilimia 2", "Asilimia 5", "Asilimia 10", "Asilimia 15"],
                correct: 1,
                explanation: "Article 54(2) mandates that the State progressively implement the principle that at least 5% of members of elective and appointive bodies are persons with disabilities.",
                explanation_sw: "Ibara ya 54(2) inasema Serikali itahakikisha angalau 5% ya wanachama wa vyombo vya uchaguzi na uteuzi ni watu wenye ulemavu.",
                article: "Article 54(2) — Persons with Disabilities"
            },
            {
                id: "rights-10",
                q: "Article 27(8) enforces which gender representation principle in elective or appointive bodies?",
                q_sw: "Ibara ya 27(8) inatekeleza kanuni gani ya uwakilishi wa jinsia katika vyombo vya uchaguzi na uteuzi?",
                options: ["50/50 equal ratio", "Not more than two-thirds of the same gender", "At least 40% women", "Equal regional rotation"],
                options_sw: ["Kiwango sawa cha 50/50", "Isizidi theluthi mbili (2/3) za jinsia moja", "Angalau 40% wanawake", "Mzunguko sawa wa maeneo"],
                correct: 1,
                explanation: "Article 27(8) requires the State to implement the rule that not more than two-thirds of the members of elective or appointive bodies shall be of the same gender.",
                explanation_sw: "Ibara ya 27(8) inataka kwamba vyombo vya uchaguzi au uteuzi visiwe na zaidi ya theluthi mbili ya jinsia moja.",
                article: "Article 27(8) — Two-Thirds Gender Principle"
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
                id: "voting-1",
                q: "What is the minimum age required to register as a voter in Kenya?",
                q_sw: "Ni umri gani wa chini unaohitajika kujisajili kama mpiga kura nchini Kenya?",
                options: ["16 years", "18 years", "21 years", "25 years"],
                options_sw: ["Miaka 16", "Miaka 18", "Miaka 21", "Miaka 25"],
                correct: 1,
                explanation: "Article 83 of the Constitution states that an adult citizen (18 years or older) is eligible to register as a voter.",
                explanation_sw: "Ibara ya 83 inasema raia aliyetimiza umri wa miaka 18 ana haki ya kujisajili kama mpiga kura.",
                article: "Article 83 — Qualifications for Voters"
            },
            {
                id: "voting-2",
                q: "According to Article 101, when are general elections held in Kenya?",
                q_sw: "Kulingana na Ibara ya 101, uchaguzi mkuu nchini Kenya hufanyika lini?",
                options: ["First Monday of August every 5 years", "Second Tuesday of August every 5 years", "Last Friday of December every 5 years", "Any day set by the President"],
                options_sw: ["Jumatatu ya kwanza ya Agosti kila miaka 5", "Jumanne ya pili ya Agosti kila miaka 5", "Ijumaa ya mwisho ya Desemba kila miaka 5", "Siku yoyote iliyoteuliwa na Rais"],
                correct: 1,
                explanation: "Article 101(1) sets general elections for members of Parliament on the second Tuesday in August every fifth year.",
                explanation_sw: "Ibara ya 101(1) inasema uchaguzi mkuu utafanyika Jumanne ya pili ya Agosti kila mwaka wa tano.",
                article: "Article 101(1) — Election Date"
            },
            {
                id: "voting-3",
                q: "Which constitutional body is established under Article 88 to conduct and supervise elections in Kenya?",
                q_sw: "Ni chombo gani cha katiba kilichoanzishwa chini ya Ibara ya 88 kusimamia na kuendesha uchaguzi Kenya?",
                options: ["Ethics and Anti-Corruption Commission", "Independent Electoral and Boundaries Commission (IEBC)", "Judicial Service Commission", "Registrar of Political Parties"],
                options_sw: ["Tume ya Maadili na Kupambana na Ufisadi (EACC)", "Tume Huru ya Uchaguzi na Mipaka (IEBC)", "Tume ya Huduma za Mahakama (JSC)", "Msajili wa Vyama vya Siasa"],
                correct: 1,
                explanation: "Article 88 establishes the IEBC responsible for voter registration, boundary delimitation, and conducting elections and referenda.",
                explanation_sw: "Ibara ya 88 inazindua IEBC inayosimamia usajili wa wapiga kura, mipaka, na uendeshaji wa uchaguzi na kura za maoni.",
                article: "Article 88 — IEBC"
            },
            {
                id: "voting-4",
                q: "To win a presidential election in the first round under Article 138(4), a candidate must secure:",
                q_sw: "Ili kushinda uchaguzi wa Urais katika raundi ya kwanza chini ya Ibara ya 138(4), mgombea lazima apate:",
                options: ["Over 50% of total votes + at least 25% of votes in at least 24 counties", "Simple majority of all votes cast", "Over 60% of national votes", "At least 50% in all 47 counties"],
                options_sw: ["Zaidi ya 50% ya kura zote + angalau 25% katika kaunti 24 au zaidi", "Kura nyingi zaidi kuliko wengine", "Zaidi ya 60% ya kura za kitaifa", "Angalau 50% katika kaunti zote 47"],
                correct: 0,
                explanation: "Article 138(4) requires more than half of all votes cast nationally AND at least 25% of votes cast in more than half (24) of the 47 counties.",
                explanation_sw: "Ibara ya 138(4) inataka zaidi ya 50% ya kura zote kitaifa NA angalau 25% ya kura katika angalau kaunti 24.",
                article: "Article 138(4) — Presidential Election Threshold"
            },
            {
                id: "voting-5",
                q: "If no candidate meets the threshold in a presidential election, within how many days must a fresh election (runoff) be held?",
                q_sw: "Kama hakuna mgombea aliyefikisha kiwango kinachohitajika katika uchaguzi wa Urais, uchaguzi mpya (runoff) lazima ufanyike ndani ya siku ngapi?",
                options: ["14 days", "30 days", "60 days", "90 days"],
                options_sw: ["Siku 14", "Siku 30", "Siku 60", "Siku 90"],
                correct: 1,
                explanation: "Article 138(5) specifies that if no candidate is elected, a fresh election shall be held within 30 days between the top two candidates.",
                explanation_sw: "Ibara ya 138(5) inasema ikiwa hakuna aliyeshinda, uchaguzi mpya utafanyika ndani ya siku 30 kati ya wagombea wawili wa kwanza.",
                article: "Article 138(5) — Presidential Runoff Timeline"
            },
            {
                id: "voting-6",
                q: "Under Article 81, voting in Kenya's electoral system must be conducted by:",
                q_sw: "Chini ya Ibara ya 81, upigaji kura katika mfumo wa uchaguzi wa Kenya lazima ufanyike kwa:",
                options: ["Show of hands", "Secret ballot", "Open queueing", "Voice vote"],
                options_sw: ["Kuinua mikono", "Kura ya siri", "Kupanga foleni ya wazi", "Kura ya sauti"],
                correct: 1,
                explanation: "Article 81(e)(i) strictly requires that free and fair elections be conducted by secret ballot.",
                explanation_sw: "Ibara ya 81(e)(i) inaagiza kuwa uchaguzi huru na wa haki lazima ufanyike kwa kura ya siri.",
                article: "Article 81(e)(i) — Secret Ballot"
            },
            {
                id: "voting-7",
                q: "What is the deadline for filing a presidential election petition in the Supreme Court under Article 140?",
                q_sw: "Ni gani siku ya mwisho ya kuwasilisha kesi ya kupinga uchaguzi wa Rais katika Mahakama ya Juu chini ya Ibara ya 140?",
                options: ["Within 7 days of result declaration", "Within 14 days", "Within 21 days", "Within 30 days"],
                options_sw: ["Ndani ya siku 7 baada ya kutangazwa matokeo", "Ndani ya siku 14", "Ndani ya siku 21", "Ndani ya siku 30"],
                correct: 0,
                explanation: "Article 140(1) requires any petition challenging a presidential election to be filed within 7 days after the declaration of results.",
                explanation_sw: "Ibara ya 140(1) inataka kesi ya kupinga matokeo ya Rais iwasilishwe ndani ya siku 7 tangu kutangazwa kwa matokeo.",
                article: "Article 140(1) — Presidential Petition Deadline"
            },
            {
                id: "voting-8",
                q: "Under Article 89, how many single-member constituencies are established for elections to the National Assembly?",
                q_sw: "Chini ya Ibara ya 89, ni maeneo mepesi mangapi ya uchaguzi (constituencies) yaliyotengwa kwa ajili ya Bunge la Kitaifa?",
                options: ["210 constituencies", "290 constituencies", "349 constituencies", "47 constituencies"],
                options_sw: ["Maeneo 210", "Maeneo 290", "Maeneo 349", "Maeneo 47"],
                correct: 1,
                explanation: "Article 89(1) establishes 290 constituencies for the election of members of the National Assembly.",
                explanation_sw: "Ibara ya 89(1) inatenga maeneo ya uchaguzi 290 kwa ajili ya uchaguzi wa wabunge wa Bunge la Kitaifa.",
                article: "Article 89(1) — Number of Constituencies"
            },
            {
                id: "voting-9",
                q: "Which schedule of the Constitution lists all 47 counties of the Republic of Kenya?",
                q_sw: "Ni ratiba (schedule) gani ya Katiba inayotaja kaunti zote 47 za Jamhuri ya Kenya?",
                options: ["First Schedule", "Second Schedule", "Fourth Schedule", "Sixth Schedule"],
                options_sw: ["Ratiba ya Kwanza", "Ratiba ya Pili", "Ratiba ya Nne", "Ratiba ya Sasa"],
                correct: 0,
                explanation: "Article 6(1) and the First Schedule list all 47 counties of Kenya from Mombasa (1) to Nairobi City (47).",
                explanation_sw: "Ibara ya 6(1) pamoja na Ratiba ya Kwanza zinataja kaunti zote 47 za Kenya kuanzia Mombasa hadi Nairobi.",
                article: "Article 6(1) & First Schedule — 47 Counties"
            },
            {
                id: "voting-10",
                q: "Under Article 85, can an individual contest an election as an independent candidate?",
                q_sw: "Chini ya Ibara ya 85, je mtu binafsi anaweza kugombea uchaguzi kama mgombea huru?",
                options: ["No, only political party members can run", "Yes, if they are not a member of a party for at least 3 months before election", "Only for MCA seats", "Only with President approval"],
                options_sw: ["Hapana, vyama vya siasa tu vinaweza", "Ndiyo, ikiwa hajawahi kuwa mwanachama wa chama kwa angalau miaka/miezi 3", "Kwa viti vya MCA pekee", "Kwa kibali cha Rais pekee"],
                correct: 1,
                explanation: "Article 85 permits independent candidates provided they are not members of a registered political party for at least 3 months prior to the election date.",
                explanation_sw: "Ibara ya 85 inaruhusu wagombea binafsi iwapo hawajakuwa wanachama wa chama cha siasa kwa miezi 3 kabla ya uchaguzi.",
                article: "Article 85 — Independent Candidates"
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
                id: "govt-1",
                q: "Under Article 1(3) of Kenya's Constitution, sovereign power is delegated to how many arms of government?",
                q_sw: "Chini ya Ibara ya 1(3) ya Katiba ya Kenya, mamlaka ya wananchi yamegatuliwa kwa vyombo mangapi vya Dola?",
                options: ["Two arms", "Three arms (Legislature, Executive, Judiciary)", "Four arms", "Five arms"],
                options_sw: ["Vyombo viwili", "Vyombo vitatu (Bunge, Serikali Kuu, Mahakama)", "Vyombo vinne", "Vyombo vitano"],
                correct: 1,
                explanation: "Article 1(3) delegates sovereign power to three state organs: Parliament/assemblies, National/county Executive, and the Judiciary.",
                explanation_sw: "Ibara ya 1(3) inakabidhi mamlaka kwa vyombo vitatu: Bunge, Serikali na Mahakama.",
                article: "Article 1(3) — Three State Organs"
            },
            {
                id: "govt-2",
                q: "What is the total composition of Kenya's National Assembly under Article 97?",
                q_sw: "Idadi kamili ya Wabunge katika Bunge la Kitaifa chini ya Ibara ya 97 ni pila ngapi?",
                options: ["290 members", "349 members (290 elected + 47 women reps + 12 nominated + Speaker)", "210 members", "300 members"],
                options_sw: ["Wabunge 290", "Wabunge 349 (290 wa maeneo + 47 wanawake + 12 wa uteuzi + Spika)", "Wabunge 210", "Wabunge 300"],
                correct: 1,
                explanation: "Article 97 details 290 constituency members + 47 county woman representatives + 12 nominated members + 1 ex-officio Speaker = 349 total.",
                explanation_sw: "Ibara ya 97 inatenga 290 wa maeneo + 47 wawakilishi wanawake + 12 walioteuliwa + Spika = 349 jumla.",
                article: "Article 97 — Composition of National Assembly"
            },
            {
                id: "govt-3",
                q: "What is the PRIMARY role of the Senate in Kenya's Parliament according to Article 96?",
                q_sw: "Ni ipi jukumu KUU la Seneti katika Bunge la Kenya kulingana na Ibara ya 96?",
                options: ["Appointing Cabinet Secretaries", "Representing and protecting county interests", "Approving criminal prosecutions", "Collecting national taxes"],
                options_sw: ["Kuteua Mawaziri", "Kuwakilisha na kulinda maslahi ya kaunti", "Kuidhinisha mashitaka ya jinai", "Kukusanya kodi za kitaifa"],
                correct: 1,
                explanation: "Article 96 explicitly mandates that the Senate represents the counties, protects county interests and county governments.",
                explanation_sw: "Ibara ya 96 inaeleza kuwa Seneti inawasilisha kaunti na kulinda maslahi ya serikali za kaunti.",
                article: "Article 96 — Role of the Senate"
            },
            {
                id: "govt-4",
                q: "According to Article 152(1), what is the maximum number of Cabinet Secretaries allowed in the Cabinet?",
                q_sw: "Kulingana na Ibara ya 152(1), ni idadi gani ya juu zaidi ya Mawaziri (Cabinet Secretaries) inayoruhusiwa?",
                options: ["14 Cabinet Secretaries", "18 Cabinet Secretaries", "22 Cabinet Secretaries", "30 Cabinet Secretaries"],
                options_sw: ["Mawaziri 14", "Mawaziri 18", "Mawaziri 22", "Mawaziri 30"],
                correct: 2,
                explanation: "Article 152(1)(d) specifies that the Cabinet shall consist of not fewer than 14 and not more than 22 Cabinet Secretaries.",
                explanation_sw: "Ibara ya 152(1)(d) inasema Baraza la Mawaziri litakuwa na Mawaziri kati ya 14 na 22.",
                article: "Article 152(1) — Cabinet Composition"
            },
            {
                id: "govt-5",
                q: "Which court is established as the highest (supreme) court in Kenya under Article 163?",
                q_sw: "Ni mahakama gani iliyoanzishwa kama mahakama ya juu kabisa (Supreme Court) nchini Kenya chini ya Ibara ya 163?",
                options: ["High Court", "Court of Appeal", "Supreme Court of Kenya", "Industrial Court"],
                options_sw: ["Mahakama Kuu (High Court)", "Mahakama ya Rufani (Court of Appeal)", "Mahakama ya Juu Zaidi (Supreme Court)", "Mahakama ya Kazi"],
                correct: 2,
                explanation: "Article 163 establishes the Supreme Court of Kenya comprising the Chief Justice, Deputy Chief Justice, and 5 other judges.",
                explanation_sw: "Ibara ya 163 inazindua Mahakama ya Juu yenye Jaji Mkuu, Naibu Jaji Mkuu na majaji wengine 5.",
                article: "Article 163 — Supreme Court"
            },
            {
                id: "govt-6",
                q: "Under Article 167(1), what is the mandatory retirement age for judges in Kenya?",
                q_sw: "Chini ya Ibara ya 167(1), ni umri gani wa lazima wa kustaafu kwa majaji nchini Kenya?",
                options: ["60 years", "65 years", "70 years", "75 years"],
                options_sw: ["Miaka 60", "Miaka 65", "Miaka 70", "Miaka 75"],
                correct: 2,
                explanation: "Article 167(1) provides that a judge shall retire from office on attaining the age of 70 years.",
                explanation_sw: "Ibara ya 167(1) inasema jaji atastaafu akifikisha umri wa miaka 70.",
                article: "Article 167(1) — Tenure of Judges"
            },
            {
                id: "govt-7",
                q: "Under Article 176, devolved government in each of the 47 counties consists of:",
                q_sw: "Chini ya Ibara ya 176, serikali ya gatuzi katika kila kaunti 47 inajumuisha:",
                options: ["A County Governor and County Commissioner", "A County Assembly and County Executive", "A Regional Assembly and Senate", "A Mayor and Town Clerk"],
                options_sw: ["Gavana na Kamishna wa Kaunti", "Bunge la Kaunti na Kamati ya Utendaji ya Kaunti", "Bunge la Kanda na Seneti", "Meya na Karani wa Mji"],
                correct: 1,
                explanation: "Article 176(1) states that there shall be a county government for each county, consisting of a county assembly and a county executive.",
                explanation_sw: "Ibara ya 176(1) inasema kutakuwa na serikali ya kaunti inayojumuisha bunge la kaunti na kamati ya utendaji.",
                article: "Article 176(1) — Structure of County Government"
            },
            {
                id: "govt-8",
                q: "What maximum number of terms can a County Governor serve under Article 180(7)?",
                q_sw: "Ni vipindi (terms) vingapi vya juu ambavyo Gavana wa Kaunti anaweza kuhudumu chini ya Ibara ya 180(7)?",
                options: ["One term", "Two terms", "Three terms", "Unlimited terms"],
                options_sw: ["Kipindi kimoja", "Vipindi viwili", "Vipindi vitatu", "Bila kikomo"],
                correct: 1,
                explanation: "Article 180(7) dictates that a person shall not hold office as a county governor for more than two terms.",
                explanation_sw: "Ibara ya 180(7) inaeleza kuwa mtu hatahudumu kama gavana kwa zaidi ya vipindi viwili.",
                article: "Article 180(7) — Term Limit for Governors"
            },
            {
                id: "govt-9",
                q: "Which office under Article 157 holds independent constitutional power to institute criminal prosecutions in Kenya?",
                q_sw: "Ni ofisi gani chini ya Ibara ya 157 yenye mamlaka huru ya kikatiba ya kuanzisha mashitaka ya jinai nchini Kenya?",
                options: ["Attorney-General", "Director of Public Prosecutions (DPP)", "Inspector-General of Police", "Chief Justice"],
                options_sw: ["Mwanasheria Mkuu", "Mkurugenzi wa Mashtaka ya Umma (DPP)", "Inspekta Jenerali wa Polisi", "Jaji Mkuu"],
                correct: 1,
                explanation: "Article 157 establishes the Office of the Director of Public Prosecutions (DPP) to exercise state powers of criminal prosecution independently.",
                explanation_sw: "Ibara ya 157 inazindua Ofisi ya Mkurugenzi wa Mashtaka ya Umma (DPP) yenye mamlaka huru ya mashitaka.",
                article: "Article 157 — Director of Public Prosecutions"
            },
            {
                id: "govt-10",
                q: "Under Article 156, what is the principal role of the Attorney-General?",
                q_sw: "Chini ya Ibara ya 156, ni ipi jukumu kuu la Mwanasheria Mkuu (Attorney-General)?",
                options: ["Chief Prosecutor of crimes", "Principal legal adviser to the Government", "Head of the High Court", "Speaker of the Cabinet"],
                options_sw: ["Mshaki mkuu wa jinai", "Mshauri mkuu wa kisheria wa Serikali", "Kiongozi wa Mahakama Kuu", "Spika wa Mawaziri"],
                correct: 1,
                explanation: "Article 156(4)(a) specifies that the Attorney-General is the principal legal adviser to the Government.",
                explanation_sw: "Ibara ya 156(4)(a) inaeleza kuwa Mwanasheria Mkuu ni mshauri mkuu wa kisheria wa Serikali.",
                article: "Article 156 — Role of Attorney-General"
            }
        ]
    },
    budget: {
        title: "Public Budgeting & Finance",
        swTitle: "Matumizi ya Pesa za Umma",
        color: "#7c3aed",
        icon: "💰",
        questions: [
            {
                id: "budget-1",
                q: "Who is responsible for preparing national budget estimates under Article 221?",
                q_sw: "Ni nani anayehusika na kuandaa makadirio ya bajeti ya kitaifa chini ya Ibara ya 221?",
                options: ["The Auditor-General", "The Cabinet Secretary for Finance / National Treasury", "The Controller of Budget", "The Senate Committee"],
                options_sw: ["Mkaguzi Mkuu wa Hesabu", "Waziri wa Fedha / Hazina ya Kitaifa", "Mdhibiti wa Bajeti", "Kamati ya Seneti"],
                correct: 1,
                explanation: "Article 221 requires the Cabinet Secretary responsible for finance to submit revenue and expenditure estimates to the National Assembly.",
                explanation_sw: "Ibara ya 221 inataka Waziri wa Fedha kuwasilisha makadirio ya mapato na matumizi kwa Bunge la Kitaifa.",
                article: "Article 221 — Budget Estimates"
            },
            {
                id: "budget-2",
                q: "What minimum percentage of audited national revenue must be allocated to county governments under Article 203(2)?",
                q_sw: "Ni asilimia gani ya chini kabisa ya mapato ya kitaifa iliyokaguliwa inayopaswa kutengewa serikali za kaunti chini ya Ibara ya 203(2)?",
                options: ["10 percent", "At least 15 percent", "25 percent", "50 percent"],
                options_sw: ["Asilimia 10", "Angalau asilimia 15", "Asilimia 25", "Asilimia 50"],
                correct: 1,
                explanation: "Article 203(2) mandates that equitable share allocated to county governments shall be not less than 15% of all audited national revenue.",
                explanation_sw: "Ibara ya 203(2) inaamuru kwamba gawio la kaunti halitakuwa chini ya 15% ya mapato yote ya kitaifa yaliyokaguliwa.",
                article: "Article 203(2) — County Revenue Share"
            },
            {
                id: "budget-3",
                q: "Under Article 229, which independent office audits all accounts of national and county governments and public entities?",
                q_sw: "Chini ya Ibara ya 229, ni ofisi gani huru inayokagua hesabu zote za serikali ya kitaifa, kaunti na mashirika ya umma?",
                options: ["Controller of Budget", "Office of the Auditor-General", "Central Bank of Kenya", "Ethics Commission"],
                options_sw: ["Mdhibiti wa Bajeti", "Ofisi ya Mkaguzi Mkuu wa Hesabu (Auditor-General)", "Benki Kuu ya Kenya", "Tume ya Maadili"],
                correct: 1,
                explanation: "Article 229 establishes the Auditor-General to audit and report on public funds and accounts across all levels of government.",
                explanation_sw: "Ibara ya 229 inamweka Mkaguzi Mkuu wa Hesabu za Serikali kukagua matumizi ya fedha za umma.",
                article: "Article 229 — Auditor-General"
            },
            {
                id: "budget-4",
                q: "Which office under Article 228 must approve any withdrawal of money from public funds (Consolidated & Revenue Funds)?",
                q_sw: "Ni ofisi gani chini ya Ibara ya 228 inayopaswa kuidhinisha kutoa fedha zote kutoka hazina za umma?",
                options: ["Auditor-General", "Controller of Budget", "Cabinet Secretary for Finance", "Parliamentary Clerk"],
                options_sw: ["Mkaguzi Mkuu wa Hesabu", "Mdhibiti wa Bajeti (Controller of Budget)", "Waziri wa Fedha", "Karani wa Bunge"],
                correct: 1,
                explanation: "Article 228(4) mandates that the Controller of Budget oversees implementation and authorises withdrawals from public funds.",
                explanation_sw: "Ibara ya 228(4) inaamuru kwamba Mdhibiti wa Bajeti ndiye anayeidhinisha kutolewa kwa fedha za umma.",
                article: "Article 228 — Controller of Budget"
            },
            {
                id: "budget-5",
                q: "What is the primary purpose of the Equalisation Fund established under Article 204?",
                q_sw: "Ni ipi madhumuni kuu ya Hazina ya Usawa (Equalisation Fund) iliyoanzishwa chini ya Ibara ya 204?",
                options: ["Paying MP allowances", "Providing basic services (water, roads, health) to marginalised areas", "Funding political campaigns", "Emergency disaster relief"],
                options_sw: ["Kulipa marupurupu ya wabunge", "Kutoa huduma za msingi (maji, barabara, afya) katika maeneo yaliyotengwa", "Kufadhili kampeni za siasa", "Msaada wa dharura wa majanga"],
                correct: 1,
                explanation: "Article 204 allocates 0.5% of national revenue to provide basic services like water, roads, health, and electricity to marginalised communities.",
                explanation_sw: "Ibara ya 204 inatenga 0.5% ya mapato ya kitaifa kutoa huduma za msingi katika maeneo yaliyosahaulika.",
                article: "Article 204 — Equalisation Fund"
            },
            {
                id: "budget-6",
                q: "Under Article 209, which level of government has exclusive authority to impose Income Tax and Value-Added Tax (VAT)?",
                q_sw: "Chini ya Ibara ya 209, ni kiwango gani cha serikali chenye mamlaka ya pekee ya kuwatoza Kodi ya Mapato na VAT?",
                options: ["County Governments only", "National Government only", "Both National and County jointly", "Local Town Councils"],
                options_sw: ["Serikali za Kaunti pekee", "Serikali Kuu ya Kitaifa pekee", "Pamoja Serikali Kuu na Kaunti", "Mabaraza ya Miji"],
                correct: 1,
                explanation: "Article 209(1) stipulates that only the national government may impose income tax, VAT, customs duties, and excise tax.",
                explanation_sw: "Ibara ya 209(1) inasema ni Serikali Kuu ya Kitaifa pekee inayoweza kutimiza kodi ya mapato na VAT.",
                article: "Article 209(1) — Taxing Powers"
            },
            {
                id: "budget-7",
                q: "What taxes are county governments permitted to impose under Article 209(3)?",
                q_sw: "Ni kodi gani ambazo serikali za kaunti zimeruhusiwa kutimiza chini ya Ibara ya 209(3)?",
                options: ["Income tax and customs duty", "Property rates and entertainment taxes", "Corporation tax", "Fuel levy"],
                options_sw: ["Kodi ya mapato na ushuru wa forodha", "Kodi za majumba/ardhi (property rates) na kodi za burudani", "Kodi ya makampuni", "Ushuru wa mafuta"],
                correct: 1,
                explanation: "Article 209(3) allows counties to impose property rates, entertainment taxes, and service charges.",
                explanation_sw: "Ibara ya 209(3) inaziruhusu kaunti kutozwa kodi za majumba/ardhi na kodi za burudani.",
                article: "Article 209(3) — County Revenue Powers"
            },
            {
                id: "budget-8",
                q: "Under Article 206, what is the main public account into which all national revenue must be paid?",
                q_sw: "Chini ya Ibara ya 206, ni ipi hazina kuu ya umma ambamo mapato yote ya kitaifa lazima yalipwe?",
                options: ["Contingencies Fund", "Consolidated Fund", "Equalisation Fund", "Judiciary Fund"],
                options_sw: ["Hazina ya Dharura", "Hazina Kuu ya Serikali (Consolidated Fund)", "Hazina ya Usawa", "Hazina ya Mahakama"],
                correct: 1,
                explanation: "Article 206 establishes the Consolidated Fund into which all money raised or received by national government is paid.",
                explanation_sw: "Ibara ya 206 inazindua Hazina Kuu ya Serikali ambamo mapato yote ya kitaifa huwekwa.",
                article: "Article 206 — Consolidated Fund"
            },
            {
                id: "budget-9",
                q: "Article 201 establishes key principles of public finance, including:",
                q_sw: "Ibara ya 201 inaimarisha kanuni kuu za fedha za umma, zikiwemo:",
                options: ["Secrecy in budgeting", "Openness, accountability, and public participation", "Executive discretion without audit", "Fixed tax rates for 10 years"],
                options_sw: ["Usiri katika bajeti", "Uwazi, uwajibikaji, na ushirikishwaji wa umma", "Mamlaka ya pekee ya Rais bila ukaguzi", "Kiwango cha kodi kisichobadilika kwa miaka 10"],
                correct: 1,
                explanation: "Article 201 mandates openness, accountability, public participation, equitable sharing of tax burdens, and prudent money management.",
                explanation_sw: "Ibara ya 201 inaagiza uwazi, uwajibikaji, ushirikishwaji wa umma na matumizi bora ya fedha.",
                article: "Article 201 — Principles of Public Finance"
            },
            {
                id: "budget-10",
                q: "Which constitutional commission recommends the criteria for sharing revenue between national and county governments?",
                q_sw: "Ni tume gani ya kikatiba inayotoa mapendekezo ya vigezo vya kugawana mapato kati ya serikali kuu na kaunti?",
                options: ["Salaries and Remuneration Commission", "Commission on Revenue Allocation (CRA)", "Public Service Commission", "Auditor-General"],
                options_sw: ["Tume ya Mishahara (SRC)", "Tume ya Kutenga Mapato (CRA)", "Tume ya Huduma za Umma", "Mkaguzi Mkuu wa Hesabu"],
                correct: 1,
                explanation: "Article 215 & 216 establish the Commission on Revenue Allocation (CRA) to recommend equitable revenue distribution.",
                explanation_sw: "Ibara ya 215 na 216 inazindua CRA kutoa mapendekezo ya jinsi ya kugawana mapato kwa haki.",
                article: "Article 215 & 216 — Commission on Revenue Allocation"
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
                id: "katiba-1",
                q: "In what year was Kenya's current Constitution promulgated after approval by a national referendum?",
                q_sw: "Ni mwaka gani Katiba ya sasa ya Kenya ilitangazwa rasmi baada ya kupitishwa kwenye kura ya maoni?",
                options: ["2007", "2008", "2010", "2013"],
                options_sw: ["2007", "2008", "2010", "2013"],
                correct: 2,
                explanation: "Kenya's Constitution was promulgated on 27th August 2010 after being overwhelmingly approved by citizens in the August 4th referendum.",
                explanation_sw: "Katiba ya Kenya ilitangazwa rasmi tarehe 27 Agosti 2010 baada ya kura ya maoni ya tarehe 4 Agosti 2010.",
                article: "Promulgation — Constitution of Kenya 2010"
            },
            {
                id: "katiba-2",
                q: "Article 1(1) of the Constitution declares that all sovereign power belongs to:",
                q_sw: "Ibara ya 1(1) ya Katiba inatangaza kuwa mamlaka yote ya kidola ni ya:",
                options: ["The President", "The Parliament", "The People of Kenya", "The Judiciary"],
                options_sw: ["Rais", "Bunge", "Watu wa Kenya (Wananchi)", "Mahakama"],
                correct: 2,
                explanation: "Article 1(1) states clearly: 'All sovereign power belongs to the people of Kenya and shall be exercised only in accordance with this Constitution.'",
                explanation_sw: "Ibara ya 1(1) inasema wazi: 'Mamlaka yote ya kidola ni ya wananchi wa Kenya.'",
                article: "Article 1(1) — Sovereignty of the People"
            },
            {
                id: "katiba-3",
                q: "Which article establishes Kenya's National Values and Principles of Governance (e.g. patriotism, rule of law, integrity)?",
                q_sw: "Ni ibara gani inayoainisha Maadili ya Kitaifa na Kanuni za Uongozi za Kenya (k.m. uzalendo, utawala wa sheria, uadilifu)?",
                options: ["Article 2", "Article 10", "Article 19", "Article 73"],
                options_sw: ["Ibara ya 2", "Ibara ya 10", "Ibara ya 19", "Ibara ya 73"],
                correct: 1,
                explanation: "Article 10 details National Values including patriotism, democracy, human dignity, social justice, transparency, and integrity.",
                explanation_sw: "Ibara ya 10 inafafanua Maadili ya Kitaifa ikiwemo uzalendo, demokrasia, uadilifu na haki za binadamu.",
                article: "Article 10 — National Values and Principles"
            },
            {
                id: "katiba-4",
                q: "Under Article 7, what are the official languages of the Republic of Kenya?",
                q_sw: "Chini ya Ibara ya 7, ni zipi lugha rasmi za Jamhuri ya Kenya?",
                options: ["Kiswahili only", "English only", "Kiswahili and English", "English, Kiswahili and Mother tongue"],
                options_sw: ["Kiswahili pekee", "Kiingereza pekee", "Kiswahili na Kiingereza", "Kiingereza, Kiswahili na Lugha za kiasili"],
                correct: 2,
                explanation: "Article 7(1) establishes Kiswahili as the national language, and Article 7(2) establishes Kiswahili and English as official languages.",
                explanation_sw: "Ibara ya 7(1) inasema Kiswahili ni lugha ya taifa, na Ibara ya 7(2) inasema Kiswahili na Kiingereza ni lugha rasmi.",
                article: "Article 7 — National & Official Languages"
            },
            {
                id: "katiba-5",
                q: "According to Article 9, which of the following is NOT listed as a National Day of Kenya?",
                q_sw: "Kulingana na Ibara ya 9, ni ipi kati ya hizi SI Siku ya Kitaifa ya Kenya kikatiba?",
                options: ["Madaraka Day (1st June)", "Mashujaa Day (20th October)", "Jamhuri Day (12th December)", "Labor Day (1st May)"],
                options_sw: ["Madaraka Day (1 Juni)", "Mashujaa Day (20 Oktoba)", "Jamhuri Day (12 Desemba)", "Labor Day (1 Mei)"],
                correct: 3,
                explanation: "Article 9(3) recognizes three specific National Days: Madaraka Day (1st June), Mashujaa Day (20th October), and Jamhuri Day (12th December).",
                explanation_sw: "Ibara ya 9(3) inatambua Siku 3 za Kitaifa: Madaraka Day, Mashujaa Day na Jamhuri Day.",
                article: "Article 9(3) — National Days"
            },
            {
                id: "katiba-6",
                q: "How many chapters are contained in Kenya's 2010 Constitution?",
                q_sw: "Katiba ya Kenya ya 2010 ina sura (chapters) ngapi kwa jumla?",
                options: ["12 chapters", "15 chapters", "18 chapters", "22 chapters"],
                options_sw: ["Sura 12", "Sura 15", "Sura 18", "Sura 22"],
                correct: 2,
                explanation: "The Constitution of Kenya 2010 consists of 18 Chapters and 6 Schedules.",
                explanation_sw: "Katiba ya Kenya 2010 inajumuisha Sura 18 na Ratiba 6.",
                article: "Structure — Constitution of Kenya 2010"
            },
            {
                id: "katiba-7",
                q: "Under Article 16, does a Kenyan citizen by birth lose citizenship upon acquiring citizenship of another country (dual citizenship)?",
                q_sw: "Chini ya Ibara ya 16, je raia wa Kenya wa kuzaliwa anapoteza uraia wake anapopata uraia wa nchi nyingine (uraia wa nchi mbili)?",
                options: ["Yes, immediately", "No, dual citizenship is permitted for citizens by birth", "Only if approved by Parliament", "Only in East African countries"],
                options_sw: ["Ndiyo, mara moja", "Hapana, uraia wa nchi mbili unaruhusiwa kwa raia wa kuzaliwa", "Kama Bunge litakubali tu", "Katika nchi za Afrika Mashariki pekee"],
                correct: 1,
                explanation: "Article 16 states: 'A citizen by birth does not lose citizenship by acquiring the citizenship of another country.'",
                explanation_sw: "Ibara ya 16 inasema raia wa kuzaliwa hapotezi uraia wa Kenya kwa kupata uraia wa nchi nyingine.",
                article: "Article 16 — Dual Citizenship"
            },
            {
                id: "katiba-8",
                q: "Under Article 257, amending the Constitution by popular initiative requires signatures of at least how many registered voters?",
                q_sw: "Chini ya Ibara ya 257, kurekebisha Katiba kwa mpango wa wananchi (popular initiative) inahitaji saini za wapiga kura angalau wangapi?",
                options: ["500,000 voters", "1 million registered voters", "2 million voters", "5 million voters"],
                options_sw: ["Wapiga kura 500,000", "Wapiga kura Milioni 1 waliosajiliwa", "Wapiga kura Milioni 2", "Wapiga kura Milioni 5"],
                correct: 1,
                explanation: "Article 257(1) requires a popular initiative to be signed by at least 1 million registered voters.",
                explanation_sw: "Ibara ya 257(1) inataka maombi ya kurekebisha katiba yaungwe mkono na saini za wapiga kura milioni moja au zaidi.",
                article: "Article 257 — Amendment by Popular Initiative"
            },
            {
                id: "katiba-9",
                q: "Under Article 2, if any law or customary practice is inconsistent with the Constitution, what is its status?",
                q_sw: "Chini ya Ibara ya 2, ikiwa sheria yoyote au utamaduni unapingana na Katiba, hali yake inakuwaje?",
                options: ["It remains binding in local areas", "It is void to the extent of the inconsistency", "It requires Supreme Court review first", "It applies if enacted before 2010"],
                options_sw: ["Inaendelea kutumika maeneo ya mashinani", "Ni batili kwa kiwango inachopingana na Katiba", "Inahitaji kwanza uamuzi wa Mahakama ya Juu", "Inatumika kama ilitengenezwa kabla ya 2010"],
                correct: 1,
                explanation: "Article 2(4) declares that any law, including customary law, inconsistent with the Constitution is void to the extent of the inconsistency.",
                explanation_sw: "Ibara ya 2(4) inatangaza kuwa sheria au mila yoyote inayopingana na Katiba ni batili.",
                article: "Article 2(4) — Supremacy of the Constitution"
            },
            {
                id: "katiba-10",
                q: "Under Article 14, a child found in Kenya who appears to be less than how many years of age (and parents unknown) is presumed to be a citizen by birth?",
                q_sw: "Chini ya Ibara ya 14, mtoto anayepatikana nchini Kenya mwenye umri wa chini ya miaka mingapi (wazazi wasiojulikana) anachukuliwa kuwa raia wa kuzaliwa?",
                options: ["5 years of age", "8 years of age", "10 years of age", "18 years of age"],
                options_sw: ["Miaka 5", "Miaka 8", "Miaka 10", "Miaka 18"],
                correct: 1,
                explanation: "Article 14(4) states that a child found in Kenya who is or appears to be less than 8 years of age, whose nationality and parents are unknown, is presumed citizen by birth.",
                explanation_sw: "Ibara ya 14(4) inasema mtoto wa miaka chini ya 8 anayepatikana nchini asiyejulikana wazazi anachukuliwa kuwa raia wa kuzaliwa.",
                article: "Article 14(4) — Citizenship Presumption"
            }
        ]
    },
    land: {
        title: "Land, Environment & Leadership",
        swTitle: "Ardhi, Mazingira na Uongozi",
        color: "#059669",
        icon: "🌿",
        questions: [
            {
                id: "land-1",
                q: "According to Article 61 of the Constitution, how is land in Kenya classified?",
                q_sw: "Kulingana na Ibara ya 61 ya Katiba, ardhi nchini Kenya imegawanywa katika makundi gani?",
                options: ["Government and Tribal land", "Public, Community, and Private land", "National and Foreign land", "Urban and Rural land"],
                options_sw: ["Ardhi ya Serikali na Kimbari", "Ardhi ya Umma, Jamii, na Binafsi", "Ardhi ya Kitaifa na Kigeni", "Ardhi ya Mjini na Mashinani"],
                correct: 1,
                explanation: "Article 61(2) explicitly classifies all land in Kenya into three categories: Public, Community, or Private land.",
                explanation_sw: "Ibara ya 61(2) inagawanya ardhi yote Kenya katika makundi matatu: ya Umma, ya Jamii na ya Binafsi.",
                article: "Article 61(2) — Classification of Land"
            },
            {
                id: "land-2",
                q: "Under Article 65, what maximum lease period can a non-Kenyan citizen hold in land?",
                q_sw: "Chini ya Ibara ya 65, ni muda gani wa juu wa kukodi (leasehold) ambao raia asiye Mkenya anaweza kumiliki ardhi?",
                options: ["30 years", "50 years", "99 years", "999 years"],
                options_sw: ["Miaka 30", "Miaka 50", "Miaka 99", "Miaka 999"],
                correct: 2,
                explanation: "Article 65(1) provides that a non-citizen may hold land on leasehold tenure only, and such lease shall not exceed 99 years.",
                explanation_sw: "Ibara ya 65(1) inasema mgeni anaweza kumiliki ardhi kwa njia ya kukodi tu kwa muda usiozidi miaka 99.",
                article: "Article 65(1) — Landholding by Non-Citizens"
            },
            {
                id: "land-3",
                q: "Which constitutional independent commission is established under Article 67 to manage public land?",
                q_sw: "Ni tume gani ya kikatiba iliyoanzishwa chini ya Ibara ya 67 kusimamia ardhi ya umma?",
                options: ["National Land Commission (NLC)", "Ethics Commission", "Environment Authority (NEMA)", "Boundary Commission"],
                options_sw: ["Tume ya Kitaifa ya Ardhi (NLC)", "Tume ya Maadili", "Mamlaka ya Mazingira (NEMA)", "Tume ya Mipaka"],
                correct: 0,
                explanation: "Article 67 establishes the National Land Commission (NLC) to manage public land and recommend national land policy.",
                explanation_sw: "Ibara ya 67 inazindua Tume ya Kitaifa ya Ardhi (NLC) kusimamia ardhi ya umma.",
                article: "Article 67 — National Land Commission"
            },
            {
                id: "land-4",
                q: "Under Article 69(1)(b), what target percentage of tree cover is the State obligated to achieve and maintain?",
                q_sw: "Chini ya Ibara ya 69(1)(b), ni asilimia gani ya miti (tree cover) ambayo Serikali ina wajibu wa kuyafikia na kuyalinda?",
                options: ["At least 5 percent", "At least 10 percent", "At least 20 percent", "At least 30 percent"],
                options_sw: ["Angalau asilimia 5", "Angalau asilimia 10", "Angalau asilimia 20", "Angalau asilimia 30"],
                correct: 1,
                explanation: "Article 69(1)(b) mandates that the State shall work to achieve and maintain a tree cover of at least 10% of the land area of Kenya.",
                explanation_sw: "Ibara ya 69(1)(b) inaamuru Serikali kufanya kazi kufikia na kudumisha misitu/miti ya angalau 10% ya ardhi ya Kenya.",
                article: "Article 69(1)(b) — 10% Tree Cover Target"
            },
            {
                id: "land-5",
                q: "Chapter Six of the Constitution outlines guiding principles for state officers on:",
                q_sw: "Sura ya Sasa (Chapter 6) ya Katiba inaeleza kanuni za viongozi wa umma kuhusu:",
                options: ["Electoral campaigns", "Leadership and Integrity", "Judicial sentencing", "Foreign diplomacy"],
                options_sw: ["Kampeni za uchaguzi", "Uongozi na Uadilifu (Leadership and Integrity)", "Hukumu za mahakama", "Diplomasia ya kigeni"],
                correct: 1,
                explanation: "Chapter Six (Articles 73 - 80) establishes strict standards of Leadership and Integrity for all State Officers.",
                explanation_sw: "Sura ya Sasa (Ibara 73 - 80) inaweka viwango vikali vya Uongozi na Uadilifu kwa Maafisa wa Dola.",
                article: "Chapter Six — Leadership & Integrity"
            },
            {
                id: "land-6",
                q: "Under Article 73(1), authority assigned to a State officer is defined as a:",
                q_sw: "Chini ya Ibara ya 73(1), mamlaka aliyopewa afisa wa Dola inachukuliwa kuwa ni:",
                options: ["Personal privilege", "Public trust to serve the people", "Lifetime appointment", "Political reward"],
                options_sw: ["Haki binafsi", "Dhamana ya umma kuhudumia wananchi", "Wadhifa wa maisha", "Tuzo la kisiasa"],
                correct: 1,
                explanation: "Article 73(1)(a) declares that authority assigned to a State officer is a public trust to be exercised to serve the people, not to rule them.",
                explanation_sw: "Ibara ya 73(1)(a) inasema mamlaka ya afisa wa Dola ni dhamana ya umma ya kuwatumikia wananchi.",
                article: "Article 73(1) — Leadership as Public Trust"
            },
            {
                id: "land-7",
                q: "Under Article 76(2), are State officers permitted to maintain bank accounts outside Kenya?",
                q_sw: "Chini ya Ibara ya 76(2), je maafisa wa Dola wameruhusiwa kuwa na akaunti za benki nje ya Kenya?",
                options: ["Yes, without restriction", "No, except in accordance with an Act of Parliament", "Only in EAC member states", "Yes, if declared to KRA"],
                options_sw: ["Ndiyo, bila vikwazo", "Hapana, isipokuwa kulingana na Sheria ya Bunge", "Katika nchi za EAC pekee", "Ndiyo, zikitangazwa KRA"],
                correct: 1,
                explanation: "Article 76(2)(a) prohibits a State officer from maintaining a bank account outside Kenya except in accordance with an Act of Parliament.",
                explanation_sw: "Ibara ya 76(2)(a) inakataza afisa wa Dola kuwa na akaunti ya benki nje ya nchi isipokuwa kwa mujibu wa Sheria ya Bunge.",
                article: "Article 76(2) — Foreign Bank Accounts"
            },
            {
                id: "land-8",
                q: "Under Article 78(2), can a State officer or member of the defence forces hold dual citizenship?",
                q_sw: "Chini ya Ibara ya 78(2), je afisa wa Dola au mwanajeshi anaweza kuwa na uraia wa nchi mbili?",
                options: ["Yes, fully allowed", "No, dual citizenship is barred for State officers and defence forces", "Allowed for Cabinet Secretaries only", "Allowed after 5 years service"],
                options_sw: ["Ndiyo, inaruhusiwa kabisa", "Hapana, uraia wa nchi mbili ni mwiko kwa maafisa wa Dola na wanajeshi", "Inaruhusiwa kwa Mawaziri pekee", "Inaruhusiwa baada ya miaka 5"],
                correct: 1,
                explanation: "Article 78(2) specifies that a State officer or a member of the defence forces shall not hold dual citizenship.",
                explanation_sw: "Ibara ya 78(2) inasema afisa wa Dola au mwanachama wa majeshi ya ulinzi hatakuwa na uraia wa nchi mbili.",
                article: "Article 78(2) — Dual Citizenship Bar"
            },
            {
                id: "land-9",
                q: "Which commission is established under Article 79 to enforce Chapter Six standards on integrity and combat corruption?",
                q_sw: "Ni tume gani iliyoanzishwa chini ya Ibara ya 79 kutekeleza maadili ya Sura ya Sasa na kupambana na ufisadi?",
                options: ["Ethics and Anti-Corruption Commission (EACC)", "National Police Service Commission", "Public Service Commission", "Judicial Service Commission"],
                options_sw: ["Tume ya Maadili na Kupambana na Ufisadi (EACC)", "Tume ya Huduma ya Polisi", "Tume ya Huduma za Umma", "Tume ya Huduma za Mahakama"],
                correct: 0,
                explanation: "Article 79 requires Parliament to establish an independent Ethics and Anti-Corruption Commission (EACC) to enforce Chapter Six.",
                explanation_sw: "Ibara ya 79 inataka Bunge kuweka EACC kutekeleza maadili na kupambana na ufisadi.",
                article: "Article 79 — EACC Establishment"
            },
            {
                id: "land-10",
                q: "Under Article 70, if a person alleges their right to a clean and healthy environment is threatened, what remedy can they seek?",
                q_sw: "Chini ya Ibara ya 70, mtu anapodai haki yake ya mazingira safi na yenye afya inatishwa, anaweza kuomba hatua gani mahakamani?",
                options: ["Only financial damages", "Court order to stop/prevent harmful activity and provide compensation", "Imprisonment of offenders without trial", "Revocation of land title automatically"],
                options_sw: ["Fidia ya fedha pekee", "Amri ya mahakama ya kusitisha au kuzuia uharibifu na kutoa fidia", "Kufunga wahusika bila kesi", "Kufutilia mbali hatimiliki ya ardhi moja kwa moja"],
                correct: 1,
                explanation: "Article 70 enables any person to apply to court to stop/prevent harmful environmental acts and compel remedial measures or compensation.",
                explanation_sw: "Ibara ya 70 inamruhusu mtu yeyote kuomba amri ya mahakama kusitisha uharibifu wa mazingira na kutoa fidia.",
                article: "Article 70 — Enforcement of Environmental Rights"
            }
        ]
    }
};

import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { getKatibaAnswer } from '../../data/katibaData';
import { quizData } from '../../data/quizData';
import BottomNav from '../ui/BottomNav';

interface Message {
    id: number;
    type: 'bot' | 'user';
    text: string;
    article?: string;
    timestamp: string;
    reaction?: 'up' | 'down';
}

const DEFAULT_WELCOME_MSG: Message = {
    id: 1,
    type: 'bot',
    text: "Habari! 👋 I'm your Katiba guide. Ask me anything about Kenya's Constitution 2010, your rights, or how government works. I'll explain it in simple, clear language — in English or Kiswahili!",
    article: "📖 Based on the Constitution of Kenya, 2010",
    timestamp: "Just now"
};

const AskKatiba: React.FC = () => {
    const { setCurrentScreen, initialQuery, setInitialQuery, startQuiz } = useApp();
    const [messages, setMessages] = useState<Message[]>(() => {
        const saved = localStorage.getItem('uongozi_chat_history');
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch {
                return [DEFAULT_WELCOME_MSG];
            }
        }
        return [DEFAULT_WELCOME_MSG];
    });
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const scrollRef = useRef<HTMLDivElement>(null);

    const initialQueryHandled = useRef(false);

    // Save messages to localStorage
    useEffect(() => {
        if (messages.length > 0) {
            localStorage.setItem('uongozi_chat_history', JSON.stringify(messages.slice(-20)));
        }
    }, [messages]);

    useEffect(() => {
        if (initialQuery && !initialQueryHandled.current) {
            initialQueryHandled.current = true;
            handleSend(initialQuery);
            setInitialQuery('');
        }
    }, [initialQuery]);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const handleSend = async (text: string) => {
        if (!text.trim()) return;

        const userMsg: Message = {
            id: Date.now(),
            type: 'user',
            text,
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setIsTyping(true);

        try {
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    history: messages.slice(-5)
                })
            });

            const data = await response.json();
            if (data.error) throw new Error(data.error);

            const botMsg: Message = {
                id: Date.now() + 1,
                type: 'bot',
                text: data.answer,
                article: data.article ? `📖 ${data.article}` : undefined,
                timestamp: "Just now"
            };
            setMessages(prev => [...prev, botMsg]);
        } catch (error) {
            console.error('Error:', error);
            const fallback = getKatibaAnswer(text);
            const fallbackMsg: Message = {
                id: Date.now() + 1,
                type: 'bot',
                text: fallback.answer,
                article: `📖 ${fallback.article}`,
                timestamp: "Just now"
            };
            setMessages(prev => [...prev, fallbackMsg]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleReaction = (msgId: number, reaction: 'up' | 'down') => {
        setMessages(prev => prev.map(m => m.id === msgId ? { ...m, reaction: m.reaction === reaction ? undefined : reaction } : m));
    };

    const handleQuizThisTopic = () => {
        // Deep link into basic rights quiz category
        startQuiz('rights', quizData.rights.questions);
    };

    const quickQuestions = [
        { label: "Arrest rights", icon: "🚓" },
        { label: "MPs count", icon: "🏛️" },
        { label: "Devolution", icon: "🗺️" },
        { label: "Article 10", icon: "📜" },
        { label: "Report corruption", icon: "🔍" }
    ];

    return (
        <div id="ask" className="screen active">
            <header className="ask-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <button className="ask-back" onClick={() => setCurrentScreen('home')}>
                        ←
                    </button>
                    <div className="ask-title-group">
                        <h2>Ask the Constitution</h2>
                        <p>Katiba 2010 explained in plain language</p>
                    </div>
                </div>
            </header>

            <div className="ask-layout-container">
                {/* Desktop Left Sidebar / Mobile Quick Bar */}
                <aside className="quick-questions">
                    <div className="quick-label">QUICK TOPICS & QUESTIONS</div>
                    <div className="quick-btns">
                        {quickQuestions.map(q => (
                            <button key={q.label} className="quick-btn" onClick={() => handleSend(q.label)}>
                                <span className="q-icon">{q.icon}</span> {q.label}
                            </button>
                        ))}
                    </div>

                    <div className="katiba-guide-card">
                        <div className="guide-icon">⚖️</div>
                        <h4>Katiba AI Assistant</h4>
                        <p>Ask in English or Kiswahili to get instant plain-language constitutional article breakdown.</p>
                        <button
                            className="quick-btn"
                            style={{ width: '100%', marginTop: '12px', background: 'var(--gold)', color: 'var(--green)', border: 'none', fontWeight: '800' }}
                            onClick={handleQuizThisTopic}
                        >
                            🎯 Test Knowledge in Quiz!
                        </button>
                    </div>
                </aside>

                {/* Main Chat Timeline & Input Area */}
                <main className="chat-main-area">
                    <div className="chat-messages" ref={scrollRef}>
                        {messages.map((m) => (
                            <div key={m.id} className={`message ${m.type}`}>
                                <div className="message-bubble">
                                    <div className="message-text">{m.text}</div>
                                    {m.article && <div className="message-tag">{m.article}</div>}
                                    {m.type === 'bot' && (
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '8px', paddingTop: '6px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={() => handleReaction(m.id, 'up')}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: m.reaction === 'up' ? 1 : 0.4 }}
                                                >
                                                    👍 Helpful
                                                </button>
                                                <button
                                                    onClick={() => handleReaction(m.id, 'down')}
                                                    style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: m.reaction === 'down' ? 1 : 0.4 }}
                                                >
                                                    👎 Not clear
                                                </button>
                                            </div>
                                            <button
                                                onClick={handleQuizThisTopic}
                                                style={{ background: 'none', border: 'none', color: 'var(--gold)', cursor: 'pointer', fontWeight: '700', fontSize: '11px' }}
                                            >
                                                ⚡ Quiz This
                                            </button>
                                        </div>
                                    )}
                                </div>
                                <div className="message-meta">Katiba AI • {m.timestamp}</div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message bot">
                                <div className="message-bubble typing-bubble">
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                    <span className="typing-dot"></span>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="ask-input-area">
                        <div className="input-box-wrapper">
                            <textarea
                                className="ask-input"
                                placeholder="Ask anything about the Kenyan Constitution..."
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), handleSend(input))}
                            />
                        </div>
                        <button className="ask-send-btn" onClick={() => handleSend(input)}>↑</button>
                    </div>
                </main>
            </div>

            <BottomNav />
        </div>
    );
};

export default AskKatiba;


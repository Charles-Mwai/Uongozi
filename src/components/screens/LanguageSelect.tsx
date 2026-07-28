import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const LanguageSelect: React.FC = () => {
    const { user, saveUser, setCurrentScreen } = useApp();
    const [selected, setSelected] = useState<string | null>(user.lang || 'en');

    const handleContinue = () => {
        if (selected && selected !== 'sheng') {
            saveUser({ lang: selected });
            setCurrentScreen('onboarding');
        }
    };

    const languages = [
        { id: 'en', name: 'English', desc: 'Full experience • All features available', badge: 'GB' },
        { id: 'sw', name: 'Kiswahili', desc: 'Uzoefu kamili • Vipengele vyote vipo', badge: 'KE' },
        { id: 'sheng', name: 'Sheng', desc: 'Tukiwa tayari • Ukisubiri kidogo tu...', badge: '🤙', soon: true }
    ];

    return (
        <div id="langSelect" className="screen active">
            <div className="lang-content">
                <div className="lang-logo-badge">U</div>
                <h1 className="lang-app-name">Uongo<span>Zi</span></h1>

                <div className="welcome-msg">
                    <h2>No to lies. Yes to leadership.</h2>
                    <p>UongoZi — civic knowledge for every Kenyan.</p>
                </div>

                <div className="lang-cards">
                    {languages.map((lang) => (
                        <div
                            key={lang.id}
                            className={`lang-card ${selected === lang.id ? 'selected' : ''} ${lang.soon ? 'disabled' : ''}`}
                            onClick={() => !lang.soon && setSelected(lang.id)}
                        >
                            <div className="lang-icon-badge">
                                {lang.badge}
                            </div>
                            <div className="lang-info">
                                <div className="lang-name">{lang.name}</div>
                                <div className="lang-desc">{lang.desc}</div>
                            </div>
                            {lang.soon && <div className="coming-soon-badge">Coming Soon</div>}
                            <div className="lang-radio">
                                <div className="lang-radio-inner"></div>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className={`lang-cta ${selected && selected !== 'sheng' ? 'ready' : ''}`}
                    onClick={handleContinue}
                    disabled={!selected || selected === 'sheng'}
                >
                    Continue
                </button>
            </div>
        </div>
    );
};

export default LanguageSelect;

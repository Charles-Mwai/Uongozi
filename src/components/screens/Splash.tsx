import React from 'react';
import { useApp } from '../../context/AppContext';

const Splash: React.FC = () => {
    const { setCurrentScreen } = useApp();

    const handleGetStarted = () => {
        setCurrentScreen('home');
    };

    const handleGuest = () => {
        setCurrentScreen('home');
    };

    return (
        <div id="splash" className="screen active">
            <div className="splash-content">
                <div className="lang-logo-badge">U</div>
                <h1 className="lang-app-name">Uongo<span>Zi</span></h1>
                <p className="splash-tagline-small">KNOW YOUR CONSTITUTION KE</p>

                <div className="splash-definition-box">
                    <p>
                        <span className="highlight">"Uongozi"</span> — Leadership in Swahili<br />
                        <span className="highlight">"Uongo"</span> — Lies in Swahili<br />
                        <span className="highlight">UongoZi</span> — No to lies. Yes to leadership.
                    </p>
                </div>

                <div className="splash-btn-group">
                    <button className="btn-splash-primary" onClick={handleGetStarted}>
                        Get Started Free
                    </button>

                    <button className="btn-splash-secondary" onClick={handleGuest}>
                        Continue as Guest
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Splash;

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const kenyanCounties = [
    "Baringo", "Bomet", "Bungoma", "Busia", "Elgeyo Marakwet", "Embu", "Garissa",
    "Homa Bay", "Isiolo", "Kajiado", "Kakamega", "Kericho", "Kiambu", "Kilifi",
    "Kirinyaga", "Kisii", "Kisumu", "Kitui", "Kwale", "Laikipia", "Lamu",
    "Machakos", "Makueni", "Mandera", "Marsabit", "Meru", "Migori", "Mombasa",
    "Murang'a", "Nairobi", "Nakuru", "Nandi", "Narok", "Nyamira", "Nyandarua",
    "Nyeri", "Samburu", "Siaya", "Taita Taveta", "Tana River", "Tharaka Nithi",
    "Trans Nzoia", "Turkana", "Uasin Gishu", "Vihiga", "Wajir", "West Pokot"
];

const Onboarding: React.FC = () => {
    const { saveUser, setCurrentScreen, user } = useApp();
    const [nickname, setNickname] = useState(user.nickname || '');
    const [county, setCounty] = useState(user.county || '');

    const handleFinish = (e: React.FormEvent) => {
        e.preventDefault();
        if (nickname.trim() && county) {
            saveUser({
                nickname: nickname.trim(),
                county,
                profileCollected: true,
                xp: user.xp || 50 // Welcome bonus
            });
            setCurrentScreen('home');
        }
    };

    return (
        <div id="onboarding" className="screen active">
            <div className="onboard-content">
                <div className="lang-logo-badge">U</div>
                <h1 className="lang-app-name">Uongo<span>Zi</span></h1>

                <div className="onboard-header">
                    <h2>Set Up Profile</h2>
                    <p>This helps you join the leaderboard and track your progress!</p>
                </div>

                <div className="onboard-card">
                    <div className="welcome-bonus-pill">
                        ⚡ +50 XP Welcome Bonus
                    </div>

                    <form onSubmit={handleFinish} className="onboard-form">
                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">🦸</span> Hero Nickname
                            </label>
                            <input
                                type="text"
                                className="form-input"
                                placeholder="e.g. Mzalendo_001"
                                value={nickname}
                                onChange={(e) => setNickname(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label className="form-label">
                                <span className="label-icon">📍</span> Your County
                            </label>
                            <select
                                className="form-select"
                                value={county}
                                onChange={(e) => setCounty(e.target.value)}
                                required
                            >
                                <option value="" disabled>Select County</option>
                                {kenyanCounties.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="onboard-submit-btn">
                            Complete Setup →
                        </button>
                    </form>
                </div>
            </div>

            <div className="flag-strip"></div>
        </div>
    );
};

export default Onboarding;

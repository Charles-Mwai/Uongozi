import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';

const Onboarding: React.FC = () => {
    const { saveUser, setCurrentScreen } = useApp();
    const [nickname, setNickname] = useState('');
    const [county, setCounty] = useState('');

    const handleFinish = (e: React.FormEvent) => {
        e.preventDefault();
        if (nickname && county) {
            saveUser({
                nickname,
                county,
                profileCollected: true,
                xp: 50 // Welcome bonus
            });
            setCurrentScreen('home');
        }
    };

    const counties = [
        "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Kiambu",
        "Uasin Gishu", "Kajiado", "Machakos", "Kilifi", "Garissa"
        // Truncated for brevity, can add more later
    ];

    return (
        <div id="onboarding" className="screen active">
            <div className="onboard-header">
                <h2>Set Up Profile</h2>
                <p>This helps you join the leaderboard and track your progress!</p>
            </div>

            <form onSubmit={handleFinish}>
                <div className="form-group">
                    <label className="form-label">Hero Nickname</label>
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
                    <label className="form-label">Your County</label>
                    <select
                        className="form-select"
                        value={county}
                        onChange={(e) => setCounty(e.target.value)}
                        required
                    >
                        <option value="">Select County</option>
                        {counties.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '20px' }}>
                    Complete Setup
                </button>
            </form>

            <div className="flag-strip"></div>
        </div>
    );
};

export default Onboarding;

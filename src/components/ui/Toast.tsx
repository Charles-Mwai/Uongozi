import React from 'react';
import { useApp } from '../../context/AppContext';

const Toast: React.FC = () => {
    const { toasts } = useApp();
    if (toasts.length === 0) return null;

    return (
        <div className="toast-stack">
            {toasts.map((toast) => (
                <div key={toast.id} className={`toast toast-${toast.type}`}>
                    {toast.type === 'xp' && <span className="toast-icon">⚡</span>}
                    {toast.type === 'badge' && <span className="toast-icon">🏅</span>}
                    {toast.type === 'streak' && <span className="toast-icon">🔥</span>}
                    {toast.type === 'levelup' && <span className="toast-icon">✨</span>}
                    {toast.type === 'info' && <span className="toast-icon">ℹ️</span>}
                    <span className="toast-msg">{toast.message}</span>
                </div>
            ))}
        </div>
    );
};

export default Toast;

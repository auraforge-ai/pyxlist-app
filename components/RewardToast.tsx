
import React, { useState, useEffect } from 'react';
import { PxStarIcon } from './Icons';

interface RewardToastProps {
    message: string;
}

const RewardToast: React.FC<RewardToastProps> = ({ message }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div 
            className={`fixed bottom-20 left-1/2 -translate-x-1/2 w-full max-w-sm p-3 bg-[var(--color-surface-2)] border-2 border-[var(--color-border-secondary)] shadow-lg
                        flex items-center justify-center gap-3 transition-all duration-300 z-40 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            role="alert"
            aria-live="polite"
        >
            <PxStarIcon className="w-5 h-5 text-[var(--color-secondary)] flex-shrink-0" />
            <p className="text-sm text-center text-[var(--color-text)] font-bold">{message}</p>
        </div>
    );
};

export default RewardToast;

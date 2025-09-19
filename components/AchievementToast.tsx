import React, { useState, useEffect } from 'react';
import type { Achievement } from '../types';
import { PxTrophyIcon } from './Icons';

interface AchievementToastProps {
    achievement: Achievement;
}

const AchievementToast: React.FC<AchievementToastProps> = ({ achievement }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => setVisible(true), 10);
        return () => clearTimeout(timer);
    }, []);
    
    const Icon = achievement.icon || PxTrophyIcon;

    return (
        <div 
            className={`fixed bottom-5 left-1/2 -translate-x-1/2 w-full max-w-sm p-4 bg-[var(--color-surface-2)] border-2 border-[var(--color-priority-medium)] shadow-lg
                        flex items-center gap-4 transition-all duration-500 z-50 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            role="alert"
        >
            <Icon className="w-8 h-8 text-[var(--color-priority-medium)] flex-shrink-0" />
            <div>
                 <p className="text-xs text-[var(--color-secondary)]">Achievement Unlocked!</p>
                 <p className="text-base text-[var(--color-text)] font-bold">{achievement.name}</p>
            </div>
        </div>
    );
};

export default AchievementToast;

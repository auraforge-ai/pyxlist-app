import React from 'react';
import { PxCoinIcon } from './Icons';

interface PlayerStatsDisplayProps {
    level: number;
    xp: number;
    coins: number;
}

const PlayerStatsDisplay: React.FC<PlayerStatsDisplayProps> = ({ level, xp, coins }) => {
    const xpForNextLevel = 100;
    const currentLevelXp = xp % xpForNextLevel;
    const progressPercent = (currentLevelXp / xpForNextLevel) * 100;

    return (
        <div className="flex items-center gap-4 text-sm">
            <div className="flex flex-col items-center">
                <span className="text-[var(--color-primary)]">LVL</span>
                <span className="text-lg text-[var(--color-text)] font-bold">{level}</span>
            </div>
            <div className="flex flex-col gap-1">
                <div className="w-24">
                    <div className="text-xs text-center text-[var(--color-secondary)] mb-1">
                        XP: {currentLevelXp} / {xpForNextLevel}
                    </div>
                    <div className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border-secondary)] h-3">
                        <div 
                            style={{ width: `${progressPercent}%` }} 
                            className="h-full bg-[var(--color-secondary)] transition-all duration-500"
                            aria-valuenow={progressPercent}
                            aria-valuemin={0}
                            aria-valuemax={100}
                            role="progressbar"
                            aria-label={`Experience progress: ${currentLevelXp} of ${xpForNextLevel}`}
                        ></div>
                    </div>
                </div>
                <div className="flex items-center justify-center gap-1 text-[var(--color-priority-medium)] text-xs">
                    <PxCoinIcon className="w-3 h-3"/>
                    <span>{coins} Coins</span>
                </div>
            </div>
        </div>
    );
};

export default PlayerStatsDisplay;

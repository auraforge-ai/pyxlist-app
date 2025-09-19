import React from 'react';
import type { PlayerStats } from '../types';
import { ACHIEVEMENTS } from '../data/achievementData';

interface AchievementsModalProps {
    onClose: () => void;
    playerStats: PlayerStats;
}

const AchievementsModal: React.FC<AchievementsModalProps> = ({ onClose, playerStats }) => {

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" onClick={onClose}>
            <div className="w-full max-w-xl bg-[var(--color-bg)] border-4 border-[var(--color-border-primary)] p-6" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl text-[var(--color-primary)] mb-6">Achievements</h2>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                    {ACHIEVEMENTS.map(ach => {
                        const isUnlocked = playerStats.unlockedAchievementIds.includes(ach.id);
                        const Icon = ach.icon;
                        
                        return (
                            <div 
                                key={ach.id}
                                className={`p-4 border-2 flex flex-col items-center justify-start text-center gap-2 transition-all duration-300
                                            ${isUnlocked ? 'bg-[var(--color-surface-2)] border-[var(--color-border-secondary)]' : 'bg-[var(--color-surface-1)] border-[var(--color-border-muted)] opacity-60'}`}
                            >
                                <div className={`p-2 border-2 ${isUnlocked ? 'border-[var(--color-primary)]' : 'border-[var(--color-text-muted)]'}`}>
                                    <Icon className={`w-10 h-10 ${isUnlocked ? 'text-[var(--color-primary)]' : 'text-[var(--color-text-muted)]'}`} />
                                </div>
                                <h3 className={`text-sm font-bold ${isUnlocked ? 'text-[var(--color-secondary)]' : 'text-[var(--color-text-muted)]'}`}>
                                    {ach.name}
                                </h3>
                                <p className="text-xs text-[var(--color-text-muted)] h-10">
                                    {ach.description}
                                </p>
                            </div>
                        );
                    })}
                </div>

                <div className="flex justify-end pt-6">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-bg)] border-2 border-[var(--color-border-secondary)] hover:opacity-80 transition-opacity" autoFocus>
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AchievementsModal;

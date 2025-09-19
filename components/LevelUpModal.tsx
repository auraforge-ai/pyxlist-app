import React from 'react';
import { PxStarIcon } from './Icons';

interface LevelUpModalProps {
    newLevel: number;
    onClose: () => void;
}

const LevelUpModal: React.FC<LevelUpModalProps> = ({ newLevel, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" onClick={onClose}>
            <div className="w-full max-w-sm bg-[var(--color-bg)] border-4 border-[var(--color-border-secondary)] p-8 text-center" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-center items-center gap-4 mb-4">
                    <PxStarIcon className="w-6 h-6 text-[var(--color-priority-medium)] animate-pulse" />
                    <h2 className="text-3xl text-[var(--color-secondary)]">LEVEL UP!</h2>
                    <PxStarIcon className="w-6 h-6 text-[var(--color-priority-medium)] animate-pulse" />
                </div>
                
                <p className="text-lg text-[var(--color-text)] mb-6">
                    You have reached <span className="text-[var(--color-primary)] font-bold">Level {newLevel}</span>!
                </p>

                <button 
                    onClick={onClose} 
                    className="px-6 py-3 bg-[var(--color-secondary)] text-[var(--color-bg)] border-2 border-[var(--color-border-secondary)] hover:opacity-80 transition-opacity text-base"
                    autoFocus
                >
                    Continue Questing!
                </button>
            </div>
        </div>
    );
};

export default LevelUpModal;
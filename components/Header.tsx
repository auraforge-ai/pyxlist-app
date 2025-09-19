
import React, { useState, useEffect } from 'react';
import Clock from './Clock';
import { PxPencilIcon } from './Icons';
import type { Theme, PlayerStats } from '../types';
import ThemeSwitcher from './ThemeSwitcher';
import FileControls from './FileControls';
import PlayerStatsDisplay from './PlayerStatsDisplay';
import AvatarDisplay from './AvatarDisplay';

interface HeaderProps {
    theme: Theme;
    userName: string;
    onUserNameChange: (name: string) => void;
    onThemeChange: (theme: Theme) => void;
    onExport: () => void;
    onImport: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onOpenHelp: () => void;
    onOpenAvatarModal: () => void;
    onOpenAchievementsModal: () => void;
    playerStats: PlayerStats;
}

const Header: React.FC<HeaderProps> = ({ theme, userName, onUserNameChange, onThemeChange, onExport, onImport, onOpenHelp, onOpenAvatarModal, onOpenAchievementsModal, playerStats }) => {
    const [isEditingName, setIsEditingName] = useState(false);
    const [currentName, setCurrentName] = useState(userName);

    useEffect(() => {
        setCurrentName(userName);
    }, [userName]);

    const handleNameSave = () => {
        if (currentName.trim()) {
            onUserNameChange(currentName.trim());
        } else {
            setCurrentName(userName); // Reset if empty
        }
        setIsEditingName(false);
    };
    
    const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleNameSave();
        if (e.key === 'Escape') {
            setCurrentName(userName);
            setIsEditingName(false);
        }
    };
    
    const iconButtonClass = "p-2 w-10 h-10 flex items-center justify-center text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-[var(--color-bg)] transition-colors";

    return (
        <header className="p-4 border-2 border-[var(--color-border-secondary)] bg-[var(--color-surface-1)] flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3 text-2xl sm:text-3xl text-[var(--color-secondary)] tracking-wider">
                {isEditingName ? (
                     <input
                        type="text"
                        value={currentName}
                        onChange={(e) => setCurrentName(e.target.value)}
                        onBlur={handleNameSave}
                        onKeyDown={handleNameKeyDown}
                        className="text-2xl sm:text-3xl bg-transparent border-b-2 border-[var(--color-primary)] text-[var(--color-primary)] focus:outline-none w-full max-w-xs"
                        autoFocus
                    />
                ) : (
                    <div className="flex items-center gap-2 group cursor-pointer" onClick={() => setIsEditingName(true)}>
                        <h1>{userName}'s Pyxlist</h1>
                        <PxPencilIcon className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--color-text-muted)]" />
                    </div>
                )}
            </div>
            <div className="flex flex-wrap justify-center items-center gap-4">
                <div 
                    className="cursor-pointer" 
                    onClick={onOpenAvatarModal}
                    role="button"
                    aria-label="Customize Avatar"
                >
                    <AvatarDisplay playerStats={playerStats} />
                </div>
                <PlayerStatsDisplay level={playerStats.level} xp={playerStats.xp} coins={playerStats.coins} />
                <FileControls onExport={onExport} onImport={onImport} />
                <ThemeSwitcher selectedTheme={theme} onThemeChange={onThemeChange} />
                <button onClick={onOpenAchievementsModal} className={iconButtonClass} aria-label="Achievements">
                    <span className="text-2xl">🏆</span>
                </button>
                <button onClick={onOpenHelp} className={iconButtonClass} aria-label="Help">
                    <span className="text-2xl font-bold">?</span>
                </button>
                <Clock />
            </div>
        </header>
    );
};

export default Header;

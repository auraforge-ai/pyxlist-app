import React from 'react';
import type { Theme } from '../types';
import { themes } from '../themes';

interface ThemeSwitcherProps {
    selectedTheme: Theme;
    onThemeChange: (theme: Theme) => void;
}

const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ selectedTheme, onThemeChange }) => {
    return (
        <div>
            <label htmlFor="theme-select" className="sr-only">Select Theme</label>
            <select
                id="theme-select"
                value={selectedTheme}
                onChange={(e) => onThemeChange(e.target.value as Theme)}
                className="px-3 py-2 border-2 border-[var(--color-border-secondary)] bg-[var(--color-surface-2)] text-[var(--color-secondary)] focus:outline-none focus:border-[var(--color-primary)] transition-colors appearance-none text-sm"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23${'0ff'.substring(1)}' shape-rendering='crispEdges'%3E%3Cpath d='M2 6l6 6 6-6H2z'/%3E%3C/svg%3E")`,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '1em',
                    paddingRight: '2rem',
                }}
            >
                {themes.map(theme => (
                    <option key={theme.name} value={theme.name}>
                        {theme.displayName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ThemeSwitcher;

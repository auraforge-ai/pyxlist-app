
import React, { useState, useEffect, useRef } from 'react';
import { PxPlayIcon, PxPauseIcon, PxResetIcon } from './Icons';
import type { PlayerStats } from '../types';

export type TimerMode = 'work' | 'shortBreak' | 'longBreak';

interface PomodoroTimerProps {
    settings: PlayerStats['pomodoroSettings'];
    onSessionComplete: (mode: TimerMode) => void;
    onSettingsChange: (newSettings: PlayerStats['pomodoroSettings']) => void;
}

const PomodoroTimer: React.FC<PomodoroTimerProps> = ({ settings, onSessionComplete, onSettingsChange }) => {
    const [mode, setMode] = useState<TimerMode>('work');
    const [timeLeft, setTimeLeft] = useState(settings.work);
    const [isActive, setIsActive] = useState(false);
    const [pomodoroCount, setPomodoroCount] = useState(0);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [localSettings, setLocalSettings] = useState(settings);

    const intervalRef = useRef<number | null>(null);
    const originalTitleRef = useRef(document.title);
    
    useEffect(() => {
        setLocalSettings(settings);
        if (!isActive) {
            setTimeLeft(settings[mode]);
        }
    }, [settings]);

    const resetTimer = (newMode: TimerMode = 'work') => {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setIsActive(false);
        setMode(newMode);
        setTimeLeft(settings[newMode]);
        if (newMode === 'work') setPomodoroCount(0);
        document.title = originalTitleRef.current;
    };

    const handleNextSession = () => {
        setIsActive(false);
        onSessionComplete(mode);

        let nextMode: TimerMode;
        let nextPomodoroCount = pomodoroCount;

        if (mode === 'work') {
            nextPomodoroCount++;
            if (nextPomodoroCount % 4 === 0) {
                nextMode = 'longBreak';
            } else {
                nextMode = 'shortBreak';
            }
        } else {
            nextMode = 'work';
        }

        setMode(nextMode);
        setTimeLeft(settings[nextMode]);
        setPomodoroCount(nextPomodoroCount);
        document.title = `${nextMode === 'work' ? 'Focus time!' : 'Break time!'} - ${originalTitleRef.current}`;
    };

    useEffect(() => {
        if (isActive) {
            intervalRef.current = window.setInterval(() => setTimeLeft(prev => prev - 1), 1000);
        } else {
            if (intervalRef.current) clearInterval(intervalRef.current);
        }
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [isActive]);

    useEffect(() => {
        if (timeLeft <= 0) {
            handleNextSession();
        } else if (isActive) {
             document.title = `${formatTime(timeLeft)} - ${mode === 'work' ? 'Focus' : 'Break'} - ${originalTitleRef.current}`;
        }
    }, [timeLeft, isActive]);
    
    const handleSettingsSave = () => {
        onSettingsChange(localSettings);
        setIsSettingsOpen(false);
        // If timer is not active, update it with new settings
        if(!isActive) {
            setTimeLeft(localSettings[mode]);
        }
    };

    const toggleTimer = () => setIsActive(prev => !prev);
    const formatTime = (totalSeconds: number) => {
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    };
    
    const modeInfo = {
        work: { text: 'Focus', color: 'var(--color-priority-high)' },
        shortBreak: { text: 'Short Break', color: 'var(--color-priority-low)' },
        longBreak: { text: 'Long Break', color: 'var(--color-secondary)' },
    };

    return (
        <div className="p-4 border-2 border-[var(--color-border-secondary)] bg-[var(--color-surface-1)] text-center">
            <div className="flex justify-between items-center mb-2">
                <h3 className="text-lg text-[var(--color-secondary)]">Focus Timer</h3>
                <button
                    onClick={() => setIsSettingsOpen(p => !p)}
                    className="p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                    aria-label="Timer Settings"
                >
                    <span className="text-xl">⚙️</span>
                </button>
            </div>

            {isSettingsOpen ? (
                <div className="space-y-3 py-2">
                    <div className="grid grid-cols-3 gap-2 text-xs text-[var(--color-secondary)]">
                        <label htmlFor="work-duration">Work</label>
                        <label htmlFor="short-break-duration">Short Break</label>
                        <label htmlFor="long-break-duration">Long Break</label>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                        <input type="number" id="work-duration" min="1" value={localSettings.work / 60} onChange={e => setLocalSettings({...localSettings, work: +e.target.value * 60})} className="w-full bg-[var(--color-surface-3)] border-2 border-[var(--color-border-secondary)] p-2 text-center" />
                        <input type="number" id="short-break-duration" min="1" value={localSettings.shortBreak / 60} onChange={e => setLocalSettings({...localSettings, shortBreak: +e.target.value * 60})} className="w-full bg-[var(--color-surface-3)] border-2 border-[var(--color-border-secondary)] p-2 text-center" />
                        <input type="number" id="long-break-duration" min="1" value={localSettings.longBreak / 60} onChange={e => setLocalSettings({...localSettings, longBreak: +e.target.value * 60})} className="w-full bg-[var(--color-surface-3)] border-2 border-[var(--color-border-secondary)] p-2 text-center" />
                    </div>
                    <button onClick={handleSettingsSave} className="w-full px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-bg)] text-sm">Save</button>
                </div>
            ) : (
                <>
                    <div 
                        className="p-6 my-2 transition-colors" 
                        style={{ backgroundColor: modeInfo[mode].color, color: 'var(--color-bg)'}}
                    >
                        <p className="text-sm font-bold tracking-widest uppercase">{modeInfo[mode].text}</p>
                        <p className="text-6xl font-bold">{formatTime(timeLeft)}</p>
                    </div>
                    <div className="flex justify-center gap-4 mt-4">
                        <button
                            onClick={toggleTimer}
                            className="p-3 bg-[var(--color-primary)] text-[var(--color-bg)] border-2 border-[var(--color-border-primary)] hover:opacity-80 transition-colors"
                            aria-label={isActive ? 'Pause timer' : 'Start timer'}
                        >
                            {isActive ? <PxPauseIcon className="w-6 h-6" /> : <PxPlayIcon className="w-6 h-6" />}
                        </button>
                        <button
                            onClick={() => resetTimer(mode)}
                            className="p-3 bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border-2 border-[var(--color-border-muted)] hover:bg-[var(--color-border-muted)] transition-colors"
                            aria-label="Reset timer"
                        >
                            <PxResetIcon className="w-6 h-6" />
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PomodoroTimer;

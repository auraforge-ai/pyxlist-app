
import React from 'react';
import type { Task } from '../types';
import { PxCrosshairIcon, PxPlayIcon, PxPauseIcon, PxResetIcon } from './Icons';

interface TrackedQuestProps {
    tasks: (Task & { listId?: string })[];
    trackedTaskId: string | null;
    timer: number;
    isTimerActive: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
}

const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const parts = [];
    if (hours > 0) parts.push(String(hours).padStart(2, '0'));
    parts.push(String(minutes).padStart(2, '0'));
    parts.push(String(seconds).padStart(2, '0'));
    return parts.join(':');
};

const TrackedQuest: React.FC<TrackedQuestProps> = ({ tasks, trackedTaskId, timer, isTimerActive, onStart, onPause, onReset }) => {
    const trackedTask = tasks.find(t => t.id === trackedTaskId);

    if (!trackedTask) {
        return null; // Don't render if no task is tracked
    }

    const controlButtonClass = "p-2 text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors";

    return (
        <div className="p-4 border-2 border-dashed bg-[var(--color-surface-2)] animate-pulse-glow">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                    <PxCrosshairIcon className="w-6 h-6 text-[var(--color-secondary)] flex-shrink-0" />
                    <div className="min-w-0">
                        <h3 className="text-xs text-[var(--color-secondary)] uppercase tracking-wider">Current Quest</h3>
                        <p className="text-base text-[var(--color-text)] truncate" title={trackedTask?.title}>
                            {trackedTask ? trackedTask.title : 'No quest selected'}
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-end flex-shrink-0">
                     <div className="text-lg text-[var(--color-primary)] font-bold">{formatTime(timer)}</div>
                     <div className="flex items-center">
                        {isTimerActive ? (
                            <button onClick={onPause} className={controlButtonClass} aria-label="Pause quest timer">
                                <PxPauseIcon className="w-5 h-5" />
                            </button>
                        ) : (
                            <button onClick={onStart} className={controlButtonClass} aria-label="Start quest timer">
                                <PxPlayIcon className="w-5 h-5" />
                            </button>
                        )}
                        <button onClick={onReset} className={controlButtonClass} aria-label="Reset quest timer">
                            <PxResetIcon className="w-5 h-5" />
                        </button>
                     </div>
                </div>
            </div>
        </div>
    );
};

export default TrackedQuest;

import React, { useState, useMemo } from 'react';
import type { Task } from '../types';
import { PxChevronLeftIcon, PxChevronRightIcon } from './Icons';

interface CalendarProps {
    selectedDate: Date;
    onDateSelect: (date: Date) => void;
    tasks: Task[];
}

const Calendar: React.FC<CalendarProps> = ({ selectedDate, onDateSelect, tasks }) => {
    const [currentMonth, setCurrentMonth] = useState(new Date(selectedDate.getFullYear(), selectedDate.getMonth(), 1));

    const today = new Date();

    const daysInMonth = useMemo(() => {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
        const days = [];
        while (date.getMonth() === currentMonth.getMonth()) {
            days.push(new Date(date));
            date.setDate(date.getDate() + 1);
        }
        return days;
    }, [currentMonth]);

    const startingDayIndex = currentMonth.getDay();

    const tasksByDate = useMemo(() => {
        const map = new Map<string, number>();
        tasks.forEach(task => {
            if (task.dueDate) {
                // Bug Fix: Correct for timezone offset when creating date key.
                const utcDate = new Date(task.dueDate);
                const localDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
                const dateKey = localDate.toDateString();
                map.set(dateKey, (map.get(dateKey) || 0) + 1);
            }
        });
        return map;
    }, [tasks]);

    const changeMonth = (offset: number) => {
        setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + offset, 1));
    };

    const isSameDay = (d1: Date, d2: Date) => 
        d1.getFullYear() === d2.getFullYear() &&
        d1.getMonth() === d2.getMonth() &&
        d1.getDate() === d2.getDate();

    const weekdays = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

    return (
        <div className="p-4 border-2 border-[var(--color-border-primary)] bg-[var(--color-surface-1)]">
            <div className="flex justify-between items-center mb-4">
                <button onClick={() => changeMonth(-1)} className="p-2 text-[var(--color-primary)] hover:text-[var(--color-bg)] hover:bg-[var(--color-primary)] transition-colors">
                    <PxChevronLeftIcon className="w-5 h-5"/>
                </button>
                <h2 className="text-lg text-[var(--color-primary)]">
                    {currentMonth.toLocaleString('default', { month: 'long' })} {currentMonth.getFullYear()}
                </h2>
                <button onClick={() => changeMonth(1)} className="p-2 text-[var(--color-primary)] hover:text-[var(--color-bg)] hover:bg-[var(--color-primary)] transition-colors">
                    <PxChevronRightIcon className="w-5 h-5"/>
                </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs text-center">
                {weekdays.map(day => <div key={day} className="text-[var(--color-secondary)] font-bold">{day}</div>)}
                {Array.from({ length: startingDayIndex }).map((_, i) => <div key={`empty-${i}`}></div>)}
                {daysInMonth.map(day => {
                    const isToday = isSameDay(day, today);
                    const isSelected = isSameDay(day, selectedDate);
                    const hasTasks = tasksByDate.has(day.toDateString());

                    let dayClasses = "relative w-10 h-10 flex items-center justify-center cursor-pointer transition-colors duration-200";
                    if (isSelected) {
                        dayClasses += " bg-[var(--color-primary)] text-[var(--color-bg)]";
                    } else if (isToday) {
                        dayClasses += " border-2 border-[var(--color-border-secondary)] text-[var(--color-secondary)]";
                    } else {
                        dayClasses += " hover:bg-[var(--color-surface-2)]";
                    }

                    return (
                        <div key={day.toString()} className={dayClasses} onClick={() => onDateSelect(day)}>
                            <span>{day.getDate()}</span>
                            {hasTasks && <div className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-[var(--color-priority-medium)] rounded-full"></div>}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;

import React, { useState, FormEvent, useEffect } from 'react';
import type { Task } from '../types';
import { Priority } from '../types';

interface AddTaskModalProps {
    task: Task | null;
    onSave: (taskData: Omit<Task, 'id' | 'completed'> & { id?: string }) => void;
    onClose: () => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ task, onSave, onClose }) => {
    const [title, setTitle] = useState('');
    const [priority, setPriority] = useState<Priority>(Priority.Medium);
    const [dueDate, setDueDate] = useState('');
    const [dueTime, setDueTime] = useState('');
    const [notes, setNotes] = useState('');
    
    useEffect(() => {
        if (task) {
            setTitle(task.title);
            setPriority(task.priority);
            setDueDate(task.dueDate || '');
            setDueTime(task.dueTime || '');
            setNotes(task.notes || '');
        }
    }, [task]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;
        onSave({
            ...(task && { id: task.id }),
            title,
            priority,
            dueDate: dueDate || null,
            dueTime: dueTime || null,
            notes
        });
    };

    const inputBaseClass = "w-full bg-[var(--color-surface-3)] border-2 border-[var(--color-border-secondary)] p-2 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-border-primary)] transition-colors placeholder-[var(--color-text-muted)] text-sm";
    
    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
            <div className="w-full max-w-md bg-[var(--color-bg)] border-4 border-[var(--color-border-primary)] p-6">
                <h2 className="text-2xl text-[var(--color-primary)] mb-6">{task ? 'Edit Quest' : 'New Quest'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="block text-[var(--color-secondary)] text-sm mb-1" htmlFor="task-title">Title</label>
                        <input id="task-title" type="text" value={title} onChange={e => setTitle(e.target.value)} className={inputBaseClass} required />
                    </div>
                    
                    <div>
                        <label className="block text-[var(--color-secondary)] text-sm mb-1">Priority</label>
                        <div className="grid grid-cols-3 gap-2">
                           {Object.values(Priority).map(p => (
                               <button type="button" key={p} onClick={() => setPriority(p)} className={`p-2 border-2 text-sm transition-colors ${priority === p ? 'bg-[var(--color-primary)] text-[var(--color-bg)] border-[var(--color-border-primary)]' : 'border-[var(--color-border-secondary)] text-[var(--color-secondary)] hover:bg-[var(--color-secondary)] hover:text-[var(--color-bg)]'}`}>
                                   {p}
                               </button>
                           ))}
                        </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-[var(--color-secondary)] text-sm mb-1" htmlFor="task-date">Due Date</label>
                            <input id="task-date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className={inputBaseClass} />
                        </div>
                        <div>
                            <label className="block text-[var(--color-secondary)] text-sm mb-1" htmlFor="task-time">Due Time</label>
                            <input id="task-time" type="time" value={dueTime} onChange={e => setDueTime(e.target.value)} className={inputBaseClass} />
                        </div>
                    </div>

                    <div>
                        <label className="block text-[var(--color-secondary)] text-sm mb-1" htmlFor="task-notes">Notes</label>
                        <textarea id="task-notes" value={notes} onChange={e => setNotes(e.target.value)} className={`${inputBaseClass} h-24 resize-none`}></textarea>
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border-2 border-[var(--color-border-muted)] hover:bg-[var(--color-border-muted)] transition-colors">Cancel</button>
                        <button type="submit" className="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-bg)] border-2 border-[var(--color-border-secondary)] hover:opacity-80 transition-opacity">{task ? 'Save Changes' : 'Add Quest'}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddTaskModal;

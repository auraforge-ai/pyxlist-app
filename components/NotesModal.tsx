import React, { useState } from 'react';
import type { Task } from '../types';

interface NotesModalProps {
    task: Task;
    listId: string;
    onSave: (taskId: string, listId: string, notes: string) => void;
    onClose: () => void;
}

const NotesModal: React.FC<NotesModalProps> = ({ task, listId, onSave, onClose }) => {
    const [notes, setNotes] = useState(task.notes || '');

    const handleSave = () => {
        onSave(task.id, listId, notes);
    };
    
    const baseClass = "w-full bg-[var(--color-surface-3)] border-2 border-[var(--color-border-secondary)] p-2 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-border-primary)] transition-colors placeholder-[var(--color-text-muted)] text-sm";

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true">
            <div className="w-full max-w-sm bg-[var(--color-bg)] border-4 border-[var(--color-border-primary)] p-6">
                <h2 className="text-xl text-[var(--color-primary)] mb-2">Notes for:</h2>
                <p className="text-base text-[var(--color-secondary)] mb-4 truncate">{task.title}</p>
                
                <label htmlFor="task-notes-editor" className="sr-only">Task Notes</label>
                <textarea 
                    id="task-notes-editor"
                    value={notes} 
                    onChange={e => setNotes(e.target.value)} 
                    className={`${baseClass} h-48 resize-none`}
                    autoFocus
                ></textarea>

                <div className="flex justify-end gap-4 pt-4">
                    <button type="button" onClick={onClose} className="px-4 py-2 bg-[var(--color-surface-2)] text-[var(--color-text-muted)] border-2 border-[var(--color-border-muted)] hover:bg-[var(--color-border-muted)] transition-colors">Cancel</button>
                    <button type="button" onClick={handleSave} className="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-bg)] border-2 border-[var(--color-border-secondary)] hover:opacity-80 transition-opacity">Save Notes</button>
                </div>
            </div>
        </div>
    );
};

export default NotesModal;

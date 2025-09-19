
import React from 'react';
import type { Task } from '../types';
import { Priority } from '../types';
import { PxPencilIcon, PxTrashIcon, PxCheckIcon, PxCopyIcon, PxNoteIcon, PxNoteFilledIcon, PxCrosshairIcon } from './Icons';

interface TaskItemProps {
    task: Task;
    listId?: string;
    isTracked: boolean;
    onToggle: (id: string, listId?: string) => void;
    onDelete: (id:string, listId?: string) => void;
    onEdit: (task: Task, listId?: string) => void;
    onCopy: (id: string, listId?: string) => void;
    onEditNotes: (task: Task, listId?: string) => void;
    onSetTracked: (id: string) => void;
}

const priorityClasses: { [key in Priority]: string } = {
    [Priority.High]: 'border-[var(--color-priority-high)] text-[var(--color-priority-high)]',
    [Priority.Medium]: 'border-[var(--color-priority-medium)] text-[var(--color-priority-medium)]',
    [Priority.Low]: 'border-[var(--color-priority-low)] text-[var(--color-priority-low)]',
};

const TaskItem: React.FC<TaskItemProps> = ({ task, listId, isTracked, onToggle, onDelete, onEdit, onCopy, onEditNotes, onSetTracked }) => {
    const priorityClass = priorityClasses[task.priority];
    const hasNotes = task.notes && task.notes.trim().length > 0;

    const trackedClass = isTracked 
        ? 'border-[var(--color-border-secondary)]' 
        : 'border-transparent';

    return (
        <div className={`p-3 bg-[var(--color-surface-2)] border border-l-4 ${priorityClass} flex items-center gap-4 transition-all duration-300 ${task.completed ? 'opacity-50' : 'opacity-100'} ${trackedClass}`}>
            <div 
                role="checkbox"
                aria-checked={task.completed}
                tabIndex={0}
                className="w-6 h-6 border-2 border-[var(--color-border-secondary)] flex-shrink-0 cursor-pointer flex items-center justify-center"
                onClick={() => onToggle(task.id, listId)}
                onKeyDown={(e) => e.key === 'Enter' && onToggle(task.id, listId)}
            >
                {task.completed && <PxCheckIcon className="w-5 h-5 text-[var(--color-secondary)]"/>}
            </div>

            <div className="flex-grow">
                <p className={`text-base ${task.completed ? 'line-through text-[var(--color-text-muted)]' : 'text-[var(--color-text)]'}`}>{task.title}</p>
                {task.dueTime && (
                  <p className="text-xs text-[var(--color-primary)]">{task.dueTime}</p>
                )}
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
                 <button onClick={() => onSetTracked(task.id)} className={`p-1 transition-colors ${isTracked ? 'text-[var(--color-secondary)]' : 'text-[var(--color-text-muted)] hover:text-[var(--color-secondary)]'}`} aria-label="Track Quest">
                    <PxCrosshairIcon className="w-4 h-4" />
                </button>
                 <button onClick={() => onEditNotes(task, listId)} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors" aria-label="Edit Notes">
                    {hasNotes ? <PxNoteFilledIcon className="w-4 h-4" /> : <PxNoteIcon className="w-4 h-4" />}
                </button>
                <button onClick={() => onCopy(task.id, listId)} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-secondary)] transition-colors" aria-label="Copy Task">
                    <PxCopyIcon className="w-4 h-4"/>
                </button>
                <button onClick={() => onEdit(task, listId)} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-priority-medium)] transition-colors" aria-label="Edit Task">
                    <PxPencilIcon className="w-4 h-4"/>
                </button>
                <button onClick={() => onDelete(task.id, listId)} className="p-1 text-[var(--color-text-muted)] hover:text-[var(--color-priority-high)] transition-colors" aria-label="Delete Task">
                    <PxTrashIcon className="w-4 h-4"/>
                </button>
            </div>
        </div>
    );
};

export default TaskItem;

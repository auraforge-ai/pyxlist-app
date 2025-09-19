import React, { useState } from 'react';
import type { Task } from '../types';
import TaskItem from './TaskItem';
import { PxPlusIcon, PxPencilIcon, PxTrashIcon, PxXIcon } from './Icons';

interface TaskListProps {
    title: string;
    tasks: (Task & { listId?: string })[];
    listId?: string;
    trackedTaskId: string | null;
    onToggle: (id: string, listId?: string) => void;
    onDelete: (id: string, listId?: string) => void;
    onEdit: (task: Task, listId?: string) => void;
    onCopy: (id: string, listId?: string) => void;
    onEditNotes: (task: Task, listId?: string) => void;
    onSetTracked: (id: string) => void;
    onAddNew?: () => void;
    onDeleteList?: () => void;
    onUpdateTitle?: (newTitle: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ title, tasks, listId, trackedTaskId, onToggle, onDelete, onEdit, onCopy, onEditNotes, onSetTracked, onAddNew, onDeleteList, onUpdateTitle }) => {
    const [isEditingTitle, setIsEditingTitle] = useState(false);
    const [currentTitle, setCurrentTitle] = useState(title);

    const completedTasks = tasks.filter(t => t.completed).length;
    const totalTasks = tasks.length;
    const progress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

    const handleTitleBlur = () => {
        if (onUpdateTitle && currentTitle.trim()) {
            onUpdateTitle(currentTitle.trim());
        } else {
            setCurrentTitle(title);
        }
        setIsEditingTitle(false);
    };

    const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleTitleBlur();
        } else if (e.key === 'Escape') {
            setCurrentTitle(title);
            setIsEditingTitle(false);
        }
    };

    const isEditable = !!onAddNew;

    return (
        <div className="p-4 border-2 border-[var(--color-border-primary)] bg-[var(--color-surface-1)] h-full flex flex-col">
            <div className="flex justify-between items-center mb-4 gap-2">
                {isEditingTitle ? (
                    <input
                        type="text"
                        value={currentTitle}
                        onChange={(e) => setCurrentTitle(e.target.value)}
                        onBlur={handleTitleBlur}
                        onKeyDown={handleTitleKeyDown}
                        className="text-xl bg-transparent border-b-2 border-[var(--color-primary)] text-[var(--color-primary)] focus:outline-none w-full"
                        autoFocus
                    />
                ) : (
                    <h2 className="text-xl text-[var(--color-primary)] truncate">{title}</h2>
                )}
                 <div className="flex items-center flex-shrink-0">
                    {onUpdateTitle && (
                        <button onClick={() => setIsEditingTitle(true)} className="p-2 text-[var(--color-primary)] hover:text-[var(--color-bg)] hover:bg-[var(--color-primary)] transition-colors" aria-label="Rename list">
                            <PxPencilIcon className="w-4 h-4"/>
                        </button>
                    )}
                    {onAddNew && (
                        <button onClick={onAddNew} className="p-2 text-[var(--color-primary)] hover:text-[var(--color-bg)] hover:bg-[var(--color-primary)] transition-colors" aria-label="Add new task">
                            <PxPlusIcon className="w-5 h-5"/>
                        </button>
                    )}
                    {onDeleteList && (
                         <button onClick={onDeleteList} className="p-2 text-[var(--color-priority-high)] hover:text-[var(--color-bg)] hover:bg-[var(--color-priority-high)] transition-colors" aria-label="Delete list">
                            <PxXIcon className="w-5 h-5"/>
                        </button>
                    )}
                </div>
            </div>
            
            <div className="mb-4">
                <div className="text-xs text-[var(--color-secondary)] mb-1">{completedTasks} / {totalTasks} Complete</div>
                <div className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border-secondary)] h-4">
                    <div style={{ width: `${progress}%` }} className="h-full bg-[var(--color-secondary)] transition-all duration-500"></div>
                </div>
            </div>

            <div className="space-y-3 overflow-y-auto flex-grow pr-2">
                {tasks.length > 0 ? (
                    tasks.map(task => (
                        <TaskItem 
                          key={task.id} 
                          task={task} 
                          listId={task.listId ?? listId}
                          isTracked={task.id === trackedTaskId}
                          onToggle={onToggle} 
                          onDelete={onDelete} 
                          onEdit={onEdit}
                          onCopy={onCopy}
                          onEditNotes={onEditNotes}
                          onSetTracked={onSetTracked}
                        />
                    ))
                ) : (
                    <div className="text-center text-[var(--color-text-muted)] py-8 text-sm">
                        <p>No quests here.</p>
                        {isEditable && <p>A true hero finds their own adventure!</p>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default TaskList;

import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import type { Task, TaskList, Theme, Priority, PlayerStats, PyxlistExportData, Achievement } from './types';
import { processAuraInput, AuraActionResponse } from './services/geminiService';
import Header from './components/Header';
import Calendar from './components/Calendar';
import TaskListComponent from './components/TaskList';
import AddTaskModal from './components/AddTaskModal';
import AuraInput from './components/GeminiTaskSuggester';
import NotesModal from './components/NotesModal';
import LevelUpModal from './components/LevelUpModal';
import HelpModal from './components/HelpModal';
import UndoToast from './components/UndoToast';
import PomodoroTimer from './components/PomodoroTimer';
import type { TimerMode } from './components/PomodoroTimer';
import { themes } from './themes';
import AvatarCustomizationModal from './components/AvatarCustomizationModal';
import { AVATARS, SHOP_ITEMS } from './data/avatarData';
import { ACHIEVEMENTS } from './data/achievementData';
import AchievementsModal from './components/AchievementsModal';
import AchievementToast from './components/AchievementToast';
import AuraMessageToast from './components/AuraMessageToast';
import TrackedQuest from './components/TrackedQuest';
import RewardToast from './components/RewardToast';

const xpValues: { [key in Priority]: number } = {
    'Low': 1,
    'Medium': 3,
    'High': 10,
};

const App: React.FC = () => {
    const [lists, setLists] = useState<TaskList[]>(() => {
        try {
            const savedLists = localStorage.getItem('lists');
            if (savedLists) return JSON.parse(savedLists);
            const savedTasks = localStorage.getItem('tasks');
            if (savedTasks) {
                const tasks: Task[] = JSON.parse(savedTasks);
                localStorage.removeItem('tasks');
                return [{ id: crypto.randomUUID(), title: 'My First List', tasks }];
            }
            return [{ id: crypto.randomUUID(), title: 'My First List', tasks: [] }];
        } catch (e) {
            console.error("Failed to parse from localStorage", e);
            return [{ id: crypto.randomUUID(), title: 'My First List', tasks: [] }];
        }
    });
    
    const [playerStats, setPlayerStats] = useState<PlayerStats>(() => {
        try {
            const savedStats = localStorage.getItem('playerStats');
            const stats = savedStats ? JSON.parse(savedStats) : {};
            return {
                xp: stats.xp || 0,
                level: stats.level || 1,
                coins: stats.coins || 0,
                avatarId: stats.avatarId || 'avatar1',
                ownedItemIds: stats.ownedItemIds || [],
                equippedItems: stats.equippedItems || { hat: null, shirt: null },
                tasksCompleted: stats.tasksCompleted || 0,
                pomodorosCompleted: stats.pomodorosCompleted || 0,
                aiPlannerUses: stats.aiPlannerUses || 0,
                unlockedAchievementIds: stats.unlockedAchievementIds || [],
                trackedTaskId: stats.trackedTaskId || null,
                pomodoroSettings: stats.pomodoroSettings || { work: 25 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 },
            };
        } catch (e) {
            console.error("Failed to parse player stats from localStorage", e);
            return { 
                xp: 0, level: 1, coins: 0, avatarId: 'avatar1', ownedItemIds: [], equippedItems: { hat: null, shirt: null },
                tasksCompleted: 0, pomodorosCompleted: 0, aiPlannerUses: 0, unlockedAchievementIds: [],
                trackedTaskId: null, pomodoroSettings: { work: 25 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 },
            };
        }
    });
    
    const [userName, setUserName] = useState<string>(() => localStorage.getItem('userName') || 'Quest Master');
    const [selectedDate, setSelectedDate] = useState<Date>(new Date());
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<{task: Task, listId: string} | null>(null);
    const [addingToListId, setAddingToListId] = useState<string | null>(null);
    const [notesModalInfo, setNotesModalInfo] = useState<{task: Task, listId: string} | null>(null);
    const [levelUpInfo, setLevelUpInfo] = useState<{ newLevel: number } | null>(null);
    const [isHelpModalOpen, setIsHelpModalOpen] = useState(false);
    const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
    const [isAchievementsModalOpen, setIsAchievementsModalOpen] = useState(false);
    const [recentlyDeletedList, setRecentlyDeletedList] = useState<{ list: TaskList; index: number } | null>(null);
    const [unlockedAchievementToast, setUnlockedAchievementToast] = useState<Achievement | null>(null);
    const [auraMessageToast, setAuraMessageToast] = useState<string | null>(null);
    const [rewardToast, setRewardToast] = useState<string | null>(null);
    const undoTimeoutRef = useRef<number | null>(null);
    const achievementTimeoutRef = useRef<number | null>(null);
    const rewardTimeoutRef = useRef<number | null>(null);

    const [questTimer, setQuestTimer] = useState(0);
    const [isQuestTimerActive, setIsQuestTimerActive] = useState(false);
    const questTimerIntervalRef = useRef<number | null>(null);

    const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('theme') as Theme) || 'vaporwave');
    
    const checkAchievements = useCallback((updatedStats: PlayerStats) => {
        const newlyUnlocked = ACHIEVEMENTS.find(ach => 
            !updatedStats.unlockedAchievementIds.includes(ach.id) && ach.criteria(updatedStats)
        );
        if (newlyUnlocked) {
            setPlayerStats(prev => ({ ...prev, unlockedAchievementIds: [...prev.unlockedAchievementIds, newlyUnlocked.id] }));
            if(achievementTimeoutRef.current) clearTimeout(achievementTimeoutRef.current);
            setUnlockedAchievementToast(newlyUnlocked);
            achievementTimeoutRef.current = window.setTimeout(() => setUnlockedAchievementToast(null), 5000);
        }
    }, []);
    
    const gainXp = useCallback((amount: number) => {
        setPlayerStats(prev => {
            const oldXp = prev.xp;
            const newXp = oldXp + amount;
            const oldLevel = prev.level;
            const newLevel = Math.floor(newXp / 100) + 1;
            if (newLevel > oldLevel) {
                setLevelUpInfo({ newLevel });
            }
            return { ...prev, xp: newXp, level: newLevel };
        });
    }, []);

    useEffect(() => { localStorage.setItem('lists', JSON.stringify(lists)); }, [lists]);
    useEffect(() => { localStorage.setItem('playerStats', JSON.stringify(playerStats)); checkAchievements(playerStats); }, [playerStats, checkAchievements]);
    useEffect(() => { localStorage.setItem('userName', userName); }, [userName]);
    useEffect(() => {
        const selectedTheme = themes.find(t => t.name === theme);
        if (selectedTheme) {
            Object.entries(selectedTheme.colors).forEach(([key, value]) => { document.documentElement.style.setProperty(key, value); });
        }
        localStorage.setItem('theme', theme);
    }, [theme]);
    
    useEffect(() => {
        if (isQuestTimerActive) {
            questTimerIntervalRef.current = window.setInterval(() => {
                setQuestTimer(prev => prev + 1);
            }, 1000);
        } else {
            if (questTimerIntervalRef.current) clearInterval(questTimerIntervalRef.current);
        }
        return () => {
            if (questTimerIntervalRef.current) clearInterval(questTimerIntervalRef.current);
        };
    }, [isQuestTimerActive]);

    useEffect(() => {
        return () => {
            if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
            if (achievementTimeoutRef.current) clearTimeout(achievementTimeoutRef.current);
            if (rewardTimeoutRef.current) clearTimeout(rewardTimeoutRef.current);
            if (questTimerIntervalRef.current) clearInterval(questTimerIntervalRef.current);
        };
    }, []);

    const showAuraMessage = (message: string) => {
        setAuraMessageToast(message);
    };

    const handleCloseAuraMessage = () => {
        setAuraMessageToast(null);
    };

    const handleAddTask = (task: Omit<Task, 'id' | 'completed'>, listId: string) => {
        const newTask: Task = { ...task, id: crypto.randomUUID(), completed: false };
        setLists(prev => prev.map(l => l.id === listId ? { ...l, tasks: [...l.tasks, newTask] } : l));
    };

    const handleUpdateTask = (updatedTask: Task, listId: string) => {
        setLists(prev => prev.map(l => l.id === listId ? { ...l, tasks: l.tasks.map(t => t.id === updatedTask.id ? updatedTask : t) } : l));
    };
    
    const handleCopyTask = (id: string, listId: string) => {
        const list = lists.find(l => l.id === listId);
        const taskToCopy = list?.tasks.find(t => t.id === id);
        if (taskToCopy) {
            const copiedTask: Task = { ...taskToCopy, id: crypto.randomUUID(), title: `${taskToCopy.title} (Copy)`, completed: false };
            setLists(prev => prev.map(l => l.id === listId ? { ...l, tasks: [...l.tasks, copiedTask] } : l));
        }
    };

    const handleSaveTask = (taskData: Omit<Task, 'id' | 'completed'> & { id?: string }) => {
        if (editingTask) {
            handleUpdateTask({ ...editingTask.task, ...taskData }, editingTask.listId);
        } else if (addingToListId) {
            handleAddTask(taskData, addingToListId);
        }
        closeModal();
    };
    
    const handleSaveNotes = (taskId: string, listId: string, notes: string) => {
        setLists(prev => prev.map(l => l.id === listId ? { ...l, tasks: l.tasks.map(t => t.id === taskId ? { ...t, notes } : t) } : l));
        setNotesModalInfo(null);
    };

    const handleDeleteTask = (id: string, listId: string) => {
        setLists(prev => prev.map(l => l.id === listId ? { ...l, tasks: l.tasks.filter(t => t.id !== id) } : l));
    };

    const handleToggleTask = (id: string, listId: string) => {
        const list = lists.find(l => l.id === listId);
        const toggledTask = list?.tasks.find(t => t.id === id);
        if (!toggledTask) return;
        
        const isCompleting = !toggledTask.completed;
        const xpChange = xpValues[toggledTask.priority];
        const coinchange = 1;
        const modifier = isCompleting ? 1 : -1;
        
        if (isCompleting) {
            gainXp(xpChange);

            const messages = [
                "Awesome job! You earned {xp} XP and {coins} coins! ✨",
                "Quest complete! +{xp} XP and +{coins} coins for you! 🎉",
                "You're on fire! 🔥 That's {xp} XP and {coins} coins in the bank!",
                "Nicely done! Pocketed {xp} XP and {coins} coins. On to the next one!",
                "Amazing! You just snagged {xp} XP and {coins} coins! 🚀",
                "Great work! Added {xp} XP and {coins} shiny coins to your stash!"
            ];
            const randomMessageTemplate = messages[Math.floor(Math.random() * messages.length)];
            const message = randomMessageTemplate.replace('{xp}', String(xpChange)).replace('{coins}', String(coinchange));
            
            if (rewardTimeoutRef.current) clearTimeout(rewardTimeoutRef.current);
            setRewardToast(message);
            rewardTimeoutRef.current = window.setTimeout(() => setRewardToast(null), 2500);

        } else {
            gainXp(-xpChange);
        }

        if (id === playerStats.trackedTaskId) {
            setIsQuestTimerActive(false);
            setQuestTimer(0);
        }
        
        setPlayerStats(prev => ({ 
            ...prev,
            coins: Math.max(0, prev.coins + (coinchange * modifier)),
            tasksCompleted: isCompleting ? prev.tasksCompleted + 1 : Math.max(0, prev.tasksCompleted - 1),
        }));
        
        setLists(prev => prev.map(l => l.id === listId ? { ...l, tasks: l.tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t) } : l));
    };
    
    const openModal = (listId: string, task?: Task) => {
        if (task) setEditingTask({ task, listId }); else setAddingToListId(listId);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false); setEditingTask(null); setAddingToListId(null);
    };

    const openNotesModal = (task: Task, listId: string) => setNotesModalInfo({task, listId});

    const handleAuraCommand = async (input: string) => {
        const allTasks = lists.flatMap(l => l.tasks.map(t => ({...t, listId: l.id})));
        const response = await processAuraInput(input, allTasks);

        showAuraMessage(response.message);

        switch(response.action) {
            case 'GENERATE_TASKS':
                const { listTitle, tasks: suggestedTasks } = response.payload;
                const newTasks: Task[] = suggestedTasks.map(s => ({
                    id: crypto.randomUUID(), title: s.title, priority: s.priority, completed: false,
                    dueDate: s.dueDate || null, dueTime: s.dueTime || null, notes: s.notes || ''
                }));

                if (listTitle && !lists.some(l => l.title === listTitle)) {
                    const newList = { id: crypto.randomUUID(), title: listTitle, tasks: newTasks };
                    setLists(prev => [...prev, newList]);
                } else {
                     setLists(prev => {
                        if (prev.length === 0) return [{ id: crypto.randomUUID(), title: listTitle || 'Generated Quests', tasks: newTasks }];
                        const firstList = { ...prev[0], tasks: [...prev[0].tasks, ...newTasks] };
                        return [firstList, ...prev.slice(1)];
                    });
                }
                
                setPlayerStats(prev => ({ ...prev, aiPlannerUses: prev.aiPlannerUses + 1, coins: prev.coins + 2 }));
                gainXp(5);
                break;
            case 'COMPLETE_TASK':
                 const { taskId, listId } = response.payload;
                 const list = lists.find(l => l.id === listId);
                 const task = list?.tasks.find(t => t.id === taskId);
                 if (task && !task.completed) {
                    handleToggleTask(taskId, listId);
                 }
                break;
            case 'RESPOND':
                // Message is already shown.
                break;
        }
    };
    
    const handleExportData = () => {
        const exportData: PyxlistExportData = { version: 1, lists, playerStats, userName, theme };
        const jsonString = JSON.stringify(exportData, null, 2);
        const blob = new Blob([jsonString], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url; a.download = 'pyxlist-backup.json'; a.click();
        URL.revokeObjectURL(url);
    };
    
    const handleImportData = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const text = e.target?.result;
                if (typeof text === 'string' && window.confirm('This will replace all current data. Are you sure?')) {
                    const imported = JSON.parse(text);
                    if (imported.version === 1) {
                        setLists(imported.lists);
                        setPlayerStats(imported.playerStats);
                        setUserName(imported.userName);
                        setTheme(imported.theme || 'vaporwave');
                    } else if (Array.isArray(imported)) {
                        setLists(imported);
                        alert('Successfully imported lists. Player stats were not found.');
                    } else {
                        alert('Invalid file format.');
                    }
                }
            } catch (error) { alert('Failed to read file.'); console.error("Import error:", error); }
        };
        reader.readAsText(file);
        event.target.value = '';
    };

    const handleAddList = (title: string) => {
        const newList: TaskList = { id: crypto.randomUUID(), title, tasks: [] };
        setLists(prev => [...prev, newList]);
    };

    const handleDeleteList = (listId: string) => {
        if (window.confirm('Are you sure you want to delete this list and all its tasks?')) {
            const listIndex = lists.findIndex(l => l.id === listId);
            if (listIndex === -1) return;
            if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
            const listToDelete = lists[listIndex];
            setRecentlyDeletedList({ list: listToDelete, index: listIndex });
            setLists(prev => prev.filter(l => l.id !== listId));
            undoTimeoutRef.current = window.setTimeout(() => setRecentlyDeletedList(null), 7000);
        }
    };
    
    const handleUndoDeleteList = () => {
        if (!recentlyDeletedList) return;
        if (undoTimeoutRef.current) clearTimeout(undoTimeoutRef.current);
        setLists(prev => {
            const newLists = [...prev];
            newLists.splice(recentlyDeletedList.index, 0, recentlyDeletedList.list);
            return newLists;
        });
        setRecentlyDeletedList(null);
    };

    const handleUpdateListTitle = (listId: string, newTitle: string) => setLists(prev => prev.map(l => l.id === listId ? { ...l, title: newTitle } : l));
    const handlePurchaseItem = (itemId: string) => {
        const item = SHOP_ITEMS.find(i => i.id === itemId);
        if (!item || playerStats.ownedItemIds.includes(itemId)) return;
        if (playerStats.coins >= item.price) {
            setPlayerStats(prev => ({ ...prev, coins: prev.coins - item.price, ownedItemIds: [...prev.ownedItemIds, itemId] }));
        } else { alert("Not enough coins!"); }
    };
    const handleEquipItem = (itemId: string) => {
        const item = SHOP_ITEMS.find(i => i.id === itemId);
        if (!item || !playerStats.ownedItemIds.includes(itemId)) return;
        setPlayerStats(prev => ({ ...prev, equippedItems: { ...prev.equippedItems, [item.slot]: prev.equippedItems[item.slot] === itemId ? null : itemId } }));
    };
    const handleSelectAvatar = (avatarId: string) => {
        if (AVATARS.some(a => a.id === avatarId)) setPlayerStats(prev => ({...prev, avatarId}));
    };
    const handlePomodoroSessionComplete = (mode: TimerMode) => {
        if (mode === 'work') setPlayerStats(prev => ({ ...prev, pomodorosCompleted: prev.pomodorosCompleted + 1 }));
    };
    const handlePomodoroSettingsChange = (newSettings: PlayerStats['pomodoroSettings']) => setPlayerStats(prev => ({ ...prev, pomodoroSettings: newSettings }));
    const handleSetTrackedTask = (taskId: string) => {
        setIsQuestTimerActive(false);
        setQuestTimer(0);
        setPlayerStats(prev => ({ ...prev, trackedTaskId: prev.trackedTaskId === taskId ? null : taskId }));
    };

    const allTasks = useMemo(() => lists.flatMap(l => l.tasks.map(t => ({...t, listId: l.id}))), [lists]);
    const tasksForSelectedDate = useMemo(() => {
        return allTasks.filter(task => {
            if (!task.dueDate) return false;
            const utcDate = new Date(task.dueDate);
            const localTaskDate = new Date(utcDate.getTime() + utcDate.getTimezoneOffset() * 60000);
            return localTaskDate.getFullYear() === selectedDate.getFullYear() && localTaskDate.getMonth() === selectedDate.getMonth() && localTaskDate.getDate() === selectedDate.getDate();
        });
    }, [allTasks, selectedDate]);
    const onDateSelect = useCallback((date: Date) => { setSelectedDate(date); }, []);

    return (
        <div className="bg-[var(--color-bg)] min-h-screen text-[var(--color-text)] p-4 sm:p-6 lg:p-8 flex flex-col">
            <div className="container mx-auto max-w-7xl flex-grow">
                <Header 
                    theme={theme} userName={userName} onUserNameChange={setUserName} onThemeChange={setTheme} 
                    onExport={handleExportData} onImport={handleImportData} onOpenHelp={() => setIsHelpModalOpen(true)}
                    onOpenAvatarModal={() => setIsAvatarModalOpen(true)} onOpenAchievementsModal={() => setIsAchievementsModalOpen(true)}
                    playerStats={playerStats}
                />
                <main className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-1 flex flex-col gap-6">
                        <PomodoroTimer settings={playerStats.pomodoroSettings} onSessionComplete={handlePomodoroSessionComplete} onSettingsChange={handlePomodoroSettingsChange}/>
                        <TrackedQuest 
                            tasks={allTasks} 
                            trackedTaskId={playerStats.trackedTaskId}
                            timer={questTimer}
                            isTimerActive={isQuestTimerActive}
                            onStart={() => setIsQuestTimerActive(true)}
                            onPause={() => setIsQuestTimerActive(false)}
                            onReset={() => {
                                setIsQuestTimerActive(false);
                                setQuestTimer(0);
                            }}
                        />
                        <Calendar selectedDate={selectedDate} onDateSelect={onDateSelect} tasks={allTasks} />
                        <AuraInput onCommand={handleAuraCommand} />
                    </div>

                    <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TaskListComponent
                            title={`Tasks for ${selectedDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`}
                            tasks={tasksForSelectedDate}
                            trackedTaskId={playerStats.trackedTaskId}
                            onToggle={(id, listId) => handleToggleTask(id, listId!)}
                            onDelete={(id, listId) => handleDeleteTask(id, listId!)}
                            onEdit={(task, listId) => openModal(listId!, task)}
                            onCopy={(id, listId) => handleCopyTask(id, listId!)}
                            onEditNotes={(task, listId) => openNotesModal(task, listId!)}
                            onSetTracked={handleSetTrackedTask}
                        />
                        {lists.map(list => (
                            <TaskListComponent
                                key={list.id} title={list.title} tasks={list.tasks} listId={list.id}
                                trackedTaskId={playerStats.trackedTaskId} onToggle={handleToggleTask}
                                onDelete={handleDeleteTask} onEdit={(task) => openModal(list.id, task)}
                                onCopy={(id) => handleCopyTask(id, list.id)}
                                onEditNotes={(task) => openNotesModal(task, list.id)}
                                onSetTracked={handleSetTrackedTask} onAddNew={() => openModal(list.id)}
                                onDeleteList={() => handleDeleteList(list.id)}
                                onUpdateTitle={(newTitle) => handleUpdateListTitle(list.id, newTitle)}
                            />
                        ))}
                         <div className="p-4 border-2 border-dashed border-[var(--color-border-muted)] bg-[var(--color-surface-1)] flex items-center justify-center md:col-span-2">
                             <form onSubmit={(e) => { e.preventDefault(); handleAddList(e.currentTarget.listTitle.value); e.currentTarget.reset(); }} className="flex gap-2 w-full max-w-sm">
                                <input name="listTitle" type="text" required placeholder="New list title..." className="flex-grow bg-[var(--color-surface-3)] border-2 border-[var(--color-border-primary)] p-2 text-[var(--color-text)] focus:outline-none focus:border-[var(--color-border-secondary)] transition-colors placeholder-[var(--color-text-muted)] text-sm" />
                                <button type="submit" className="px-4 py-2 bg-[var(--color-primary)] text-[var(--color-bg)] border-2 border-[var(--color-border-primary)] hover:opacity-80 transition-colors text-sm">Create</button>
                            </form>
                        </div>
                    </div>
                </main>
            </div>
            <footer className="text-center p-4 mt-8 text-xs text-[var(--color-text-muted)]">
                <div className="flex justify-center items-center gap-4 mb-2">
                    <a href="mailto:Pyxlist@gmail.com" className="hover:text-[var(--color-secondary)] transition-colors">Email</a>
                    <span>|</span>
                    <a href="https://x.com/pyxlist" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-secondary)] transition-colors">X / Twitter</a>
                    <span>|</span>
                    <a href="https://youtube.com/@Pyxlist" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--color-secondary)] transition-colors">YouTube</a>
                </div>
                an AuraForge creation - <a href="https://auraforge.dev" target="_blank" rel="noopener noreferrer" className="text-[var(--color-secondary)] hover:underline">auraforge.dev</a>
            </footer>
            {isModalOpen && <AddTaskModal task={editingTask?.task || null} onSave={handleSaveTask} onClose={closeModal} />}
            {notesModalInfo && <NotesModal task={notesModalInfo.task} listId={notesModalInfo.listId} onSave={handleSaveNotes} onClose={() => setNotesModalInfo(null)} />}
            {levelUpInfo && <LevelUpModal newLevel={levelUpInfo.newLevel} onClose={() => setLevelUpInfo(null)} />}
            {isHelpModalOpen && <HelpModal onClose={() => setIsHelpModalOpen(false)} />}
            {isAvatarModalOpen && <AvatarCustomizationModal onClose={() => setIsAvatarModalOpen(false)} playerStats={playerStats} onPurchaseItem={handlePurchaseItem} onEquipItem={handleEquipItem} onSelectAvatar={handleSelectAvatar} />}
             {isAchievementsModalOpen && <AchievementsModal onClose={() => setIsAchievementsModalOpen(false)} playerStats={playerStats} />}
            {recentlyDeletedList && <UndoToast listTitle={recentlyDeletedList.list.title} onUndo={handleUndoDeleteList} />}
            {unlockedAchievementToast && <AchievementToast achievement={unlockedAchievementToast} />}
            {rewardToast && <RewardToast message={rewardToast} />}
            {auraMessageToast && <AuraMessageToast message={auraMessageToast} onClose={handleCloseAuraMessage} />}
        </div>
    );
};

export default App;

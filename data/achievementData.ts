import type { Achievement } from '../types';
import { PxCheckIcon, PxPlusIcon, PxTrophyIcon, PxCoinIcon, PxPlayIcon } from '../components/Icons';

export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'tasks_1',
        name: 'First Quest',
        description: 'Complete your first task.',
        icon: PxCheckIcon,
        criteria: stats => stats.tasksCompleted >= 1,
    },
    {
        id: 'tasks_10',
        name: 'Task Novice',
        description: 'Complete 10 tasks.',
        icon: PxCheckIcon,
        criteria: stats => stats.tasksCompleted >= 10,
    },
    {
        id: 'tasks_50',
        name: 'Task Slayer',
        description: 'Complete 50 tasks.',
        icon: PxTrophyIcon,
        criteria: stats => stats.tasksCompleted >= 50,
    },
    {
        id: 'pomodoro_1',
        name: 'Time Apprentice',
        description: 'Complete one full Focus session.',
        icon: PxPlayIcon,
        criteria: stats => stats.pomodorosCompleted >= 1,
    },
    {
        id: 'pomodoro_10',
        name: 'Time Wizard',
        description: 'Complete 10 Focus sessions.',
        icon: PxPlayIcon,
        criteria: stats => stats.pomodorosCompleted >= 10,
    },
    {
        id: 'ai_1',
        name: 'AI Collaborator',
        description: "Use Aura's Quest Planner.",
        icon: PxPlusIcon,
        criteria: stats => stats.aiPlannerUses >= 1,
    },
    {
        id: 'shop_1',
        name: 'Fashionista',
        description: 'Buy your first item from the shop.',
        icon: PxCoinIcon,
        criteria: stats => stats.ownedItemIds.length > 0,
    },
];

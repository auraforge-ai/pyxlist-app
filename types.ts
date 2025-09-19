export enum Priority {
    Low = 'Low',
    Medium = 'Medium',
    High = 'High',
}

export interface Task {
    id: string;
    title: string;
    completed: boolean;
    priority: Priority;
    dueDate: string | null;
    dueTime: string | null;
    notes?: string;
}

export interface TaskList {
    id:string;
    title: string;
    tasks: Task[];
}

export enum AvatarSlot {
    Hat = 'hat',
    Shirt = 'shirt',
}

export interface PlayerStats {
    xp: number;
    level: number;
    coins: number;
    avatarId: string;
    ownedItemIds: string[];
    equippedItems: Record<AvatarSlot, string | null>;
    // Achievement Tracking
    tasksCompleted: number;
    pomodorosCompleted: number;
    aiPlannerUses: number;
    unlockedAchievementIds: string[];
    // New Features
    trackedTaskId: string | null;
    pomodoroSettings: {
        work: number;
        shortBreak: number;
        longBreak: number;
    };
}

export interface AuraMessage {
    id: string;
    text: string;
    sender: 'user' | 'aura';
}

export interface Achievement {
    id: string;
    name: string;
    description: string;
    icon: React.FC<{className?: string}>;
    criteria: (stats: PlayerStats) => boolean;
}


export interface Avatar {
    id: string;
    name: string;
    image: string;
    minLevel: number;
}

export interface AvatarItem {
    id: string;
    name: string;
    slot: AvatarSlot;
    price: number;
    image: string;
}

export type Theme = 'vaporwave' | 'arcade' | 'matrix' | 'gameboy' | 'accessible' | 'sakura' | '8bit' | 'light';

export interface PyxlistExportData {
    version: 1;
    lists: TaskList[];
    playerStats: PlayerStats;
    userName: string;
    theme: Theme;
}
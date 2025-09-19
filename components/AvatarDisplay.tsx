import React from 'react';
import type { PlayerStats } from '../types';
import { AVATARS, SHOP_ITEMS } from '../data/avatarData';

interface AvatarDisplayProps {
    playerStats: PlayerStats;
    size?: number;
}

const AvatarDisplay: React.FC<AvatarDisplayProps> = ({ playerStats, size = 64 }) => {
    const { level, avatarId, equippedItems } = playerStats;
    
    const baseAvatar = AVATARS.find(a => a.id === avatarId) || AVATARS[0];
    const equippedHat = SHOP_ITEMS.find(i => i.id === equippedItems.hat);
    const equippedShirt = SHOP_ITEMS.find(i => i.id === equippedItems.shirt);

    const levelAuraClass = level >= 10 
        ? 'shadow-[0_0_12px_4px_var(--color-priority-medium)]' 
        : level >= 5
        ? 'shadow-[0_0_12px_4px_var(--color-text)]'
        : '';
        
    return (
        <div 
            className={`relative bg-[var(--color-surface-2)] border-2 border-[var(--color-border-secondary)] transition-shadow duration-300 ${levelAuraClass}`}
            style={{ width: size, height: size }}
        >
            <img src={baseAvatar.image} alt={baseAvatar.name} className="absolute inset-0 w-full h-full" style={{ imageRendering: 'pixelated' }}/>
            {equippedShirt && <img src={equippedShirt.image} alt={equippedShirt.name} className="absolute inset-0 w-full h-full" style={{ imageRendering: 'pixelated' }}/>}
            {equippedHat && <img src={equippedHat.image} alt={equippedHat.name} className="absolute inset-0 w-full h-full" style={{ imageRendering: 'pixelated' }}/>}
        </div>
    );
};

export default AvatarDisplay;

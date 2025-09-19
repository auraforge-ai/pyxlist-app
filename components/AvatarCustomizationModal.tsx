import React, { useState } from 'react';
import type { PlayerStats, AvatarItem } from '../types';
import { AvatarSlot } from '../types';
import { AVATARS, SHOP_ITEMS } from '../data/avatarData';
import AvatarDisplay from './AvatarDisplay';
import { PxCoinIcon } from './Icons';

interface AvatarCustomizationModalProps {
    onClose: () => void;
    playerStats: PlayerStats;
    onPurchaseItem: (itemId: string) => void;
    onEquipItem: (itemId: string) => void;
    onSelectAvatar: (avatarId: string) => void;
}

type Tab = 'avatars' | 'shop' | 'wardrobe';

const AvatarCustomizationModal: React.FC<AvatarCustomizationModalProps> = ({
    onClose, playerStats, onPurchaseItem, onEquipItem, onSelectAvatar
}) => {
    const [activeTab, setActiveTab] = useState<Tab>('avatars');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'avatars':
                return (
                    <div className="grid grid-cols-3 gap-4">
                        {AVATARS.map(avatar => (
                            <div key={avatar.id} className="flex flex-col items-center gap-2">
                                <button 
                                    onClick={() => onSelectAvatar(avatar.id)}
                                    className={`p-1 border-2 ${playerStats.avatarId === avatar.id ? 'border-[var(--color-primary)]' : 'border-transparent'}`}
                                >
                                    <img src={avatar.image} alt={avatar.name} className="w-16 h-16 bg-[var(--color-surface-3)]" />
                                </button>
                                <span className="text-xs">{avatar.name}</span>
                            </div>
                        ))}
                    </div>
                );
            case 'shop':
                return <ItemGrid items={SHOP_ITEMS} playerStats={playerStats} onPurchase={onPurchaseItem} onEquip={onEquipItem} isShop={true} />;
            case 'wardrobe':
                const ownedItems = SHOP_ITEMS.filter(item => playerStats.ownedItemIds.includes(item.id));
                 if (ownedItems.length === 0) {
                    return <div className="text-center text-[var(--color-text-muted)] p-8">Your wardrobe is empty. Visit the shop to buy items!</div>
                }
                return <ItemGrid items={ownedItems} playerStats={playerStats} onEquip={onEquipItem} isShop={false} />;
        }
    };
    
    const tabButtonClass = (tab: Tab) => `flex-1 py-2 text-sm border-b-4 transition-colors ${activeTab === tab ? 'border-[var(--color-primary)] text-[var(--color-primary)]' : 'border-[var(--color-border-muted)] text-[var(--color-text-muted)] hover:border-[var(--color-secondary)]'}`;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4" role="dialog" aria-modal="true" onClick={onClose}>
            <div className="w-full max-w-2xl bg-[var(--color-bg)] border-4 border-[var(--color-border-primary)] p-6 flex flex-col md:flex-row gap-6" onClick={(e) => e.stopPropagation()}>
                {/* Left Side: Preview & Stats */}
                <div className="flex flex-col items-center gap-4 p-4 border-2 border-[var(--color-border-secondary)] bg-[var(--color-surface-1)]">
                    <h3 className="text-lg text-[var(--color-primary)]">Your Avatar</h3>
                    <AvatarDisplay playerStats={playerStats} size={128}/>
                     <div className="flex items-center gap-2 text-lg text-[var(--color-priority-medium)]">
                        <PxCoinIcon className="w-5 h-5"/>
                        <span>{playerStats.coins}</span>
                    </div>
                </div>

                {/* Right Side: Tabs & Content */}
                <div className="flex-1">
                    <div className="flex border-b-2 border-[var(--color-border-muted)] mb-4">
                        <button className={tabButtonClass('avatars')} onClick={() => setActiveTab('avatars')}>Avatars</button>
                        <button className={tabButtonClass('shop')} onClick={() => setActiveTab('shop')}>Shop</button>
                        <button className={tabButtonClass('wardrobe')} onClick={() => setActiveTab('wardrobe')}>Wardrobe</button>
                    </div>
                    <div className="max-h-[300px] overflow-y-auto pr-2">
                        {renderTabContent()}
                    </div>
                    <div className="flex justify-end pt-6">
                        <button type="button" onClick={onClose} className="px-4 py-2 bg-[var(--color-secondary)] text-[var(--color-bg)] border-2 border-[var(--color-border-secondary)] hover:opacity-80 transition-opacity" autoFocus>Done</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface ItemGridProps {
    items: AvatarItem[];
    playerStats: PlayerStats;
    onPurchase?: (itemId: string) => void;
    onEquip: (itemId: string) => void;
    isShop: boolean;
}

const ItemGrid: React.FC<ItemGridProps> = ({ items, playerStats, onPurchase, onEquip, isShop }) => (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {items.map(item => {
            const isOwned = playerStats.ownedItemIds.includes(item.id);
            const isEquipped = playerStats.equippedItems[item.slot] === item.id;

            return (
                <div key={item.id} className="p-2 bg-[var(--color-surface-2)] border-2 border-[var(--color-border-muted)] flex flex-col items-center gap-2 text-center">
                    <img src={item.image} alt={item.name} className="w-16 h-16 bg-[var(--color-surface-3)]" />
                    <p className="text-sm text-[var(--color-text)] h-8">{item.name}</p>
                    
                    {isShop ? (
                        isOwned ? (
                             <button onClick={() => onEquip(item.id)} className={`w-full py-1 text-xs border-2 ${isEquipped ? 'bg-[var(--color-secondary)] text-[var(--color-bg)] border-[var(--color-secondary)]' : 'bg-transparent border-[var(--color-border-secondary)] text-[var(--color-secondary)]'}`}>
                                {isEquipped ? 'Equipped' : 'Equip'}
                            </button>
                        ) : (
                            <button onClick={() => onPurchase!(item.id)} disabled={playerStats.coins < item.price} className="w-full py-1 text-xs bg-[var(--color-primary)] text-[var(--color-bg)] border-2 border-[var(--color-primary)] hover:opacity-80 disabled:bg-gray-500 disabled:opacity-50 flex items-center justify-center gap-1">
                                <PxCoinIcon className="w-3 h-3"/> {item.price}
                            </button>
                        )
                    ) : (
                        <button onClick={() => onEquip(item.id)} className={`w-full py-1 text-xs border-2 ${isEquipped ? 'bg-[var(--color-secondary)] text-[var(--color-bg)] border-[var(--color-secondary)]' : 'bg-transparent border-[var(--color-border-secondary)] text-[var(--color-secondary)]'}`}>
                            {isEquipped ? 'Unequip' : 'Equip'}
                        </button>
                    )}
                </div>
            );
        })}
    </div>
);


export default AvatarCustomizationModal;

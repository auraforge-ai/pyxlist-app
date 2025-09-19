import type { Avatar, AvatarItem } from '../types';
import { AvatarSlot } from '../types';

// Simple pixel art SVGs, base64 encoded
const AVATAR_1_IMG = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj48cGF0aCBmaWxsPSIjRkZENzAwIiBkPSJNMCAwaDE2djE2SDB6Ii8+PHBhdGggZmlsbD0iIzIyMiIgZD0iTTUgNWgydjJINXptNCAwaDJ2Mkg5eiIvPjxwYXRoIGZpbGw9IiMyMjIiIGQ9Ik00IDloOHYySDR6Ii8+PC9zdmc+';
const AVATAR_2_IMG = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj48cGF0aCBmaWxsPSIjOUNFNEY3IiBkPSJNMCAwaDE2djE2SDB6Ii8+PHBhdGggZmlsbD0iIzZBNjA1OCIgZD0iTTMgM2gydjJIM3ptOCAwaDJ2MkgxMXoiLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNCA0aDF2MUg0em04IDBoMXYxSDEyeiIvPjxwYXRoIGZpbGw9IiM2QTYwNTgiIGQ9Ik0zIDloMTB2MkgzeiIvPjwvc3ZnPg==';

const HAT_1_IMG = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj48cGF0aCBmaWxsPSIjRkY0MTM2IiBkPSJNNCAySDV2MUg0em03IDBIMTB2MUgxMXptLTYgMWg2djFIMXptMSAxaDEwdjFIMnoiLz48L3N2Zz4=';
const SHIRT_1_IMG = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgc2hhcGUtcmVuZGVyaW5nPSJjcmlzcEVkZ2VzIj48cGF0aCBmaWxsPSIjMDA3NEQ5IiBkPSJNNCA3aDh2Nkg0eiIvPjxwYXRoIGZpbGw9IiMwMDVENUMiIGQ9Ik0yIDdoMnY0SDJ6bTEwIDBoMnY0SDEyeiIvPjwvc3ZnPg==';

export const AVATARS: Avatar[] = [
    {
        id: 'avatar1',
        name: 'Smiley',
        image: AVATAR_1_IMG,
        minLevel: 1,
    },
    {
        id: 'avatar2',
        name: 'Cool Cat',
        image: AVATAR_2_IMG,
        minLevel: 1,
    }
];

export const SHOP_ITEMS: AvatarItem[] = [
    {
        id: 'hat1',
        name: 'Red Cap',
        slot: AvatarSlot.Hat,
        price: 25,
        image: HAT_1_IMG,
    },
    {
        id: 'shirt1',
        name: 'Blue Tee',
        slot: AvatarSlot.Shirt,
        price: 50,
        image: SHIRT_1_IMG,
    }
];

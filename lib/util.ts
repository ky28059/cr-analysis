import type { PlayerItemLevel } from './types';


export function itemToNormalizedLevel(c: PlayerItemLevel) {
    return (14 - c.maxLevel) + c.level;
}

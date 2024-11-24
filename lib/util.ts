import type { PlayerBattleData, PlayerItemLevel } from './types';


export function itemToNormalizedLevel(c: PlayerItemLevel) {
    return (14 - c.maxLevel) + c.level;
}

export function deckLevel(t: PlayerBattleData) {
    return t.cards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0)
        + t.supportCards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0)
}

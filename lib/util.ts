import type { Battle, PlayerBattleData, PlayerItemLevel } from './types';


export function itemToNormalizedLevel(c: PlayerItemLevel) {
    return (14 - c.maxLevel) + c.level;
}

export function deckLevel(t: PlayerBattleData) {
    return t.cards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0)
        + t.supportCards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0)
}

export function teamDeckLevel(t: PlayerBattleData[]) {
    return t.reduce((s, t) => s + deckLevel(t), 0);
}

function isWin(b: Battle) {
    return b.team[0].crowns > b.opponent[0].crowns
}

export function countWins(battles: Battle[]) {
    return battles.filter(isWin).length;
}

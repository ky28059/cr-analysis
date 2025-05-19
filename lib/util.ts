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

/**
 * Gets the number of wins in a given list of battles.
 * @param battles The battles to analyze.
 * @returns The number of wins.
 */
export function countWins(battles: Battle[]) {
    return battles.filter(isWin).length;
}

function hashCard(c: PlayerItemLevel) {
    return c.evolutionLevel + c.name; // TODO?
}

/**
 * Counts the frequencies that cards show up in your opponents decks in the given list of battles.
 * @param battles The battles to analyze.
 * @returns A list of card counts, name, and icon, sorted from most appearances to least.
 */
export function countCardFrequencies(battles: Battle[]) {
    const freqs: { [key: string]: { count: number, name: string, icon: string } } = {};

    for (const { opponent } of battles) {
        const cards = opponent.flatMap((d) => d.cards);

        for (const card of cards) {
            const key = hashCard(card);
            if (!freqs[key]) freqs[key] = {
                count: 0,
                name: (card.evolutionLevel ? 'Evo ' : '') + card.name,
                icon: card.evolutionLevel ? card.iconUrls.evolutionMedium! : card.iconUrls.medium!
            }

            freqs[key].count++;
        }
    }

    return Object.values(freqs).sort((a, b) => b.count - a.count);
}

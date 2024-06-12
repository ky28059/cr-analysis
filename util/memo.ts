import { open, readFile, FileHandle, constants } from 'node:fs/promises';
import { itemToNormalizedLevel } from '../lib/util';
import type { Battle } from '../lib/types';


export type CachedBattle = [ts: string, type: string, teamLevel: number, oppLevel: number];

const BATTLES_FILE_PATH = './battles.csv';

export async function getCachedBattles() {
    const battlesRaw = await readFile(BATTLES_FILE_PATH);

    return battlesRaw.toString()
        .split('\n')
        .map(l => l.split(','))
        .map(([ts, type, teamLevel, oppLevel]) => [ts, type, Number(teamLevel), Number(oppLevel)] satisfies CachedBattle);
}

export async function cacheBattles(newBattles: Battle[]) {
    if (!newBattles.length) return;

    const battlesFile = await open(BATTLES_FILE_PATH, constants.O_APPEND | constants.O_CREAT);

    for (const battle of newBattles) {
        const team = battle.team[0];
        const opponent = battle.opponent[0];

        const teamLevel = team.cards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0)
            + team.supportCards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0);
        const oppLevel = opponent.cards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0)
            + opponent.supportCards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0);

        await battlesFile.appendFile([battle.battleTime, battle.type, teamLevel, oppLevel].join(',') + '\n');
    }
}

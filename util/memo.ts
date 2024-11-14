import { readFile, writeFile } from 'node:fs/promises';
import { itemToNormalizedLevel } from '../lib/util';
import type { Battle } from '../lib/types';


type RecursivePartial<T> = {
    [P in keyof T]?:
        T[P] extends (infer U)[] ? RecursivePartial<U>[] :
        T[P] extends object | undefined ? RecursivePartial<T[P]> :
        T[P];
}

// TODO: more accurate type?
export type CachedBattle = RecursivePartial<Battle> & {
    teamLevel: number,
    oppLevel: number
};

const BATTLES_FILE_PATH = './battles.json';

export async function merge(data: CachedBattle[]) {
    const raw = await readFile(BATTLES_FILE_PATH);
    const oldBattles = JSON.parse(raw.toString());

    await writeFile(BATTLES_FILE_PATH, JSON.stringify([...oldBattles, ...data]));
}

export async function getCachedBattles() {
    const battlesRaw = await readFile(BATTLES_FILE_PATH);
    return JSON.parse(battlesRaw.toString()) as CachedBattle[];
}

export async function cacheBattles(newBattles: Battle[]) {
    if (!newBattles.length) return [];

    const ret = newBattles.map((battle) => {
        const team = battle.team[0];
        const opponent = battle.opponent[0];

        const teamLevel = team.cards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0)
            + team.supportCards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0);
        const oppLevel = opponent.cards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0)
            + opponent.supportCards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0);

        return { ...battle, teamLevel, oppLevel }
    });

    await merge(ret);
    return ret;
}

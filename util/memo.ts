import { readFile, writeFile } from 'node:fs/promises';
import { deckLevel } from '../lib/util';
import type { Battle, BattleType } from '../lib/types';


type OldCachedBattle = {
    battleTime: string,
    type: BattleType,
    gameMode: { name: string },
    team: [{ crowns: number }],
    opponent: [{ crowns: number }]
}

export type CachedBattle = (OldCachedBattle | Battle) & {
    teamLevel: number,
    oppLevel: number
};

export const BATTLES_FILE_PATH = './battles.json';

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
        const teamLevel = battle.team.reduce((s, t) => s + deckLevel(t), 0);
        const oppLevel = battle.opponent.reduce((s, t) => s + deckLevel(t), 0);

        return { ...battle, teamLevel, oppLevel }
    });

    await merge(ret);
    return ret;
}

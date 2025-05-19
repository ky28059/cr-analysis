import { readFile, writeFile } from 'node:fs/promises';

// Utils
import type { Battle } from './types';
import { getBattles } from './players';
import { PLAYER_TAG } from './config';


export const BATTLES_FILE_PATH = './battles.json';

export async function merge(data: Battle[]) {
    const raw = await readFile(BATTLES_FILE_PATH);
    const oldBattles = JSON.parse(raw.toString());

    await writeFile(BATTLES_FILE_PATH, JSON.stringify([...oldBattles, ...data]));
}

/**
 * Gets the currently cached battles.
 * @returns The cached battles, as a `Battle[]`.
 */
export async function getCachedBattles() {
    const battlesRaw = await readFile(BATTLES_FILE_PATH);
    return JSON.parse(battlesRaw.toString()) as Battle[];
}

/**
 * Fetches new battles from the CR API, updating the cache and returning the merged battle list.
 * @returns The merged battle list, as a `Battle[]`.
 */
export async function getAndUpdateBattles() {
    const battles = await getCachedBattles();
    const cachedIds = new Set(battles.map(({ battleTime }) => battleTime));

    const newBattles = (await getBattles(PLAYER_TAG)).filter(b => !cachedIds.has(b.battleTime));
    await cacheBattles(newBattles);
    battles.push(...newBattles);

    return battles;
}

async function cacheBattles(newBattles: Battle[]) {
    if (!newBattles.length) return [];
    await merge(newBattles);
}

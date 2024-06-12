import { open, readFile, FileHandle, constants } from 'node:fs/promises';
import type { Battle } from '../lib/types';


const BATTLES_FILE_PATH = './battles.csv';

export async function getCachedBattles() {
    const battlesRaw = await readFile(BATTLES_FILE_PATH);

    for (const line of battlesRaw.toString().split('\n')) {
        const [ts, type, teamLevel, oppLevel] = line.split(',');
    }
}

export async function openBattlesFile() {
    return open(BATTLES_FILE_PATH, constants.O_APPEND | constants.O_CREAT);
}

export async function cacheBattle(file: FileHandle, battle: Battle, teamLevel: number, oppLevel: number) {
    await file.appendFile([battle.battleTime, battle.type, teamLevel, oppLevel].join(',') + '\n');
}

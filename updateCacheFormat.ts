import { readFile, unlink } from 'node:fs/promises';
import { CachedBattle, merge } from './util/memo';
import type { BattleType } from './lib/types';

const BATTLES_CSV_PATH = './battles.csv';

;(async () => {
    const raw = await readFile(BATTLES_CSV_PATH);
    const cached = raw.toString()
        .split('\n')
        .map(l => l.split(','))
        .map(([ts, type, gameMode, teamLevel, oppLevel, teamCrowns, oppCrowns]) => [ts, type, gameMode, Number(teamLevel), Number(oppLevel), Number(teamCrowns), Number(oppCrowns)] as const);

    const ret = [];
    for (const [ts, type, gameMode, teamLevel, oppLevel, teamCrowns, oppCrowns] of cached) {
        const battle: CachedBattle = {
            battleTime: ts,
            type: type as BattleType,
            gameMode: { name: gameMode },
            team: [{ crowns: teamCrowns }],
            opponent: [{ crowns: oppCrowns }],
            teamLevel,
            oppLevel
        }

        ret.push(battle);
    }

    await merge(ret);
    await unlink(BATTLES_CSV_PATH);
})();

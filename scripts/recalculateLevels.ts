import { writeFile } from 'node:fs/promises';
import { BATTLES_FILE_PATH, getCachedBattles, merge } from '../util/memo';
import { deckLevel } from '../lib/util';
import type { PlayerBattleData } from '../lib/types';


;(async () => {
    const battles = await getCachedBattles();

    const recalculated = battles.map((battle) => {
        if (!('cards' in battle.team[0])) return battle;

        const teamLevel = battle.team.reduce((s, t) => s + deckLevel(t as PlayerBattleData), 0);
        const oppLevel = battle.opponent.reduce((s, t) => s + deckLevel(t as PlayerBattleData), 0);

        return { ...battle, teamLevel, oppLevel }
    });

    await writeFile(BATTLES_FILE_PATH, JSON.stringify(recalculated));
})();

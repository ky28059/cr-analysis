import { writeFile } from 'node:fs/promises';
import { BATTLES_FILE_PATH, getCachedBattles, merge } from '../lib/memo';
import { deckLevel } from '../lib/util';
import type { PlayerBattleData } from '../lib/types';


;(async () => {
    const battles = await getCachedBattles();

    const types = new Set(battles.map(({ type }) => type));
    console.log(types);

    const modes = new Set(battles.map(({ gameMode }) => gameMode.name));
    console.log(modes);
})();

import { writeFile } from 'node:fs/promises';
import { BATTLES_FILE_PATH, getCachedBattles, merge } from '../lib/memo';
import { deckLevel } from '../lib/util';
import type { PlayerBattleData } from '../lib/types';


;(async () => {
    const battles = await getCachedBattles();

    const old = battles.filter((battle) => !('cards' in battle.team[0]));
    const updated = battles.filter((battle) => 'cards' in battle.team[0]);

    await writeFile('./battles_old.json', JSON.stringify(old));
    await writeFile('./battles_new.json', JSON.stringify(updated));
})();

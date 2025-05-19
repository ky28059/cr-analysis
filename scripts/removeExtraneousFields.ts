import { writeFile } from 'node:fs/promises';
import { BATTLES_FILE_PATH, getCachedBattles, merge } from '../lib/memo';
import { deckLevel } from '../lib/util';
import type { PlayerBattleData } from '../lib/types';


;(async () => {
    const battles = await getCachedBattles();
    const updated = battles.map((battle) => ({ ...battle, teamLevel: undefined, oppLevel: undefined }));

    await writeFile('./battles_tmp2.json', JSON.stringify(updated));
})();

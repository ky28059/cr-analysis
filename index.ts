import { getBattles } from './lib/players';
import { cacheBattles, getCachedBattles } from './util/memo';
import { analyzeBattles } from './util/analysis';


(async () => {
    const battles = await getBattles('#2YYL9GLU8');
    console.log(`Analyzing past ${battles.length} games.\n`);

    const cachedBattles = await getCachedBattles();
    const cachedIds = new Set(cachedBattles.map(([ts]) => ts));

    const newBattles = battles.filter(b => !cachedIds.has(b.battleTime));
    cachedBattles.push(...await cacheBattles(newBattles));

    // Only trophy road 1v1s where levels matter
    const ladderMatches = cachedBattles.filter(([, type]) => type === 'PvP');
    console.log(`Over ${ladderMatches.length} trophy games:`);

    await analyzeBattles(ladderMatches);

    // Clan war battles
    const cwMatches = cachedBattles.filter(([, type]) => type === 'riverRacePvP');
    console.log(`Over ${cwMatches.length} clan wars games:`);

    await analyzeBattles(cwMatches);
})()

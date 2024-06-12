import { getBattles } from './lib/players';
import { cacheBattles, getCachedBattles } from './util/memo';
import { analyzeLevels, analyzeWinRate } from './util/analysis';


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
    console.log('-'.repeat(30))

    analyzeLevels(ladderMatches);
    analyzeWinRate(ladderMatches);

    // Clan war battles
    const cwMatches = cachedBattles.filter(([, type]) => type === 'riverRacePvP');
    console.log(`Over ${cwMatches.length} clan wars games:`);
    console.log('-'.repeat(30))

    analyzeLevels(cwMatches);
    analyzeWinRate(cwMatches);

    // Goblin mode :hearts:
    const gbMatches = cachedBattles.filter(([, , mode]) => mode === 'TeamVsTeam_GoblinBuffs');
    console.log(`Over ${gbMatches.length} 2v2 goblin buff games:`);
    console.log('-'.repeat(30))

    analyzeWinRate(gbMatches);
})()

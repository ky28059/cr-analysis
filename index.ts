import { getBattles } from './lib/players';
import { openBattlesFile } from './util/memo';
import { analyzeBattles } from './util/analysis';


(async () => {
    const battles = await getBattles('#2YYL9GLU8');
    console.log(`Analyzing past ${battles.length} games.\n`);

    const battlesFile = await openBattlesFile();

    // Only trophy road 1v1s where levels matter
    const ladderMatches = battles.filter(b => b.type === 'PvP');
    console.log(`Over ${ladderMatches.length} trophy games:`);

    await analyzeBattles(battlesFile, ladderMatches);

    // Clan war battles
    const cwMatches = battles.filter(b => b.type === 'riverRacePvP');
    console.log(`Over ${cwMatches.length} clan wars games:`);

    await analyzeBattles(battlesFile, cwMatches);
})()

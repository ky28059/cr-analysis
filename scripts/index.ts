import { getAndUpdateBattles } from '@/lib/memo';
import { analyzeLevels, analyzeWinRate } from '@/util/analysis';
import type { PlayerBattleData } from '@/lib/types';


(async () => {
    const battles = await getAndUpdateBattles();

    console.log(`Analyzing past ${battles.length} games.\n`);

    // Only trophy road 1v1s where levels matter
    const ladderMatches = battles.filter(({ type }) => type === 'PvP' || type === 'trail');
    console.log(`Over ${ladderMatches.length} trophy games:`);
    console.log('-'.repeat(30))

    analyzeLevels(ladderMatches);
    analyzeWinRate(ladderMatches);

    // Path of legend battles
    const polMatches = battles.filter(({ type }) => type === 'pathOfLegend')
    console.log(`Over ${polMatches.length} path of legends games:`);
    console.log('-'.repeat(30))

    analyzeLevels(polMatches);
    analyzeWinRate(polMatches);

    // Clan war battles
    const cwMatches = battles.filter(({ type }) => type === 'riverRacePvP');
    console.log(`Over ${cwMatches.length} clan wars games:`);
    console.log('-'.repeat(30))

    analyzeLevels(cwMatches);
    analyzeWinRate(cwMatches);

    // 2v2
    const doubles = battles
        .filter(({ gameMode }) => gameMode.name === 'TeamVsTeam')
        .filter(({ team }) => team.some((t) => (t as PlayerBattleData).name === 'Gunstable'));
    console.log(`Over ${doubles.length} (kepler) 2v2 games:`);
    console.log('-'.repeat(30))

    analyzeWinRate(doubles);
})()

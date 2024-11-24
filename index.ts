import { getBattles } from './lib/players';
import { cacheBattles, getCachedBattles } from './util/memo';
import { analyzeLevels, analyzeWinRate } from './util/analysis';
import type { PlayerBattleData } from './lib/types';


(async () => {
    const battles = await getCachedBattles();
    const cachedIds = new Set(battles.map(({ battleTime }) => battleTime));

    const newBattles = (await getBattles('#2YYL9GLU8')).filter(b => !cachedIds.has(b.battleTime));
    battles.push(...await cacheBattles(newBattles));

    console.log(`Analyzing past ${battles.length} games.\n`);

    // Only trophy road 1v1s where levels matter
    const ladderMatches = battles.filter(({ type }) => type === 'PvP');
    console.log(`Over ${ladderMatches.length} trophy games:`);
    console.log('-'.repeat(30))

    analyzeLevels(ladderMatches);
    analyzeWinRate(ladderMatches);

    // Path of legend battles
    const polMatches = battles.filter(({ type }) => type === 'pathOfLegend')
    console.log(`Over ${polMatches.length} path of legends games:`);
    console.log('-'.repeat(30))

    analyzeWinRate(polMatches);

    // Clan war battles
    const cwMatches = battles.filter(({ type }) => type === 'riverRacePvP');
    console.log(`Over ${cwMatches.length} clan wars games:`);
    console.log('-'.repeat(30))

    analyzeLevels(cwMatches);
    analyzeWinRate(cwMatches);

    // Goblin mode :hearts:
    const gbMatches = battles.filter(({ gameMode }) => gameMode?.name === 'TeamVsTeam_GoblinBuffs');
    console.log(`Over ${gbMatches.length} 2v2 goblin buff games:`);
    console.log('-'.repeat(30))

    analyzeWinRate(gbMatches);

    // 2v2 ladder
    const doublesLadder = battles
        .filter(({ gameMode }) => gameMode?.name === 'Ladder_TeamVsTeam')
        .filter(({ team }) => team.length === 1 || team.some((t) => (t as PlayerBattleData).name === 'Gunstable'));
    console.log(`Over ${doublesLadder.length} (non-b01lers) 2v2 ladder games:`);
    console.log('-'.repeat(30))

    analyzeLevels(doublesLadder);
    analyzeWinRate(doublesLadder);

    const doublesLadderB01lers = battles
        .filter(({ gameMode }) => gameMode?.name === 'Ladder_TeamVsTeam')
        .filter(({ team }) => team.length !== 1 && !team.some((t) => (t as PlayerBattleData).name === 'Gunstable'));
    console.log(`Over ${doublesLadderB01lers.length} (b01lers) 2v2 ladder games:`);
    console.log('-'.repeat(30))

    analyzeLevels(doublesLadderB01lers);
    analyzeWinRate(doublesLadderB01lers);
})()

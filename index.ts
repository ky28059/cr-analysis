import { getAndUpdateBattles } from './lib/memo';
import { analyzeLevels, analyzeWinRate } from './util/analysis';
import type { PlayerBattleData } from './lib/types';


(async () => {
    const battles = await getAndUpdateBattles();

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

    // PoL mega knight / evo mk
    const trackedPolMatches = polMatches.filter((b) => 'cards' in b.opponent[0]);
    const mkMatches = trackedPolMatches.filter((b) => b.opponent.some((t: PlayerBattleData | { crowns: number }) => 'cards' in t && !!t.cards.find(c => c.name === 'Mega Knight' && c.evolutionLevel !== 1)));
    console.log(`Of ${trackedPolMatches.length} path of legends games, ${mkMatches.length} were against (non-evo) Mega Knight (${((mkMatches.length / trackedPolMatches.length) * 100).toFixed(2)}%):`);
    console.log('-'.repeat(30))

    analyzeWinRate(mkMatches);

    const evoMkMatches = trackedPolMatches.filter((b) => b.opponent.some((t: PlayerBattleData | { crowns: number }) => 'cards' in t && !!t.cards.find(c => c.name === 'Mega Knight' && c.evolutionLevel === 1)));
    console.log(`Of ${trackedPolMatches.length} path of legends games, ${evoMkMatches.length} were against Evo Mega Knight (${((evoMkMatches.length / trackedPolMatches.length) * 100).toFixed(2)}%):`);
    console.log('-'.repeat(30))

    analyzeWinRate(evoMkMatches);
})()

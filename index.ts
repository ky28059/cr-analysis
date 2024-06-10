import { getBattles } from './lib/players';
import { itemToNormalizedLevel } from './lib/util';


(async () => {
    const battles = await getBattles('#2YYL9GLU8');
    console.log(`Analyzing past ${battles.length} games.\n`);

    // Only trophy road 1v1s where levels matter
    const ladderMatches = battles.filter(b => b.type === 'PvP');
    console.log(`Over ${ladderMatches.length} trophy games:`);

    let totalTeamLevel = 0;
    let totalOppLevel = 0;
    let totalDiff = 0;

    for (const battle of ladderMatches) {
        const team = battle.team[0];
        const opponent = battle.opponent[0];

        const teamLevel = team.cards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0)
            + team.supportCards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0);
        const oppLevel = opponent.cards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0)
            + opponent.supportCards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0);

        console.log(teamLevel, oppLevel);

        totalTeamLevel += teamLevel;
        totalOppLevel += oppLevel;
        totalDiff += oppLevel - teamLevel;
    }

    console.log('Average team level:', totalTeamLevel / ladderMatches.length);
    console.log('Average opponent level:', totalOppLevel / ladderMatches.length);
    console.log('On average, opponent decks were', totalDiff / ladderMatches.length, 'levels higher.\n');

    // Clan war battles
    const cwMatches = battles.filter(b => b.type === 'riverRacePvP');
    console.log(`Over ${cwMatches.length} clan wars games:`);

    let totalCwTeamLevel = 0;
    let totalCwOppLevel = 0;
    let totalCwDiff = 0;

    for (const battle of cwMatches) {
        const team = battle.team[0];
        const opponent = battle.opponent[0];

        const teamLevel = team.cards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0)
            + team.supportCards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0);
        const oppLevel = opponent.cards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0)
            + opponent.supportCards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0);

        console.log(teamLevel, oppLevel);

        totalCwTeamLevel += teamLevel;
        totalCwOppLevel += oppLevel;
        totalCwDiff += oppLevel - teamLevel;
    }

    console.log('Average CW team level:', totalCwTeamLevel / cwMatches.length);
    console.log('Average CW opponent level:', totalCwOppLevel / cwMatches.length);
    console.log('On average, opponent decks were', totalCwDiff / cwMatches.length, 'levels higher.\n');
})()

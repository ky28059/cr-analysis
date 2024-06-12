import type { CachedBattle } from './memo';


export async function analyzeBattles(battles: CachedBattle[]) {
    let totalTeamLevel = 0;
    let totalOppLevel = 0;
    let totalDiff = 0;

    let wins = 0;

    for (const [, , , teamLevel, oppLevel, teamCrowns, oppCrowns] of battles) {
        totalTeamLevel += teamLevel;
        totalOppLevel += oppLevel;
        totalDiff += oppLevel - teamLevel;

        if (teamCrowns > oppCrowns) wins++;
    }

    console.log('Average team level:', totalTeamLevel / battles.length);
    console.log('Average opponent level:', totalOppLevel / battles.length);
    console.log('Your win rate was', (wins * 100) / battles.length, '%');
    console.log('On average, opponent decks were', totalDiff / battles.length, 'levels higher.\n');
}

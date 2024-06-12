import type { CachedBattle } from './memo';


export async function analyzeBattles(battles: CachedBattle[]) {
    let totalTeamLevel = 0;
    let totalOppLevel = 0;
    let totalDiff = 0;

    for (const [, , teamLevel, oppLevel] of battles) {
        totalTeamLevel += teamLevel;
        totalOppLevel += oppLevel;
        totalDiff += oppLevel - teamLevel;
    }

    console.log('Average team level:', totalTeamLevel / battles.length);
    console.log('Average opponent level:', totalOppLevel / battles.length);
    console.log('On average, opponent decks were', totalDiff / battles.length, 'levels higher.\n');
}

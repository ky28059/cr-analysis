import type { CachedBattle } from './memo';


export function analyzeLevels(battles: CachedBattle[]) {
    let totalTeamLevel = 0;
    let totalOppLevel = 0;
    let totalDiff = 0;

    for (const { teamLevel, oppLevel } of battles) {
        totalTeamLevel += teamLevel;
        totalOppLevel += oppLevel;
        totalDiff += oppLevel - teamLevel;
    }

    console.log('Average team level:', totalTeamLevel / battles.length);
    console.log('Average opponent level:', totalOppLevel / battles.length);
    console.log('On average, opponent decks were', totalDiff / battles.length, 'levels higher.\n');
}

export function analyzeWinRate(battles: CachedBattle[]) {
    let wins = 0;

    for (const { team, opponent } of battles) {
        if (!team?.[0]?.crowns || !opponent?.[0]?.crowns) continue;
        if (team[0].crowns > opponent[0].crowns) wins++;
    }

    console.log('Victories:', wins);
    console.log('Losses:', battles.length - wins);
    console.log('Your win rate was', (wins * 100) / battles.length, '%\n');
}

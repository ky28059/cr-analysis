import type { FileHandle } from 'node:fs/promises';
import { itemToNormalizedLevel } from '../lib/util';
import { cacheBattle } from './memo';
import type { Battle } from '../lib/types';


export async function analyzeBattles(battlesFile: FileHandle, battles: Battle[]) {
    let totalTeamLevel = 0;
    let totalOppLevel = 0;
    let totalDiff = 0;

    for (const battle of battles) {
        const team = battle.team[0];
        const opponent = battle.opponent[0];

        const teamLevel = team.cards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0)
            + team.supportCards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0);
        const oppLevel = opponent.cards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0)
            + opponent.supportCards.reduce((sum, c) => sum + itemToNormalizedLevel(c), 0);

        console.log(teamLevel, oppLevel);
        await cacheBattle(battlesFile, battle, teamLevel, oppLevel);

        totalTeamLevel += teamLevel;
        totalOppLevel += oppLevel;
        totalDiff += oppLevel - teamLevel;
    }

    console.log('Average team level:', totalTeamLevel / battles.length);
    console.log('Average opponent level:', totalOppLevel / battles.length);
    console.log('On average, opponent decks were', totalDiff / battles.length, 'levels higher.\n');
}

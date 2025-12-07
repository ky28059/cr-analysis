export type Battle = {
    arena: Arena,
    gameMode: GameMode,
    type: BattleType,
    deckSelection: DeckSelection,

    team: PlayerBattleData[],
    opponent: PlayerBattleData[],

    challengeWinCountBefore: number,
    boatBattleSide: string,
    boatBattleWon: boolean,
    newTowersDestroyed: number,
    prevTowersDestroyed: number,
    remainingTowers: number,
    leagueNumber: number,
    battleTime: string,
    challengeId: number,
    tournamentTag: string,
    challengeTitle: string,
    isLadderTournament: boolean,
    isHostedMatch: boolean
}

// TODO
type GameModeName = 'Ranked1v1_NewArena' | '7xElixir_Friendly' | 'Ranked1v1_NewArena_GoldRush' | 'Ladder_TeamVsTeam'
    | 'TeamVsTeam_Touchdown_Draft' | 'TripleElixir_Friendly' | 'Touchdown_Draft' | 'Friendly'
    | 'TeamVsTeam_TripleElixir_Friendly' | 'TeamVsTeam_DraftModeInsane_Friendly' | 'PickMode'
    | 'Event_DarkElixir_Spawn_TeamVsTeam' | 'Ladder' | 'Ladder_CrownRush' | 'Ranked1v1_NewArena2' | 'TeamVsTeam'
    | 'Ranked1v1_NewArena2_GoldRush' | 'Event_Blizzard_Mode' | 'EventDeck_Holiday_Feast'
    | 'Draft_Competitive_SuperCards' | 'Touchdown_Event' | 'Challenge_AllCards_EventDeck_NoSet' | 'Ladder_Classic'
    | 'MirrorDeck_EVO' | '7xElixir_Friendly_EventDeck' | 'DraftMode_Princess' | 'TripleElixir_Ladder' | 'Rage_Ladder'
    | 'RampUpElixir_Ladder' | 'EventDeck_4Card' | '7xElixir_Ladder' | 'ClanWar_BoatBattle'

type GameMode = {
    id: number,
    name: GameModeName | string
}

type Arena = {
    // name
    id: number,
    // iconUrls
}

export type BattleType = 'PvP' | 'PvE' | 'clanMate' | 'TOURNAMENT' | 'friendly' | 'SURVIVAL' | 'challenge'
    | 'PVP2v2' | 'clanMate2v2' | 'CHALLENGE2v2' | 'CLANWAR_COLLECTION_DAY' | 'CLANWAR_WAR_DAY'
    | 'CASUAL_1V1' | 'CASUAL_2V2' | 'boatBattle' | 'BOAT_BATTLE_PRACTICE'
    | 'riverRacePvP' | 'RIVER_RACE_DUEL' | 'RIVER_RACE_DUEL_COLOSSEUM' | 'TUTORIAL' | 'pathOfLegend'
    | 'seasonalBattle' | 'PRACTICE' | 'trail' | 'UNKNOWN' // TODO

type DeckSelection = 'collection' | 'draft' | 'draftCompetitive' | 'predefined' | 'eventDeck'
    | 'pick' | 'WARDECK_PICK' | 'QUADDECK_PICK' | 'UNKNOWN'

export type PlayerBattleData = {
    rounds: PlayerBattleRound[],
    clan: PlayerClan,
    cards: PlayerItemLevel[],
    supportCards: PlayerItemLevel[],

    globalRank: number,
    crowns: number,
    princessTowersHitPoints: number[],
    elixirLeaked: number,
    tag: string,
    name: string,
    startingTrophies: number,
    trophyChange: number,
    kingTowerHitPoints: number
}

type PlayerBattleRound = {
    cards: PlayerItemLevel[],
    elixirLeaked: number,
    crowns: number,
    kingTowerHitPoints: number,
    princessTowersHitPoints: number[]
}

export type PlayerItemLevel = {
    id: number,
    rarity: Rarity,
    count: number,
    level: number,
    starLevel: number,
    evolutionLevel?: number,
    used: boolean,
    name: string,
    maxLevel: number,
    elixirCost: number,
    maxEvolutionLevel: number,
    iconUrls: {
        medium: string,
        evolutionMedium?: string, // If evolution exists
        heroMedium?: string, // If hero exists
    }
}

type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'champion'

type PlayerClan = {
    badgeId: number,
    tag: string,
    name: string,
    // badgeUrls
}

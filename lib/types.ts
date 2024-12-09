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

type GameMode = {
    id: number,
    name: string
}

type Arena = {
    // name
    id: number,
    // iconUrls
}

export type BattleType = 'PvP' | 'PvE' | 'CLANMATE' | 'TOURNAMENT' | 'FRIENDLY' | 'SURVIVAL' | 'challenge'
    | 'PVP2v2' | 'CLANMATE2v2' | 'CHALLENGE2v2' | 'CLANWAR_COLLECTION_DAY' | 'CLANWAR_WAR_DAY'
    | 'CASUAL_1V1' | 'CASUAL_2V2' | 'boatBattle' | 'BOAT_BATTLE_PRACTICE'
    | 'riverRacePvP' | 'RIVER_RACE_DUEL' | 'RIVER_RACE_DUEL_COLOSSEUM' | 'TUTORIAL' | 'pathOfLegend'
    | 'seasonalBattle' | 'UNKNOWN' // TODO

type DeckSelection = 'COLLECTION' | 'DRAFT' | 'DRAFT_COMPETITIVE' | 'PREDEFINED' | 'EVENT_DECK'
    | 'PICK' | 'WARDECK_PICK' | 'QUADDECK_PICK' | 'UNKNOWN'

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
    evolutionLevel: number,
    used: boolean,
    name: string,
    maxLevel: number,
    elixirCost: number,
    maxEvolutionLevel: number,
    // iconUrls
}

type Rarity = 'COMMON' | 'RARE' | 'EPIC' | 'LEGENDARY' | 'CHAMPION'

type PlayerClan = {
    badgeId: number,
    tag: string,
    name: string,
    // badgeUrls
}

'use client'

import { useEffect, useMemo, useState } from 'react';

// Components
import Header from '@/app/Header';
import DeckSidebar from '@/app/DeckSidebar';
import CardPopularityRanking from '@/app/CardPopularityRanking';
import CardWinrateRanking from '@/app/CardWinrateRanking';
import ProgressBar from '@/components/ProgressBar';

// Utils
import type { Battle, BattleType, PlayerItemLevel } from '@/lib/types';
import { countCardFrequencies, countWins } from '@/lib/util';


type AnalysisContentProps = {
    battles: Battle[]
}

export default function AnalysisContent(props: AnalysisContentProps) {
    const [mode, setMode] = useState<BattleType>('PvP');
    const [query, setQuery] = useState('');

    const modeBattles = useMemo(() => {
        return props.battles.filter((b) => b.type === mode);
    }, [mode]);

    const [decks, setDecks] = useState<Partial<Record<string, Battle[]>>>({});
    const [activeDecks, setActiveDecks] = useState<Record<string, boolean>>({});

    // Recompute decks each time the currently selected mode changes
    useEffect(() => {
        const decks = Object.groupBy(modeBattles, (b) => serializeDeck(b.team[0].cards));
        setDecks(decks);

        const active = Object.fromEntries(Object.entries(decks).map(([k, v]) => [k, true]));
        setActiveDecks(active);
    }, [modeBattles]);

    const activeBattles = useMemo(() => {
        return modeBattles.filter((b) => activeDecks[serializeDeck(b.team[0].cards)]);
    }, [decks, activeDecks]);

    // TODO: too many memos?
    const wins = useMemo(() => countWins(activeBattles), [activeBattles]);
    const counts = useMemo(() => countCardFrequencies(activeBattles), [activeBattles]);
    const filtered = useMemo(() => {
        return counts.filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    }, [counts, query]);

    const winrate = wins / activeBattles.length;

    return (
        <div className="flex flex-col h-screen">
            <Header mode={mode} />

            <div className="flex min-h-0 grow">
                <DeckSidebar
                    decks={decks}
                    active={activeDecks}
                    setActive={setActiveDecks}
                />

                <main className="w-full py-12 overflow-y-scroll">
                    <div className="px-12 mb-12">
                        <h1 className="font-bold text-4xl mb-2">
                            {'Path of Legends'} statistics
                        </h1>
                        <p className="text-white/50 text-sm mb-6">
                            Analyzing {activeBattles.length} of {modeBattles.length} battles.
                        </p>

                        <h4 className="font-semibold mb-1">
                            Gamemode winrate
                        </h4>
                        <ProgressBar filled={winrate} marker={0.5} offset={0.15} />
                        <p className="text-xs opacity-50">
                            ({(winrate * 100).toFixed(2)}%, {wins} wins of {activeBattles.length} games)
                        </p>

                        <input
                            className="px-3 py-2 rounded text-foreground bg-white/10 border border-white/10 mt-6 text-sm"
                            type="text"
                            placeholder="Search by card"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                    </div>

                    <div className="px-12 mb-3">
                        <h3 className="font-bold text-2xl">Card frequency</h3>
                        <p className="opacity-50 text-sm">Ranked by % of battles each card appears in.</p>
                    </div>
                    <CardPopularityRanking
                        counts={filtered}
                        total={activeBattles.length}
                    />

                    <div className="mt-12 px-12 mb-3">
                        <h3 className="font-bold text-2xl">Card winrate</h3>
                        <p className="opacity-50 text-sm">
                            Ranked by % of battles won against each card. Highlighted entries represent cards for which
                            there may not be enough data to judge (e.g. {'<'} 10 battles).
                        </p>
                    </div>
                    <CardWinrateRanking
                        counts={filtered}
                        winrate={winrate}
                    />
                </main>
            </div>
        </div>
    )
}

function serializeDeck(b: PlayerItemLevel[]) {
    const names = new Set(b.map((c) => c.evolutionLevel + c.name));
    return [...names].toString(); // TODO?
}

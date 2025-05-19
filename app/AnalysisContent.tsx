'use client'

import { useEffect, useMemo, useState } from 'react';

// Components
import DeckSidebar from '@/app/DeckSidebar';

// Utils
import type { Battle, BattleType, PlayerItemLevel } from '@/lib/types';
import CardPopularityRanking from '@/app/CardPopularityRanking';
import { countCardFrequencies } from '@/lib/util';


type AnalysisContentProps = {
    battles: Battle[]
}

export default function AnalysisContent(props: AnalysisContentProps) {
    const [mode, setMode] = useState<BattleType>('pathOfLegend');

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
    const counts = useMemo(() => countCardFrequencies(activeBattles), [activeBattles]);

    return (
        <div>
            <div>{mode}</div>

            <div className="flex gap-8">
                <DeckSidebar
                    decks={decks}
                    active={activeDecks}
                    setActive={setActiveDecks}
                />

                <main className="w-full">
                    <p className="text-white/75 text-sm mb-4">
                        Analyzing {activeBattles.length} of {modeBattles.length} battles.
                    </p>
                    <CardPopularityRanking
                        counts={counts}
                        total={activeBattles.length}
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

'use client'

import { Dispatch, SetStateAction, useMemo } from 'react';
import type { Battle } from '@/lib/types';
import { imageForCard } from '@/lib/util';


type DeckSidebarProps = {
    decks: Partial<Record<string, Battle[]>>,
    active: Record<string, boolean>,
    setActive: Dispatch<SetStateAction<Record<string, boolean>>>,
}

export default function DeckSidebar(props: DeckSidebarProps) {
    function toggleDeck(s: string, b: boolean) {
        const ret = structuredClone(props.active);
        ret[s] = b;
        props.setActive(ret);
    }

    // Sort descending by battle count
    const sorted = useMemo(() => {
        return Object.entries(props.active).sort(([s1, ], [s2, ]) => {
            return props.decks[s2]!.length - props.decks[s1]!.length;
        })
    }, [props.decks, props.active]);

    return (
        <aside className="overflow-y-auto bg-black/20 px-6 py-4 flex-none flex flex-col gap-3 w-80 border-r border-r-white/20">
            <h3 className="font-semibold mb-1">Filter by deck:</h3>

            {sorted.map(([s, active]) => {
                const battles = props.decks[s]!;
                const cards = battles[0].team[0].cards;

                return (
                    <div key={s} className="flex gap-2">
                        <input
                            type="checkbox"
                            checked={active}
                            onChange={(e) => toggleDeck(s, e.target.checked)}
                        />
                        <div className="grid grid-cols-4 flex-none">
                            {cards.map((c) => (
                                <div key={c.id} className="w-max">
                                    <img
                                        src={imageForCard(c)}
                                        className="h-16"
                                    />
                                </div>
                            ))}
                        </div>

                        {battles.length}
                    </div>
                );
            })}
        </aside>
    )
}

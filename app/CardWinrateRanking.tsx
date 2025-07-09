import { useMemo } from 'react';
import ProgressBar from '@/components/ProgressBar';


type CardWinrateRankingProps = {
    counts: { count: number, wins: number, name: string, icon: string }[],
    winrate: number
}

export default function CardWinrateRanking(props: CardWinrateRankingProps) {
    const sorted = useMemo(() => {
        return props.counts.toSorted((a, b) => (b.wins / b.count) - (a.wins / a.count));
    }, [props.counts]);

    return (
        <div className="w-full">
            {sorted.length > 0 ? sorted.map((c) => {
                const wr = c.wins / c.count;
                return (
                    <div
                        className={'flex gap-3 items-center px-12' + (c.count < 10 ? ' bg-gray-200/10' : '')}
                        key={c.name}
                    >
                        <div className="w-[16rem] flex-none flex gap-3 items-center">
                            <img src={c.icon} className="max-h-18"/>
                            <div>
                                <p className="font-semibold">{c.name}</p>
                                <p className="text-xs opacity-75">{c.wins} / {c.count}</p>
                            </div>
                        </div>

                        <div className="w-full">
                            <ProgressBar
                                filled={wr}
                                marker={props.winrate}
                                // offset={0.5 - props.winrate}
                            />
                            <p className="text-sm opacity-75">
                                {(wr * 100).toFixed(2)}% winrate
                                (<span style={{ color: wrToOklch(wr) }}>
                                    {wr > props.winrate && '+'}
                                    {((wr - props.winrate) * 100).toFixed(2)}%
                                </span>)
                            </p>
                        </div>
                    </div>
                );
            }) : (
                <em className="px-12 text-white/50">
                    No cards match your search.
                </em>
            )}
        </div>
    )
}

export function wrToOklch(wr: number) {
    const remapped = Math.max(Math.min(0.75 * Math.cbrt(wr - 0.5) + 0.5, 1), 0);

    const hue = (128.85 - 16.88) * remapped + 16.88;
    return `oklch(70% 0.25 ${hue})`;
}

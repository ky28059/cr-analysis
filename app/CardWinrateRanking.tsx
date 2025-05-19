import { useMemo } from 'react';


type CardWinrateRankingProps = {
    counts: { count: number, wins: number, name: string, icon: string }[]
}

export default function CardWinrateRanking(props: CardWinrateRankingProps) {
    const sorted = useMemo(() => {
        return props.counts.toSorted((a, b) => (b.wins / b.count) - (a.wins / a.count));
    }, [props.counts]);

    return (
        <div className="w-full">
            {sorted.map((c) => (
                <div
                    className={'flex gap-3 items-center px-12' + (c.count < 10 ? ' bg-gray-200/10' : '')}
                    key={c.name}
                >
                    <div className="w-[16rem] flex-none flex gap-3 items-center">
                        <img src={c.icon} className="max-h-18" />
                        <div>
                            <p className="font-semibold">{c.name}</p>
                            <p className="text-xs opacity-75">{c.wins} / {c.count}</p>
                        </div>
                    </div>

                    <div className="w-full">
                        <div
                            className="bg-red-500 h-4 mb-1 rounded"
                            style={{ width: `${(c.wins * 100) / c.count}%` }}
                        />
                        <p className="text-sm opacity-75">
                            {((c.wins * 100) / c.count).toFixed(2)}% winrate
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

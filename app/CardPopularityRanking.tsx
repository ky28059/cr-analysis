import { Fragment } from 'react';


type CardPopularityRankingProps = {
    counts: { count: number, name: string, icon: string }[],
    total: number
}

export default function CardPopularityRanking(props: CardPopularityRankingProps) {
    return (
        <div className="grid grid-cols-[16rem_1fr] gap-x-3 items-center w-full">
            {props.counts.map((c) => (
                <Fragment key={c.name}>
                    <div className="flex gap-3 items-center">
                        <img src={c.icon} className="max-h-18" />
                        <div>
                            <p className="font-semibold">{c.name}</p>
                            <p className="text-sm opacity-75">{c.count} / {props.total}</p>
                        </div>
                    </div>

                    <div>
                        <div
                            className="bg-red-500 h-4 mb-1 rounded"
                            style={{ width: `${(c.count * 100) / props.total}%` }}
                        />
                        <p className="text-sm opacity-75">
                            {((c.count * 100) / props.total).toFixed(2)}% of games
                        </p>
                    </div>
                </Fragment>
            ))}
        </div>
    )
}

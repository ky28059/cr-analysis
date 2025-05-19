type CardPopularityRankingProps = {
    counts: { count: number, wins: number, name: string, icon: string }[],
    total: number
}

export default function CardPopularityRanking(props: CardPopularityRankingProps) {
    return (
        <div className="items-center w-full">
            {props.counts.map((c) => (
                <div
                    className="flex gap-3 items-center px-12"
                    key={c.name}
                >
                    <div className="w-[16rem] flex-none flex gap-3 items-center">
                        <img src={c.icon} className="max-h-18" />
                        <div>
                            <p className="font-semibold">{c.name}</p>
                            <p className="text-xs opacity-75">{c.count} / {props.total}</p>
                        </div>
                    </div>

                    <div className="w-full">
                        <div
                            className="bg-red-500 h-4 mb-1 rounded"
                            style={{ width: `${(c.count * 100) / props.total}%` }}
                        />
                        <p className="text-sm opacity-75">
                            {((c.count * 100) / props.total).toFixed(2)}% of games
                        </p>
                    </div>
                </div>
            ))}
        </div>
    )
}

import { wrToOklch } from '@/app/CardWinrateRanking';


type ProgressBarProps = {
    filled: number,
    marker?: number,
    offset?: number
}

export default function ProgressBar(props: ProgressBarProps) {
    const offset = props.offset ?? 0;

    return (
        <div
            className="relative rounded"
            style={{ backgroundColor: `oklch(from ${wrToOklch(props.filled + offset)} l c h / 0.3)` }}
        >
            {props.marker !== undefined && (
                <div
                    className="absolute h-6 border-l border-white/50 -top-1"
                    style={{ left: `${props.marker * 100}%` }}
                />
            )}
            <div
                className="h-4 mb-1 rounded"
                style={{
                    width: `${props.filled * 100}%`,
                    backgroundColor: wrToOklch(props.filled + offset)
                }}
            />
        </div>
    )
}

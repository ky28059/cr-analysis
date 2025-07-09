type ProgressBarProps = {
    filled: number,
    marker?: number
}

export default function ProgressBar(props: ProgressBarProps) {
    return (
        <div className="relative bg-red-500/30 rounded">
            {props.marker !== undefined && (
                <div
                    className="absolute h-6 border-l border-white/50 -top-1"
                    style={{ left: `${props.marker * 100}%` }}
                />
            )}
            <div
                className="bg-red-500 h-4 mb-1 rounded"
                style={{ width: `${props.filled * 100}%` }}
            />
        </div>
    )
}

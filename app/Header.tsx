import type { BattleType } from '@/lib/types';


type HeaderProps = {
    mode: BattleType
}

export default function Header(props: HeaderProps) {
    return (
        <div className="border-b border-white/10 bg-black/25 px-4 py-1.5 text-sm">
            {props.mode}
        </div>
    )
}

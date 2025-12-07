import Link from 'next/link';

export default function Header() {
    return (
        <div className="border-b border-white/10 bg-black/25 px-6 py-2 text-sm flex gap-4">
            <Link href="/">
                Trophy Road
            </Link>
            <Link href="/pol">
                Path of Legends
            </Link>
        </div>
    )
}

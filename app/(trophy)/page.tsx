import { getCachedBattles } from '@/lib/memo';
import TrophyAnalysis from '@/app/(trophy)/TrophyAnalysis';


export default async function TrophyRoad() {
    const battles = await getCachedBattles();
    const filtered = battles.filter((b) => b.type === 'PvP' || b.type === 'trail');

    return <TrophyAnalysis battles={filtered} />;
}

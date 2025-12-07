import { getCachedBattles } from '@/lib/memo';
import PolAnalysis from '@/app/pol/PolAnalysis';


export default async function Pol() {
    const battles = await getCachedBattles();
    const filtered = battles.filter((b) => b.type === 'pathOfLegend');

    return <PolAnalysis battles={filtered} />;
}

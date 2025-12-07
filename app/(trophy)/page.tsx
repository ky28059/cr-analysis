import { getCachedBattles } from '@/lib/memo';
import TrophyAnalysis from '@/app/(trophy)/TrophyAnalysis';


export default async function TrophyRoad() {
    const battles = await getCachedBattles();

    return <TrophyAnalysis battles={battles} />;
}

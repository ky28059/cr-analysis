import { getCachedBattles } from '@/lib/memo';
import PolAnalysis from '@/app/pol/PolAnalysis';


export default async function Pol() {
    const battles = await getCachedBattles();

    return <PolAnalysis battles={battles} />;
}

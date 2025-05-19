import { getCachedBattles } from '@/lib/memo';
import AnalysisContent from '@/app/AnalysisContent';


export default async function Home() {
    const battles = await getCachedBattles();

    return <AnalysisContent battles={battles} />;
}

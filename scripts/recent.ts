import { getCachedBattles } from '@/lib/memo';


;(async () => {
    const battles = await getCachedBattles();
    console.log(JSON.stringify(battles.slice(-5), null, 4));
})();

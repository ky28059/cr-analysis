import { getBattles } from './lib/players';


(async () => {
    const battles = await getBattles('#2YYL9GLU8');
    console.log(battles[0]);
    console.log(battles.length);
})()

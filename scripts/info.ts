import { BATTLES_FILE_PATH, getCachedBattles, merge } from '@/lib/memo';


;(async () => {
    const battles = await getCachedBattles();

    const types = new Set(battles.map(({ type }) => type));
    console.log(types);

    const modes = new Set(battles.map(({ gameMode }) => gameMode.name));
    console.log(modes);

    const deckSelections = new Set(battles.map(({ deckSelection }) => deckSelection));
    console.log(deckSelections);
})();

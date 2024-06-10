import { API_BASE } from './config';
import { TOKEN } from './auth';
import type { Battle } from './types';


export async function getBattles(tag: string): Promise<Battle[]> {
    // https://api.clashroyale.com/v1/players/%232YYL9GLU8/battlelog
    const data = await (await fetch(`${API_BASE}/players/${encodeURIComponent(tag)}/battlelog`, {
        headers: {
            'Authorization': `Bearer ${TOKEN}`
        }
    })).json() as Battle[];

    return data;
}

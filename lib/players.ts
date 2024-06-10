import { API_BASE } from './config';
import type { Battle } from './types';


export async function getBattles(tag: string): Promise<Battle[]> {
    const data = await (await fetch(`${API_BASE}/${tag}/battlelog`, {
        headers: {
            'Authorization': `Bearer`
        }
    })).json() as Battle[];

    return data;
}

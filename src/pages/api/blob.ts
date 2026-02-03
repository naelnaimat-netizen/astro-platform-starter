import type { APIRoute } from 'astro';
import { getShapesStore } from '../../utils/blobStore';

export const prerender = false;

export const GET: APIRoute = async (context) => {
    const urlParams = new URL(context.url);
    const key = urlParams.searchParams.get('key');
    if (!key) {
        return new Response('Bad Request', { status: 400 });
    }

    const blobStore = getShapesStore();
    const blob = await blobStore.get(key, { type: 'json' });
    return new Response(
        JSON.stringify({
            blob
        })
    );
};

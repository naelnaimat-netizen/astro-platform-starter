import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';

export const prerender = false;

export const GET: APIRoute = async (context) => {
    const requestUrl = new URL(context.url);
    const blobKey = requestUrl.searchParams.get('key');
    if (!blobKey) {
        return new Response('Bad Request', { status: 400 });
    }

    const shapesStore = getStore('shapes');
    const blobData = await shapesStore.get(blobKey, { type: 'json' });
    return new Response(
        JSON.stringify({
            blob: blobData
        })
    );
};

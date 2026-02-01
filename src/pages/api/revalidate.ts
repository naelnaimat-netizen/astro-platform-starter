import type { APIRoute } from 'astro';
import { purgeCache } from '@netlify/functions';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    const { tags: cacheTags } = await request.json();

    if (!Array.isArray(cacheTags)) {
        return new Response(`Bad Request: expected tags attribute with array of strings in the body, got ${typeof cacheTags}`, { status: 400 });
    }

    await purgeCache({ tags: cacheTags });
    return new Response(
        JSON.stringify({
            invalidated: cacheTags
        })
    );
};

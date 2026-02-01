import type { APIRoute } from 'astro';
import { getStore } from '@netlify/blobs';
import { isUploadDisabled } from '../../utils';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
    if (isUploadDisabled) throw new Error('Sorry, uploads are disabled');

    const shapeParameters = await request.json();
    const shapesStore = getStore('shapes');
    const shapeKey = shapeParameters.name;
    await shapesStore.setJSON(shapeKey, shapeParameters);
    return new Response(
        JSON.stringify({
            message: `Stored shape "${shapeKey}"`
        })
    );
};

export const GET: APIRoute = async ({ request }) => {
    try {
        const shapesStore = getStore({ name: 'shapes', consistency: 'strong' });
        const listResponse = await shapesStore.list();
        const storedShapeKeys = listResponse.blobs.map(({ key }) => key);
        return new Response(
            JSON.stringify({
                keys: storedShapeKeys
            })
        );
    } catch (error) {
        console.error(error);
        return new Response(
            JSON.stringify({
                keys: [],
                error: 'Failed listing blobs'
            })
        );
    }
};

import { getStore } from '@netlify/blobs';

export const BLOB_STORE_NAME = 'shapes';

export function getShapesStore(options?: { consistency?: 'strong' | 'eventual' }) {
    return getStore({ name: BLOB_STORE_NAME, ...options });
}

import blobshape from 'blobshape';
import { uniqueNamesGenerator, adjectives, animals } from 'unique-names-generator';

export function generateRandomIntegerInRange(minValue: number, maxValue: number) {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
}

export function generateUniqueBlobName() {
    const nameGeneratorConfig = {
        dictionaries: [adjectives, animals],
        separator: '-',
        length: 2
    };
    return uniqueNamesGenerator(nameGeneratorConfig) + '-' + generateRandomIntegerInRange(100, 999);
}

export function generateBlobShape(shapeParameters?: any) {
    const availableGradientColors = [
        ['#2E3192', '#1BFFFF'],
        ['#93A5CF', '#E4EfE9'],
        ['#BFF098', '#6FD6FF'],
        ['#A1C4FD', '#C2E9FB'],
        ['#11998E', '#38EF7D'],
        ['#D8B5FF', '#1EAE98']
    ];

    const mergedParameters = {
        seed: null,
        size: 512,
        edges: generateRandomIntegerInRange(3, 20),
        growth: generateRandomIntegerInRange(2, 9),
        name: generateUniqueBlobName(),
        colors: availableGradientColors[generateRandomIntegerInRange(0, availableGradientColors.length - 1)],
        ...shapeParameters
    };
    const { path: svgPath, seedValue: seed } = blobshape(mergedParameters);
    return { parameters: { ...mergedParameters, seed }, svgPath };
}

export function generateCacheControlHeaders(maxCacheDurationDays = 365, cacheTags?: string[]): Record<string, string> {
    // As far as the browser is concerned, it must revalidate on every request.
    // However, Netlify CDN is told to keep the content cached for up to maxCacheDurationDays (note: new deployment bust the cache by default).
    // We're also setting cache tags to be able to later purge via API (see: https://www.netlify.com/blog/cache-tags-and-purge-api-on-netlify/)
    const cacheControlHeaders = {
        'Cache-Control': 'public, max-age=0, must-revalidate', // Tell browsers to always revalidate
        'Netlify-CDN-Cache-Control': `public, max-age=${maxCacheDurationDays * 86_400}, must-revalidate` // Tells Netlify CDN the max allowed cache duration
    };
    if (cacheTags?.length > 0) cacheControlHeaders['Cache-Tag'] = cacheTags.join(',');
    return cacheControlHeaders;
}

export const isUploadDisabled = import.meta.env.PUBLIC_DISABLE_UPLOADS?.toLowerCase() === 'true';

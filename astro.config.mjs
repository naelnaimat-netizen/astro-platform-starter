import { defineConfig } from 'astro/config';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
    site: 'https://sigmaacadmy.com',
    vite: {
        plugins: [tailwindcss()]
    },
    integrations: [react()],
    adapter: netlify({
        devFeatures: {
            environmentVariables: true
        }
    })
});

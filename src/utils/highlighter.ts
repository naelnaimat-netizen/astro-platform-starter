import { createHighlighter } from 'shiki';
import { Marked } from 'marked';
import markedShiki from 'marked-shiki';

export const highlighterPromise = createHighlighter({
    langs: ['jsx', 'js'],
    themes: ['min-dark']
});

// Cache the configured Marked instance to avoid recreating on every render
export const markedPromise = highlighterPromise.then((highlighter) => {
    return new Marked().use(
        markedShiki({
            highlight(code, lang) {
                return highlighter.codeToHtml(code, {
                    lang,
                    theme: 'min-dark'
                });
            }
        })
    );
});

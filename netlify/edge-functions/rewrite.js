export default async (request, context) => {
  try {
    // Safe check for geo information
    const countryCode = context && context.geo && context.geo.country && context.geo.country.code;
    const path = countryCode === 'AU' ? '/edge/australia' : '/edge/not-australia';

    // Build absolute redirect URL using request.url as base
    const redirectUrl = new URL(path, request.url);

    // Use 302 redirect; explicit
    return Response.redirect(redirectUrl, 302);
  } catch (err) {
    // On any error, return a safe default redirect
    try {
      return Response.redirect(new URL('/edge/not-australia', request.url), 302);
    } catch (e) {
      // As a last resort, return a plain Response with Location header
      return new Response('Redirect', { status: 302, headers: { Location: '/edge/not-australia' } });
    }
  }
};

export const config = {
  path: '/edge'
};

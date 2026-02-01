export default async (request, context) => {
    const redirectPath = context.geo?.country?.code === 'AU' ? '/edge/australia' : '/edge/not-australia';
    return Response.redirect(new URL(redirectPath, request.url));
};

export const config = {
    path: '/edge'
};

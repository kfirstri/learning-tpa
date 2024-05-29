const WIX_OAUTH_URL = 'https://www.wix.com/installer/install';

export async function GET(request: Request) {
    // TODO
    // Confirm that the Cross-Origin-Opener-Policy of both the app URL and redirect URL is set to unsafe-none. 
    // This enables Wix to close the redirect window as part of the flow. If the COOP of either URL has a different value, set it to unsafe-none.

    const url = new URL(request.url);
    const token = url.searchParams.get('token');

    console.log('url', url);

    const redirectUrl = `${url.origin}/api/redirectUrl`;
    const responseURL = `${WIX_OAUTH_URL}?token=${token}&appId=${process.env.APP_ID}&redirectUrl=${redirectUrl}`;

    console.log('redirecting to', responseURL);

    return new Response(null, {
        status: 308,
        headers: {
            Location: responseURL
        }
    });
}
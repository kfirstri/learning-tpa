import { kv } from "@vercel/kv";


export async function GET(request: Request) {
    const url = new URL(request.url);

    const code = url.searchParams.get('code');
    const instanceId = url.searchParams.get('instanceId');

    if (!instanceId) {
        return new Response('Missing instance id', { status: 401 });
    }

    console.log('Saving code for instance id', instanceId);
    await kv.set(instanceId, code);

    // Get access and refresh tokens
    const response = await fetch(
        'https://www.wixapis.com/oauth/access',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'grantType': 'authorization_code',
                'clientId': process.env.APP_ID,
                'clientSecret': process.env.APP_SECRET,
                'code': code
            })
        }
    )

    const { access_token, refresh_token } = await response.json();

    return new Response(null, {
        status: 308,
        headers: {
            Location: `https://www.wix.com/installer/close-window?access_token=${access_token}`
        }
    });
}
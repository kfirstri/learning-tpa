import { kv } from "@vercel/kv";

export function decodeInstance(instance: string, encoding?: BufferEncoding): Record<string, string {
    const data = instance.split('.')[1];
    encoding = encoding === undefined ? "utf8" : encoding;
    var buf = Buffer.from(data.replace(/-/g, "+").replace(/_/g, "/"), "base64");
    return JSON.parse(buf.toString(encoding));
}

export async function refreshWixToken(refreshToken: string): Promise<{ refresh_token: string; access_token: string; }> {
    const refreshTokenResponse = await fetch(
        'https://www.wixapis.com/oauth/access',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'grant_type': 'refresh_token',
                'client_id': process.env.APP_ID,
                'client_secret': process.env.APP_SECRET,
                'refresh_token': refreshToken
            })
        }
    )

    console.log('response', refreshTokenResponse);

    return refreshTokenResponse.json();
}

export async function getSubscriptions(request: Request) {
    const url = new URL(request.url);
    const appInstance = url.searchParams.get('instance');

    if (!appInstance) {
        return new Response('Missing instance ID', { status: 401 });
    }

    // Get instance id from appInstance encoded string
    const instanceData = decodeInstance(appInstance);
    console.debug('decoded instance', instanceData);
    const { instanceId } = instanceData;

    const refreshToken: string | null = await kv.get(instanceId);

    if (!refreshToken) {
        return new Response('Could not find a refresh token for this instance id', { status: 401 })
    }

    const { access_token } = await refreshWixToken(refreshToken);

    const emailSubscriptionsResponse = await fetch(
        'https://www.wixapis.com/email-marketing/v1/email-subscriptions/query',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify({
                'filter': {}
            })
        }
    )

    const responseData = await emailSubscriptionsResponse.json();

    const emailSubscriptions: Record<string,string>[] = responseData.email_subscriptions;

    return new Response(JSON.stringify(emailSubscriptions.map(item => {item.email})));
};

// TODO:
// 1. parse the app instance
// 2. write the function to get access token + query wix for subscriptions
// 3. Write the function to send new subscriptions to wix
// 4. Write a settings panel

//https://learning-tpa.vercel.app/?
//instance=iIA5fGYH1bguALnqVEcTfVceQ61zGzyiNMXlWHbPT1c.eyJpbnN0YW5jZUlkIjoiMDhmZWQ0ZDMtMmY4OS00ZjA4LWExZWMtMDdjMDg1ZTJiM2JkIiwiYXBwRGVmSWQiOiIwNjEyODIzMy1hZGJkLTRlNmUtYTY1Ni03NDY1N2JjYTlkNzgiLCJzaWduRGF0ZSI6IjIwMjQtMDUtMzBUMDc6NTE6MzQuNDA0WiIsInVpZCI6IjMyNjkxZDJjLWU1NmItNDJhMS1hYTk4LTM2MGZkOWI3NjYxNiIsInBlcm1pc3Npb25zIjoiT1dORVIiLCJkZW1vTW9kZSI6ZmFsc2UsInNpdGVPd25lcklkIjoiMzI2OTFkMmMtZTU2Yi00MmExLWFhOTgtMzYwZmQ5Yjc2NjE2Iiwic2l0ZU1lbWJlcklkIjoiMzI2OTFkMmMtZTU2Yi00MmExLWFhOTgtMzYwZmQ5Yjc2NjE2IiwiZXhwaXJhdGlvbkRhdGUiOiIyMDI0LTA1LTMwVDExOjUxOjM0LjQwNFoiLCJsb2dpbkFjY291bnRJZCI6IjMyNjkxZDJjLWU1NmItNDJhMS1hYTk4LTM2MGZkOWI3NjYxNiIsInBhaSI6bnVsbCwibHBhaSI6bnVsbCwiYW9yIjp0cnVlfQ
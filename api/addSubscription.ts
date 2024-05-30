import { kv } from "@vercel/kv";
import { decodeInstance, refreshWixToken } from "./getSubscriptions";



export async function GET(request: Request) {
    const { appInstance, subscribedEmail } = await request.json();

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

    const addEmailResponse = await fetch(
        'https://www.wixapis.com/email-marketing/v1/email-subscriptions',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`
            },
            body: JSON.stringify({
                subscription: {
                    email: subscribedEmail,
                    subscriptionStatus: 'NOT_SET',
                    deliverabilityStatus: 'NOT_SET',
                }
            })
        }
    )

    return new Response('Saved new email');
}
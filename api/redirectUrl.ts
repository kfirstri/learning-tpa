import { kv } from "@vercel/kv";


export async function GET(request: Request) {
    const url = new URL(request.url);

    const code = url.searchParams.get('token');
    const instanceId = url.searchParams.get('instanceId');

    if (!instanceId) {
        return new Response('Missing instance id', { status: 401 });
    }

    console.log('Saving code for instance id', instanceId);
    await kv.set(instanceId, code);

    return new Response(`Success!`);
}
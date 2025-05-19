import { ALLOWED_HOSTS } from "$env/static/private";
import { authLogger } from "@/logger/logger";
import { error, type Cookies } from "@sveltejs/kit";

export async function cors(context: { request: Request, cookies: Cookies, opt: {} }) {
    // Check if the request is a CORS preflight request
    if (context.request.method !== 'GET') {
        const origin = context.request.headers.get('origin');
        const hosts = ALLOWED_HOSTS.split(',').map(host => host.trim());
        console.log('Origin:', origin);
        console.log('Allowed Hosts:', hosts);
        if (origin === null || !hosts.includes(origin)) {
            const included = ['host','user-agent','origin'];
            const log = {
                type: 'cors',
                res_code: 403,
                method: context.request.method,
                referrer: context.request?.referrer,
                url: context.request.url,
                headers: Object.fromEntries(context.request.headers.entries().filter(([key]) => included.includes(key))),
                body: await context.request.text(),
                // cookies: Object.fromEntries(context.cookies.getAll().entries()),
            }
            authLogger.error(JSON.stringify(log));
            throw error(403, 'CORS not allowed');
        }
    }
}
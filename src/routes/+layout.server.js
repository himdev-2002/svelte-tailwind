import { randomBytes } from 'crypto';
import { COOKIE_SECURE, ALLOWED_HOSTS } from "$env/static/private";
import { error } from '@sveltejs/kit';
// import { browser } from '$app/environment';
import { localStorageStore as htmlStore } from '@store/html';

/** @type {import('./$types').LayoutServerLoad} */
export async function load({ cookies, request, route }) {

    // Check if the request is a CORS preflight request
    if(request.method !== 'GET') {
        const origin = request.headers.get('origin');
        const hosts = ALLOWED_HOSTS.split(',').map(host => host.trim());
        console.log('Origin:', origin);
        console.log('Allowed Hosts:', hosts);
        if(origin === null || !hosts.includes(origin)) {
            throw error(403, 'CORS not allowed');
        }
    }

    // if(request.method === 'GET' && !request.url.startsWith('/')) {
    const mainLoader = htmlStore('main-loader', true);
    mainLoader?.set(true);
    // }

    let csrfToken = cookies.get('csrf-token');

    if (!csrfToken) {
        csrfToken = randomBytes(32).toString('hex'); // 64 characters hex token
        cookies.set('csrf-token', csrfToken, {
            path: '/',
            httpOnly: true,
            sameSite: 'strict',
            secure: parseInt(COOKIE_SECURE)==1,  // important for production (HTTPS only)
            maxAge: 60 * 60  // 1 hour lifetime
        });
    }

    return {
        csrfToken
    };
}

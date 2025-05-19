import { error, type Cookies } from '@sveltejs/kit';

export async function requireAuth(context: { request: Request, cookies: Cookies, opt: {} }) {
    const token = context.cookies.get('session');
    if (!token || token !== 'valid_token') {
        throw error(401, 'Unauthorized: Invalid session');
    }
}

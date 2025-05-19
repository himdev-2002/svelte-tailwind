// src/lib/middleware/csrf.js

import { authLogger } from '@/logger/logger';
import { error, type Cookies } from '@sveltejs/kit';
import { timingSafeEqual } from 'crypto';

export async function verifyCsrf(context: { request: Request, cookies: Cookies, opt: {} }) {
    const headerToken = context.request.headers.get('x-csrf-token');
    let cookieToken = context.cookies.get('csrf-token');
    if(!cookieToken)cookieToken = context.cookies.get('csrftoken');

    if (!headerToken || !cookieToken) {
        const included = ['host','user-agent','origin'];
        const log = {
            type: 'missing-csrf',
            res_code: 403,
            method: context.request.method,
            referrer: context.request?.referrer,
            url: context.request.url,
            headers: Object.fromEntries(context.request.headers.entries().filter(([key]) => included.includes(key))),
            body: await context.request.text(),
            // cookies: Object.fromEntries(context.cookies.getAll().entries()),
        }
        authLogger.error(JSON.stringify(log));
        throw error(403, 'Missing CSRF token');
    }

    const hToken = Buffer.from(headerToken, 'utf-8');
    const cToken = Buffer.from(cookieToken, 'utf-8');

    if (hToken.length !== cToken.length || !timingSafeEqual(hToken, cToken)) {
        const included = ['host','user-agent','origin'];
        const log = {
            type: 'invalid-csrf',
            res_code: 403,
            method: context.request.method,
            referrer: context.request?.referrer,
            url: context.request.url,
            headers: Object.fromEntries(context.request.headers.entries().filter(([key]) => included.includes(key))),
            body: await context.request.text(),
            // cookies: Object.fromEntries(context.cookies.getAll().entries()),
        }
        authLogger.error(JSON.stringify(log));
        throw error(403, 'Invalid CSRF token');
    }
}

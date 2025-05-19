import { error, type Cookies } from '@sveltejs/kit';
import { RATE_LIMIT_WINDOW_MS, RATE_LIMIT_MAX_REQUESTS } from '$env/static/private';

// Simpan data di memory sederhana (cocok buat demo, production pakai Redis)
const rateLimits = new Map();

export async function rateLimit(context: { request: Request, cookies: Cookies, opt: {windowMs?:number,maxRequests?:number} }) {
    const defaultWindowMs: number =  parseInt(RATE_LIMIT_WINDOW_MS);
    const defaultMaxRequests: number =  parseInt(RATE_LIMIT_MAX_REQUESTS);
    
    const windowMs: number = context.opt?.windowMs ? context.opt.windowMs : defaultWindowMs
    const maxRequests: number = context.opt?.windowMs ? context.opt.windowMs : defaultMaxRequests
    const ip = context.request.headers.get('x-forwarded-for') || 'unknown-ip';

    const now = Date.now();

    const entry = rateLimits.get(ip) || { count: 0, startTime: now };

    if (now - entry.startTime > windowMs) {
        // Reset window
        entry.count = 1;
        entry.startTime = now;
    } else {
        entry.count++;
    }

    rateLimits.set(ip, entry);

    if (entry.count > maxRequests) {
        throw error(429, 'Too many requests. Please slow down.');
    }
}

// src/lib/middleware/logger.js

import { accessLogger } from "@/logger/logger";
import type { Cookies } from "@sveltejs/kit";

export async function logger(context: { request: Request, cookies: Cookies, opt: {} }) {
    // console.log(`[${new Date().toISOString()}] ${context.request.method} ${context.request.url}`);
    // console.log(context);
    const included = ['host','user-agent','origin'];
    const log = {
        method: context.request.method,
        referrer: context.request?.referrer,
        url: context.request.url,
        headers: Object.fromEntries(context.request.headers.entries().filter(([key]) => included.includes(key))),
        body: await context.request.text(),
        // cookies: Object.fromEntries(context.cookies.getAll().entries()),
    }
    accessLogger.info(JSON.stringify(log));
}
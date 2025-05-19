import type { Cookies } from "@sveltejs/kit";

/**
 * Apply multiple middleware functions in sequence
 * @param {Array<Function>} middlewares
 */
export async function applyMiddlewares(context: { request: Request, cookies: Cookies, opt: {} }, middlewares: Array<Function>) {
    // console.log({ context });
    for (const middleware of middlewares) {
        await middleware(context);
    }
}

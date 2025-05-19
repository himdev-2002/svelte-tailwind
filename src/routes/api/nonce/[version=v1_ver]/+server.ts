import { requireAuth } from '@/middleware/auth';
import { cors } from '@/middleware/cors';
import { verifyCsrf } from '@/middleware/csrf';
import { applyMiddlewares } from '@/middleware/handler';
import { logger } from '@/middleware/logger';
import { rateLimit } from '@/middleware/rateLimit';
import type { RequestHandler } from '@sveltejs/kit';
import { randomBytes } from 'crypto';

export const GET: RequestHandler = async ({ request, cookies }) => {
  // 🔥 Middleware stack
  await applyMiddlewares({ request, cookies, opt:{} }, [
    logger,
    // rateLimit,
    cors,
    // requireAuth,
    // verifyCsrf
  ]);

  const nonce = randomBytes(16).toString('hex');

  return new Response(JSON.stringify({ nonce }), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

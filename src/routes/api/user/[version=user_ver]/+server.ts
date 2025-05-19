import type { RequestHandler } from '@sveltejs/kit';
import { createRandomUser, generateRandomUser } from '@/faker/users';
import { type AuthUserType } from '@/schema/user';
import { cors } from '@/middleware/cors';
import { applyMiddlewares } from '@/middleware/handler';

export const GET: RequestHandler = async ({request, cookies, params}) => {
  await applyMiddlewares({ request, cookies, opt:{} }, [
    cors,
  ]);

  let data: AuthUserType|null = null;
  
  switch (params.version) {
    case 'v1':
      data = createRandomUser();
      break;
    case 'v2':
      data = generateRandomUser();
      break;
    default:
      data = null;
      break;
  }

  return new Response(JSON.stringify(data), {
    headers: {
      'Content-Type': 'application/json'
    }
  });
};

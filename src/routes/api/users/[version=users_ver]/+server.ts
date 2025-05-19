import type { RequestHandler } from '@sveltejs/kit';
import { users, users2 } from '@/faker/users';
import type { AuthUserType } from '@/schema/user';

export const GET: RequestHandler = async ({params}) => {
  let data: AuthUserType[] | null = null;
  
  switch (params.version) {
    case 'v1':
      data = users;
      break;
    case 'v2':
      data = users2;
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

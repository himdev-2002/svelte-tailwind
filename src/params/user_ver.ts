import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is ('v1' | 'v2') => {
	return ['v1','v2'].includes(param);
}) satisfies ParamMatcher;
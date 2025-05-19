import type { ParamMatcher } from '@sveltejs/kit';

export const match = ((param: string): param is ('v1') => {
	return param == 'v1';
}) satisfies ParamMatcher;
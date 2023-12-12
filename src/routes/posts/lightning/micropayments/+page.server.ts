import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export function load(): PageServerLoad {
	throw redirect(302, '/articles/bitcoin/micropayments');
}

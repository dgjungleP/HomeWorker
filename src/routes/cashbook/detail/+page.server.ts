import type { PageServerLoad } from './$types';
type Cashbook = {
	id: number;
	amount: number;
	time: number;
	user: string;
	reason: string;
	type: string;
	description?: string;
};
type CashbookHolder = {
	[x: string]: Cashbook[];
};

export type { Cashbook, CashbookHolder };

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

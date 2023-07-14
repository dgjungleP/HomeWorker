import type { PageServerLoad } from './$types';

type Relation = {
	user: User;
	type: string;
};
type User = {
	name: string;
	relation?: Relation[];
};

export type { Relation, User };
export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

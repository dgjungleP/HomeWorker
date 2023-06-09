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
	const userData: User[] = [
		{
			name: 'Jungle',
			relation: [
				{
					user: {
						name: 'Tobby1',
						relation: [
							{
								user: {
									name: 'Tobby11',
									relation: [
										{ user: { name: 'Tobby111' }, type: '儿子' },
										{ user: { name: 'Tobby112' }, type: '儿子' },
										{ user: { name: 'Tobby113' }, type: '儿子' },
										{ user: { name: 'Tobby114' }, type: '儿子' }
									]
								},
								type: '儿子'
							},
							{
								user: {
									name: 'Tobby12',
									relation: [
										{ user: { name: 'Tobby121' }, type: '儿子' },
										{ user: { name: 'Tobby121' }, type: '儿子' },
										{ user: { name: 'Tobby123' }, type: '儿子' },
										{ user: { name: 'Tobby124' }, type: '儿子' }
									]
								},
								type: '儿子'
							},
							{ user: { name: 'Tobby13' }, type: '儿子' },
							{
								user: {
									name: 'Tobby14',
									relation: [
										{ user: { name: 'Tobby131' }, type: '儿子' },
										{ user: { name: 'Tobby132' }, type: '儿子' },
										{ user: { name: 'Tobby133' }, type: '儿子' },
										{ user: { name: 'Tobby134' }, type: '儿子' }
									]
								},
								type: '儿子'
							}
						]
					},
					type: '儿子'
				},
				{ user: { name: 'Tobby2' }, type: '儿子' },
				{
					user: {
						name: 'Tobby3',
						relation: [
							{ user: { name: 'Tobby31' }, type: '儿子' },
							{ user: { name: 'Tobby32' }, type: '儿子' },
							{ user: { name: 'Tobby33' }, type: '儿子' },
							{ user: { name: 'Tobby34' }, type: '儿子' }
						]
					},
					type: '儿子'
				},
				{ user: { name: 'Tobby4' }, type: '儿子' }
			]
		}
	];
	return { userData };
}) satisfies PageServerLoad;

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
										{ user: { name: 'Tobby111' }, type: 'father' },
										{ user: { name: 'Tobby112' }, type: 'father' },
										{ user: { name: 'Tobby113' }, type: 'father' },
										{ user: { name: 'Tobby114' }, type: 'father' }
									]
								},
								type: 'father'
							},
							{
								user: {
									name: 'Tobby12',
									relation: [
										{ user: { name: 'Tobby121' }, type: 'father' },
										{ user: { name: 'Tobby121' }, type: 'father' },
										{ user: { name: 'Tobby123' }, type: 'father' },
										{ user: { name: 'Tobby124' }, type: 'father' }
									]
								},
								type: 'father'
							},
							{ user: { name: 'Tobby13' }, type: 'father' },
							{
								user: {
									name: 'Tobby14',
									relation: [
										{ user: { name: 'Tobby131' }, type: 'father' },
										{ user: { name: 'Tobby132' }, type: 'father' },
										{ user: { name: 'Tobby133' }, type: 'father' },
										{ user: { name: 'Tobby134' }, type: 'father' }
									]
								},
								type: 'father'
							}
						]
					},
					type: 'father'
				},
				{ user: { name: 'Tobby2' }, type: 'father' },
				{
					user: {
						name: 'Tobby3',
						relation: [
							{ user: { name: 'Tobby31' }, type: 'father' },
							{ user: { name: 'Tobby32' }, type: 'father' },
							{ user: { name: 'Tobby33' }, type: 'father' },
							{ user: { name: 'Tobby34' }, type: 'father' }
						]
					},
					type: 'father'
				},
				{ user: { name: 'Tobby4' }, type: 'father' }
			]
		}
	];
	return { userData };
}) satisfies PageServerLoad;

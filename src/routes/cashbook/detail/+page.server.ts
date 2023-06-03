import type { PageServerLoad } from './$types';
type Cashbook = {
    id: number,
    amount: number;
    time: number,
    user: string,
    reason: string,
    type: string,
    description?: string
}
type CashbookHolder = {
    [x: string]: Cashbook[];
}

export type { Cashbook, CashbookHolder }

export const load = (async () => {
    const pageData: CashbookHolder = {
        "favor": [{
            id: 1,
            amount: 100,
            time: 1685772956,
            user: "Jungle",
            type: "income",
            reason: "人情"
        }, {
            id: 1,
            amount: 100,
            time: 1685772956,
            user: "Jungle",
            type: "expend",
            reason: "人情"
        }],
        "consume": [{
            id: 1,
            amount: 1000,
            time: 1685772956,
            user: "Jungle",
            type: "income",
            reason: "人情"
        }, {
            id: 1,
            amount: 1000,
            time: 1685772956,
            user: "Jungle",
            type: "expend",
            reason: "人情"
        }, {
            id: 1,
            amount: 1000,
            time: 1685772956,
            user: "Jungle",
            type: "expend",
            reason: "人情"
        }]
    }
    return { pageData };
}) satisfies PageServerLoad;
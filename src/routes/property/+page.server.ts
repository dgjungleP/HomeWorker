import type { PageServerLoad } from './$types';

export const load = (async () => {
    const detailData = {
        insure: [{ id: 1, company: "1", insuerNum: "11", value: 10 }, { id: 1, company: "1", insuerNum: "11", value: 10 }, { id: 1, company: "1", insuerNum: "11", value: 10 }, { id: 1, company: "1", insuerNum: "11", value: 10 }],
        impress: [{
            id: 1, useTo: "1", account: 11, plan: {
                value: 10,
                period: 10,
                unit: "天"
            }
        }, {
            id: 1, useTo: "1", account: 11, plan: {
                value: 10,
                period: 10,
                unit: "天"
            }
        }, {
            id: 1, useTo: "1", account: 11, plan: {
                value: 10,
                period: 10,
                unit: "天"
            }
        }, {
            id: 1, useTo: "1", account: 11, plan: {
                value: 10,
                period: 10,
                unit: "天"
            }
        }],
        income: [{
            id: 1, source: "1", account: 11, period: 10,
            unit: "天"
        }, {
            id: 1, source: "1", account: "11", period: 10,
            unit: "天"
        }, {
            id: 1, source: "1", account: "11", period: 10,
            unit: "天"
        }, {
            id: 1, source: "1", account: "11", period: 10,
            unit: "天"
        }],
        invest: [{ id: 1, type: "1", input: 11, income: 0 }, { id: 1, type: "1", input: 11, income: 0 }, { id: 1, type: "1", input: 11, income: 0 }, { id: 1, type: "1", input: 11, income: 0 }],
        deposit: [{ id: 1, bank: "1", account: 11, memo: "" }, { id: 1, bank: "1", account: 11, memo: "" }, { id: 1, bank: "1", account: 11, memo: "" }, { id: 1, bank: "1", account: 11, memo: "" }]
    }
    const analyseData = {}
    return { detailData, analyseData };
}) satisfies PageServerLoad;
import type { PageServerLoad } from './$types';

export const load = (async () => {
    const detailData = {
        insure: [{ id: 1, company: "1", insuerNum: "11", value: 10, expire: false },
        { id: 1, company: "1", insuerNum: "11", value: 10, expire: false },
        { id: 1, company: "1", insuerNum: "11", value: 10, expire: false },
        { id: 1, company: "1", insuerNum: "11", value: 10, expire: true }],
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
        invest: [{ id: 1, type: "1", input: 11, income: 0 }, { id: 1, type: "1", input: 11, income: -100 }, { id: 1, type: "1", input: 11, income: 0 }, { id: 1, type: "1", input: 11, income: 0 }],
        deposit: [{ id: 1, bank: "1", account: 11, memo: "" }, { id: 1, bank: "1", account: 11, memo: "" }, { id: 1, bank: "1", account: 11, memo: "" }, { id: 1, bank: "1", account: 11, memo: "" }]
    }
    const analyseData = {
        totalAsset: [
            {
                name: "保险",
                data: [{
                    time: "Mon",
                    value: 10
                }, {
                    time: "Tue",
                    value: 100
                }, {
                    time: "Wed",
                    value: 100
                }, {
                    time: "Thu",
                    value: 90
                }, {
                    time: "Fri",
                    value: 0
                }, {
                    time: "Sat",
                    value: 80
                }, {
                    time: "Sun",
                    value: 120
                },]
            }, {
                name: "投资",
                data: [{
                    time: "Mon",
                    value: 100
                }, {
                    time: "Tue",
                    value: 100
                }, {
                    time: "Wed",
                    value: 100
                }, {
                    time: "Thu",
                    value: 900
                }, {
                    time: "Fri",
                    value: 0
                }, {
                    time: "Sat",
                    value: 800
                }, {
                    time: "Sun",
                    value: 120
                },]
            }, {
                name: "备用金",
                data: [{
                    time: "Mon",
                    value: 10
                }, {
                    time: "Tue",
                    value: 1000
                }, {
                    time: "Wed",
                    value: 900
                }, {
                    time: "Thu",
                    value: 90
                }, {
                    time: "Fri",
                    value: 200
                }, {
                    time: "Sat",
                    value: 80
                }, {
                    time: "Sun",
                    value: 120
                },]
            }, {
                name: "储蓄",
                data: [{
                    time: "Mon",
                    value: 1500
                }, {
                    time: "Tue",
                    value: 100
                }, {
                    time: "Wed",
                    value: 1900
                }, {
                    time: "Thu",
                    value: 90
                }, {
                    time: "Fri",
                    value: 900
                }, {
                    time: "Sat",
                    value: 808
                }, {
                    time: "Sun",
                    value: 120
                },]
            }
        ],
        revennueShare: [{ value: 99999, name: '固定收入' },
        { value: 6666, name: '兼职收入' }],
        assetProportion: [
            { value: 2000, name: '保险' },
            { value: 500, name: '备用金' },
            { value: 1200, name: '投资' },
            { value: 400, name: '储蓄' }
        ]
    }
    return { detailData, analyseData };
}) satisfies PageServerLoad;
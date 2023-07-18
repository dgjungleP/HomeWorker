import type { PageServerLoad } from './$types';

export type DetailData = {
	insure: Insure[];
	impress: Impress[];
	income: Income[];
	invest: Invest[];
	deposit: Deposit[];
};
export type Insure = {
	id: number;
	company: string;
	insureNum: string;
	value: number;
	expire: boolean;
};
export type Impress = {
	id: number;
	useTo: string;
	account: number;
	plan: {
		value: number;
		period: number;
		unit: string;
	};
};
export type Income = {
	id: number;
	source: string;
	account: number;
	period: number;
	unit: string;
};
export type Invest = { id: number; type: string; input: number; income: number };
export type Deposit = { id: number; bank: string; account: number; memo: string };

export type AnalyseData = {
	totalAsset: TotalAsset[];
	revennueShare: { value: number; name: string }[];
	assetProportion: { value: number; name: string }[];
};
export type TotalAsset = {
	name: string;
	data: { time: string; value: number }[];
};
export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

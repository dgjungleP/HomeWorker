<script lang="ts">
	import Echarts from './../Echarts/Echarts.svelte';
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;
	type Value = {
		time: string;
		value: number;
	};
	type Invest = {
		type: string;
		name: string;
		input: number;
		value: number;
		history: Value[];
	};

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	const cBase = 'card p-4 w-modal shadow-xl  ';

	const investData: Invest[] = [
		{
			type: '基金',
			name: '白酒',
			input: 1500,
			value: 980,
			history: [
				{ time: '2021-01-01', value: 1500 },
				{ time: '2021-01-02', value: 1100 },
				{ time: '2021-01-03', value: 10 },
				{ time: '2021-01-04', value: 1800 },
				{ time: '2021-01-05', value: 600 },
				{ time: '2021-01-06', value: 1900 }
			]
		},
		{
			type: '基金',
			name: '白酒',
			input: 1500,
			value: 80000,
			history: [
				{ time: '2021-01-01', value: 1500 },
				{ time: '2021-01-02', value: 1100 },
				{ time: '2021-01-03', value: 10 },
				{ time: '2021-01-04', value: 1800 },
				{ time: '2021-01-05', value: 600 },
				{ time: '2021-01-06', value: 1900 }
			]
		},
		{
			type: '基金',
			name: '白酒',
			input: 1500,
			value: 90000,
			history: [
				{ time: '2021-01-01', value: 1500 },
				{ time: '2021-01-02', value: 1100 },
				{ time: '2021-01-03', value: 10 },
				{ time: '2021-01-04', value: 1800 },
				{ time: '2021-01-05', value: 600 },
				{ time: '2021-01-06', value: 1900 }
			]
		},
		{
			type: '基金',
			name: '白酒',
			input: 20000,
			value: 70000,
			history: [
				{ time: '2021-01-01', value: 1500 },
				{ time: '2021-01-02', value: 1100 },
				{ time: '2021-01-03', value: 10 },
				{ time: '2021-01-04', value: 1800 },
				{ time: '2021-01-05', value: 600 },
				{ time: '2021-01-06', value: 1900 }
			]
		},
		{
			type: '基金',
			name: '白酒',
			input: 150,
			value: 20,
			history: [
				{ time: '2021-01-01', value: 1500 },
				{ time: '2021-01-02', value: 1100 },
				{ time: '2021-01-03', value: 10 },
				{ time: '2021-01-04', value: 1800 },
				{ time: '2021-01-05', value: 600 },
				{ time: '2021-01-06', value: 1900 }
			]
		},
		{
			type: '基金',
			name: '白酒',
			input: 9863,
			value: 8894,
			history: [
				{ time: '2021-01-01', value: 1500 },
				{ time: '2021-01-02', value: 1100 },
				{ time: '2021-01-03', value: 10 },
				{ time: '2021-01-04', value: 1800 },
				{ time: '2021-01-05', value: 600 },
				{ time: '2021-01-06', value: 1900 }
			]
		}
	];
	function createOption(invest: Invest) {
		return {
			xAxis: {
				type: 'category',
				data: [...invest.history.map((i) => i.time)],
				boundaryGap: false,
				show: false
			},
			yAxis: {
				type: 'value',
				boundaryGap: false,
				show: false,
				max: Math.max(...invest.history.map((i) => i.value), invest.input)
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			series: [
				{
					data: [...invest.history.map((i) => i.value)],
					type: 'line',
					label: {
						show: true,
						position: 'top'
					},
					markLine: {
						symbol: ['none', 'none'], // 去掉箭头
						label: {
							show: true,
							position: 'middle',
							formatter: '{c}',
							color: '#f00'
						},
						data: [
							{
								yAxis: invest.input
							}
						],
						lineStyle: {
							color: '#f00'
						}
					}
				}
			]
		};
	}
</script>

{#if $modalStore[0]}
	<div class=" grid grid-cols-3 gap-6">
		{#each investData as invest}
			<div class=" {cBase} grid grid-cols-7 grid-rows-3">
				<div class=" flex justify-center items-center">{invest.type}</div>

				<div class=" col-span-2 flex justify-start items-center">
					<div><span>投入:</span><span>{invest.input}</span></div>
				</div>
				<div class=" col-span-2 flex justify-start items-center">
					<div><span>现价值:</span><span>{invest.value}</span></div>
				</div>
				<div class=" col-span-2 flex justify-start items-center">
					<div>
						<span>收益率:</span><span
							class={invest.value > invest.input ? ' text-red-500' : ' text-lime-500'}
							>{((invest.value - invest.input) / invest.input).toFixed(2)}%</span
						>
					</div>
				</div>
				<div class=" row-span-2 flex justify-center items-center"><span>{invest.name}</span></div>
				<div class=" row-span-2 col-span-6 relative">
					<div class=" left-0 w-full">
						<Echarts option={createOption(invest)} width="100%" height="100%" />
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
<slot />

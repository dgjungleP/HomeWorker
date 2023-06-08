<script lang="ts">
	import {
		Modal,
		modalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import InvestModal from '../../component/InvestModal.svelte';
	import InsureModal from '../../component/InsureModal.svelte';
	import ImprestModal from '../../component/ImprestModal.svelte';
	import IncomeModal from '../../component/IncomeModal.svelte';
	import DepositModal from '../../component/DepositModal.svelte';
	import Echarts from '../../component/Echarts/Echarts.svelte';
	import moment from 'moment';

	export let data: PageData;
	$: currentTime = moment().format('yyyy-MM-DD');
	const pageData = data.detailData;
	const propertyModalRegistry: Record<string, ModalComponent> = {
		insure: { ref: InsureModal },
		imprest: { ref: ImprestModal },
		income: { ref: IncomeModal },
		invest: { ref: InvestModal },
		deposit: { ref: DepositModal }
	};
	function reload() {
		console.log(currentTime);
	}
	function handleModal(type: string) {
		console.log(type);
		const modal: ModalSettings = {
			type: 'component',
			component: type
		};
		modalStore.trigger(modal);
	}

	const totalAssetsOption = {
		title: {
			text: '资产总值'
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985'
				}
			}
		},
		legend: {
			data: data.analyseData.totalAsset.map((asset) => asset.name)
		},

		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				data: [
					...new Set(
						data.analyseData.totalAsset.flatMap((asset) =>
							asset.data.map((assetData) => assetData.time)
						)
					)
				]
			}
		],
		yAxis: [
			{
				type: 'value'
			}
		],
		series: data.analyseData.totalAsset.map((asset) => {
			return {
				name: asset.name,
				type: 'line',
				stack: 'Total',
				areaStyle: {},
				emphasis: {
					focus: 'series'
				},
				data: asset.data.map((assetData) => assetData.value)
			};
		})
	};

	const revenueShareOption = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '5%',
			left: 'center'
		},
		series: [
			{
				name: '收入占比',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2
				},
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 40,
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data: data.analyseData.revennueShare
			}
		]
	};
	const assetProportionOption = {
		tooltip: {
			trigger: 'item'
		},
		legend: {
			top: '5%',
			left: 'center'
		},
		series: [
			{
				name: '资产占比',
				type: 'pie',
				radius: ['40%', '70%'],
				avoidLabelOverlap: false,
				itemStyle: {
					borderRadius: 10,
					borderColor: '#fff',
					borderWidth: 2
				},
				label: {
					show: false,
					position: 'center'
				},
				emphasis: {
					label: {
						show: true,
						fontSize: 40,
						fontWeight: 'bold'
					}
				},
				labelLine: {
					show: false
				},
				data: data.analyseData.assetProportion
			}
		]
	};

	const baseCard = 'card property-card card-hover';
	const baseList = 'list h-5/6 overflow-y-auto mt-2';
</script>

<div class=" grid grid-cols-7 grid-rows-5 gap-2 p-2 h-screen">
	<div class=" {baseCard} col-span-2" on:click={() => handleModal('insure')} on:keydown>
		<span class=" h-1/6">保险</span>
		<dl class={baseList}>
			{#each pageData.insure as item}
				<div class=" py-0 flex gap-4 px-2 {item.expire ? 'text-orange-400' : 'text-green-400'} ">
					<dt>公司: {item.company}</dt>
					<dd>保单号: {item.insuerNum}</dd>
					<dd>保险金: {item.value}</dd>
				</div>
			{:else}
				<dt>There has no insure</dt>
			{/each}
		</dl>
	</div>
	<div class=" {baseCard} col-span-3 row-span-2" on:click={() => handleModal('imprest')} on:keydown>
		<span class=" h-1/6">备用金</span>
		<dl class={baseList}>
			{#each pageData.impress as item}
				<div class=" py-0 flex gap-4 px-2">
					<dt>用途: {item.useTo}</dt>
					<dd>金额: {item.account}</dd>
					<div class=" flex gap-4">
						<span class=" font-bold">储蓄计划:</span>
						<div>储蓄金额:{item.plan.value}</div>
						<div>储蓄周期:{item.plan.period}/{item.plan.unit}</div>
					</div>
				</div>
			{/each}
		</dl>
	</div>
	<div class=" {baseCard} col-span-2" on:click={() => handleModal('income')} on:keydown>
		<span class=" h-1/6">收入</span>
		<dl class={baseList}>
			{#each pageData.income as item}
				<div class=" py-0 flex gap-4 px-2">
					<dt>来源: {item.source}</dt>
					<dd>金额: {item.account}</dd>
					<dd>周期: {item.period}/{item.unit}</dd>
				</div>
			{/each}
		</dl>
	</div>
	<div class=" {baseCard} col-span-2" on:click={() => handleModal('invest')} on:keydown>
		<span class=" h-1/6">投资</span>
		<dl class={baseList}>
			{#each pageData.invest as item}
				<div class=" py-0 flex gap-4 px-2 {item.income >= 0 ? 'text-green-500' : 'text-red-500'}">
					<dt>类型: {item.type}</dt>
					<dd>投入: {item.input}</dd>
					<dd>收益: {item.income}</dd>
					<dd>收益率: {(item.income / item.input).toFixed(2)}%</dd>
				</div>
			{/each}
		</dl>
	</div>
	<div class=" {baseCard} col-span-2" on:click={() => handleModal('deposit')} on:keydown>
		<span class=" h-1/6">储蓄</span>
		<dl class={baseList}>
			{#each pageData.deposit as item}
				<div class=" py-0 flex gap-4 px-2">
					<dt>银行: {item.bank}</dt>
					<dd>金额: {item.account}</dd>
					<dd>备注: {item.memo}</dd>
				</div>
			{/each}
		</dl>
	</div>
	<div class=" card property-card col-span-7 row-span-3">
		<div class=" flex w-full h-full flex-col">
			<div>
				<span>当前时间:</span><input
					class="input w-40 ml-3"
					title="时间"
					type="date"
					bind:value={currentTime}
					on:change={reload}
				/>
			</div>
			<div class=" grid grid-cols-4 h-full gap-4">
				<div class=" "><Echarts option={revenueShareOption} width="100%" height="100%" /></div>
				<div class=" col-span-2">
					<Echarts option={totalAssetsOption} width="100%" height="100%" />
				</div>
				<div class=""><Echarts option={assetProportionOption} width="100%" height="100%" /></div>
			</div>
		</div>
	</div>
</div>

<Modal components={propertyModalRegistry} />

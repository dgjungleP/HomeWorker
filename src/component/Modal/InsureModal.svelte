<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	type Insure = {
		conpanyName: string;
		projectName: string;
		projectNo: string;
		amount: number;
		number: number;
		coverage: number;
		startTime: string;
		endTime: string;

		applicant: string;
		beneficary: string;
	};

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const insureData: Insure[] = [
		{
			conpanyName: '太平洋保险',
			projectName: '303增值养老保险',
			projectNo: 'YL-39652-SD-8954',
			amount: 100000,
			number: 3,
			coverage: 30000,
			startTime: '2021年05月11日',
			endTime: '2023年05月11日',
			applicant: 'Jungle',
			beneficary: 'Jungle'
		},
		{
			conpanyName: '太平洋保险',
			projectName: '303增值养老保险',
			projectNo: 'YL-39652-SD-8954',
			amount: 100000,
			number: 3,
			coverage: 30000,
			startTime: '2021年05月11日',
			endTime: '2023年05月11日',
			applicant: 'Jungle',
			beneficary: 'Jungle'
		},
		{
			conpanyName: '太平洋保险',
			projectName: '303增值养老保险',
			projectNo: 'YL-39652-SD-8954',
			amount: 100000,
			number: 3,
			coverage: 30000,
			startTime: '2021年05月11日',
			endTime: '2023年05月11日',
			applicant: 'Jungle',
			beneficary: 'Jungle'
		},
		{
			conpanyName: '太平洋保险',
			projectName: '303增值养老保险',
			projectNo: 'YL-39652-SD-8954',
			amount: 100000,
			number: 3,
			coverage: 30000,
			startTime: '2021年05月11日',
			endTime: '2023年05月11日',
			applicant: 'Jungle',
			beneficary: 'Jungle'
		}
	];
</script>

{#if $modalStore[0]}
	<div class=" flex flex-col gap-4 max-h-screen">
		{#each insureData as insure}
			<div class=" flex flex-col gap-6">
				<div class="{cBase} grid gap-2 grid-cols-10">
					<div class=" col-span-6 p-3">
						<span>保险公司:</span><span>{insure.conpanyName}</span>
					</div>
					<div class=" col-start-2 col-end-10">
						<span>投保产品:</span><span>{insure.projectName}</span>
					</div>
					<div class=" col-start-2 col-end-7">
						<span>保单号:</span><span>{insure.projectNo}</span>
					</div>
					<div class=" col-start-2 col-end-5">
						<span>投保金额:</span><span>{insure.amount}</span>
					</div>
					<div class=" col-start-5 col-end-7">
						<span>投保分数:</span><span>{insure.number}</span>
					</div>
					<div class=" col-start-8 col-end-10 row-start-3 row-end-5">
						<span>保额:</span><span>{insure.coverage}</span>
					</div>
					<div class=" col-start-2 col-end-10">
						<span>保险时间:</span><span>{insure.startTime} - {insure.endTime}</span>
					</div>
					<div class=" col-start-2 col-end-5">
						<span>投保人:</span><span>{insure.applicant}</span>
					</div>
					<div class=" col-start-7 col-end-10">
						<span>受益人:</span><span>{insure.beneficary}</span>
					</div>
				</div>
			</div>
		{/each}
	</div>
{/if}
<slot />

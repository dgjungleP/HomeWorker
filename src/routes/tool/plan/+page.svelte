<script lang="ts">
	import { readKey } from '$lib/util/storage';
	import moment from 'moment';
	import { onMount } from 'svelte';

	$: planList = [
		{
			name: '1',
			planCount: 12
		},
		{
			name: '1',
			planCount: 12
		},
		{
			name: '1',
			planCount: 12
		}
	];
	$: currentTime = moment();

	$: selectedDate = moment().format('yyyy-MM-DD');

	$: selectedPlanList = [
		{
			name: '1',
			doCount: 12
		},
		{
			name: '1',
			doCount: 12
		}
	];
	onMount(() => {
		const json = readKey('planData');
		const jsonObject = JSON.parse(json);
		if (Object.keys(jsonObject).length !== 0) {
			console.log(jsonObject);
		}
	});
	function getSum(planName: string) {
		return 100;
	}
</script>

<div class=" p-3 h-screen grid grid-cols-2 gap-3">
	<div>
		<div class=" flex justify-between items-center">
			<span class=" text-2xl font-bold">微计划</span>
			<div>
				<input class="input w-4/6" type="text" placeholder="请输入计划名" />
				<button class=" btn btn-sm variant-filled">添加</button>
			</div>
		</div>
		<hr class=" mt-5" />
		<ul class=" mt-5">
			{#each planList as plan}
				<li class=" flex justify-between items-center border border-b-2 border-b-gray-800 p-2">
					<span>{plan.name}</span>
					<input class=" input w-20" type="number" bind:value={plan.planCount} />
					<span>{getSum(plan.name)}</span>
				</li>
			{/each}
		</ul>
	</div>
	<div>
		<div><input class=" input" type="date" bind:value={selectedDate} /></div>
		<ul class=" mt-5">
			{#each selectedPlanList as plan}
				<li class=" flex justify-between items-center mt-5 border border-b-2 border-b-gray-800 p-2">
					<span>{plan.name}</span>
					<input class=" input w-20" type="number" bind:value={plan.doCount} />
				</li>
			{/each}
		</ul>
	</div>
</div>

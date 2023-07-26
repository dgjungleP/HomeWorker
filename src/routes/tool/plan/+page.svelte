<script lang="ts">
	import { readKey, writeKey } from '$lib/util/storage';
	import moment from 'moment';
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';

	type PlanData = {
		planList: { name: string; planCount: number }[];
		dailyPlanList: { date: string; planList: { name: string; doCount: number }[] }[];
	};
	const allPlanDetail = writable<PlanData>({ planList: [], dailyPlanList: [] });

	$: inputName = '';
	$: planList = $allPlanDetail.planList;
	$: currentTime = moment();

	$: selectedDate = moment().format('yyyy-MM-DD');

	$: selectedPlanList = getDatePlanList(selectedDate);
	onMount(() => {
		const json = readKey('planData');
		const jsonObject = JSON.parse(json);
		if (Object.keys(jsonObject).length !== 0) {
			allPlanDetail.set(jsonObject);
			initial();
		}
		if (currentTime.format('yyyy-MM-DD') == selectedDate) {
			tryInitial();
		}
	});

	function initial() {
		selectedPlanList = getDatePlanList(selectedDate);
		planList = $allPlanDetail.planList;
	}
	function getSum(planName: string) {
		const selectedPlanList = $allPlanDetail.dailyPlanList
			.flatMap((data) => data.planList)
			.filter((data) => data.name == planName)
			.map((data) => data.doCount);
		return selectedPlanList.length == 0 ? 0 : selectedPlanList.reduce((l, r) => l + r);
	}
	function deletePlan(index: any): any {
		$allPlanDetail.planList = planList.filter((_, i) => i !== index);
	}
	function updatePlanDetail() {
		writeKey('planData', $allPlanDetail);
	}
	function tryInitial() {
		for (const plan of planList) {
			if (!selectedPlanList.some((data) => data.name == plan.name)) {
				selectedPlanList.push({ name: plan.name, doCount: 0 });
			}
		}
	}

	function handleSave(event: KeyboardEvent & { currentTarget: EventTarget & Window }) {
		let { key, ctrlKey } = event;
		if (ctrlKey && key == 's') {
			updatePlanDetail();
			event.preventDefault();
		}
	}

	function getDatePlanList(selectedDate: string): { name: string; doCount: number }[] {
		const selectedDailyPlan = $allPlanDetail.dailyPlanList.filter(
			(data) => data.date == selectedDate
		);
		if (selectedDailyPlan.length == 0) {
			$allPlanDetail.dailyPlanList.push({ date: selectedDate, planList: [] });
			return getDatePlanList(selectedDate);
		}
		return selectedDailyPlan[0].planList;
	}

	function handleAddPlan(event: MouseEvent & { currentTarget: EventTarget & HTMLButtonElement }) {
		planList.push({ name: inputName, planCount: 0 });
		$allPlanDetail.planList = planList;
		inputName = '';
		initial();
		tryInitial();
		updatePlanDetail();
	}
</script>

<div class=" p-3 h-screen grid grid-cols-2 gap-3">
	<div>
		<div class=" flex justify-between items-center">
			<span class=" text-2xl font-bold">微计划</span>
			<div>
				<input class="input w-4/6" type="text" placeholder="请输入计划名" bind:value={inputName} />
				<button class=" btn btn-sm variant-filled" on:click={handleAddPlan}>添加</button>
			</div>
		</div>
		<hr class=" mt-5" />
		<ul class=" mt-5">
			{#each planList as plan, index}
				<li class=" flex justify-between items-center border border-b-2 border-b-gray-800 p-2">
					<span>{plan.name}</span>
					<input class=" input w-20" type="number" bind:value={plan.planCount} />
					<span>{getSum(plan.name)}</span>
					<button class=" text-red-600" on:click={() => deletePlan(index)}>X</button>
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

<svelte:window on:keydown={handleSave} />

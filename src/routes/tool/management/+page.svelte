<script lang="ts">
	import type { PageData } from './$types';
	import { Toast, toastStore } from '@skeletonlabs/skeleton';
	type Plan = {
		name: string;
		total?: number;
	};

	export let data: PageData;
	let total: number;
	$: planList = initalPlanList();
	let insertPlan: string;
	$: planTotal =
		planList.length > 0 ? planList.map((plan) => plan.total || 0).reduce((l, r) => l + r) : 0;
	$: remain = (total || 0) - planTotal;
	const card = 'card p-4  min-h-[80px]';

	function initalPlanList(): Plan[] {
		return [];
	}
</script>

<div class=" flex h-full">
	<div class=" {card}  w-3/5 m-auto flex gap-2 flex-col p-4 min-w-[700px]">
		<div class="income-tab {card}">
			<label class="label">
				<div>总金额:</div>
				<input class="input w-60" bind:value={total} type="number" placeholder="请输入总金额" />
			</label>
		</div>
		<div class="plan-tab {card} relative">
			<div class="absolute right-2">
				<input
					class="input w-60"
					type="text"
					bind:value={insertPlan}
					placeholder="请输入需要的计划"
				/>
				<button
					type="button"
					class="btn btn-sm variant-filled"
					on:click={() => {
						if (insertPlan == '' || insertPlan == undefined) {
							toastStore.trigger({ message: '请输入正确的计划' });
						} else {
							planList.push({ name: insertPlan });
							insertPlan = '';
							planList = planList;
						}
					}}>+</button
				>
			</div>
			{#each planList as plan, index}
				<label class="label">
					<div>{plan.name}:</div>
					<input
						class="input w-60"
						bind:value={plan.total}
						type="number"
						placeholder="请输入{plan.name}金额"
					/>
					<button
						type="button"
						class="btn btn-sm variant-filled bg-red-700"
						on:click={() => {
							planList = planList.filter((data, i) => i !== index);
						}}>-</button
					>
				</label>
			{/each}
		</div>

		<div class="remain-tab {card}">
			<div>
				<span>总计金额：</span>
				<span>{total || 0}</span>
			</div>
			<div>
				<span>计划金额：</span>
				<span>{planTotal}</span>
			</div>
			<div>
				<span>结余金额：</span>
				<span class=" {remain >= 0 ? 'text-green-500' : 'text-red-500'} ">{remain}</span>
			</div>
		</div>
	</div>
</div>
<Toast />

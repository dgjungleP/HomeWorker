<script lang="ts">
	import type { PageData } from './$types';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import type { CashbookHolder } from './+page.server';
	import { getContext, onMount } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { readKey } from '$lib/util/storage';
	export let data: PageData;
	$: cashbookType = getContext<Writable<string>>('type');

	const pageData = writable<CashbookHolder>({});
	onMount(() => {
		const simpleDataJson = readKey('cashbookData');
		const simpleData = JSON.parse(simpleDataJson);
		if (Object.keys(simpleData).length == 0) {
			pageData.set({ favor: [], consume: [] });
		} else {
			pageData.set(simpleData);
		}
	});
</script>

<div>
	<!-- svelte-ignore empty-block -->
	<TabGroup regionPanel="p-4 flex-[1] pt-0 pb-2  " class=" flex flex-col h-screen  ">
		<Tab bind:group={$cashbookType} name="favor" value={'favor'}>人情</Tab>
		<Tab bind:group={$cashbookType} name="consume" value={'consume'}>消费</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<div class=" card px-4 py-6 grid grid-cols-6 variant-ghost h-full grid-rows-5 gap-6">
				{#if $pageData[$cashbookType]}
					{#each $pageData[$cashbookType] as idx}
						<div
							class="card card-hover cashbook-card"
							class:income={idx.type == 'income'}
							class:expend={idx.type == 'expend'}
						>
							<div class=" grid grid-cols-2 grid-rows-4 gap-1 mt-2">
								<div class="  row-span-3 money line">￥{idx.amount}</div>
								<div class="  line">{idx.time}</div>
								<div class="  line">{idx.user}</div>
								<div class="  line">{idx.reason}</div>
								<div class="  line col-span-2">{idx.description || ''}</div>
							</div>
						</div>
					{/each}<!-- content here -->
				{/if}
			</div>
		</svelte:fragment>
	</TabGroup>
</div>

<script lang="ts">
	import type { PageData } from '../cashbook/$types';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	export let data: PageData;
	let cashbookType: string = 'favor';
	const time: number[] = [];
	for (let i = 0; i < 30; i++) {
		time.push(i);
	}
</script>

<TabGroup regionPanel="p-4 flex-[1] pt-0 pb-2  " class=" flex flex-col h-full  ">
	<Tab bind:group={cashbookType} name="favor" value={'favor'}>人情</Tab>
	<Tab bind:group={cashbookType} name="consume" value={'consume'}>消费</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		<div class=" card px-4 py-6 grid grid-cols-6 variant-ghost h-full grid-rows-5 gap-6">
			{#if cashbookType === 'favor'}
				{#each time as idx, index}
					<div
						class="card card-hover cashbook-card income"
						class:income={index % 3 == 0}
						class:expend={index % 3 != 0}
					>
						<div class=" grid grid-cols-2 grid-rows-4 gap-1 mt-2">
							<div class="  row-span-3 money line">￥100.0</div>
							<div class="  line">2022年05月31日</div>
							<div class="  line">Jungle</div>
							<div class="  line">人情</div>
							<div class="  line col-span-2">吃饭去了</div>
						</div>
					</div>
				{/each}
			{:else if cashbookType === 'consume'}
				{#each time as idx, index}
					<div
						class="card card-hover cashbook-card income"
						class:income={index % 2 == 0}
						class:expend={index % 2 != 0}
					>
						<div class=" grid grid-cols-2 grid-rows-4 gap-1 mt-2">
							<div class="  row-span-3 money line">￥100.0</div>
							<div class="  line">2022年05月31日</div>
							<div class="  line">Jungle</div>
							<div class="  line">人情</div>
							<div class="  line col-span-2">消费去了</div>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</svelte:fragment>
</TabGroup>

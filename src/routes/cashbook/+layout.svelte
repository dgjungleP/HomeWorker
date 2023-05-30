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

<TabGroup regionPanel="p-4 flex-[1] pt-0" class=" flex flex-col h-full  ">
	<Tab bind:group={cashbookType} name="favor" value={'favor'}>人情</Tab>
	<Tab bind:group={cashbookType} name="consume" value={'consume'}>消费</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		<div class=" card p-4 grid grid-cols-10 variant-ghost h-full grid-rows-5 gap-3">
			{#if cashbookType === 'favor'}
				{#each time as idx}
					<div class="card p-4 card-hover h-full">Basic</div>
				{/each}
			{:else if cashbookType === 'consume'}
				(tab panel 2 contents)
			{/if}
		</div>
	</svelte:fragment>
</TabGroup>

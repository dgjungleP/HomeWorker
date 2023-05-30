<script lang="ts">
	import type { PageData } from '../cashbook/$types';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	export let data: PageData;
	let cashbookType: string = 'favor';
</script>

<TabGroup>
	<Tab bind:group={cashbookType} name="favor" value={'favor'}>人情</Tab>
	<Tab bind:group={cashbookType} name="consume" value={'consume'}>消费</Tab>
	<!-- Tab Panels --->
	<svelte:fragment slot="panel">
		{#if cashbookType === 'favor'}
			(tab panel 1 contents)
		{:else if cashbookType === 'consume'}
			(tab panel 2 contents)
		{/if}
	</svelte:fragment>
</TabGroup>

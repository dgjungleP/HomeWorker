<script lang="ts">
	import { readKey } from '$lib/util/storage';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { TabGroup, Tab, CodeBlock } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';

	export let data: PageData;
	const dataSourceType = writable('cashbook');
	$: pageData = '';
	storeHighlightJs.set(hljs);

	onMount(() => {
		pageData = getDataSource($dataSourceType);
	});

	function getDataSource(dataSourceType: string): string {
		const json = readKey(dataSourceType + 'Data');
		if (Object.keys(json).length == 0) {
			return '';
		}
		return JSON.stringify(JSON.parse(json), null, 2);
	}

	function handbleChange(e: Event): void {
		pageData = getDataSource($dataSourceType);
	}
</script>

<div>
	<!-- svelte-ignore empty-block -->
	<TabGroup regionPanel="p-4 flex-[1] pt-0 pb-2  " class=" flex flex-col    ">
		<Tab bind:group={$dataSourceType} name="cashbook" value={'cashbook'} on:change={handbleChange}
			>记账本</Tab
		>
		<Tab bind:group={$dataSourceType} name="property" value={'property'} on:change={handbleChange}
			>资产</Tab
		>
		<Tab bind:group={$dataSourceType} name="relation" value={'relation'} on:change={handbleChange}
			>家庭管理器</Tab
		>

		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<div class=" card px-4 py-6 variant-ghost">
				<CodeBlock language="json" code={pageData} />
			</div>
		</svelte:fragment>
	</TabGroup>
</div>

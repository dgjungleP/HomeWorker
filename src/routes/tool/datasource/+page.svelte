<script lang="ts">
	import { readKey, writeKey } from '$lib/util/storage';
	import attribute from './attribute.json';
	import { onMount } from 'svelte';
	import type { PageData } from './$types';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import { writable } from 'svelte/store';
	import MonacoEditor from '../../../component/MonacoEditor/MonacoEditor.svelte';

	export let data: PageData;

	const dataSourceType = writable('cashbook');
	$: pageData = '';
	let editor: { formatValue: Function; getCurrentValue: Function };
	onMount(() => {
		pageData = getDataSource($dataSourceType);
	});

	function getDataSource(dataSourceType: string): string {
		const json = readKey(dataSourceType + 'Data');
		if (Object.keys(JSON.parse(json)).length == 0) {
			return '';
		}
		return json;
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
		<Tab bind:group={$dataSourceType} name="timestamp" value={'timestamp'} on:change={handbleChange}
			>时间戳工具</Tab
		>
		<Tab bind:group={$dataSourceType} name="plan" value={'plan'} on:change={handbleChange}
			>计划工具</Tab
		>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			<div class=" card px-4 py-6 variant-ghost">
				<div class="tools mb-1">
					<button
						type="button"
						class="btn btn-sm variant-filled-tertiary"
						on:click={() => {
							writeKey($dataSourceType + 'Data', JSON.parse(editor.getCurrentValue()));
						}}>保存</button
					>
					<button
						type="button"
						class="btn btn-sm variant-filled-warning"
						on:click={() => {
							editor.formatValue();
						}}>格式化</button
					>
				</div>

				<MonacoEditor bind:this={editor} value={pageData} />
			</div>
		</svelte:fragment>
	</TabGroup>
</div>

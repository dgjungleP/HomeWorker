<script lang="ts">
	import type { PageData } from '../../cashbook/detail/$types';
	import {
		ListBox,
		ListBoxItem,
		Modal,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	import { onMount, setContext, beforeUpdate } from 'svelte';
	import { writable, type Writable } from 'svelte/store';
	import { modalStore } from '@skeletonlabs/skeleton';
	import CashbookModal from '../../../component/Modal/CashbookModal.svelte';
	export let data: PageData;

	$: showUtilList = false;
	$: hoverHold = false;

	const type: Writable<string> = writable('favor');

	setContext('type', type);

	onMount(() => {
		const currentType = (
			getQueryArr().find((data) => data.key == 'type')?.value || 'favor'
		).toString();
		type.set(currentType);
	});

	function handleUtilClick() {
		showUtilList = !showUtilList;
		hoverHold = !hoverHold;
	}
	function closeUitl() {
		setTimeout(() => {
			showUtilList = false;
			hoverHold = false;
		}, 100);
	}
	function handleBack(e: MouseEvent) {
		e.stopPropagation();
		location.href = '/cashbook';
	}
	function getQueryArr(): { key: string; value: string }[] {
		if (location.search) {
			const query = location.search.substring(1).split('&');
			const queryArr = query.map((data) => {
				const kvPair = data.split('=');
				return { key: kvPair[0], value: kvPair[1] };
			});
			return queryArr;
		}
		return [];
	}
	function buildQueryString(query: { key: string; value: string }[]): string {
		if (query.length == 0) {
			return '';
		}

		return '?' + query.map((data) => data.key + '=' + data.value).join('&');
	}
	function addQueryStraing(query: {
		key: string;
		value: string;
	}): { key: string; value: string }[] {
		let base = getQueryArr();

		const pre = base.find((data) => data.key == query.key);
		if (pre) {
			pre.value = query.value;
		} else {
			base = [...base, query];
		}

		return base;
	}

	const modalComponent: ModalComponent = {
		ref: CashbookModal
	};

	function handleAdd() {
		const modal: ModalSettings = {
			type: 'component',
			// Pass the component directly:
			component: modalComponent,
			value: { type: $type },
			response: (r: any) => {
				location.replace(
					location.origin +
						location.pathname +
						buildQueryString(addQueryStraing({ key: 'type', value: $type }))
				);
			}
		};
		modalStore.trigger(modal);
	}
	let clickAction: string = '';
</script>

<!-- <div> -->
<div
	tabindex="-1"
	class=" fixed z-50 min-w-[150px] flex flex-col justify-center items-center bottom-32 right-12"
	on:blur={closeUitl}
>
	{#if showUtilList}
		<div
			class=" z-50 bg-slate-200 bg-opacity-80 -top-4 w-max"
			transition:fade={{ delay: 250, duration: 300 }}
		>
			<ListBox class=" flex flex-col-reverse   ">
				<ListBoxItem bind:group={clickAction} name="medium" value="back" on:click={handleBack}
					>返回上一级</ListBoxItem
				>
				<ListBoxItem bind:group={clickAction} name="medium" value="add" on:click={handleAdd}
					>新增账本信息</ListBoxItem
				>
			</ListBox>
		</div>
	{/if}

	<div
		class=" text-4xl border border-red-500 bg-red-500 px-4 py-2 rounded-[50%] text-white bg-opacity-80 hover:scale-110 transition-all hover:rotate-45 w-fit m-auto mt-4"
		class:scale-110={hoverHold}
		class:rotate-45={hoverHold}
		on:click|stopPropagation={handleUtilClick}
		on:keyup={handleUtilClick}
	>
		+
	</div>
</div>

<Modal />

<slot />

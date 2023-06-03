<script lang="ts">
	import type { PageData } from '../../cashbook/detail/$types';
	import { ListBox, ListBoxItem } from '@skeletonlabs/skeleton';
	import { fade } from 'svelte/transition';
	export let data: PageData;
	$: showUtilList = true;
	$: hoverHold = true;
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
	}
	let clickAction: string = '';
</script>

<!-- <div> -->
<div
	tabindex="-1"
	class=" fixed z-50 bottom-20 right-20 min-w-[150px] flex flex-col justify-center items-center"
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
				<ListBoxItem bind:group={clickAction} name="medium" value="add">新增账本信息</ListBoxItem>
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
<slot />

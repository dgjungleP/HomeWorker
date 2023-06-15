<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
</script>

{#if $modalStore[0]}
	<div class=" flex flex-col gap-6">
		<div class="{cBase} grid gap-2 grid-cols-10">
			<div class=" col-span-6 border border-black p-3">
				<span>保险公司:</span><span>XXXX</span>
			</div>
			<div class=" col-start-2 col-end-10 border border-black">
				<span>投保产品:</span><span>XXXX</span>
			</div>
			<div class=" col-start-2 col-end-7 border border-black">
				<span>保单号:</span><span>XXXX</span>
			</div>
			<div class=" col-start-2 col-end-4 border border-black">
				<span>投保金额:</span><span>XXXX</span>
			</div>
			<div class=" col-start-5 col-end-7 border border-black">
				<span>投保分数:</span><span>XXXX</span>
			</div>
			<div class=" col-start-8 col-end-10 row-start-4 row-end-6 border border-black">
				<span>保额:</span><span>XXXX</span>
			</div>
			<div class=" col-start-2 col-end-10 border border-black">
				<span>保险时间:</span><span>XXXX</span>
			</div>
			<div class=" col-start-2 col-end-5 border border-black">
				<span>投保人:</span><span>XXXX</span>
			</div>
			<div class=" col-start-7 col-end-10 border border-black">
				<span>受益人:</span><span>XXXX</span>
			</div>
		</div>
	</div>
{/if}
<slot />

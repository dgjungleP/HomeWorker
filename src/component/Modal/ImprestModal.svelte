<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
</script>

{#if $modalStore[0]}
	<div class=" relative">
		<div class=" w-40 bg-red-500 h-10 border-2 border-red-700 z-10 relative top-papre" />
		<div class=" w-40 bg-red-500 h-52 border-4 border-red-800 z-30 relative" />
		<div
			class=" absolute border-4 rounded-[50%] w-10 h-10 p-2 border-orange-700 bg-orange-300 flex items-center justify-center text-white -top-20 z-20 left-[60px] coin"
		>
			$
		</div>
	</div>
{/if}
<slot />

<style lang="postcss">
	@keyframes flow {
		0% {
			@apply -top-20;
		}
		25% {
			@apply top-0;
		}
		50% {
			@apply top-10;
		}
		100% {
			@apply top-20;
		}
	}
	.coin {
		animation: 4s flow infinite;
	}

	@keyframes fold {
		0% {
		}
		25% {
			transform: rotateX(0deg);
			@apply z-20 border-2 border-red-700;
		}
		50% {
			transform: rotateX(0deg);
			@apply z-20 border-2 border-red-700;
		}
		75% {
			@apply z-40 border-4 border-red-800;
			transform: rotateX(180deg);
		}

		100% {
			transform: rotateX(0deg);
			@apply z-20 border-2  border-red-700;
		}
	}
	.top-papre {
		transform-style: preserve-3d;
		animation: 4s fold 0.5s cubic-bezier(0, 0, 0.2, 1) infinite;
		transform-origin: bottom;
	}
</style>

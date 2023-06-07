<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
</script>

{#if $modalStore[0]}
	<div class={cBase}>Hello</div>
{/if}

<slot />

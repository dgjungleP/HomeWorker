<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;
	type BankCard = {
		name: string;
		cardNo: String;
		amount: number;
		cardColor?: string | undefined;
	};

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	import TranslateCard from '../Card/TranslateCard/TranslateCard.svelte';
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cards: BankCard[] = [];
	for (let i = 0; i < 18; i++) {
		cards.push({
			name: 'XX银行' + i,
			cardNo: 'xxxxxxx-xxxxxx-xxxxxx-xxxx',
			amount: 100 * i
		});
	}
</script>

{#if $modalStore[0]}
	<div class=" grid grid-cols-5 gap-4">
		{#each cards as card}
			<TranslateCard width="250" height="100" mask={true} class=" rounded-lg p-1 bg-orange-400">
				<div
					class=" card h-full rounded-[inherit] border bg-orange-300 grid grid-cols-3 grid-rows-3"
				>
					<span class=" col-span-3">{card.name}</span>
					<span class=" col-start-1 col-end-4 row-start-2 self-center pl-4">{card.cardNo}</span>
					<span class=" col-start-3 col-end-4 justify-self-end self-center pr-1">{card.amount}</span
					>
				</div>
			</TranslateCard>
			<!-- content here -->
		{/each}
	</div>
{/if}

<slot />

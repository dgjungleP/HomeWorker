<script lang="ts">
	import TranslateCard from '../../component/Card/TranslateCard/TranslateCard.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class=" items-center flex justify-center h-full">
	<TranslateCard width={100} height={100} class=" rounded-xl" />
	<TranslateCard width={100} height={100} class=" rounded-xl" />
	<TranslateCard width={100} height={100} class=" rounded-xl" />
	<TranslateCard width={100} height={100} class=" rounded-xl" />
	<TranslateCard width={100} height={100} class=" rounded-xl" />
	<TranslateCard width={100} height={100} class=" rounded-xl" />
	<TranslateCard width={100} height={100} class=" rounded-xl" />
	<TranslateCard width={100} height={100} class=" rounded-xl" />
</div>

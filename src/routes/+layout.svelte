<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell } from '@skeletonlabs/skeleton';

	function scrollHandler(event: UIEvent & { currentTarget: EventTarget & HTMLDivElement }) {
		console.log(event.currentTarget.scrollTop);
	}
</script>

<AppShell on:scroll={scrollHandler}>
	<!-- (header) -->
	<svelte:fragment slot="sidebarLeft">
		<div id="sidebar-left" class="hidden lg:block w-[10vw] bg-slate-700 h-full">Sidebar</div>
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
	<!-- (footer) -->
</AppShell>

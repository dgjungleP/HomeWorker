<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';

	let currentTile: number = 0;
</script>

<AppShell>
	<!-- (header) -->
	<svelte:fragment slot="sidebarLeft">
		<div id="sidebar-left" class="hidden lg:block w-[5vw] bg-slate-700 h-full">
			<AppRail width={'w-full'}>
				<AppRailAnchor
					href="/"
					selected={$page.url.pathname === '/'}
					bind:group={currentTile}
					name="Home"
					value={'home'}>主页</AppRailAnchor
				>
				<AppRailAnchor
					href="/cashbook"
					selected={$page.url.pathname.startsWith('/cashbook')}
					bind:group={currentTile}
					name="CashBook"
					value={'cashbook'}>记账本</AppRailAnchor
				>
				<AppRailAnchor
					href="/about"
					selected={$page.url.pathname === '/about'}
					bind:group={currentTile}
					name="Aoubt"
					value={'about'}>关于</AppRailAnchor
				>
			</AppRail>
		</div>
	</svelte:fragment>
	<!-- (sidebarRight) -->
	<!-- (pageHeader) -->
	<!-- Router Slot -->
	<slot />
	<!-- ---- / ---- -->
	<svelte:fragment slot="pageFooter">Page Footer</svelte:fragment>
	<!-- (footer) -->
</AppShell>

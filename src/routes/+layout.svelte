<script lang="ts">
	// The ordering of these imports is critical to your app working properly
	import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	// If you have source.organizeImports set to true in VSCode, then it will auto change this ordering
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Most of your app wide CSS should be put in this file
	import '../app.postcss';
	import { AppShell, AppRail, AppRailAnchor } from '@skeletonlabs/skeleton';
	import { page } from '$app/stores';
	import hljs from 'highlight.js';
	import 'highlight.js/styles/github-dark.css';
	import { storeHighlightJs } from '@skeletonlabs/skeleton';
	storeHighlightJs.set(hljs);
	let currentTile: number = 0;
	const routers = [
		{ key: 'cashbook', name: 'CashBook', title: '记账本' },
		{ key: 'property', name: 'Property', title: '资产' },
		{ key: 'relation', name: 'Relation', title: '家庭关系' },
		{ key: 'tool', name: 'Tool', title: '工具箱' }
	];
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
				{#each routers as router}
					<AppRailAnchor
						href={'/' + router.key}
						selected={$page.url.pathname.startsWith('/' + router.key)}
						bind:group={currentTile}
						name={router.name}
						value={router.key}>{router.title}</AppRailAnchor
					>
				{/each}
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
	<!-- <svelte:fragment slot="pageFooter">Page Footer</svelte:fragment> -->
	<!-- (footer) -->
</AppShell>

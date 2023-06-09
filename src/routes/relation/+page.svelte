<script lang="ts">
	import { fade } from 'svelte/transition';
	import dagre from 'dagre';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { getLines, getLineStyle, type Line } from '$lib/util/graphUtil';
	import type { Relation, User } from './+page.server';
	import { Drawer, drawerStore } from '@skeletonlabs/skeleton';
	import type { DrawerSettings } from '@skeletonlabs/skeleton';

	export let data: PageData;
	var g = new dagre.graphlib.Graph();
	$: nodes = g.nodes();
	$: lines = new Array<Line>();
	$: marginRightNeed = 0;
	$: marginButtonNeed = 0;

	onMount(() => {
		// 为图像标签设置一个空对象
		g.setGraph({
			nodesep: 25,
			rankdir: 'TB',
			marginy: 45,
			marginx: 100,
			ranksep: 80
		});

		// 默认为每个边分配一个新的标签对象
		g.setDefaultEdgeLabel(function () {
			return {};
		});

		for (const user of data.userData) {
			g.setNode(user.name, { width: 200, height: 100 });
			user.relation?.forEach((relationUser) => deepBuildRelation(relationUser, user));
		}
		dagre.layout(g);
		lines = [];
		g.edges().forEach(function (e) {
			lines.push(...getLines(e, g));
		});
		nodes = g.nodes();
		marginRightNeed = g.graph().width!.valueOf() + 200;
		marginButtonNeed = g.graph().height!.valueOf() + 200;
	});
	function deepBuildRelation(relation: Relation, parent: User) {
		const currentUser = relation.user;
		g.setNode(currentUser.name, { label: relation.type, width: 200, height: 100 });
		g.setEdge(parent.name, currentUser.name);
		currentUser.relation?.forEach((relationUser) => deepBuildRelation(relationUser, currentUser));
	}

	function showDraw(node: string): any {
		const drawerSetting: DrawerSettings = {
			position: 'right',
			width: ' w-1/4',
			meta: { user: node }
		};
		drawerStore.open(drawerSetting);
	}
</script>

<div class=" relative w-full h-full overflow-scroll">
	{#each nodes as node}
		<div
			transition:fade
			class="card absolute bg-orange-400 card-hover grid grid-cols-2 grid-rows-3 gap-1 pt-4 px-4"
			style="left:{g.node(node).x}px;top:{g.node(node).y}px; width:{g.node(node)
				.width}px;height:{g.node(node).height}px"
			on:click={() => showDraw(node)}
			on:keydown
		>
			<div class="  row-span-2">Icon</div>
			<div class="  line">{node}</div>
			<div class="  line">男</div>
			<div class="  line col-span-2 mb-1">1996年05月20日</div>
			<span class="  absolute -top-3 -right-3 text-white px-1 bg-blue-500">
				{g.node(node).label || ''}</span
			>
		</div>
	{/each}
	{#each lines as line}
		<div
			transition:fade
			class="absolute flow-line"
			style="left:{line.startX}px;top:{line.startY}px;{getLineStyle(line)}"
		/>
	{/each}
	<div
		class=" absolute h-1 -z-10"
		style="width:{marginRightNeed}px ; height:{marginButtonNeed}px;"
	/>
</div>

<Drawer>
	<span>{$drawerStore.meta.user}</span>
</Drawer>

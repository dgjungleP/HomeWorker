<script lang="ts">
	import dagre from 'dagre';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { getLines, getLineStyle, type Line } from '$lib/util/graphUtil';
	import type { Relation, User } from './+page.server';

	export let data: PageData;
	var g = new dagre.graphlib.Graph();
	var ref;
	$: nodes = g.nodes();
	$: lines = new Array<Line>();
	$: marginNeed = false;
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
			g.setNode(user.name, { width: 121, height: 100 });
			user.relation?.forEach((relationUser) => deepBuildRelation(relationUser, user));
		}
		dagre.layout(g);
		lines = [];
		g.edges().forEach(function (e) {
			lines.push(...getLines(e, g));
		});
		nodes = g.nodes();
		marginNeed = g.graph().width!.valueOf() > document.body.clientWidth;
	});
	function deepBuildRelation(relation: Relation, parent: User) {
		const currentUser = relation.user;
		g.setNode(currentUser.name, { label: relation.type, width: 121, height: 100 });
		g.setEdge(parent.name, currentUser.name);
		currentUser.relation?.forEach((relationUser) => deepBuildRelation(relationUser, currentUser));
	}
</script>

<div bind:this={ref} class=" relative w-full h-full overflow-x-scroll">
	{#each nodes as node}
		<div
			class=" border-red-50 border absolute bg-red-400 card-hover"
			style="left:{g.node(node).x}px;top:{g.node(node).y}px; width:{g.node(node)
				.width}px;height:{g.node(node).height}px"
		>
			{node}
			<span class=" bg-slate-300 absolute -top-2 -right-2"> {g.node(node).label || ''}</span>
		</div>
	{/each}
	{#each lines as line}
		<div
			class="absolute flow-line"
			style="left:{line.startX}px;top:{line.startY}px;{getLineStyle(line)}"
		/>
	{/each}
	{#if marginNeed}
		<div class=" absolute w-1 h-1 bg-slate-900 -right-1/4" />
	{/if}
</div>

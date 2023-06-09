<script lang="ts">
	import dagre from 'dagre';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { getLines, getLineStyle, type Line } from '$lib/util/graphUtil';
	import type { Relation, User } from './+page.server';

	export let data: PageData;
	var g = new dagre.graphlib.Graph();
	$: nodes = g.nodes();
	$: lines = new Array<Line>();
	$: marginNeed = 0;
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
		marginNeed = g.graph().width!.valueOf() + 200;
	});
	function deepBuildRelation(relation: Relation, parent: User) {
		const currentUser = relation.user;
		g.setNode(currentUser.name, { label: relation.type, width: 200, height: 100 });
		g.setEdge(parent.name, currentUser.name);
		currentUser.relation?.forEach((relationUser) => deepBuildRelation(relationUser, currentUser));
	}
</script>

<div class=" relative w-full h-full overflow-x-scroll">
	{#each nodes as node}
		<div
			class="card absolute bg-orange-400 card-hover grid grid-cols-2 grid-rows-3 gap-1 pt-4 px-4"
			style="left:{g.node(node).x}px;top:{g.node(node).y}px; width:{g.node(node)
				.width}px;height:{g.node(node).height}px"
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
			class="absolute flow-line"
			style="left:{line.startX}px;top:{line.startY}px;{getLineStyle(line)}"
		/>
	{/each}
	<div class=" absolute h-1" style="width:{marginNeed}px ;" />
</div>

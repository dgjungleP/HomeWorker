<script lang="ts">
	import dagre from 'dagre';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';
	import { getLines, getLineStyle, type Line } from '$lib/util/graphUtil';

	export let data: PageData;
	var g = new dagre.graphlib.Graph();
	$: nodes = g.nodes();
	$: lines = new Array<Line>();
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

		// 新增图像的节点
		// 第一个参数是节点的id
		// 第二个参数是关于节点的元数据
		// 在此样例中，我们将为每个节点添加label
		g.setNode('1', { label: '1', width: 121, height: 100 });
		g.setNode('2', { label: '2', width: 121, height: 100 });
		g.setNode('3', { label: '3', width: 121, height: 100 });
		g.setNode('4', { label: '4', width: 121, height: 100 });
		g.setNode('5', { label: '5', width: 121, height: 100 });
		g.setNode('6', { label: '6', width: 121, height: 100 });
		g.setNode('7', { label: '7', width: 121, height: 100 });
		g.setNode('8', { label: '8', width: 121, height: 100 });
		g.setNode('9', { label: '9', width: 121, height: 100 });

		// 给图像添加边线
		g.setEdge('1', '2');
		g.setEdge('2', '3');
		g.setEdge('2', '4');

		g.setEdge('3', '6');
		g.setEdge('3', '5');
		g.setEdge('3', '7');
		g.setEdge('3', '8');
		g.setEdge('3', '9');

		g.setEdge('4', '5');
		g.setEdge('4', '6');
		g.setEdge('4', '7');
		g.setEdge('4', '8');
		g.setEdge('4', '9');
		dagre.layout(g);

		lines = [];
		g.edges().forEach(function (e) {
			lines.push(...getLines(e, g));
		});
		nodes = g.nodes();
		console.log(lines);
	});
</script>

<div class=" relative w-full h-full">
	{#each nodes as node}
		<div
			class=" border-red-50 border absolute bg-red-400 card-hover"
			style="left:{g.node(node).x}px;top:{g.node(node).y}px; width:{g.node(node)
				.width}px;height:{g.node(node).height}px"
		>
			{g.node(node).label}
		</div>
	{/each}
	{#each lines as line}
		<div
			class="absolute flow-line"
			style="left:{line.startX}px;top:{line.startY}px;{getLineStyle(line)}"
		/>
	{/each}
</div>

<script lang="ts">
	import dagre from 'dagre';
	import type { PageData } from './$types';
	import { onMount } from 'svelte';

	export let data: PageData;
	var g = new dagre.graphlib.Graph();
	var ref: Element;
	$: nodes = g.nodes();
	$: lines = g.edges();
	onMount(() => {
		console.log(ref.clientWidth);

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
		g.setNode('7', { label: '6', width: 121, height: 100 });
		g.setNode('8', { label: '6', width: 121, height: 100 });
		g.setNode('9', { label: '6', width: 121, height: 100 });

		// 给图像添加边线
		g.setEdge('1', '2');
		g.setEdge('2', '3');
		g.setEdge('2', '4');

		g.setEdge('3', '6');
		g.setEdge('3', '5');

		g.setEdge('4', '5');
		g.setEdge('4', '6');
		g.setEdge('4', '7');
		g.setEdge('4', '8');
		g.setEdge('4', '9');

		dagre.layout(g);
		g.nodes().forEach(function (v) {
			console.log('Node ' + v + ': ' + JSON.stringify(g.node(v)));
		});
		g.edges().forEach(function (e) {
			console.log(
				'Edge ' + e.v + ' -> ' + e.w + ': ' + JSON.stringify(g.edge(e)) + JSON.stringify(e)
			);
		});

		nodes = g.nodes();
		lines = g.edges();
	});
</script>

<div bind:this={ref} class=" relative w-full h-full">
	{#each nodes as node}
		<div
			class=" border-red-50 border absolute bg-red-400 card-hover"
			style="left:{g.node(node).x}px;top:{g.node(node).y}px; width:{g.node(node)
				.width}px;height:{g.node(node).height}px"
		>
			{g.node(node).label}
		</div>
	{/each}
	<!-- {#each lines as edge}
		{#each g.edge(edge).points as point, i}
			<div class="  absolute" style="left:{point.x}px;top:{point.y}px">{edge.v}->{edge.w}</div>
		{/each}
	{/each} -->
</div>

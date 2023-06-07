<script lang="ts">
	import * as echarts from 'echarts';
	import { beforeUpdate, onMount } from 'svelte';

	let chart: any;
	var chartDom: echarts.ECharts;
	export let width = '200px';
	export let height = '200px';
	export let option: any;
	export let onClick = (item: any) => {
		console.log(item.data);
	};

	onMount(() => {
		if (chart && option) {
			// 基于准备好的dom，初始化echarts实例
			chartDom = echarts.init(chart, undefined, { renderer: 'svg' });
			// 绘制图表
			chartDom.setOption(option);
			chartDom.on('click', onClick);
		}
	});
	beforeUpdate(() => {
		if (chart && option) {
			// 绘制图表
			chartDom.setOption(option);
		}
	});
</script>

<svelte:window
	on:resize={() => {
		console.log(1);

		chartDom.resize();
	}}
/>
<div
	class="chart inline-block overflow-hidden p-0 m-0"
	bind:this={chart}
	style:height
	style:width
/>

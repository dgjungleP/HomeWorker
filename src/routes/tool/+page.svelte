<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
</script>

<div class="logo-cloud grid-cols-1 xl:grid-cols-2 2xl:grid-cols-4 gap-0.5">
	<a href="./tool/management" class="logo-item"> 资产管理计算器</a>
	<a href="./tool/datasource" class="logo-item"> 数据管理器</a>
	<a href="./tool/timestamp" class="logo-item"> 时间戳工具</a>
	<a href="./tool/plan" class="logo-item"> 计划工具</a>
</div>

<script lang="ts">
	import moment from 'moment';
	import type { PageData } from './$types';
	import { onDestroy } from 'svelte';
	import postcss from 'postcss';

	export let data: PageData;
	$: currentTime = moment();

	$: selectedDate = moment().format('yyyy-MM-DD');
	const updateTime = setInterval(() => {
		currentTime = moment();
	}, 1000);
	onDestroy(() => {
		if (updateTime) {
			clearInterval(updateTime);
		}
	});
	$: currentTodayTimeStamp = [
		{ time: moment().format('hh:mm:ss'), memo: '测试' },
		{ time: moment().format('hh:mm:ss'), memo: '测试' },
		{ time: moment().format('hh:mm:ss'), memo: '测试' },
		{ time: moment().format('hh:mm:ss'), memo: '测试' }
	];
	$: planTimeStamp = [
		{ time: moment().format('hh:mm:ss'), memo: '测试' },
		{ time: moment().format('hh:mm:ss'), memo: '测试' },
		{ time: moment().format('hh:mm:ss'), memo: '测试' },
		{ time: moment().format('hh:mm:ss'), memo: '测试' }
	];
	$: currentTimeStamp = [
		{ time: moment().format('hh:mm:ss'), memo: '测试' },
		{ time: moment().format('hh:mm:ss'), memo: '测试' },
		{ time: moment().format('hh:mm:ss'), memo: '测试' },
		{ time: moment().format('hh:mm:ss'), memo: '测试' }
	];
</script>

<div class=" p-3 h-screen grid grid-cols-3">
	<div class=" flex flex-col border-r-2 border-gray-700">
		<span class=" text-center text-2xl">当前时间</span>
		<div class=" flex flex-col">
			<span class=" text-center text-orange-800">{currentTime.format('YYYY-MM-DD hh:mm:ss')}</span>
			<div class=" p-1">
				<input class=" input w-4/5" placeholder="请输入备注" />
				<button class="btn btn-sm variant-filled">Ding</button>
			</div>
		</div>
		<span class=" text-center text-2xl">今日时间戳记录</span>
		<div class=" flex-1 border-4 border-lime-700 p-4">
			<ul>
				{#each currentTodayTimeStamp as item}
					<li>
						<div>
							<span>{item.time}</span>
							<span>{item.memo}</span>
							<button>X</button>
						</div>
					</li>
				{/each}
			</ul>
		</div>
	</div>
	<div class=" flex flex-col col-span-2">
		<div class=" flex items-center">
			<span class=" text-2xl">日期：</span><input
				class=" input w-1/4"
				type="date"
				bind:value={selectedDate}
			/>
		</div>
		<div class=" grid grid-cols-2 flex-1">
			<div class=" flex flex-col">
				<span class=" text-center text-2xl">计划</span>
				<div class=" flex-1 border-4 border-orange-700 p-4">
					<ul>
						{#each planTimeStamp as item}
							<li>
								<div>
									<span>{item.time}</span>
									<span>{item.memo}</span>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</div>
			<div class=" flex flex-col">
				<span class=" text-center text-2xl">实际</span>
				<div class=" flex-1 border-4 border-blue-700 p-4">
					<ul>
						{#each currentTimeStamp as item}
							<li>
								<div>
									<span>{item.time}</span>
									<span>{item.memo}</span>
								</div>
							</li>
						{/each}
					</ul>
				</div>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	li {
		@apply border-b-2 border-gray-500;
	}
	li > div {
		@apply grid grid-cols-3;
	}
</style>

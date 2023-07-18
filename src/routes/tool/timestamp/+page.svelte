<script lang="ts">
	import moment from 'moment';
	import type { PageData } from './$types';
	import { onDestroy, onMount } from 'svelte';
	import { readKey, writeKey } from '$lib/util/storage';
	import { writable } from 'svelte/store';
	type TimestampHolder = {
		date: string;
		timestamps: Timestamp[];
		planTimestamps: Timestamp[];
	};
	type Timestamp = { time: moment.Moment; memo: string };
	export let data: PageData;
	$: currentTime = moment();

	$: selectedDate = moment().format('yyyy-MM-DD');

	const allTimestampData = writable<TimestampHolder[]>([]);
	$: currentTodayTimeStamp = getTimestamps(currentTime.format('yyyy-MM-DD'));
	$: planTimeStamp = getPlanTimestamps(selectedDate);
	$: currentTimeStamp = getTimestamps(selectedDate);
	$: currentMemo = '';

	function getTimestamps(date: string) {
		if ($allTimestampData.length == 0) {
			return [];
		}
		const filterTimestamp = $allTimestampData.filter((data) => data.date === date);
		if (filterTimestamp.length == 0) {
			return [];
		}
		return filterTimestamp[0].timestamps;
	}
	function getPlanTimestamps(date: string) {
		if ($allTimestampData.length == 0) {
			return [];
		}
		const filterTimestamp = $allTimestampData.filter((data) => data.date === date);
		if (filterTimestamp.length == 0) {
			return [];
		}
		return filterTimestamp[0].planTimestamps;
	}

	const updateTime = setInterval(() => {
		currentTime = moment();
	}, 1000);

	onMount(() => {
		const json = readKey('timestampData');
		const jsonObject = JSON.parse(json);
		if (Object.keys(jsonObject).length !== 0) {
			allTimestampData.set(jsonObject);
			initial();
		}
	});
	onDestroy(() => {
		if (updateTime) {
			clearInterval(updateTime);
		}
	});

	function dingTimestamp() {
		currentTodayTimeStamp.push({ time: currentTime, memo: currentMemo });
		updateTimestamp();
	}
	function deleteTimestamp(index: number) {
		currentTodayTimeStamp = currentTodayTimeStamp.filter((_, i) => i !== index);
		updateTimestamp();
	}
	function updateTimestamp() {
		const currentDate = currentTime.format('yyyy-MM-DD');
		const updatedTimestamp = $allTimestampData.filter((time) => time.date == currentDate);
		if (updatedTimestamp.length == 0) {
			$allTimestampData.push({
				date: currentDate,
				timestamps: currentTodayTimeStamp,
				planTimestamps: []
			});
		} else {
			updatedTimestamp[0].timestamps = currentTodayTimeStamp;
		}
		initial();
		writeKey('timestampData', $allTimestampData);
	}
	function initial() {
		currentTodayTimeStamp = getTimestamps(currentTime.format('yyyy-MM-DD'));
		planTimeStamp = getPlanTimestamps(selectedDate);
		currentTimeStamp = getTimestamps(selectedDate);
	}
</script>

<div class=" p-3 h-screen grid grid-cols-3">
	<div class=" flex flex-col border-r-2 border-gray-700">
		<span class=" text-center text-2xl">当前时间</span>
		<div class=" flex flex-col">
			<span class=" text-center text-orange-800">{currentTime.format('YYYY-MM-DD hh:mm:ss')}</span>
			<div class=" p-1">
				<input class=" input w-4/5" placeholder="请输入备注" bind:value={currentMemo} />
				<button class="btn btn-sm variant-filled" on:click={dingTimestamp}>Ding</button>
			</div>
		</div>
		<span class=" text-center text-2xl">今日时间戳记录</span>
		<div class=" flex-1 border-4 border-lime-700 p-4">
			<ul>
				{#each currentTodayTimeStamp as item, index}
					<li>
						<div>
							<span>{moment(item.time).format('hh:mm:ss')}</span>
							<span>{item.memo}</span>
							<button class=" text-red-600" on:click={() => deleteTimestamp(index)}>X</button>
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
									<span>{moment(item.time).format('hh:mm:ss')}</span>
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
									<span>{moment(item.time).format('hh:mm:ss')}</span>
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

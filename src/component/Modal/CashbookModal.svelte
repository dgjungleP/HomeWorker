<script lang="ts">
	import { readKey, writeKey } from '$lib/util/storage';

	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	// Form Data
	const cashData = {
		amount: '',
		time: '',
		user: '',
		type: '',
		reason: '',
		description: ''
	};
	const demo = {
		id: 1,
		amount: 100,
		time: 1685772956,
		user: 'Jungle',
		type: 'income',
		reason: '人情'
	};
	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		if ($modalStore[0].response) {
			$modalStore[0].response(cashData);
		}
		let holder;
		const simpleDataJson = readKey('cashbookData');
		const simpleData = JSON.parse(simpleDataJson);
		if (Object.keys(simpleData).length == 0) {
			holder = { favor: [], consume: [] };
		} else {
			holder = simpleData;
		}
		const type = $modalStore[0].value.type;
		holder[type].push(cashData);
		writeKey('cashbookData', holder);
		modalStore.close();
	}
	function getTitle(type: string) {
		switch (type) {
			case 'favor':
				return '人情';
			case 'consume':
				return '消费';
			default:
				break;
		}
	}

	// Base Classes
	const cBase = 'card p-4 w-modal shadow-xl space-y-4';
	const cHeader = 'text-2xl font-bold';
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token ';
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class=" {cBase}">
		<header class={cHeader}>{'新增' + getTitle($modalStore[0].value.type)}</header>
		<!-- Enable for debugging: -->
		<form class={cForm}>
			<label class="label">
				<span>相关人员</span>
				<input class="input" type="text" bind:value={cashData.user} placeholder="请输入相关人员" />
			</label>
			<label class="label">
				<span>时间</span>
				<input class="input" type="date" bind:value={cashData.time} placeholder="请选择时间" />
			</label>
			<label class="label">
				<span>总金额</span>
				<input
					class="input"
					type="number"
					bind:value={cashData.amount}
					placeholder="请输入总金额"
				/>
			</label>
			<label class="label">
				<span>类型</span>
				<select class="select" bind:value={cashData.type}>
					<option value="income">收入</option>
					<option value="expend">支出</option>
				</select>
			</label>
			<label class="label">
				<span>分类</span>
				<select class="select" bind:value={cashData.reason}>
					<option value="income">家用</option>
					<option value="expend">外用</option>
				</select>
			</label>
			<label class="label">
				<span>说明</span>
				<input
					class="input"
					type="text"
					bind:value={cashData.description}
					placeholder="请输入说明"
				/>
			</label>
		</form>
		<!-- prettier-ignore -->
		<footer class="modal-footer {parent.regionFooter}">
        <button class="btn {parent.buttonNeutral}" on:click={parent.onClose}>{parent.buttonTextCancel}</button>
        <button class="btn {parent.buttonPositive}" on:click={onFormSubmit}>Submit Form</button>
    </footer>
	</div>
{/if}

<slot />

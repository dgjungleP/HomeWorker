<script lang="ts">
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
		reason: ''
	};

	// We've created a custom submit function to pass the response and close the modal.
	function onFormSubmit(): void {
		console.log(cashData);
		if ($modalStore[0].response) {
			$modalStore[0].response(cashData);
		}
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
	const cForm = 'border border-surface-500 p-4 space-y-4 rounded-container-token';
	console.log(parent);
</script>

<!-- @component This example creates a simple form modal. -->

{#if $modalStore[0]}
	<div class="modal-example-form {cBase}">
		<header class={cHeader}>{'新增' + getTitle($modalStore[0].value.type)}</header>
		<!-- Enable for debugging: -->
		<form class="modal-form {cForm}">
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
				<span>说明</span>
				<input class="input" type="text" bind:value={cashData.reason} placeholder="请输入说明" />
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

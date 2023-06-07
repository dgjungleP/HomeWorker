<script lang="ts">
	import {
		Modal,
		modalStore,
		type ModalComponent,
		type ModalSettings
	} from '@skeletonlabs/skeleton';
	import type { PageData } from './$types';
	import InvestModal from '../../component/InvestModal.svelte';
	import InsureModal from '../../component/InsureModal.svelte';
	import ImprestModal from '../../component/ImprestModal.svelte';
	import IncomeModal from '../../component/IncomeModal.svelte';
	import DepositModal from '../../component/DepositModal.svelte';

	export let data: PageData;
	const propertyModalRegistry: Record<string, ModalComponent> = {
		insure: { ref: InsureModal },
		imprest: { ref: ImprestModal },
		income: { ref: IncomeModal },
		invest: { ref: InvestModal },
		deposit: { ref: DepositModal }
	};

	function handleModal(type: string) {
		console.log(type);
		const modal: ModalSettings = {
			type: 'component',
			component: type
		};
		modalStore.trigger(modal);
	}
	const baseCard = 'card property-card card-hover';
</script>

<div class=" grid grid-cols-5 grid-rows-5 gap-2 p-2 h-screen">
	<div class=" {baseCard}" on:click={() => handleModal('insure')} on:keydown>
		<span class=" h-1/6">保险</span>
		<dl class="list-dl h-5/6 overflow-y-auto">
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
		</dl>
	</div>
	<div class=" {baseCard} col-span-3 row-span-2" on:click={() => handleModal('imprest')} on:keydown>
		<span class=" h-1/6">备用金</span>
		<dl class="list-dl h-5/6 overflow-y-auto">
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
		</dl>
	</div>
	<div class=" {baseCard}" on:click={() => handleModal('income')} on:keydown>
		<span class=" h-1/6">收入</span>
		<dl class="list-dl h-5/6 overflow-y-auto">
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
		</dl>
	</div>
	<div class=" {baseCard}" on:click={() => handleModal('invest')} on:keydown>
		<span class=" h-1/6">投资</span>
		<dl class="list-dl h-5/6 overflow-y-auto">
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
		</dl>
	</div>
	<div class=" {baseCard}" on:click={() => handleModal('deposit')} on:keydown>
		<span class=" h-1/6">储蓄</span>
		<dl class="list-dl h-5/6 overflow-y-auto">
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
			<div>
				<span class="flex-auto">
					<dt>Title</dt>
					<dd>Description</dd>
				</span>
			</div>
		</dl>
	</div>
	<div class=" card property-card col-span-5 row-span-3">图表</div>
</div>

<Modal components={propertyModalRegistry} />

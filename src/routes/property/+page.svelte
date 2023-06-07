<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;
	const baseCard = 'card property-card card-hover';
</script>

<div class=" grid grid-cols-5 grid-rows-5 gap-2 p-2 h-screen">
	<div class=" {baseCard}">
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
	<div class=" {baseCard} col-span-3 row-span-2">
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
	<div class=" {baseCard}">
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
	<div class=" {baseCard}">
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
	<div class=" {baseCard}">
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

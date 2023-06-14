<script lang="ts">
	// Props
	/** Exposes parent props to this component. */
	export let parent: any;

	type Income = {
		month: number;
		name: string;
		salary?: number;
		bonus?: number;
	};
	// Stores
	import { modalStore } from '@skeletonlabs/skeleton';
	const incomes: Income[] = [
		{ month: 7, name: 'Jungle', salary: 90000 },
		{ month: 8, name: 'Jungle', salary: 90000, bonus: 1000 },
		{ month: 9, name: 'Jungle', bonus: 100 },
		{ month: 10, name: 'Jungle', salary: 90000, bonus: 100 }
	];
</script>

{#if $modalStore[0]}
	<div class=" flex flex-col gap-4 w-1/2">
		{#each incomes as income}
			<div class="table-container">
				<!-- Native Table Element -->
				<table class="table table-hover">
					<thead>
						<tr>
							<th align="center">月份</th>
							<th align="center">姓名</th>
							<th align="center">工资</th>
							<th align="center">奖金</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td align="center">{income.month}月</td>
							<td align="center">{income.name}</td>
							<td align="right">{income.salary ? income.salary : 0}</td>
							<td align="right">{income.bonus ? income.bonus : 0}</td>
						</tr>
					</tbody>
				</table>
			</div>
		{/each}
	</div>
{/if}
<slot />

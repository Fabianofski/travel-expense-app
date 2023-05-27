<script lang="ts">
	import ExpenseModal from './addExpenseModal.svelte';
	import type { expense } from './expenses';

	export let expenses: expense[];
</script>

<div class="flex flex-col gap-2">
	<h1 class="text-lg font-bold">Ausgaben pro Person</h1>

	<div class="overflow-x-auto w-full">
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th />
					<th>Name</th>
					<th>Bezahlt</th>
					<th>Betrag</th>
				</tr>
			</thead>
			<tbody>
				<td>1</td>
				<td>
					<div class="flex items-center space-x-3">
						<div class="avatar">
							<div class="mask mask-squircle w-12 h-12">
								<img src="./profiles/fabian.png" alt="fabian profile" />
							</div>
						</div>
						<div>
							<div class="font-bold">Fabian</div>
						</div>
					</div>
				</td>
				<td> 5 mal</td>
				<td> 35,45€ </td>
			</tbody>
		</table>
	</div>
</div>

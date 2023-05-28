<script lang="ts">
	import ExpenseModal from './addExpenseModal.svelte';
	import type { Expense } from '../../../models/expense';
	import { expensesStore } from './store';

	let cost: { total: number; totalPerPerson: number } = { total: 0, totalPerPerson: 0 };
	function calculateTotal() {
		let cost: { total: number; totalPerPerson: number } = { total: 0, totalPerPerson: 0 };
		expenses.forEach((expense) => {
			cost.total += expense.amount;
		});
		cost.totalPerPerson = cost.total / participants.length || 0;
		return cost;
	}

	let expenses: Expense[] = [];
	export let participants: string[] = [];
	expensesStore.subscribe((value) => {
		if (value) expenses = value;
		cost = calculateTotal();
	});

	function removeExpense(index: number) {
		expensesStore.update((value: Expense[] | null) => {
			console.log(value);
			if (!value) return [];
			value.splice(index, 1);
			return value;
		});
	}
</script>

<ExpenseModal {participants} />
<div class="flex flex-col gap-2">
	<div class="flex flex-col gap-4">
		<h1 class="text-lg font-bold">Ausgaben Übersicht</h1>
		<label for="add-expense-modal" class="btn btn-primary w-full flex gap-2">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				class="w-6 h-6"
			>
				<path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
			</svg>
			Neue Ausgabe hinzufügen
		</label>
	</div>
	<div class="overflow-x-auto w-full">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th />
					<th>Datum</th>
					<th>Käufer</th>
					<th>Betrag</th>
					<th>Typ</th>
					<th>Teilnehmer</th>
					<th />
				</tr>
			</thead>
			<tbody>
				{#each expenses as expense, index}
					<tr>
						<td>{index + 1}</td>
						<td> {expense.date.toLocaleDateString()}</td>
						<td>
							<div class="flex items-center space-x-3">
								<div class="avatar tooltip" data-tip={expense.buyer}>
									<div class="mask mask-squircle w-12 h-12">
										<img
											src={`/profiles/${expense.buyer.toLowerCase()}.png`}
											alt={`${expense.buyer} profile`}
										/>
									</div>
								</div>
								<div>
									<div class="font-bold">{expense.buyer}</div>
								</div>
							</div>
						</td>
						<td> {expense.amount.toFixed(2)}€</td>
						<td> {expense.expenseType} </td>
						<td>
							<div class="flex">
								{#each expense.participants as participant}
									<div class="avatar -ml-2 tooltip" data-tip={participant}>
										<div class="mask mask-squircle w-8 h-8">
											<img
												src={`/profiles/${participant.toLowerCase()}.png`}
												alt={`${participant} profile`}
											/>
										</div>
									</div>
								{/each}
							</div>
						</td>
						<td>
							<button
								class="btn btn-error"
								on:click={() => {
									removeExpense(index);
								}}
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									fill="none"
									viewBox="0 0 24 24"
									stroke-width="1.5"
									stroke="currentColor"
									class="w-6 h-6"
								>
									<path
										stroke-linecap="round"
										stroke-linejoin="round"
										d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
									/>
								</svg>
							</button>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="stats shadow">
		<div class="stat">
			<div class="stat-title">Total</div>
			<div class="stat-value text-2xl">{cost.total.toFixed(2)}€</div>
		</div>

		<div class="stat">
			<div class="stat-title">Total p. P.</div>
			<div class="stat-value text-2xl">{cost.totalPerPerson.toFixed(2)}€</div>
		</div>
	</div>
</div>

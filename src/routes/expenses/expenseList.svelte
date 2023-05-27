<script lang="ts">
	import ExpenseModal from './addExpenseModal.svelte';
	import type { expense } from './expenses';

	export let expenses: expense[];
	export let participants: string[];
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
		<table class="table">
			<!-- head -->
			<thead>
				<tr>
					<th />
					<th>Datum</th>
					<th>Käufer</th>
					<th>Betrag</th>
					<th>Typ</th>
					<th>Teilnehmer</th>
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
											src={`profiles/${expense.buyer.toLowerCase()}.png`}
											alt={`${expense.buyer} profile`}
										/>
									</div>
								</div>
								<div>
									<div class="font-bold">{expense.buyer}</div>
								</div>
							</div>
						</td>
						<td> {expense.amount}€</td>
						<td> {expense.expenseType} </td>
						<td>
							<div class="flex">
								{#each expense.participants as participant}
									<div class="avatar -ml-2 tooltip" data-tip={participant}>
										<div class="mask mask-squircle w-8 h-8">
											<img
												src={`profiles/${participant.toLowerCase()}.png`}
												alt={`${participant} profile`}
											/>
										</div>
									</div>
								{/each}
							</div>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
	<div class="stats shadow">
		<div class="stat">
			<div class="stat-title">Total</div>
			<div class="stat-value text-2xl">654,45€</div>
		</div>

		<div class="stat">
			<div class="stat-title">Total p. P.</div>
			<div class="stat-value text-2xl">234,45€</div>
		</div>
	</div>
</div>

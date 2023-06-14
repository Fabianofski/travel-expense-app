<script lang="ts">
	import type { Expense } from '../../../../models/expense';
	import { expensesStore } from '../store';

	type ExpensesByType = {
		[key: string]: {
			absAmount: number;
			relAmount: number;
		};
	};

	let expenses: Expense[];
	let expensesByType: ExpensesByType = {};

	expensesStore.subscribe((value) => {
		if (value) expenses = value;
		expensesByType = calculateExpensesByType();
	});

	function calculateExpensesByType(): ExpensesByType {
		const data: ExpensesByType = {};
		let sum: number = 0;

		expenses.forEach((expense) => {
			if (expense.expenseType in data) data[expense.expenseType].absAmount += expense.amount;
			else data[expense.expenseType] = { absAmount: expense.amount, relAmount: 0 };
			sum += expense.amount;
		});

		Object.keys(data).forEach((expenseType) => {
			data[expenseType].relAmount = (data[expenseType].absAmount / sum) * 100;
		});
		return data;
	}
</script>

<div class="flex flex-col gap-2">
	<h1 class="text-lg font-bold">Ausgaben pro Typ</h1>

	<div class="overflow-x-auto w-full">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th style="position: relative">Ausgabentyp</th>
					<th>Betrag</th>
					<th>Anteil</th>
				</tr>
			</thead>
			<tbody>
				{#each Object.keys(expensesByType) as typeName}
					<tr>
						<td>{typeName}</td>
						<td>{expensesByType[typeName].absAmount.toFixed(2)}€</td>
						<td>{expensesByType[typeName].relAmount.toFixed(2)}%</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

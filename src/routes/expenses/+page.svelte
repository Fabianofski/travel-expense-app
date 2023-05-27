<script lang="ts">
	import ExpenseList from './expenseList.svelte';
	import type { expense } from './expenses';
	import PersonExpenseList from './personExpenseList.svelte';

	const participants: string[] = ['tobias', 'daniel', 'marlon', 'fabian', 'paul', 'tim'];
	const expenses: expense[] = [
		{
			buyer: 'Fabian',
			expenseType: 'Supermarkt',
			date: new Date(),
			amount: 25.75,
			participants: ['tobias', 'daniel']
		}
	];
</script>

<div class="flex flex-col gap-16 pt-4">
	<ExpenseList {expenses} {participants} />
	<PersonExpenseList {expenses} {participants} />
</div>

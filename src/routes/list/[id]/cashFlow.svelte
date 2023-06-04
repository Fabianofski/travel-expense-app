<script lang="ts">
	import type { Expense } from '../../../models/expense';
	import { expensesStore } from './store';
	import { getExpensesPerPerson, type expensesPerPersonType } from './utils';

	type CashFlow = {
		from: string;
		to: string;
		amount: number;
	};

	let expenses: Expense[];
	export let participants: string[];
	let cashFlow: CashFlow[] = [];

	expensesStore.subscribe((value) => {
		if (value) expenses = value;
		cashFlow = calculateRecommendedCashFlow();
	});

	function calculateRecommendedCashFlow(): CashFlow[] {
		const expensesPerPerson: expensesPerPersonType = getExpensesPerPerson(participants, expenses);

		const positiveDifference: { name: string; difference: number }[] = [];
		const negativeDifference: { name: string; difference: number }[] = [];
		Object.keys(expensesPerPerson).forEach((name) => {
			const difference = expensesPerPerson[name].amount - expensesPerPerson[name].share;
			if (difference < 0) {
				negativeDifference.push({ name: name, difference: Math.abs(difference) });
			} else if (difference > 0) {
				positiveDifference.push({ name: name, difference: difference });
			}
		});

		let flow: CashFlow[] = [];
		negativeDifference.forEach((negativePerson) => {
			positiveDifference.forEach((positivePerson) => {
				const amount = Math.min(positivePerson.difference, negativePerson.difference);
				positivePerson.difference -= amount;
				negativePerson.difference -= amount;

				if (amount <= 0) return;

				flow.push({ from: negativePerson.name, to: positivePerson.name, amount: amount });
			});
		});

		return flow;
	}
</script>

<div>
	{#each cashFlow as flow}
		<p>From: {flow.from} To: {flow.to} Amount: {flow.amount.toFixed(2)}</p>
	{/each}
</div>

<script lang="ts">
	import type { Expense } from '../../../models/expense';
	import { expensesStore } from './store';

	type expensesPerPersonType = {
		[key: string]: {
			times: number;
			amount: number;
			share: number;
		};
	};

	function getExpensesPerPerson(): expensesPerPersonType {
		const data: expensesPerPersonType = {};

		participants.forEach((participant) => {
			data[participant.toLowerCase()] = {
				amount: 0,
				times: 0,
				share: 0
			};
		});

		expenses.forEach((expense) => {
			data[expense.buyer.toLowerCase()].amount += expense.amount;
			data[expense.buyer.toLowerCase()].times++;
			expense.participants.forEach((participant) => {
				console.log(participant.toLowerCase());
				data[participant.toLowerCase()].share += expense.amount / expense.participants.length;
			});
		});

		return Object.fromEntries(Object.entries(data).sort(([, a], [, b]) => b.amount - a.amount));
	}

	let expenses: Expense[] = [];
	export let participants: string[] = [];

	let expensesPerPerson: expensesPerPersonType = getExpensesPerPerson();
	expensesStore.subscribe((value) => {
		if (value) expenses = value;
		expensesPerPerson = getExpensesPerPerson();
	});

	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
</script>

<div class="flex flex-col gap-2">
	<h1 class="text-lg font-bold">Ausgaben pro Person</h1>

	<div class="overflow-x-auto w-full">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th style="position: relative">Name</th>
					<th>Anzahl</th>
					<th>Betrag</th>
					<th>Anteil</th>
					<th>Differenz</th>
				</tr>
			</thead>
			<tbody>
				{#each Object.keys(expensesPerPerson) as name}
					<tr>
						<td>
							<div class="flex items-center space-x-3">
								<div class="avatar">
									<div class="mask mask-squircle w-12 h-12">
										<img src={`/profiles/${name}.png`} alt={`${name} profile`} />
									</div>
								</div>
								<div>
									<div class="font-bold">{capitalizeFirstLetter(name)}</div>
								</div>
							</div>
						</td>
						<td> {expensesPerPerson[name].times} mal</td>
						<td> {expensesPerPerson[name].amount.toFixed(2)}€ </td>
						<td> {expensesPerPerson[name].share.toFixed(2)}€ </td>
						<td> {(expensesPerPerson[name].amount - expensesPerPerson[name].share).toFixed(2)}€</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

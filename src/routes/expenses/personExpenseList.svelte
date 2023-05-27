<script lang="ts">
	import type { expense } from './expenses';

	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}

	type expensesPerPersonType = {
		[key: string]: {
			times: number;
			amount: number;
			share: number;
		};
	};

	export let expenses: expense[];
	export let participants: string[];

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
				data[participant].share += expense.amount / expense.participants.length;
			});
		});

		return Object.fromEntries(Object.entries(data).sort(([, a], [, b]) => b.amount - a.amount));
	}
	const expensesPerPerson = getExpensesPerPerson();
</script>

<div class="flex flex-col gap-2">
	<h1 class="text-lg font-bold">Ausgaben pro Person</h1>

	<div class="overflow-x-auto w-full">
		<table class="table w-full">
			<!-- head -->
			<thead>
				<tr>
					<th />
					<th>Name</th>
					<th>Anzahl</th>
					<th>Betrag</th>
					<th>Anteil</th>
					<th>Differenz</th>
				</tr>
			</thead>
			<tbody>
				{#each Object.keys(expensesPerPerson) as name, index}
					<tr>
						<td>{index + 1}</td>
						<td>
							<div class="flex items-center space-x-3">
								<div class="avatar">
									<div class="mask mask-squircle w-12 h-12">
										<img src={`./profiles/${name}.png`} alt={`${name} profile`} />
									</div>
								</div>
								<div>
									<div class="font-bold">{capitalizeFirstLetter(name)}</div>
								</div>
							</div>
						</td>
						<td> {expensesPerPerson[name].times} mal</td>
						<td> {expensesPerPerson[name].amount}€ </td>
						<td> {expensesPerPerson[name].share.toFixed(2)}€ </td>
						<td> {(expensesPerPerson[name].amount - expensesPerPerson[name].share).toFixed(2)}€</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<script lang="ts">
	import type { Expense } from '../../../models/expense';
	import Profile from './profile.svelte';
	import { expensesStore } from './store';
	import {
		getExpensesPerPerson,
		type expensesPerPersonType,
		capitalizeFirstLetter,
		getProfilePicture
	} from './utils';

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

<div class="flex flex-col gap-2">
	<h1 class="text-lg font-bold">Vorgeschlagener Ausgleich:</h1>
	<div>
		<div class="overflow-x-auto w-full">
			<table class="table w-full">
				<!-- head -->
				<thead>
					<tr>
						<th style="position: relative">Von</th>
						<th>Zu</th>
						<th>Betrag</th>
					</tr>
				</thead>
				<tbody>
					{#each cashFlow as flow}
						<tr>
							<td>
								<div class="flex items-center space-x-3">
									<div class="avatar">
										<div class="mask mask-squircle w-12 h-12">
											<Profile url={getProfilePicture(flow.from)} name={flow.from} />
										</div>
									</div>
									<div>
										<div class="font-bold">{capitalizeFirstLetter(flow.from)}</div>
									</div>
								</div>
							</td>
							<td>
								<div class="flex items-center space-x-3">
									<div class="avatar">
										<div class="mask mask-squircle w-12 h-12">
											<Profile url={getProfilePicture(flow.to)} name={flow.to} />
										</div>
									</div>
									<div>
										<div class="font-bold">{capitalizeFirstLetter(flow.to)}</div>
									</div>
								</div>
							</td>
							<td>{flow.amount.toFixed(2)}€</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	</div>
</div>

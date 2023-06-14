<script lang="ts">
	import type { Expense } from '../../../../models/expense';
	import Profile from '../components/profile.svelte';
	import { expensesStore } from '../store';
	import {
		getExpensesPerPerson,
		type expensesPerPersonType,
		capitalizeFirstLetter,
		getProfilePicture
	} from '../utils';

	let expenses: Expense[] = [];
	export let participants: string[] = [];

	let expensesPerPerson: expensesPerPersonType = getExpensesPerPerson(participants, expenses);
	expensesStore.subscribe((value) => {
		if (value) expenses = value;
		expensesPerPerson = getExpensesPerPerson(participants, expenses);
	});
</script>

<div class="flex flex-col gap-2">
	<h1 class="text-lg font-bold">Ausgaben pro Person</h1>

	<div class="overflow-x-auto w-full">
		<table class="table w-full bg-base-100">
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
										<Profile url={getProfilePicture(name)} {name} />
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

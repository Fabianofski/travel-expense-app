<script lang="ts">
	import { error } from '@sveltejs/kit';
	import ExpenseList from './expenseList.svelte';
	import PersonExpenseList from './personExpenseList.svelte';
	import type { ExpenseListModel } from '../../../models/expenseListModel';
	import { expensesStore, profilesStore, titleStore } from './store';
	import type { Expense } from '../../../models/expense';
	import { onMount } from 'svelte';
	import CashFlow from './cashFlow.svelte';
	import TypeExpenseList from './typeExpenseList.svelte';

	export let data;
	let loading = false;
	let unlocked = false;
	let loginError = '';
	let password: string = '';
	let participants: string[];

	onMount(async () => {
		if (data.token !== undefined) unlockList();
	});

	async function unlockList() {
		loginError = '';
		loading = true;

		const response = await fetch(
			`/api/expenseList/expenses?` +
				new URLSearchParams({
					expenseListId: data.id,
					password: password
				})
		);

		if (response.status === 403) {
			loading = false;
			loginError = 'Permission denied.';
			return;
		} else if (response.status === 404) throw error(404, 'List not found!');
		else if (response.status !== 200) throw Error('Internal Error');

		const list: ExpenseListModel = await response.json();
		if (!list.expenses) list.expenses = {};

		participants = list.participants;
		profilesStore.set(list.profiles);
		const expenses: Expense[] = [];
		Object.keys(list.expenses).forEach((id: string) => {
			const expense: Expense = list.expenses[id];
			expense.id = id;
			expenses.push(expense);
		});
		expensesStore.set(expenses);
		titleStore.set('Liste: ' + list.listName);
		loading = false;
		unlocked = true;
	}
</script>

<div class="flex flex-col gap-16 pt-4">
	{#if unlocked}
		<ExpenseList {participants} id={data.id} />
		<TypeExpenseList />
		<PersonExpenseList {participants} />
		<CashFlow {participants} />
	{:else}
		<div class="flex flex-col gap-2">
			<form class="w-full flex flex-col items-center">
				<div class="form-control w-full max-w-s">
					<label class="label" for="">
						<span class="label-text">Passwort</span>
					</label>
					<input
						bind:value={password}
						type="password"
						placeholder="Passwort..."
						class="input input-bordered w-full max-w-s"
						required
					/>
				</div>
			</form>
			<button class="btn btn-primary" on:click={unlockList} disabled={loading}>
				{#if loading}
					<img class="h-2" src="/loading.svg" alt="loading" />
				{:else}
					Entsperren
				{/if}
			</button>
			<p>{loginError}</p>
		</div>
	{/if}
</div>

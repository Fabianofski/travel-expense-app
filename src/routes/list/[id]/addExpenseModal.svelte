<script lang="ts">
	import { browser } from '$app/environment';
	import type { Expense } from '../../../models/expense';
	import { expensesStore } from './store';

	export let id: string;
	let password: string = '';

	export let participants: string[] = [];

	let buyer: string = '';
	let expenseType: string = '';
	let date: string = new Date().toISOString().substring(0, 10);
	let amount: number | null = null;
	let modalParticipants: { [key: string]: boolean } = {};
	participants.forEach((participant) => {
		modalParticipants[participant] = true;
	});

	let loading = false;

	if (browser) password = localStorage.getItem(`${id}-password`) || '';

	function getParticipantsArray(): string[] {
		const expenseParticipants: string[] = [];
		Object.keys(modalParticipants).forEach((participant) => {
			if (modalParticipants[participant]) expenseParticipants.push(participant);
		});
		return expenseParticipants;
	}

	function handleSubmit() {
		loading = true;

		let expense: Expense = {
			buyer: buyer,
			expenseType: expenseType,
			date: date,
			amount: amount || 0,
			participants: getParticipantsArray(),
			id: ''
		};

		fetch(
			`/api/expenseList?` +
				new URLSearchParams({
					expenseListId: id,
					password: password
				}),
			{
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(expense)
			}
		)
			.then(async (res) => {
				if (res.status !== 200) return;

				const expenseKey = await res.json();
				expensesStore.update((value: Expense[] | null) => {
					if (!value) return null;
					expense.id = expenseKey;
					value.push(expense);
					return value;
				});

				buyer = '';
				expenseType = '';
				date = new Date().toISOString().substring(0, 10);
				amount = null;
				participants.forEach((participant) => {
					modalParticipants[participant] = true;
				});
				document.getElementById('add-expense-modal')?.click();
				loading = false;
			})
			.catch((err) => {
				console.log(err.status);
				loading = false;
			});
	}

	function capitalizeFirstLetter(string: string) {
		return string.charAt(0).toUpperCase() + string.slice(1);
	}
</script>

<input type="checkbox" id="add-expense-modal" class="modal-toggle" />
<div class="modal modal-center sm:modal-middle">
	<div class="modal-box flex flex-col gap-2">
		<div class="flex justify-between items-center">
			<h3 class="text-lg font-bold">Neue Ausgabe hinzufügen...</h3>
			<div class="modal-action mt-0">
				<label for="add-expense-modal" class="cursor-pointer">
					<svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width="1.5"
						stroke="currentColor"
						class="w-6 h-6"
					>
						<path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
					</svg>
				</label>
			</div>
		</div>
		<form
			class="w-full flex flex-col items-center"
			method="POST"
			on:submit|preventDefault={handleSubmit}
		>
			<div class="form-control w-full max-w-s">
				<label class="label" for="date">
					<span class="label-text">Datum</span>
				</label>
				<input
					type="date"
					name="date"
					class="input input-bordered w-full max-w-s"
					bind:value={date}
					required
				/>
			</div>
			<div class="form-control w-full max-w-s">
				<label class="label" for="buyer">
					<span class="label-text">Käufer</span>
				</label>
				<select class="select select-bordered" required name="buyer" bind:value={buyer}>
					{#each participants as participant}
						<option>{capitalizeFirstLetter(participant)}</option>
					{/each}
				</select>
			</div>
			<div class="form-control w-full max-w-s">
				<label class="label" for="expenseType">
					<span class="label-text">Ausgabentyp</span>
				</label>
				<input
					name="expenseType"
					type="text"
					placeholder="Supermarkt, Tanken..."
					class="input input-bordered w-full max-w-s"
					bind:value={expenseType}
					required
				/>
			</div>
			<div class="form-control w-full max-w-s">
				<label class="label" for="">
					<span class="label-text">Betrag</span>
				</label>
				<input
					name="amount"
					type="number"
					step="0.01"
					placeholder="0,00€"
					class="input input-bordered w-full max-w-s"
					bind:value={amount}
					required
				/>
			</div>
			<div class="form-control w-full max-w-s">
				<label class="label" for="">
					<span class="label-text">Teilnehmer</span>
				</label>
				<div class="grid grid-cols-3 gap-x-8">
					{#each participants as participant}
						<div class="form-control">
							<label class="label cursor-pointer">
								<input
									name={`select-${participant}`}
									type="checkbox"
									bind:checked={modalParticipants[participant]}
									class="checkbox"
								/>
								<span class="label-text">{capitalizeFirstLetter(participant)}</span>
							</label>
						</div>
					{/each}
				</div>
			</div>
			<div class="modal-action w-full">
				<button type="submit" disabled={loading} class="btn btn-primary w-full">
					{#if loading}
						<img class="h-2" src="/loading.svg" alt="loading" />
					{:else}
						Hinzufügen
					{/if}
				</button>
			</div>
		</form>
	</div>
</div>

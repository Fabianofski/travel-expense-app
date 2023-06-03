<script lang="ts">
	let loading = false;
	let listName: string;
	let creator: string;
	let password: string;
	let participants: string[] = [''];

	function removeParticipant(index: number) {
		participants.splice(index, 1);
		participants = participants;
	}

	function addNewParticipant() {
		participants.push('');
		participants = participants;
	}

	function handleSubmit() {
		loading = true;

		let list = {
			listName: listName,
			creator: creator,
			password: password,
			participants: participants
		};

		fetch(`/api/expenseList`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(list)
		})
			.then(async (res) => {
				if (res.status !== 200) return;

				document.getElementById('add-list-modal')?.click();
				loading = false;
			})
			.catch((err) => {
				loading = false;
			});
	}
</script>

<input type="checkbox" id="add-list-modal" class="modal-toggle" />
<div class="modal modal-center sm:modal-middle">
	<div class="modal-box flex flex-col gap-2">
		<div class="flex justify-between items-center">
			<h3 class="text-lg font-bold">Neue Liste hinzufügen...</h3>
			<div class="modal-action mt-0">
				<label for="add-list-modal" class="cursor-pointer">
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
				<label class="label" for="listName">
					<span class="label-text">Listenname</span>
				</label>
				<input
					name="listName"
					type="text"
					placeholder="Name..."
					class="input input-bordered w-full max-w-s"
					bind:value={listName}
					required
				/>
			</div>
			<div class="form-control w-full max-w-s">
				<label class="label" for="creator">
					<span class="label-text">Ersteller</span>
				</label>
				<input
					name="creator"
					type="text"
					placeholder="Name..."
					class="input input-bordered w-full max-w-s"
					bind:value={creator}
					required
				/>
			</div>
			<div class="form-control w-full max-w-s">
				<label class="label" for="password">
					<span class="label-text">Passwort</span>
				</label>
				<input
					name="password"
					type="password"
					placeholder="Passwort..."
					class="input input-bordered w-full max-w-s"
					bind:value={password}
					required
				/>
			</div>
			<div class="w-full flex flex-col gap-2 form-control max-w-s">
				<label class="label" for="participant">
					<span class="label-text">Teilnehmer</span>
				</label>
				{#each participants.slice(0, -1) as participant, index}
					<div class="flex justify-between w-full">
						<button
							class="btn"
							type="button"
							on:click={() => {
								removeParticipant(index);
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
								/>
							</svg>
						</button>
						<input
							name="participant"
							type="test"
							placeholder="Name..."
							class="input input-bordered w-full max-w-s"
							bind:value={participants[index]}
							required
						/>
					</div>
				{/each}
				<div class="flex justify-between w-full">
					{#if participants.length > 1}
						<button
							class="btn"
							type="button"
							on:click={() => {
								removeParticipant(participants.length - 1);
							}}
						>
							<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								stroke-width="1.5"
								stroke="currentColor"
								class="w-6 h-6"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
								/>
							</svg>
						</button>
					{/if}
					<input
						name="participant"
						type="test"
						placeholder="Name..."
						class="input input-bordered w-full max-w-s"
						bind:value={participants[participants.length - 1]}
						required
					/>
					<button
						class="btn btn-primary"
						type="button"
						on:click={() => {
							addNewParticipant();
						}}
					>
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
					</button>
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

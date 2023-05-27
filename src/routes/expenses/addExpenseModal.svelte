<script lang="ts">
	export let participants: string[];

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
		<form class="w-full flex flex-col items-center">
			<div class="form-control w-full max-w-s">
				<label class="label" for="">
					<span class="label-text">Datum</span>
				</label>
				<input
					type="date"
					value={new Date().toISOString().substring(0, 10)}
					class="input input-bordered w-full max-w-s"
					required
				/>
			</div>
			<div class="form-control w-full max-w-s">
				<label class="label" for="">
					<span class="label-text">Käufer</span>
				</label>
				<select class="select select-bordered" required>
					<option disabled selected hidden>Käufer...</option>
					{#each participants as participant}
						<option>{capitalizeFirstLetter(participant)}</option>
					{/each}
				</select>
			</div>
			<div class="form-control w-full max-w-s">
				<label class="label" for="">
					<span class="label-text">Ausgabentyp</span>
				</label>
				<input
					type="text"
					placeholder="Supermarkt, Tanken..."
					class="input input-bordered w-full max-w-s"
					required
				/>
			</div>
			<div class="form-control w-full max-w-s">
				<label class="label" for="">
					<span class="label-text">Betrag</span>
				</label>
				<input
					type="text"
					placeholder="0,00€"
					class="input input-bordered w-full max-w-s"
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
								<input type="checkbox" checked class="checkbox" />
								<span class="label-text">{capitalizeFirstLetter(participant)}</span>
							</label>
						</div>
					{/each}
				</div>
			</div>
		</form>
		<div class="modal-action">
			<label for="add-expense-modal" class="btn btn-primary w-full">Hinzufügen</label>
		</div>
	</div>
</div>

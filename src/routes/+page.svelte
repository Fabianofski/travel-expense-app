<script lang="ts">
	import AddListModal from './addListModal.svelte';

	export let data;
</script>

<AddListModal />
<div class="flex flex-col gap-4 pt-4">
	<label for="add-list-modal" class="btn btn-primary w-full flex gap-2">
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
		Neue Liste hinzufügen
	</label>
	<div class="flex flex-col gap-2">
		{#each data.lists as list}
			<div class="card w-full bg-base-100 shadow-xl static">
				<div class="flex p-2 w-full justify-between">
					<h2 class="card-title">{list.name}</h2>
					<div class="card-actions justify-end">
						<a href={`/list/${list.id}`} class="btn btn-primary">Anzeigen</a>
					</div>
				</div>
			</div>
		{/each}
	</div>
</div>

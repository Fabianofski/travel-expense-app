<script lang="ts">
	export let data;
</script>

{#each data.lists as list}
	<p>{list.id} {list.name}</p>
{/each}

<script lang="ts">
	import { titleStore } from './list/[id]/store';
	import { page } from '$app/stores';
	import ListHamburger from './listHamburger.svelte';

	let title = 'Travel Expense App';
	titleStore.subscribe((value) => {
		title = value;
	});
</script>

<div class="navbar flex justify-center bg-base-100 fixed z-40 backdrop-blur bg-opcaity-10">
	<div class="max-w-3xl w-full">
		<div class="flex-1">
			<a href="/" class="btn btn-ghost normal-case text-xl">{title}</a>
		</div>
		{#if $page.url.pathname.includes('/list/')}
			<ListHamburger />
		{/if}
	</div>
</div>

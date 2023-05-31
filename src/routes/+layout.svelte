<script lang="ts">
	import '../app.css';
	import NavBar from './navBar.svelte';
</script>

<div class="bg-black min-h-screen flex flex-col items-center">
	<NavBar />
	<div class="px-2 pt-16 pb-4 w-full h-full max-w-3xl">
		<slot />
	</div>
</div>

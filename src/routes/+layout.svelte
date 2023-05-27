<script lang="ts">
	import '../app.css';
</script>

<div class="bg-black min-h-screen">
	<nav
		class="bg-violet-600 p-4 backdrop-blur bg-opacity-10 fixed w-full z-10 border-b border-violet-600"
	>
		<h1
			class="text-lg font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-purple-400 via-rose-300 to-fuchsia-600"
		>
			TRAVEL EXPENSE APP - POLEN
		</h1>
	</nav>
	<div class="px-2 pt-16 pb-4 w-full h-full">
		<slot />
	</div>
</div>

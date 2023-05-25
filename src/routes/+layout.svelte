<script lang="ts">
	import '../app.css';
</script>

<div class="bg-black min-h-screen">
	<nav
		class="bg-violet-600 p-4 backdrop-blur bg-opacity-10 fixed w-full z-10 border-b border-violet-600"
	>
		<ul class="flex gap-2 text-lg text-white">
			<li><a href="/home">Home</a></li>
			<li><a href="/about">About</a></li>
			<li><a href="/expenses">Expenses</a></li>
		</ul>
	</nav>
	<div class="pt-16 w-full h-full">
		<slot />
	</div>
</div>

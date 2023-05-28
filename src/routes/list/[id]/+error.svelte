<script>
	import { page } from '$app/stores';
</script>

<div class="flex flex-col items-center w-full">
	<h1 class="text-2xl font-bold">{$page.status}</h1>
	<p>{$page.error?.message}</p>
</div>

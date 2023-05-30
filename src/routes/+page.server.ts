export async function load({ fetch }) {
	const response = await fetch(`/api/expenseList`);
	const lists: { id: string; name: string }[] = await response.json();

	return { lists };
}

import { json } from '@sveltejs/kit';
import { fetchList } from './expenseList';

export async function GET({ url }) {
	const id = url.searchParams.get('expenseListId') || '';
	const password = url.searchParams.get('password') || '';

	const response = await fetchList(id, password);
	return json(response);
}

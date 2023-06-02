import { json } from '@sveltejs/kit';
import { database } from '../../../../lib/client/firebase';
import { fetchList } from './expenseList';

export async function GET({ url, cookies }) {
	const id = url.searchParams.get('expenseListId') || '';
	const password = url.searchParams.get('password') || '';

	const response = await fetchList(id, password, cookies);
	return json(response);
}

export async function PUT({ url, request, cookies }) {
	const id = url.searchParams.get('expenseListId') || '';
	const password = url.searchParams.get('password') || '';

	const response = await fetchList(id, password, cookies);
	if (response instanceof Response) return response;

	let ref = database.ref(`lists/${id}/expenses`);
	const expense = await ref.push(await request.json());
	return json(expense.key);
}

export async function DELETE({ url, cookies }) {
	const id = url.searchParams.get('expenseListId') || '';
	const expenseId = url.searchParams.get('expenseId') || '';
	const password = url.searchParams.get('password') || '';

	const response = await fetchList(id, password, cookies);
	if (response instanceof Response) return response;

	let ref = database.ref(`lists/${id}/expenses/${expenseId}`);
	await ref.remove();
	return new Response(null, { status: 200 });
}

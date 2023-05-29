import { json } from '@sveltejs/kit';
import { database } from '../../../lib/client/firebase';
import type { ExpenseListModel } from '../../../models/expenseListModel';

async function fetchList(id: string, password: string): Promise<Response | ExpenseListModel> {
	let ref = database.ref('expenses/' + id);
	const snapshot = await ref.get();

	const data: ExpenseListModel = snapshot.val();

	if (!data) return new Response(null, { status: 404 });
	else if (data.password !== password) return new Response(null, { status: 403 });

	return data;
}

export async function GET({ url }) {
	const id = url.searchParams.get('expenseListId') || '';
	const password = url.searchParams.get('password') || '';

	const response = await fetchList(id, password);
	return json(response);
}

export async function PUT({ url, request }) {
	const id = url.searchParams.get('expenseListId') || '';
	const password = url.searchParams.get('password') || '';

	const response = await fetchList(id, password);
	if (response instanceof Response) return response;

	let ref = database.ref(`expenses/${id}/expenses`);
	const expense = await ref.push(await request.json());
	return json(expense.key);
}

export async function DELETE({ url }) {
	const id = url.searchParams.get('expenseListId') || '';
	const expenseId = url.searchParams.get('expenseId') || '';
	const password = url.searchParams.get('password') || '';

	const response = await fetchList(id, password);
	if (response instanceof Response) return response;

	let ref = database.ref(`expenses/${id}/expenses/${expenseId}`);
	await ref.remove();
	return new Response(null, { status: 200 });
}

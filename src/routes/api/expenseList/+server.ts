import { database } from '$lib/client/firebase';
import { json } from '@sveltejs/kit';
import type { ExpenseListModel } from '../../../models/expenseListModel';

export async function GET() {
	let ref = database.ref('lists/');
	const snapshot = await ref.get();

	const data = snapshot.val();
	if (!data) return json([]);

	const lists: { id: string; name: string }[] = [];
	Object.keys(data).forEach((id: string) => {
		const list: ExpenseListModel = data[id];
		lists.push({ id: id, name: list.listName });
	});

	return json(lists);
}

export async function POST({ request }) {
	let ref = database.ref(`lists/`);
	const list = await ref.push(await request.json());
	return json(list.key);
}

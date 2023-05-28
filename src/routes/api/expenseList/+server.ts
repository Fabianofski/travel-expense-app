import { json } from '@sveltejs/kit';
import { database } from '../../../lib/client/firebase';
import type { ExpenseListModel } from '../../../models/expenseListModel';

export async function GET({ url }) {
	console.log(url);
	const id = url.searchParams.get('expenseListId');
	const password = url.searchParams.get('password');
	const ref = database.ref('expenses/' + id);
	return ref
		.get()
		.then((snapshot) => {
			const data: ExpenseListModel = snapshot.val();
			if (!data) return new Response(null, { status: 404, statusText: 'List not found!' });
			else if (data.password === password) return json(snapshot.val());
			else return new Response(null, { status: 403, statusText: 'Permission denied!' });
		})
		.catch(() => {
			return new Response(null, { status: 500, statusText: 'Internal Server Error!' });
		});
}

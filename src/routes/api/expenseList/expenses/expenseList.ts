import { database } from '$lib/client/firebase';
import type { ExpenseListModel } from '../../../../models/expenseListModel';

export async function fetchList(
	id: string,
	password: string
): Promise<Response | ExpenseListModel> {
	let ref = database.ref('expenses/' + id);
	const snapshot = await ref.get();

	const data: ExpenseListModel = snapshot.val();

	if (!data) return new Response(null, { status: 404 });
	else if (data.password !== password) return new Response(null, { status: 403 });

	return data;
}

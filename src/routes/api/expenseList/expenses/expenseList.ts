import { database } from '$lib/client/firebase';
import type { ExpenseListModel } from '../../../../models/expenseListModel';
import bcrypt from 'bcrypt';

export async function fetchList(
	id: string,
	password: string
): Promise<Response | ExpenseListModel> {
	let ref = database.ref('lists/' + id);
	const snapshot = await ref.get();

	const data: ExpenseListModel = snapshot.val();

	if (!data) return new Response(null, { status: 404 });
	else if (await bcrypt.compare(data.password, password))
		return new Response(null, { status: 403 });

	return data;
}

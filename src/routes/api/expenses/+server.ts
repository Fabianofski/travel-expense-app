import { json } from '@sveltejs/kit';
import { database } from '../../../lib/client/firebase';

export async function GET({ url }) {
	console.log(url);
	const id = url.searchParams.get('expenseListId');
	const ref = database.ref('expenses/' + id);
	return ref
		.get()
		.then((snapshot) => {
			return json(snapshot.val());
		})
		.catch(() => {
			return json('fail');
		});
}

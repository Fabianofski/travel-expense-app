import { database } from '$lib/client/firebase';
import type { Cookies } from '@sveltejs/kit';
import type { ExpenseListModel } from '../../../../models/expenseListModel';
import bcrypt from 'bcrypt';

export async function fetchList(
	id: string,
	password: string,
	cookies: Cookies
): Promise<Response | ExpenseListModel> {
	const token = cookies.get(`${id}-token`) || '';

	let ref = database.ref('lists/' + id);
	const snapshot = await ref.get();

	const data: ExpenseListModel = snapshot.val();

	if (!data) return new Response(null, { status: 404 });
	else if (token !== '' && (await !checkIfTokenValid(id, token)))
		return new Response(null, { status: 403 });
	else if (await bcrypt.compare(data.password, password))
		return new Response(null, { status: 403 });
	else {
		if (token === '') await addNewToken(id, cookies);
		return data;
	}
}

async function addNewToken(id: string, cookies: Cookies) {
	const tokenId = '12345';
	const tokenHash = await bcrypt.hash(tokenId, 10);
	let ref = database.ref('tokens/' + id);

	await ref.push(tokenHash);
	cookies.set(`${id}-token`, tokenId, { path: '/' });
}

async function checkIfTokenValid(id: string, token: string): Promise<boolean> {
	let ref = database.ref('tokens/' + id);
	const snapshot = await ref.get();
	const data: { [key: string]: string } = snapshot.val();

	if (!data) return false;

	for (let id in data) {
		const storedToken = data[id];
		if (await bcrypt.compare(token, storedToken)) return true;
	}
	console.log('invalid');
	return false;
}

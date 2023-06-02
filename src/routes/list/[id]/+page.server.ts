export function load({ params, cookies }) {
	const id = params.id;
	const token = cookies.get(`${id}-token`);
	return { id, token };
}

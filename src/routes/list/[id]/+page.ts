import { error } from '@sveltejs/kit';
import type { ExpenseListModel } from '../../../models/expenseListModel';

export async function load({ fetch, params }) {
	const response = await fetch(`/api/expenseList?expenseListId=${params.id}`);

	if (response.status === 400) throw error(400, 'Permission denied!');
	else if (response.status !== 200) throw Error('Internal Error');

	const expenseListData: ExpenseListModel = await response.json();
	if (!expenseListData) throw error(404, "Couldn't find Expense List!");
	if (!expenseListData.expenses) expenseListData.expenses = [];

	return { expenseListData };
}

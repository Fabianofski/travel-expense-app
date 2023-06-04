import type { Expense } from '../../../models/expense';

export type expensesPerPersonType = {
	[key: string]: {
		times: number;
		amount: number;
		share: number;
	};
};

export function getExpensesPerPerson(
	participants: string[],
	expenses: Expense[]
): expensesPerPersonType {
	const data: expensesPerPersonType = {};

	participants.forEach((participant) => {
		data[participant.toLowerCase()] = {
			amount: 0,
			times: 0,
			share: 0
		};
	});

	expenses.forEach((expense) => {
		data[expense.buyer.toLowerCase()].amount += expense.amount;
		data[expense.buyer.toLowerCase()].times++;
		expense.participants.forEach((participant) => {
			data[participant.toLowerCase()].share += expense.amount / expense.participants.length;
		});
	});

	return Object.fromEntries(Object.entries(data).sort(([, a], [, b]) => b.amount - a.amount));
}

export function capitalizeFirstLetter(string: string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

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

export function profileError(event: Event, name: string) {
	if (event.target) {
		const image = event.target as HTMLImageElement;
		image.src = '/profiles/default.svg';
	}
}

function wordToHexColor(word: string): string {
	let red = 0;
	let green = 0;
	let blue = 0;

	for (let i = 0; i < word.length; i++) {
		const charCode = word.charCodeAt(i);

		switch (i % 3) {
			case 0:
				red += charCode;
				break;
			case 1:
				green += charCode;
				break;
			case 2:
				blue += charCode;
				break;
		}
	}

	red = red % 256;
	green = green % 256;
	blue = blue % 256;

	const hexRed = red.toString(16).padStart(2, '0');
	const hexGreen = green.toString(16).padStart(2, '0');
	const hexBlue = blue.toString(16).padStart(2, '0');

	return `#${hexRed}${hexGreen}${hexBlue}`;
}

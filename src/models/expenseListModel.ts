import type { Expense } from './expense';

export interface ExpenseListModel {
	creator: string;
	participants: string[];
	expenses: { [key: string]: Expense };
	listName: string;
	password: string;
}

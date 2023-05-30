import type { Expense } from './expense';

export interface ExpenseListModel {
	participants: string[];
	expenses: { [key: string]: Expense };
	listName: string;
	password: string;
}

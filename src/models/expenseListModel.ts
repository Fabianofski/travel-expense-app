import type { Expense } from './expense';

export interface ExpenseListModel {
	creator: string;
	participants: string[];
	profiles: { [key: string]: string };
	expenses: { [key: string]: Expense };
	listName: string;
	password: string;
}

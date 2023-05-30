import type { Expense } from './expense';

export interface ExpenseListModel {
	participants: string[];
	expenses: { [key: string]: Expense };
	name: string;
	password: string;
}

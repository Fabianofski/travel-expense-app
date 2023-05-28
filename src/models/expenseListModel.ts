import type { Expense } from './expense';

export interface ExpenseListModel {
	participants: string[];
	expenses: Expense[];
	password: string;
}

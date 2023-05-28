import { writable } from 'svelte/store';
import type { Expense } from '../../../models/expense';

export const expensesStore = writable<Expense[] | null>(null);

import { writable } from 'svelte/store';
import type { Expense } from '../../../models/expense';

export const expensesStore = writable<Expense[] | null>(null);
export const titleStore = writable<string>('Travel Expense App');
export const profilesStore = writable<{ [key: string]: string }>({});

<script lang="ts">
	import ExpenseList from './expenseList.svelte';
	import PersonExpenseList from './personExpenseList.svelte';
	import type { ExpenseListModel } from '../../../models/expenseListModel';

	export let data;
	const expenseListData: ExpenseListModel = data.expenseListData;
</script>

<div class="flex flex-col gap-16 pt-4">
	<ExpenseList expenses={expenseListData.expenses} participants={expenseListData.participants} />
	<PersonExpenseList
		expenses={expenseListData.expenses}
		participants={expenseListData.participants}
	/>
</div>

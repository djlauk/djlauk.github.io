<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = () => {
		return {
			stuff: {
				pageTitle: 'Pivot Table for SQL',
			},
		}
	}
</script>

<script lang="ts">
	import { generatePivotTableSql } from '$lib/sqlpivot'
	import type { PivotTableSpec, SqlDialect } from '$lib/sqlpivot'
	import JoinTable from '$lib/JoinTable.svelte'

	let errorMessage = ''
	let generated = ''
	let sqlDialect: SqlDialect = 'mysql'

	let _tableId = 0
	let tables: (PivotTableSpec & { id: number })[] = [
		{
			id: _tableId++,
			table: 'Author',
			columns: ['name', 'year_of_birth'],
			joinOn: { column: '', refTable: '', refColumn: '' },
		},
	]

	function addTable() {
		tables = [
			...tables,
			{
				id: _tableId++,
				table: '',
				columns: [],
				joinOn: { column: '', refTable: '', refColumn: '' },
			},
		]
	}
	addTable() // add the base table

	function deleteTable(id: number) {
		const index = tables.findIndex((x) => x.id === id)
		if (index < 0) return
		tables = [...tables.slice(0, index), ...tables.slice(index + 1)]
	}

	function generateClicked() {
		generated = generatePivotTableSql(tables, sqlDialect)
	}
</script>

<div class="shadow-lg p-4">
	<h2 class="my-2 text-sky-600 text-4xl">SQL Dialect</h2>
	<select bind:value={sqlDialect}>
		<option value="mysql">MySQL / MaiaDB</option>
		<option value="oracle">Oracle</option>
		<option value="tsql">TSQL (MS SQL Server)</option>
	</select>
</div>

<div class="shadow-lg p-4">
	<h2 class="my-2 text-sky-600 text-4xl">Tables</h2>
	<div
		class="my-4 p-2 border-red-800 border-2 rounded-lg text-red-800"
		class:hidden={errorMessage.length === 0}
	>
		{errorMessage}
	</div>

	<div class="flex flex-col space-y-2">
		{#each tables as t, idx (t.id)}
			<JoinTable
				bind:table={t.table}
				bind:columns={t.columns}
				bind:joinColumn={t.joinOn.column}
				bind:refTable={t.joinOn.refTable}
				bind:refColumn={t.joinOn.refColumn}
				hideJoin={idx === 0}
				hideDelete={idx === 0}
				on:delete={() => deleteTable(t.id)}
			/>
		{/each}
	</div>

	<div class="flex flex-row justify-between mt-4">
		<button class="py-2 px-4 uppercase rounded-lg bg-sky-600 text-white" on:click={addTable}
			>add table</button
		>
		<button class="py-2 px-4 uppercase rounded-lg bg-sky-600 text-white" on:click={generateClicked}
			>generate</button
		>
	</div>
</div>

<div class="shadow-lg p-4">
	<h2 class="my-2 text-sky-600 text-4xl">Generated SQL</h2>
	<pre class="w-full h-60 font-mono text-gray-800 bg-gray-50 p-2 overflow-scroll">{generated}</pre>
</div>

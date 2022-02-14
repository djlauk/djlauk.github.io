<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { slide } from 'svelte/transition'

	export let table = ''
	export let columns: string[] = []
	let columnsString = columns.join(', ')
	export let joinColumn = ''
	export let refTable = ''
	export let refColumn = ''
	export let hideJoin = false
	export let hideDelete = false

	const dispatch = createEventDispatcher()
	function colsChanged() {
		columns = columnsString.split(',').map((x) => x.trim())
	}
	function deleteTable() {
		dispatch('delete')
	}
</script>

<div transition:slide class="flex flex-col space-y-2 rounded-md shadow-lg p-2">
	{#if !hideDelete}
		<div class="self-end text-slate-400 hover:text-slate-600 hover:cursor-pointer">
			<span on:click={deleteTable}
				><svg
					class="w-6 h-6"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					xmlns="http://www.w3.org/2000/svg"
					><path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
					/></svg
				></span
			>
		</div>
	{/if}
	<div>
		<div><label for="table">Table</label></div>
		<div>
			<input
				id="table"
				type="text"
				class="w-full py-1 px-2 rounded-t-md bg-gray-100 border-0 border-b-2 border-gray-200 focus:ring-0"
				bind:value={table}
				placeholder="Book"
			/>
		</div>
	</div>

	<div>
		<div><label for="columns">Columns</label></div>
		<div>
			<input
				id="columns"
				type="text"
				class="w-full py-1 px-2 rounded-t-md bg-gray-100 border-0 border-b-2 border-gray-200 focus:ring-0"
				bind:value={columnsString}
				on:change={colsChanged}
				placeholder="title, published_on"
			/>
		</div>
	</div>

	{#if !hideJoin}
		<div>
			<div><label>Join on</label></div>
			<div class="flex flex-row space-x-1 items-end">
				<input
					id="joinOn"
					type="text"
					class="flex-1 py-1 px-2 rounded-t-md bg-gray-100 border-0 border-b-2 border-gray-200 focus:ring-0"
					bind:value={joinColumn}
					placeholder="author_id"
				/>
				<span>=</span>
				<input
					id="refTable"
					type="text"
					class="flex-1 py-1 px-2 rounded-t-md bg-gray-100 border-0 border-b-2 border-gray-200 focus:ring-0"
					bind:value={refTable}
					placeholder="Author"
				/>
				<span>.</span>
				<input
					id="refColumn"
					type="text"
					class="flex-1 py-1 px-2 rounded-t-md bg-gray-100 border-0 border-b-2 border-gray-200 focus:ring-0"
					bind:value={refColumn}
					placeholder="id"
				/>
			</div>
		</div>
	{/if}
</div>

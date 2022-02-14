<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = () => {
		return {
			stuff: {
				pageTitle: 'Pivot Table for HDB',
			},
		}
	}
</script>

<script lang="ts">
	import { generatePivotTableSql } from '$lib/hdb-pivot'
	import type { HdbSpec } from '$lib/hdb-pivot'
	import HdbPivotClass from '$lib/HdbPivotClass.svelte'

	let useSubqueries = false
	let generated = ''
	let nexthdbId = 1
	let hdbSpecs: (HdbSpec & { id: number })[] = [
		{
			id: nexthdbId++,
			hdbClass: 'Account',
			hdbAttributes: ['sAMAccountName', 'Mail', 'givenName', 'sn'],
		},
	]

	function updateHdbAttributes(id: number, value: string) {
		const h = hdbSpecs.find((x) => x.id === id)
		if (h === undefined) return
		h.hdbAttributes = value.split(',').map((x) => x.trim())
	}

	function generateClicked() {
		errorMessage = ''
		try {
			generated = generatePivotTableSql(hdbSpecs, useSubqueries)
		} catch (e) {
			const error = e as Error
			errorMessage = error.message
		}
	}

	function addHdbClass() {
		hdbSpecs = [...hdbSpecs, { id: nexthdbId++, hdbClass: '', hdbAttributes: [], joinOn: '' }]
	}

	function deleteHdbClass(id: number) {
		const index = hdbSpecs.findIndex((h) => h.id === id)
		if (index < 0) return
		hdbSpecs = [...hdbSpecs.slice(0, index), ...hdbSpecs.slice(index + 1)]
	}

	let errorMessage = ''
</script>

<div class="shadow-lg p-4">
	<h2 class="my-2 text-sky-600 text-4xl">HDB Classes</h2>
	<div
		class="my-4 p-2 border-red-800 border-2 rounded-lg text-red-800"
		class:hidden={errorMessage.length === 0}
	>
		{errorMessage}
	</div>

	<div class="flex flex-col space-y-2">
		{#each hdbSpecs as hs, idx (hs.id)}
			<HdbPivotClass
				bind:hdbClass={hs.hdbClass}
				hdbAttributes={hs.hdbAttributes.join(', ')}
				on:hdbattributeschanged={(e) => updateHdbAttributes(hs.id, e.detail)}
				bind:joinOn={hs.joinOn}
				hideJoin={idx === 0}
				hideDelete={idx === 0}
				on:deleteclass={() => deleteHdbClass(hs.id)}
			/>
		{/each}
	</div>

	<div class="flex flex-row justify-between mt-4">
		<button class="py-2 px-4 uppercase rounded-lg bg-sky-600 text-white" on:click={addHdbClass}
			>add class</button
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

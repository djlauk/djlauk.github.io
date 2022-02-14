<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = () => {
		return {
			stuff: {
				pageTitle: 'Encode / Decode Strings',
			},
		}
	}
</script>

<script lang="ts">
	type TransformFunction = (s: string) => string
	type OperationSelection = { label: string; fn: TransformFunction }

	let input = ''
	const operations: OperationSelection[] = [
		{ label: 'url encode', fn: encodeURIComponent },
		{ label: 'url decode', fn: decodeURIComponent },
		{ label: 'base64 encode', fn: btoa }, // not implemented yet
		{ label: 'base64 decode', fn: atob }, // not implemented yet
	]
	let selected = 0
	let errorMessage = ''

	function transformString(s: string, fn: TransformFunction): string {
		try {
			errorMessage = ''
			return fn(s)
		} catch (e) {
			errorMessage = (e as Error).message
		}
		return ''
	}

	$: output = transformString(input, operations[selected].fn)
</script>

<div class="shadow-lg p-4">
	<h2 class="my-2 text-sky-600 text-4xl">Input</h2>
	<div
		class="my-4 p-2 border-red-800 border-2 rounded-lg text-red-800"
		class:hidden={errorMessage.length === 0}
	>
		{errorMessage}
	</div>
	<textarea
		class="p-2 w-full h-60 font-mono bg-gray-50 text-gray-800 border-0 border-b-2 border-gray-500 focus:border-sky-600 focus:ring-0 focus:border-0 focus:border-b-2 overflow-scroll"
		bind:value={input}
		placeholder="Paste or type your text here"
	/>
	<div>
		<select bind:value={selected}>
			{#each operations as op, idx}
				<option value={idx}>{op.label}</option>
			{/each}
		</select>
	</div>
</div>

<div class="shadow-lg p-4">
	<h2 class="my-2 text-sky-600 text-4xl">Output</h2>
	<pre class="p-2 w-full h-60 font-mono text-gray-800 bg-gray-50 overflow-scroll">{output}</pre>
	<button
		class="py-2 px-3 rounded-lg uppercase bg-sky-600 text-white"
		on:click={() => (input = output)}>copy to input</button
	>
</div>

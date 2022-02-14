<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = () => {
		return {
			stuff: {
				pageTitle: 'VB Formatter',
			},
		}
	}
</script>

<script lang="ts">
	import { formatVbCode } from '$lib/vbformat'

	let sourceCode = ''
	let indentation = '  '
	let errorMessage = ''
	$: indented = formatVbCode(sourceCode, indentation)
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
		class="w-full p-2 h-60 font-mono bg-gray-50 text-gray-800 border-0 border-b-2 border-gray-500 focus:border-sky-600 focus:ring-0 focus:border-0 focus:border-b-2 overflow-scroll"
		bind:value={sourceCode}
		placeholder="Paste your VB code here"
	/>
</div>

<div class="shadow-lg p-4">
	<h2 class="my-2 text-sky-600 text-4xl">Output</h2>
	<pre class="w-full h-60 font-mono text-gray-800 bg-gray-50 p-2 overflow-scroll">{indented}</pre>
</div>

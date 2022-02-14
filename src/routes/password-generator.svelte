<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = () => {
		return {
			stuff: {
				pageTitle: 'Password Generator',
			},
		}
	}
</script>

<script lang="ts">
	import { browser } from '$app/env'
	import { generatePassword } from '$lib/password-generator'

	let password = ''
	let errorMessage = ''
	let length = 20
	let useUpper = true
	let useLower = true
	let useNumbers = true
	let useSpecial = true
	let specialCharacters = '+*%&/()=?§@{}[]$-.,;:<>\\#'
	let preventRepetition = true

	let hasClipboard = false
	if (browser) {
		hasClipboard = navigator.clipboard !== undefined
	}

	function copyToClipboard() {
		if (!hasClipboard) throw new Error('navigator has no clipboard')
		navigator.clipboard.writeText(password)
	}

	function generateNew() {
		if (length < 0) length = 0
		const options = {
			length,
			useUpper,
			useLower,
			useNumbers,
			useSpecial,
			specialCharacters,
		}
		try {
			password = generatePassword(options)
			errorMessage = ''
		} catch (e) {
			errorMessage = (e as Error).message
		}
	}

	generateNew()
</script>

<div class="shadow-lg p-4">
	<p class="border-sky-600 border-0 border-l-2 text-small text-gray-800 bg-sky-100 p-2">
		This password generator uses your browser's random number generator. <br />It is
		<strong>not</strong> suited for cryptographic applications.
	</p>
</div>

<div class="shadow-lg p-4">
	<div class="flex flex-row my-2 items-center space-x-2">
		<button on:click={generateNew} class="rounded-lg bg-sky-600 py-2 px-3 text-white"
			>Generate</button
		>
		<div class="h-full flex-1 font-mono bg-gray-100 p-2 ">{password}</div>
		{#if hasClipboard}
			<button on:click={copyToClipboard} class="rounded-lg bg-sky-600 text-white p-2 w-10 h-10"
				><span class="sr-only">copy to clipboard</span>
				<span class="not-sr-only">
					<svg
						class="w-6 h-6"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						><path
							stroke-linecap="round"
							stroke-linejoin="round"
							stroke-width="2"
							d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
						/></svg
					>
				</span></button
			>
		{/if}
	</div>
	<div
		class="my-4 p-2 border-red-800 border-2 rounded-lg text-red-800"
		class:hidden={errorMessage.length === 0}
	>
		{errorMessage}
	</div>
</div>

<div class="shadow-lg p-4">
	<h2 class="my-2 text-sky-600 text-4xl">Settings</h2>
	<fieldset class="space-y-4">
		<div class="flex flex-col items-start justify-start">
			<label for="length">
				<span class="mr-4">Length</span>
			</label>

			<input
				id="length"
				class="w-full py-1 px-2 rounded-t-md bg-gray-100 border-0 border-b-2 border-gray-200 focus:border-b-sky-600 focus:ring-0"
				type="number"
				bind:value={length}
				on:change={generateNew}
			/>
		</div>

		<div class="flex items-start">
			<div class="flex items-center h-5">
				<input
					id="useUpper"
					type="checkbox"
					class="focus:ring-sky-400 h-4 w-4 text-sky-600 border-gray-300 rounded"
					bind:checked={useUpper}
					on:change={generateNew}
				/>
			</div>
			<div class="ml-3 text-sm">
				<label for="useUpper" class="font-medium text-gray-700">Upper case characters</label>
			</div>
		</div>

		<div class="flex items-start">
			<div class="flex items-center h-5">
				<input
					id="useLower"
					type="checkbox"
					class="focus:ring-sky-400 h-4 w-4 text-sky-600 border-gray-300 rounded"
					bind:checked={useLower}
					on:change={generateNew}
				/>
			</div>
			<div class="ml-3 text-sm">
				<label for="useLower" class="font-medium text-gray-700">Lower case characters</label>
			</div>
		</div>

		<div class="flex items-start">
			<div class="flex items-center h-5">
				<input
					id="useNumbers"
					type="checkbox"
					class="focus:ring-sky-400 h-4 w-4 text-sky-600 border-gray-300 rounded"
					bind:checked={useNumbers}
					on:change={generateNew}
				/>
			</div>
			<div class="ml-3 text-sm">
				<label for="useNumbers" class="font-medium text-gray-700">Number characters</label>
			</div>
		</div>

		<div class="flex items-start">
			<div class="flex items-center h-5">
				<input
					id="useSpecial"
					type="checkbox"
					class="focus:ring-sky-400 h-4 w-4 text-sky-600 border-gray-300 rounded"
					bind:checked={useSpecial}
					on:change={generateNew}
				/>
			</div>
			<div class="ml-3 text-sm">
				<label for="useSpecial" class="font-medium text-gray-700">Special characters</label>
			</div>
		</div>

		<div class="flex flex-col items-start justify-start">
			<label for="specialCharacters">
				<span>Allowed special characters</span>
			</label>

			<input
				id="specialCharacters"
				class="w-full py-1 px-2 rounded-t-md bg-gray-100 border-0 border-b-2 border-gray-200 focus:border-b-sky-600 focus:ring-0"
				type="text"
				bind:value={specialCharacters}
				on:change={generateNew}
			/>
		</div>

		<div class="flex items-start">
			<div class="flex items-center h-5">
				<input
					id="preventRepetition"
					type="checkbox"
					class="focus:ring-sky-400 h-4 w-4 text-sky-600 border-gray-300 rounded"
					bind:checked={preventRepetition}
					on:change={generateNew}
				/>
			</div>
			<div class="ml-3 text-sm">
				<label for="preventRepetition" class="font-medium text-gray-700"
					>Prevent repeating characters</label
				>
			</div>
		</div>
	</fieldset>
</div>

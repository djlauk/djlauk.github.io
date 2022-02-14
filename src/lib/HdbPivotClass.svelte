<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { slide } from 'svelte/transition'

	export let hdbClass = 'asdf'
	export let hdbAttributes: string
	export let joinOn: string | undefined = undefined
	export let hideJoin = false
	export let hideDelete = false

	const dispatch = createEventDispatcher()
	function hdbAttributesChanged() {
		dispatch('hdbattributeschanged', hdbAttributes)
	}
	function deleteClass() {
		dispatch('deleteclass')
	}
</script>

<div transition:slide class="flex flex-col space-y-2 rounded-md shadow-lg p-2">
	{#if !hideDelete}
		<div class="self-end text-slate-400 hover:text-slate-600 hover:cursor-pointer">
			<span on:click={deleteClass}
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
		<div><label for="hdbClass">HDB Class</label></div>
		<div>
			<input
				id="hdbClass"
				type="text"
				class="w-full py-1 px-2 rounded-t-md bg-gray-100 border-0 border-b-2 border-gray-200 focus:ring-0"
				bind:value={hdbClass}
				placeholder="CidPerson"
			/>
		</div>
	</div>

	<div>
		<div><label for="hdbAttributes">HDB Attributes</label></div>
		<div>
			<input
				id="hdbAttributes"
				type="text"
				class="w-full py-1 px-2 rounded-t-md bg-gray-100 border-0 border-b-2 border-gray-200 focus:ring-0"
				bind:value={hdbAttributes}
				on:change={hdbAttributesChanged}
				placeholder="PERSID, KST, firstName, lastName, ..."
			/>
		</div>
	</div>

	{#if !hideJoin}
		<div>
			<div><label for="joinOn">Join on</label></div>
			<div>
				<input
					id="joinOn"
					type="text"
					class="w-full py-1 px-2 rounded-t-md bg-gray-100 border-0 border-b-2 border-gray-200 focus:ring-0"
					bind:value={joinOn}
					placeholder="Account.EmployeeId = CidPerson.PersId"
				/>
			</div>
		</div>
	{/if}
</div>

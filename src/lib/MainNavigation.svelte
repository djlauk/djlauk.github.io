<script lang="ts">
	import { slide } from 'svelte/transition'
	import { menuOpen } from './stores/menu'

	let categories = [
		{
			category: 'tools',
			items: [
				{
					href: '/encode-decode',
					label: 'Encode / Decode Strings',
				},
				{
					href: '/password-generator',
					label: 'Password Generator',
				},
				{
					href: '/pivot-table-hdb',
					label: 'Pivot Table for HDB',
				},
				{
					href: '/pivot-table-sql',
					label: 'Pivot Table for SQL',
				},
				{
					href: '/powershell-rename-screenshots',
					label: 'PowerShell Rename Screenshots',
				},
				{
					href: '/timers',
					label: 'Timers',
				},
				{
					href: '/vb-format',
					label: 'VB Formatter',
				},
			],
		},
	]
	function closeMenu() {
		$menuOpen = false
	}
</script>

<aside
	transition:slide
	class="z-10 bg-slate-50 shadow-md text-slate-700 absolute min-h-screen p-4 top-0 left-0 w-full md:max-w-sm flex flex-col"
	class:hidden={!$menuOpen}
>
	<div class="self-end cursor-pointer hover:text-slate-500" on:click={() => ($menuOpen = false)}>
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
				d="M6 18L18 6M6 6l12 12"
			/></svg
		>
	</div>
	<div class="mt-2 flex-1">
		{#each categories as cat}
			<h2 class="text-slate-500 uppercase text-xs mt-2">{cat.category}</h2>
			{#each cat.items as { href, label }}
				<a class="block my-2 text-slate-700 no-underline" {href} on:click={closeMenu}>{label}</a>
			{/each}
		{/each}
	</div>
</aside>

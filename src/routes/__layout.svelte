<script>
	import MainNavigation from '$lib/MainNavigation.svelte'
	import '../app.css'
	import { menuOpen } from '$lib/stores/menu'
	import { page } from '$app/stores'
</script>

<MainNavigation />
<div class="flex flex-col items-center h-screen bg-sky-50 text-slate-700" class:blur-sm={$menuOpen}>
	<div class="flex-1 w-4/5 bg-white shadow-xl">
		<div class="p-2 flex flex-row items-center mb-2 border-slate-100 shadow-md border-b">
			<div
				class="inline-block self-start p-2 rounded-full cursor-pointer hover:text-slate-500 hover:shadow-sm"
				on:click={() => ($menuOpen = !$menuOpen)}
			>
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
						d="M4 6h16M4 12h16M4 18h16"
					/></svg
				>
			</div>
			<h1 class="ml-8 text-sky-600 text-4xl">
				{$page.stuff.pageTitle ?? ''}
			</h1>
		</div>
		<div class="p-2">
			<slot />
		</div>
	</div>
</div>

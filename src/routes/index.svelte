<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = () => {
		return {
			stuff: {
				pageTitle: 'Home',
			},
		}
	}
</script>

<p>Welcome to my GitHub pages.</p>

<p>
	I use it to try out things and it's become the home of a online tools you might enjoy or find
	useful.
</p>

<p>Don't bother asking me for support.</p>

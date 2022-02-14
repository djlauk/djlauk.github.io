<script lang="ts" context="module">
	import type { Load } from '@sveltejs/kit'

	export const load: Load = () => {
		return {
			stuff: {
				pageTitle: 'Timers',
			},
		}
	}
</script>

<script lang="ts">
	import { fade } from 'svelte/transition'
	import TimerComponent from '$lib/TimerComponent.svelte'
	import { onMount } from 'svelte'

	type Timer = {
		id: number
		message?: string
	}

	let errorMessage = ''
	let _nextTimerId = 1
	let timers: Timer[] = [{ id: _nextTimerId++ }]
	function addTimer() {
		timers = [...timers, { id: _nextTimerId++ }]
	}
	let isNotificationApiSupported = false
	let isNotificationGranted = false

	function deleteTimer(timerId: number) {
		const index = timers.findIndex((t) => t.id === timerId)
		if (index < 0) return
		timers = [...timers.slice(0, index), ...timers.slice(index + 1)]
	}

	async function notifyTimerElapsed(timerId: number) {
		const t = timers.find((t) => t.id === timerId)
		const message = t?.message ?? 'Timer elapsed'
		if (!isNotificationApiSupported) {
			alert(message)
			return
		}
		if (!isNotificationGranted) return
		new Notification('Timer elapsed', {
			badge: '/favicon.png',
			image: '/favicon.png',
			body: message,
			requireInteraction: true,
			vibrate: [200, 100, 200],
		})
	}

	async function setupNotification() {
		isNotificationApiSupported = window.Notification !== undefined
		if (isNotificationApiSupported) {
			let notifyPerm = Notification.permission
			if (notifyPerm === 'default') {
				notifyPerm = await Notification.requestPermission()
			}
			isNotificationGranted = notifyPerm === 'granted'
		}
	}

	onMount(setupNotification)
</script>

<div>
	<button class="mb-2 bg-sky-600 text-white" on:click={addTimer}>add timer</button>
</div>

{#if errorMessage}
	<div class="shadow-lg p-4">
		<h2 class="my-2 text-red-600 text-4xl">Error</h2>
		<div
			class="my-4 p-2 border-red-800 border-2 rounded-lg text-red-800"
			class:hidden={errorMessage.length === 0}
		>
			{errorMessage}
		</div>
	</div>
{/if}

<div class="flex flex-col space-y-2">
	{#each timers as t (t.id)}
		<div transition:fade>
			<TimerComponent
				bind:message={t.message}
				on:timer-elapsed={() => notifyTimerElapsed(t.id)}
				on:timer-deleted={() => deleteTimer(t.id)}
			/>
		</div>
	{/each}
</div>

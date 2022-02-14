<script lang="ts">
	import { createEventDispatcher } from 'svelte'
	import { time } from './timerstore'

	const dispatch = createEventDispatcher()

	export let message: string | undefined = undefined

	let msLeft = 0
	let finishedAt = 0
	let isTimerRunning = false

	$: if (isTimerRunning && msLeft > 0) {
		msLeft = Math.max(0, finishedAt - $time)
		if (msLeft === 0) {
			isTimerRunning = false
			dispatch('timer-elapsed')
		}
	}

	function pad(n: number) {
		if (n < 10) return '0' + n
		return '' + n
	}

	function formatMsec(t: number) {
		t = Math.floor(t / 1000)
		const ss = Math.floor(t % 60)
		t = Math.floor(t / 60)
		const mm = Math.floor(t % 60)
		t = Math.floor(t / 60)
		const hh = t

		return `${pad(hh)}:${pad(mm)}:${pad(ss)}`
	}

	function startTimer() {
		if (isTimerRunning) {
			return
		}
		if (msLeft === 0) {
			return
		}
		finishedAt = Date.now() + msLeft
		isTimerRunning = true
		dispatch('timer-started')
	}

	function stopTimer() {
		if (!isTimerRunning) {
			return
		}
		isTimerRunning = false
		dispatch('timer-stopped')
	}

	function inc(delta: number) {
		msLeft += delta
	}

	function resetTimer() {
		stopTimer()
		msLeft = 0
	}

	function deleteTimer() {
		dispatch('timer-deleted')
	}
</script>

<div class="flex flex-col items-center shadow-lg p-8 space-y-4">
	<div class="self-end text-slate-400 hover:text-slate-600 hover:cursor-pointer">
		<span on:click={deleteTimer}
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
	<div class="text-4xl">{formatMsec(msLeft)}</div>
	<div class="">
		<input
			disabled={isTimerRunning}
			type="text"
			placeholder="Message"
			bind:value={message}
			class="bg-gray-100 text-gray-800 px-2 py-y rounded-t-md border-0 border-b-2 border-gray-600 focus:border-sky-600 focus:ring-0 disabled:opacity-40"
		/>
	</div>
	<div class="flex flex-row space-x-1">
		<button
			class="text-white bg-red-600 disabled:opacity-40"
			disabled={isTimerRunning}
			on:click={resetTimer}>0</button
		>
		<button
			class="text-white bg-sky-600 disabled:opacity-40"
			disabled={isTimerRunning}
			on:click={() => inc(3_600_000)}>+1h</button
		>
		<button
			class="text-white bg-sky-600 disabled:opacity-40"
			disabled={isTimerRunning}
			on:click={() => inc(600_000)}>+10m</button
		>
		<button
			class="text-white bg-sky-600 disabled:opacity-40"
			disabled={isTimerRunning}
			on:click={() => inc(300_000)}>+5m</button
		>
		<button
			class="text-white bg-sky-600 disabled:opacity-40"
			disabled={isTimerRunning}
			on:click={() => inc(60_000)}>+1m</button
		>
		<button
			class="text-white bg-sky-600 disabled:opacity-40"
			disabled={isTimerRunning}
			on:click={() => inc(10_000)}>+10s</button
		>
		<button
			class="text-white bg-sky-600 disabled:opacity-40"
			disabled={isTimerRunning}
			on:click={() => inc(5_000)}>+5s</button
		>
		<button
			class="text-white bg-sky-600 disabled:opacity-40"
			disabled={isTimerRunning}
			on:click={() => inc(1_000)}>+1s</button
		>
	</div>
	<div class="flex flex-col items-center justify-center">
		<button
			hidden={isTimerRunning}
			class="text-white bg-slate-600 rounded-full w-12 h-12 text-center disabled:opacity-40"
			disabled={msLeft === 0}
			on:click={startTimer}
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
					d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
				/><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			></button
		>
		<button
			hidden={!isTimerRunning}
			class="text-white bg-slate-600 rounded-full w-12 h-12 text-center"
			on:click={stopTimer}
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
					d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"
				/></svg
			></button
		>
	</div>
</div>

import { readable, derived } from 'svelte/store'

export const time = readable(Date.now(), function start(set) {
	const interval = setInterval(() => set(Date.now()), 1000)

	return function stop() {
		clearInterval(interval)
	}
})

// factory for derived stores
export const makeElapsed = () => {
	const startedAt = Date.now()
	const store = derived(time, ($time) => $time - startedAt)
	return store
}

import { readable } from 'svelte/store'

export const routeMapStore = readable({
    '/': 0,
    '/about': 1
})
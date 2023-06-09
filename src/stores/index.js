import { writable } from 'svelte/store'

/** Store for your data. 
This assumes the data you're pulling back will be an array.
If it's going to be an object, default this to an empty object.
**/
export const storedQuizzes = writable([])
export const storedCategories = writable([])
export const storedQuestions = writable([])
export const storedTeams = writable([])
export const storedResults = writable([])

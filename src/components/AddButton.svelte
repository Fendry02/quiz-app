<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  const onButtonClicked = () => {
    dispatch('buttonClicked')
  }

  export let label
</script>

<button class="btn bg-primary gap-2 max-w-xs self-center" on:click="{onButtonClicked}">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="h-6 w-6 rotate-45"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
  >
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
  </svg>
  {label}
</button>

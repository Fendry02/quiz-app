<script>
  import { createEventDispatcher } from 'svelte'
  import { PlusIcon } from 'svelte-feather-icons'

  const dispatch = createEventDispatcher()

  const onButtonClicked = () => {
    dispatch('buttonClicked')
  }

  export let label
</script>

<button class="btn bg-primary gap-2 max-w-xs self-center border-transparent" on:click="{onButtonClicked}">
  <PlusIcon />
  <span class="hidden sm:block text-white">{label}</span>
</button>

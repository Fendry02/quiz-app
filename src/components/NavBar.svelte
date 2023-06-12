<script>
  import { createEventDispatcher } from 'svelte'

  import AddButton from './AddButton.svelte'
  import PreviousButton from './PreviousButton.svelte'

  export let previousPath = ''
  export let label
  export let buttonLabel = ''
  export let displayPreviousButton = false
  export let displayActionButton = false

  const dispatch = createEventDispatcher()

  const onButtonClicked = () => {
    dispatch('buttonClicked')
  }
</script>

<nav class="flex items-center gap-8 pb-8">
  {#if displayPreviousButton}
    <PreviousButton previousPath="{previousPath}" />
  {/if}
  <h1 class="text-2xl dark:text-white">{label}</h1>
  {#if displayActionButton}
    <div class="ml-auto">
      <AddButton on:buttonClicked="{onButtonClicked}" label="{buttonLabel}" />
    </div>
  {/if}
</nav>

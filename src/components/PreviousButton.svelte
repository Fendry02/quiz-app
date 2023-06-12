<script>
  import { goto } from '$app/navigation'

  import { ArrowLeftIcon } from 'svelte-feather-icons'

  export let previousPath = ''

  const onButtonClicked = () => {
    goto(previousPath)
  }
</script>

<button class="btn btn-square bg-primary border-transparent" type="button" on:click="{onButtonClicked}">
  <ArrowLeftIcon class="text-white" />
</button>

<script>
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { ArrowLeftIcon } from 'svelte-feather-icons'

  const formatPreviousPath = ({ currentPath }) => {
    // Contains new
    const lastNewIndex = currentPath.lastIndexOf('new')

    if (lastNewIndex !== -1) {
      return currentPath.substring(0, lastNewIndex)
    }

    // Contains a digit
    const digitRegex = /\/(\d+)$/ // Matches the last number preceded by a '/'
    if (digitRegex.test(currentPath)) {
      return currentPath.replace(digitRegex, '') // Removes the last number
    }

    const stringRegex = /\/(\w+)$/
    if (stringRegex.test(currentPath)) {
      return currentPath.replace(stringRegex, '') // Removes the last word
    }
  }

  $: path = formatPreviousPath({ currentPath: $page.url.pathname })

  const onButtonClicked = () => {
    goto(path)
  }
</script>

<button class="btn btn-square bg-primary border-transparent" type="button" on:click="{onButtonClicked}">
  <ArrowLeftIcon class="text-white" />
</button>

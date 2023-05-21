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
    const containsDigit = /\d/.test(currentPath)

    if (containsDigit) {
      let lastIndex = -1

      for (let i = 0; i < currentPath.length; i++) {
        if (!isNaN(parseInt(currentPath[i]))) {
          lastIndex = i
        }
      }

      return currentPath.substring(0, lastIndex)
    }
  }

  $: path = formatPreviousPath({ currentPath: $page.url.pathname })

  const onButtonClicked = () => {
    goto(path)
  }
</script>

<button class="btn btn-square bg-primary border-transparent" type="button" on:click="{onButtonClicked}">
  <ArrowLeftIcon class="dark:text-white" />
</button>

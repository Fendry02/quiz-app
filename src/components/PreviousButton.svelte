<script>
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

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

    // Error
    throw new Error(`Invalid previous path: ${currentPath}`)
  }

  const path = formatPreviousPath({ currentPath: $page.url.pathname })

  const onButtonClicked = () => {
    goto(path)
  }
</script>

<button class="btn btn-circle bg-primary absolute bottom-6 left-6" type="button" on:click="{onButtonClicked}">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="feather feather-arrow-left"
  >
    <line x1="19" y1="12" x2="5" y2="12"></line>
    <polyline points="12 19 5 12 12 5"></polyline>
  </svg>
</button>

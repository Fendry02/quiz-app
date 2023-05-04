<script>
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  const substringUntilLastDigit = (str) => {
    let lastIndex = -1

    for (let i = 0; i < str.length; i++) {
      if (!isNaN(parseInt(str[i]))) {
        lastIndex = i
      }
    }

    if (lastIndex === -1) {
      return ''
    }

    return str.substring(0, lastIndex + 1)
  }

  const pathUntilLastDigit = substringUntilLastDigit($page.url.pathname)
  const lastSplitIndex = pathUntilLastDigit.lastIndexOf('/')

  const path = pathUntilLastDigit.substring(0, lastSplitIndex)

  const onButtonClicked = () => {
    goto(path)
  }
</script>

<button class="btn btn-circle bg-primary absolute bottom-6 left-6" on:click="{onButtonClicked}">
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

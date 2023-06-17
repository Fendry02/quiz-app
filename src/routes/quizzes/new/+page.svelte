<script>
  import { goto } from '$app/navigation'

  import NavBar from 'src/components/NavBar.svelte'

  const apiUrl = import.meta.env.VITE_BACKEND_URL

  let name = ''
  $: isSubmitDisabled = name === ''

  const onSubmit = async () => {
    try {
      await fetch(`${apiUrl}/quiz`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      })

      goto('/quizzes')
    } catch (error) {
      console.error(error)

      throw error
    }
  }
</script>

<section class="mx-auto w-full">
  <NavBar displayPreviousButton="{true}" displayActionButton="{false}" label="Add a new quiz" previousPath="/quizzes" />
  <h1 class="text-xl dark:text-white">Fill the information</h1>
  <form class="flex flex-col gap-4">
    <div class="form-control">
      <label class="label" for="quiz-name">
        <span id="quiz-name" class="label-text">What is this quiz name ?</span>
      </label>
      <input type="text" placeholder="Quiz 2023" class="input bg-base-300" required bind:value="{name}" />
    </div>
    <button type="submit" class="btn btn-primary bg-primary" disabled="{isSubmitDisabled}" on:click="{onSubmit}">
      Submit
    </button>
  </form>
</section>

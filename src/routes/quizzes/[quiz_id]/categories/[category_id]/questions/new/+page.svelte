<script>
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import NavBar from 'src/components/NavBar.svelte'

  const apiUrl = import.meta.env.VITE_BACKEND_URL
  const quizId = $page.params.quiz_id
  const categoryId = $page.params.category_id

  let label = ''
  let answer = ''
  let information = ''
  $: isSubmitDisabled = label === '' || answer === ''

  const onSubmit = async () => {
    try {
      await fetch(`${apiUrl}/question`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ label, answer, information, category_id: $page.params.category_id }),
      })

      goto(`/quizzes/${$page.params.quiz_id}/categories/${$page.params.category_id}/questions`)
    } catch (error) {
      console.log(error)

      throw error
    }
  }
</script>

<section class="mx-auto w-full">
  <NavBar
    displayPreviousButton="{true}"
    displayActionButton="{false}"
    label="Add a new question"
    previousPath="/quizzes/{quizId}/categories/{categoryId}/questions"
  />
  <h1 class="text-xl dark:text-white">Fill the information</h1>
  <form class="flex flex-col gap-4">
    <div class="form-control">
      <label class="label" for="question-label">
        <span id="question-label" class="label-text">What is the question ?</span>
      </label>
      <input
        type="text"
        placeholder="What is the most popular sport in the world ?"
        class="input bg-base-300"
        required
        bind:value="{label}"
      />
      <label class="label" for="question-label">
        <span id="question-label" class="label-text">What is the answer ?</span>
      </label>
      <input type="text" placeholder="Football" class="input bg-base-300" required bind:value="{answer}" />

      <label class="label" for="question-information">
        <span class="label-text">Information</span>
      </label>
      <textarea
        id="question-information"
        placeholder="Add more information to the question"
        class="textarea min-h-[150px] bg-base-300"
        bind:value="{information}"></textarea>
    </div>

    <button type="submit" class="btn btn-primary bg-primary" disabled="{isSubmitDisabled}" on:click="{onSubmit}">
      Submit
    </button>
  </form>
</section>

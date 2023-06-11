<script>
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import NavBar from 'src/components/NavBar.svelte'

  let name = ''
  $: isSubmitDisabled = name === ''

  const onSubmit = async () => {
    try {
      await fetch('http://127.0.0.1:3000/category', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, quiz_id: $page.params.quiz_id }),
      })

      goto(`/quizzes/${$page.params.quiz_id}/categories`)
    } catch (error) {
      console.error(error)

      throw error
    }
  }
</script>

<section class="mx-auto w-full">
  <NavBar displayPreviousButton="{true}" displayActionButton="{false}" label="Add a new category" />
  <h1 class="text-xl dark:text-white">Fill the information</h1>
  <form class="flex flex-col gap-4">
    <div class="form-control">
      <label class="label" for="quiz-name">
        <span id="quiz-name" class="label-text">What is this category name ?</span>
      </label>
      <input type="text" placeholder="History" class="input bg-base-300" required bind:value="{name}" />
    </div>

    <button type="submit" class="btn btn-primary bg-primary" disabled="{isSubmitDisabled}" on:click="{onSubmit}">
      Submit
    </button>
  </form>
</section>

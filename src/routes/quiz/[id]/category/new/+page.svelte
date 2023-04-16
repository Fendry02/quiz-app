<script>
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  let name = ''
  const { id } = $page.params
  $: isSubmitDisabled = name === ''

  const onSubmit = async () => {
    try {
      await fetch('http://127.0.0.1:3000/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, quiz_id: id }),
      })

      goto(`/quiz/${id}/category`)
    } catch (error) {
      console.log(error)

      throw error
    }
  }
</script>

<div class="max-w-xl mx-auto w-full">
  <h1 class="text-xl dark:text-white text-center">Fill the information</h1>
  <form class="flex flex-col gap-4">
    <div class="form-control">
      <label class="label" for="quiz-name">
        <span id="quiz-name" class="label-text">What is this category name ?</span>
      </label>
      <input type="text" placeholder="History" class="input w-full bg-base-300" required bind:value="{name}" />
    </div>

    <button type="submit" class="btn btn-primary w-full bg-primary" disabled="{isSubmitDisabled}" on:click="{onSubmit}">
      Submit
    </button>
  </form>
</div>

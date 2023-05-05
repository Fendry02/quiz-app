<script>
  // @ts-nocheck
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { storedQuestions } from '../../../../../../../stores'
  import PreviousButton from '../../../../../../../components/PreviousButton.svelte'

  let label = ''
  let answer = ''
  let information = ''

  storedQuestions.subscribe((questions) => {
    const question = questions.find((quest) => quest?.id === Number($page.params.question_id))
    label = question?.label
    answer = question?.answer
    information = question?.information
  })

  onMount(async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/question', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const jsonData = await response.json()
      storedQuestions.set(jsonData)
    } catch (error) {
      console.error(error)
      throw error
    }
  })

  $: isSubmitDisabled = label === '' || answer === ''

  const onSubmit = async () => {
    try {
      await fetch(`http://127.0.0.1:3000/question/${$page.params.question_id}`, {
        method: 'PATCH',
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

<div class="max-w-xl mx-auto w-full">
  <h1 class="text-xl dark:text-white text-center">Fill the information</h1>
  <form class="flex flex-col gap-4">
    <div class="form-control">
      <label class="label" for="question-label">
        <span id="question-label" class="label-text">What is the question ?</span>
      </label>
      <input
        type="text"
        placeholder="What is the most popular sport in the world ?"
        class="input w-full bg-base-300"
        required
        bind:value="{label}"
      />
      <label class="label" for="question-label">
        <span id="question-label" class="label-text">What is the answer ?</span>
      </label>
      <input type="text" placeholder="Football" class="input w-full bg-base-300" required bind:value="{answer}" />

      <label class="label" for="question-information">
        <span class="label-text">Information</span>
      </label>
      <textarea
        id="question-information"
        placeholder="Add more information to the question"
        class="textarea w-full min-h-[150px] bg-base-300"
        bind:value="{information}"></textarea>
    </div>

    <PreviousButton />
    <button type="submit" class="btn btn-primary w-full bg-primary" disabled="{isSubmitDisabled}" on:click="{onSubmit}">
      Submit
    </button>
  </form>
</div>

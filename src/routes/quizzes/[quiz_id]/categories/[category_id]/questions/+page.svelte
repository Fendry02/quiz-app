<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { storedQuestions } from '../../../../../../stores'
  import AddButton from '../../../../../../components/AddButton.svelte'

  let questions = []

  storedQuestions.subscribe((value) => (questions = [...value]))

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

  const onNewQuestionClicked = () =>
    goto(`/quizzes/${$page.params.quiz_id}/categories/${$page.params.category_id}/questions/new`)

  const onRowClicked = (question) =>
    goto(`/quizzes/${$page.params.quiz_id}/categories/${$page.params.category_id}/questions/${question.id}`)
</script>

<section class="flex flex-col">
  <h1 class="text-xl">Questions</h1>
  <div class="overflow-x-auto py-8">
    <table class="table w-full">
      <thead>
        <tr>
          <th class="bg-primary text-white">Id</th>
          <th class="bg-primary text-white">Label</th>
          <th class="bg-primary text-white">Answer</th>
        </tr>
      </thead>
      <tbody>
        {#each questions as question}
          <tr class="hover cursor-pointer" on:click="{() => onRowClicked(question)}">
            <td>{question.id}</td>
            <td>{question.label}</td>
            <td>{question.answer}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <AddButton on:buttonClicked="{onNewQuestionClicked}" label="Add a new question" />
</section>

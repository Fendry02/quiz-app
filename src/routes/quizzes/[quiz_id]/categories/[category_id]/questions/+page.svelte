<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { storedQuestions } from 'src/stores'
  import AddButton from 'src/components/AddButton.svelte'
  import NavBar from 'src/components/NavBar.svelte'

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
  <NavBar
    buttonLabel="Add a new question"
    label="Questions"
    displayPreviousButton="{true}"
    displayActionButton="{true}"
    on:buttonClicked="{onNewQuestionClicked}"
  />
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th class="bg-primary text-white">#</th>
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
</section>

<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'

  import { storedQuizzes } from '../../stores'
  import AddButton from '../../components/AddButton.svelte'
  import PreviousButton from '../../components/PreviousButton.svelte'

  let quizzes = []

  storedQuizzes.subscribe((value) => (quizzes = [...value]))

  onMount(async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/quiz', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const jsonData = await response.json()
      storedQuizzes.set(jsonData)
    } catch (error) {
      console.error(error)
      throw error
    }
  })

  const onNewQuizClicked = () => goto('/quizzes/new')

  const onRowClicked = (quiz) => goto(`/quizzes/${quiz.id}/categories`)
</script>

<div class="w-full">
  <h1 class="text-xl dark:text-white text-center">List of quizzes</h1>
  <div class="overflow-x-auto py-8">
    <table class="table w-full">
      <thead>
        <tr>
          <th class="bg-primary text-white">Id</th>
          <th class="bg-primary text-white">Name</th>
        </tr>
      </thead>
      <tbody>
        {#each quizzes as quiz}
          <tr class="hover cursor-pointer" on:click="{() => onRowClicked(quiz)}">
            <td>{quiz.id}</td>
            <td>{quiz.name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <PreviousButton />
  <AddButton on:buttonClicked="{onNewQuizClicked}" />
</div>

<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { storedQuizzes } from '../../store/store'

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

  const onNewQuizClicked = () => goto('/quiz/new')

  const onRowClicked = (quiz) => goto(`/quiz/${quiz.id}/category`)
</script>

<div class="w-full">
  <h1 class="text-xl dark:text-white text-center">List quizzes</h1>
  <div class="overflow-x-auto py-8">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
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
  <button class="btn btn-circle bg-primary absolute bottom-6 right-6" on:click="{onNewQuizClicked}">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 rotate-45"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
    </svg>
  </button>
</div>

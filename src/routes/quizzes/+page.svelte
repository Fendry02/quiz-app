<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'

  import { storedQuizzes } from '../../stores'
  import AddButton from '../../components/AddButton.svelte'

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

<section class="flex flex-col">
  <h1 class="text-xl">Quizzes</h1>
  <div class="overflow-x-auto py-8">
    <table class="table w-full">
      <thead>
        <tr>
          <th class="bg-primary">Id</th>
          <th class="bg-primary">Name</th>
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
  <AddButton on:buttonClicked="{onNewQuizClicked}" label="Add a new quiz" />
</section>

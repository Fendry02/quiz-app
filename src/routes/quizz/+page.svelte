<script>
  import { onMount } from 'svelte'
  import { apiData } from '../../store/store'
  import { goto } from '$app/navigation'

  let quizzes = []

  apiData.subscribe((value) => (quizzes = [...value]))

  onMount(async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/quizz', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const jsonData = await response.json()
      apiData.set(jsonData)
    } catch (error) {
      console.error(error)
      throw error
    }
  })

  const onNewQuizzClicked = () => goto('/quizz/new')
</script>

<div class="overflow-x-auto">
  <table class="table w-full">
    <!-- head -->
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
      </tr>
    </thead>
    <tbody>
      {#each quizzes as quizz}
        <tr class="hover cursor-pointer">
          <td>{quizz.id}</td>
          <td>{quizz.name}</td>
        </tr>
      {/each}
    </tbody>
  </table>

  <button class="btn btn-circle bg-primary absolute bottom-6 right-6" on:click="{onNewQuizzClicked}">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      class="h-6 w-6 rotate-45"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      ><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg
    >
  </button>
</div>

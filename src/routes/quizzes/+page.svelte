<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { PlayIcon } from 'svelte-feather-icons'

  import { storedQuizzes } from 'src/stores'
  import NavBar from 'src/components/NavBar.svelte'

  let quizzes = []

  storedQuizzes.subscribe((value) => (quizzes = [...value]))

  onMount(async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/quizzes', {
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

  const onPlayClicked = (quiz) => goto(`/quizzes/${quiz.id}/teams`)
</script>

<section class="flex flex-col">
  <NavBar
    buttonLabel="Add a new quiz"
    label="Quizzes"
    displayPreviousButton="{false}"
    displayActionButton="{true}"
    on:buttonClicked="{onNewQuizClicked}"
  />
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th class="bg-primary text-white rounded-tl-lg">#</th>
          <th class="bg-primary text-white">Name</th>
          <th class="bg-primary text-white rounded-tr-lg">Play</th>
        </tr>
      </thead>
      <tbody>
        {#each quizzes as quiz}
          <tr class="hover cursor-pointer" on:click="{() => onRowClicked(quiz)}">
            <td>{quiz.id}</td>
            <td>{quiz.name}</td>
            <td>
              <button
                class="btn bg-primary btn-square h-10 w-10 min-h-fit border-transparent"
                on:click|stopPropagation="{() => onPlayClicked(quiz)}"
              >
                <PlayIcon class="text-white" />
              </button>
            </td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

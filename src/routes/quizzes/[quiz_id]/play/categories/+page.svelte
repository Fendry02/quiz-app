<script>
  import { onMount } from 'svelte'
  import { PlayIcon } from 'svelte-feather-icons'

  import { page } from '$app/stores'
  import { goto } from '$app/navigation'

  import { storedCategories } from 'src/stores'

  import NavBar from 'src/components/NavBar.svelte'

  let categories = []
  const quizId = $page.params.quiz_id

  storedCategories.subscribe((value) => (categories = [...value]))

  onMount(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/categories/${$page.params.quiz_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const jsonData = await response.json()
      storedCategories.set(jsonData)
    } catch (error) {
      console.error(error)
      throw error
    }
  })

  const onPlayClicked = ({ category }) => {
    goto(`/quizzes/${quizId}/play/categories/${category.id}`)
  }
</script>

<section class="mx-auto w-full">
  <NavBar displayPreviousButton="{true}" displayActionButton="{false}" label="Categories" />
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
        {#each categories as category}
          <tr class="hover">
            <td>{category.id}</td>
            <td>{category.name}</td>
            <td>
              <button
                class="btn bg-primary btn-square h-10 w-10 min-h-fit border-transparent"
                on:click|stopPropagation="{() => onPlayClicked({ category })}"
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

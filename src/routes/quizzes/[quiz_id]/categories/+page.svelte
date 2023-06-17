<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { storedCategories } from 'src/stores'
  import NavBar from 'src/components/NavBar.svelte'

  const apiUrl = import.meta.env.VITE_BACKEND_URL

  let categories = []
  storedCategories.subscribe((value) => (categories = [...value]))

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/categories/${$page.params.quiz_id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const jsonData = await response.json()
      storedCategories.set(jsonData)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  onMount(async () => {
    await fetchCategories()
  })

  const onNewCategoryClicked = () => goto(`/quizzes/${$page.params.quiz_id}/categories/new`)

  const onRowClicked = (category) => goto(`/quizzes/${$page.params.quiz_id}/categories/${category.id}/questions`)
</script>

<section class="flex flex-col">
  <NavBar
    buttonLabel="Add a new category"
    label="Categories"
    displayPreviousButton="{true}"
    displayActionButton="{true}"
    previousPath="/quizzes"
    on:buttonClicked="{onNewCategoryClicked}"
  />
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th class="bg-primary text-white rounded-tl-lg">#</th>
          <th class="bg-primary text-white rounded-tr-lg">Name</th>
        </tr>
      </thead>
      <tbody>
        {#each categories as category}
          <tr class="hover cursor-pointer" on:click="{() => onRowClicked(category)}">
            <td>{category.id}</td>
            <td>{category.name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</section>

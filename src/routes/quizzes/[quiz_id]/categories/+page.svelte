<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { storedCategories } from 'src/stores'
  import AddButton from 'src/components/AddButton.svelte'
  import NavBar from 'src/components/NavBar.svelte'

  let categories = []

  storedCategories.subscribe((value) => (categories = [...value]))

  onMount(async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/category', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const jsonData = await response.json()
      storedCategories.set(jsonData)
    } catch (error) {
      console.error(error)
      throw error
    }
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
    on:buttonClicked="{onNewCategoryClicked}"
  />
  <div class="overflow-x-auto">
    <table class="table w-full">
      <thead>
        <tr>
          <th class="bg-primary text-white">#</th>
          <th class="bg-primary text-white">Name</th>
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

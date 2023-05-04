<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { storedCategories } from '../../../../stores'
  import AddButton from '../../../../components/AddButton.svelte'
  import PreviousButton from '../../../../components/PreviousButton.svelte'

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

<div class="w-full">
  <h1 class="text-xl dark:text-white text-center">List of categories</h1>
  <div class="overflow-x-auto py-8">
    <table class="table w-full">
      <thead>
        <tr>
          <th class="bg-primary text-white">Id</th>
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
  <PreviousButton />
  <AddButton on:buttonClicked="{onNewCategoryClicked}" />
</div>

<script>
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import { storedCategories } from '../../../../store/store'

  const { id } = $page.params
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

  const onNewCategoryClicked = () => goto(`/quiz/${id}/category/new`)
</script>

<div class="w-full">
  <h1 class="text-xl dark:text-white text-center">List categories</h1>
  <div class="overflow-x-auto py-8">
    <table class="table w-full">
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
        </tr>
      </thead>
      <tbody>
        {#each categories as category}
          <tr class="hover cursor-pointer">
            <td>{category.id}</td>
            <td>{category.name}</td>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
  <button class="btn btn-circle bg-primary absolute bottom-6 right-6" on:click="{onNewCategoryClicked}">
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

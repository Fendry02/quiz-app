<script>
    import { onMount } from 'svelte'
    import { page } from '$app/stores'
    import { goto } from '$app/navigation'

    import { storedCategories } from 'src/stores'

    import NavBar from 'src/components/NavBar.svelte'
  
    let categories = []

    storedCategories.subscribe((value) => (categories = [...value]))

    onMount(async () => {
      try {
        const response = await fetch('http://127.0.0.1:3000/categories', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        })
        console.log(categories)

        const jsonData = await response.json()
        storedCategories.set(jsonData)
      } catch (error) {
        console.error(error)
        throw error
      }
    })

  </script>
  
<section class="max-w-xl mx-auto w-full">
  <NavBar displayPreviousButton="{true}" displayActionButton="{false}" label="Categories" />
</section>
  
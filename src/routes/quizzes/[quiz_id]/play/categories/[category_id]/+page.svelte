<script>
  import { onMount } from 'svelte'

  import { page } from '$app/stores'

  import NavBar from 'src/components/NavBar.svelte'
  import { storedQuestions } from 'src/stores'

  let questions = []
  storedQuestions.subscribe((value) => (questions = [...value]))

  onMount(async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/questions/${$page.params.category_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const jsonData = await response.json()
      storedQuestions.set(jsonData)
      console.log(jsonData)
    } catch (error) {
      console.error(error)
      throw error
    }
  })
</script>

<section class="max-w-xl mx-auto w-full">
  <NavBar displayPreviousButton="{true}" displayActionButton="{false}" label="Questions" />
  <div>
    {#each questions as question}
      <div class="collapse collapse-arrow rounded-lg bg-base-200 mb-4">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          {question.label}
        </div>
        <div class="collapse-content">
          <div>
            <p>{question.answer}</p>
            <p>{question.information}</p>
          </div>
          <div class="flex">
            <button class="btn btn-success">Success</button>
            <button class="btn btn-error">Error</button>
          </div>
        </div>
      </div>
    {/each}
  </div>
</section>

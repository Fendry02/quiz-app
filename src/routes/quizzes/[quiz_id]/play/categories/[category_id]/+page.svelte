<script>
  import { onMount } from 'svelte'

  import { page } from '$app/stores'
  import { goto } from '$app/navigation'

  import NavBar from 'src/components/NavBar.svelte'
  import { storedQuestions, storedTeams } from 'src/stores'

  let questions = []
  let teams = []
  let results = []
  const quizId = $page.params.quiz_id

  storedQuestions.subscribe((value) => (questions = [...value]))
  storedTeams.subscribe((value) => (teams = [...value]))

  const inputColors = ['input-primary', 'input-secondary', 'input-accent', 'input-info']
  const getDynamicInputColor = (index) => inputColors[index]

  const textColors = ['text-primary', 'text-secondary', 'text-accent', 'text-info']
  const getDynamicTextColor = (index) => textColors[index]

  const fetchQuestions = async () => {
    try {
      const response = await fetch(`http://127.0.0.1:3000/categories/${$page.params.category_id}/questions`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })
      const jsonData = await response.json()
      storedQuestions.set(jsonData)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  onMount(async () => {
    if (teams.length === 0) {
      goto(`/quizzes`)
    }

    await fetchQuestions()
  })

  const setResult = ({ input, question, team }) => {
    const resultIndex = results.findIndex((result) => result.questionId === question.id && result.teamId === team.id)
    const pointInNumber = Number(input.data)
    const newResult = {
      question_id: question.id,
      point: pointInNumber,
      team_id: team.id,
    }

    if (resultIndex === -1) {
      return (results = [...results, { ...newResult }])
    }

    return (results[resultIndex] = { ...newResult })
  }

  const onValidTeamClicked = async () => {
    try {
      await fetch('http://127.0.0.1:3000/results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ results }),
      })

      goto(`/quizzes/${quizId}/play/categories`)
    } catch (error) {
      console.log(error)

      throw error
    }
  }
</script>

<section class="mx-auto w-full">
  <NavBar
    displayPreviousButton="{true}"
    displayActionButton="{false}"
    label="Questions"
    previousPath="/quizzes/{quizId}/play/categories"
  />
  <div>
    {#each questions as question}
      <div class="collapse collapse-arrow rounded-lg bg-base-200 mb-4">
        <input type="checkbox" />
        <div class="collapse-title text-xl font-medium">
          {question.label}
        </div>
        <div class="collapse-content">
          <div class="pb-4">
            <p>{question.answer}</p>
            <p>{question.information}</p>
          </div>
          <div class="flex gap-8 pb-4">
            {#each teams as team, index}
              <span class="self-center {getDynamicTextColor(index)}">Team {index + 1}</span>
              <input
                type="number"
                min="0"
                max="10"
                placeholder="1"
                class="input input-bordered max-w-xs {getDynamicInputColor(index)}"
                on:input="{(input) => setResult({ input, question, team })}"
              />
            {/each}
          </div>
        </div>
      </div>
    {/each}
    <div class="flex justifiy-center">
      <button class="btn btn-success text-white w-full" on:click="{() => onValidTeamClicked()}">Validate</button>
    </div>
  </div>
</section>

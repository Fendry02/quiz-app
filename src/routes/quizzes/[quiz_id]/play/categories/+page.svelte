<script>
  import { onMount } from 'svelte'
  import { PlayIcon } from 'svelte-feather-icons'

  import { page } from '$app/stores'
  import { goto } from '$app/navigation'

  import { storedCategories, storedTeams, storedResults } from 'src/stores'

  import NavBar from 'src/components/NavBar.svelte'

  const apiUrl = import.meta.env.VITE_BACKEND_URL
  const quizId = $page.params.quiz_id

  let categories = []
  let teams = []
  let results = []
  $: teamIds = teams.map((team) => team.id)
  $: formattedResults = results.map((result) => {
    if (!teams) return {}
    const correspondingTeam = teams.find((team) => team.id == result.team_id)

    return {
      ...result,
      team_label: correspondingTeam?.label,
    }
  })
  $: sortedFormattedResults = formattedResults.sort((a, b) => (a.team_label > b.team_label ? 1 : -1))

  $: formattedCategories = categories.map((category) => {
    const isCompleted = category.questions.every((question) => {
      const resultTeamIds = question.results.map((result) => result.team_id)
      return teamIds.every((id) => resultTeamIds.includes(id))
    })

    return {
      ...category,
      isCompleted,
    }
  })

  storedCategories.subscribe((value) => (categories = [...value]))
  storedTeams.subscribe((value) => (teams = [...value]))
  storedResults.subscribe((value) => (results = [...value]))

  const getCategories = async () => {
    try {
      const response = await fetch(`${apiUrl}/categories/${quizId}`, {
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

  const getResults = async () => {
    try {
      const response = await fetch(`${apiUrl}/results/${quizId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teamIds }),
      })
      const jsonData = await response.json()
      storedResults.set(jsonData)
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  onMount(async () => {
    if (teams.length === 0) {
      goto(`/quizzes`)
    }

    await getCategories()
    await getResults()
  })

  const onPlayClicked = ({ category }) => {
    goto(`/quizzes/${quizId}/play/categories/${category.id}`)
  }
</script>

<section class="mx-auto w-full">
  <NavBar
    displayPreviousButton="{true}"
    displayActionButton="{false}"
    label="Categories"
    previousPath="/quizzes/${quizId}/teams"
  />
  <div class="overflow-x-auto">
    <div class="stats stats-vertical lg:stats-horizontal shadow w-full">
      {#each sortedFormattedResults as result}
        <div class="stat bg-base-200">
          <div class="stat-title">{result.team_label}</div>
          <div class="stat-value">{result.points}</div>
          <div class="stat-desc">Points</div>
        </div>
      {/each}
    </div>
    <table class="table mt-4">
      <thead>
        <tr>
          <th class="bg-primary text-white rounded-tl-lg">#</th>
          <th class="bg-primary text-white">Name</th>
          <th class="bg-primary text-white rounded-tr-lg">Play</th>
        </tr>
      </thead>
      <tbody>
        {#each formattedCategories as category}
          <tr class:bg-success="{category.isCompleted}">
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

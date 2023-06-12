<script>
  import _ from 'lodash'

  import { page } from '$app/stores'
  import { goto } from '$app/navigation'

  import NavBar from 'src/components/NavBar.svelte'
  import { storedTeams } from 'src/stores'

  let teamCount = 2
  let listTeamMembers = ''
  let teams = [{ members: [], label: '' }]
  let areTeams = false
  let isSubmitDisabled = true

  const quizId = $page.params.quiz_id

  const splitTeams = (names, teamCount) => {
    let splitTeams = []

    while (teamCount > 0) {
      splitTeams.push(names.splice(0, Math.floor(names.length / teamCount)))
      teamCount--
    }

    return splitTeams
  }

  const formatTeams = (members, index) => {
    return {
      label: `Team ${index + 1}`,
      members,
      quiz_id: quizId,
    }
  }

  const randomizeTeam = () => {
    const members = listTeamMembers.split(',')
    if (members.length === 0 || members.length < teamCount) throw new Error('Invalid number of members')

    const shuffledMembers = _.shuffle(members)
    const chunkedMembers = splitTeams(shuffledMembers, teamCount)
    const reversedTeams = chunkedMembers.reverse()
    const formattedTeams = reversedTeams.flatMap(formatTeams)

    teams = formattedTeams
    areTeams = true
    isSubmitDisabled = false
  }

  const onSubmit = async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/teams', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ teams }),
      })

      const jsonData = await response.json()
      storedTeams.set(jsonData)
      goto(`/quizzes/${quizId}/play/categories`)
    } catch (error) {
      console.error(error)

      throw error
    }
  }
</script>

<section class="mx-auto w-full">
  <NavBar displayPreviousButton="{true}" displayActionButton="{false}" label="Play" />
  <h1 class="text-xl dark:text-white">Fill the information</h1>
  <form class="flex flex-col gap-4">
    <div class="form-control">
      <label class="label" for="quiz-teams-number">
        <span class="label-text">Tell me how many teams they are</span>
      </label>
      <input
        id="quiz-teams-number"
        type="number"
        placeholder="Enter the team number"
        class="input bg-base-300"
        min="2"
        max="4"
        required
        bind:value="{teamCount}"
      />
    </div>

    <div class="form-control">
      <label class="label" for="quiz-teams">
        <span class="label-text">Give me all the members</span>
        <span
          class="label-text cursor-pointer underline"
          on:click="{randomizeTeam}"
          on:keydown|preventDefault="{(event) => {
            if (event.key === 'Enter' || event.key === ' ') {
              randomizeTeam()
            }
          }}"
        >
          Make the teams
        </span>
      </label>
      <textarea
        id="quiz-teams"
        placeholder="separate each member with a comma"
        class="textarea min-h-[150px] bg-base-300"
        required
        bind:value="{listTeamMembers}"></textarea>
    </div>

    {#if areTeams}
      <div class="form-control">
        <label class="label" for="quiz-members">
          <span class="label-text">Here are the teams</span>
        </label>
        <div class="flex flex-wrap gap-8">
          {#each teams as team}
            <div class="flex flex-col flex-1">
              <label class="label" for="team-{team.label}">
                <span class="label-text">{team.label}</span>
              </label>
              <div id="team-{team.label}" class="flex-1 bg-base-100 rounded-lg p-4">
                {#each team.members as member}
                  <span id="quiz-members">
                    {member} <br />
                  </span>
                {/each}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <button type="submit" class="btn btn-primary bg-primary" disabled="{isSubmitDisabled}" on:click="{onSubmit}">
      Launch the quiz !
    </button>
  </form>
</section>

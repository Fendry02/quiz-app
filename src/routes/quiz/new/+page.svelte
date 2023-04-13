<script>
  import _ from 'lodash'

  import { goto } from '$app/navigation'

  let name = ''
  let teamCount = 2
  let listTeamMembers = ''
  let teams = [{ members: [], name: '' }]
  let areTeams = false
  let isSubmitDisabled = true

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
      name: `Team ${index + 1}`,
      members,
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
      await fetch('http://127.0.0.1:3000/quiz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, teamCount, teams }),
      })

      goto('/quiz')
    } catch (error) {
      console.log(error)

      throw error
    }
  }
</script>

<div class="max-w-xl mx-auto w-full">
  <h1 class="text-xl dark:text-white text-center">Fill the information</h1>
  <form class="flex flex-col gap-4">
    <div class="form-control">
      <label class="label" for="quiz-name">
        <span id="quiz-name" class="label-text">What is this quiz name ?</span>
      </label>
      <input type="text" placeholder="Quiz 2023" class="input w-full bg-base-300" required bind:value="{name}" />
    </div>

    <div class="form-control">
      <label class="label" for="quiz-teams-number">
        <span class="label-text">Tell me how many teams they are</span>
      </label>
      <input
        id="quiz-teams-number"
        type="number"
        placeholder="Enter the team number"
        class="input w-full bg-base-300"
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
          Make team
        </span>
      </label>
      <textarea
        id="quiz-teams"
        placeholder="separate each member with a comma"
        class="textarea w-full min-h-[150px] bg-base-300"
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
              <label class="label" for="team-{team.name}">
                <span class="label-text">{team.name}</span>
              </label>
              <div id="team-{team.name}" class="flex-1 bg-base-100 rounded-lg p-4">
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

    <button type="submit" class="btn btn-primary w-full bg-primary" disabled="{isSubmitDisabled}" on:click="{onSubmit}">
      Submit
    </button>
  </form>
</div>

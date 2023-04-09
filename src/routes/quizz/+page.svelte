<script>
	import _ from 'lodash'

	let teamCount = 2
	let listTeamMembers = ''
	let teams = [{ members: [], name: '' }]
	let areTeams = false

	function splitTeams(names, teamCount) {
		let teams = []

		while (teamCount > 0) {
			teams.push(names.splice(0, Math.floor(names.length / teamCount)))
			teamCount--
		}

		return teams
	}

	const formatTeams = (members, index) => {
		return {
			name: `Team ${index + 1}`,
			members
		}
	}

	const randomizeTeam = () => {
		const members = listTeamMembers.split(',')
		if (members.length === 0 || members.length < teamCount)
			throw new Error('Invalid number of members')

		const shuffledMembers = _.shuffle(members)
		const chunkedMembers = splitTeams(shuffledMembers, teamCount)
		const reversedTeams = chunkedMembers.reverse()
		const formattedTeams = reversedTeams.flatMap(formatTeams)

		teams = formattedTeams
		areTeams = true
	}
</script>

<div class="flex flex-col gap-8 p-8 container mx-auto">
	<h1 class="text-xl text-white text-center">Fill the information</h1>
	<form class="flex flex-col gap-4 max-w-lg mx-auto w-full" method="post">
		<div class="form-control w-full">
			<label class="label" for="quizz-name">
				<span id="quizz-name" class="label-text">What is this quizz name ?</span>
			</label>
			<input type="text" placeholder="Quizz 2023" class="input w-full" required />
		</div>

		<div class="form-control w-full">
			<label class="label" for="quizz-teams-number">
				<span class="label-text">Tell me how many teams they are</span>
			</label>
			<input
				id="quizz-teams-number"
				type="number"
				placeholder="Enter the team number"
				class="input w-full"
				min="2"
				max="4"
				bind:value={teamCount}
			/>
		</div>

		<div class="form-control w-full">
			<label class="label" for="quizz-teams">
				<span class="label-text">Give me all the members</span>
				<span
					class="label-text cursor-pointer underline"
					on:click={randomizeTeam}
					on:keydown|preventDefault={(event) => {
						if (event.key === 'Enter' || event.key === ' ') {
							randomizeTeam()
						}
					}}
				>
					click here to randomize
				</span>
			</label>
			<textarea
				bind:value={listTeamMembers}
				id="quizz-teams"
				placeholder="separate each member with a comma"
				class="textarea w-full min-h-[150px]"
			/>
		</div>

		{#if areTeams}
			<div class="form-control w-full">
				<label class="label" for="quizz-members">
					<span class="label-text">Here is the teams</span>
				</label>
				<div class="flex flex-wrap gap-8">
					{#each teams as team}
						<div class="flex flex-col flex-1">
							<label class="label" for="team-{team.name}">
								<span class="label-text">{team.name}</span>
							</label>
							<div id="team-{team.name}" class="flex-1 bg-base-100 rounded-lg p-4">
								{#each team.members as member}
									<span id="quizz-members">
										{member} <br />
									</span>
								{/each}
							</div>
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<button type="submit" class="btn btn-primary my-8"> Submit </button>
	</form>
</div>

<script>
	import _ from 'lodash'

	let teamNumber = 2
	let listTeams = ''
	let teams = [{ members: [], name: '' }]
	let areTeams = false

	const randomizeTeam = () => {
		const members = listTeams.split(',')
		if (members.length === 0 || members.length < teamNumber)
			throw new Error('Invalid number of members')

		const shuffledMembers = _.shuffle(members)
		const chunkedMembers = _.chunk(shuffledMembers, teamNumber)
		const newTeams = chunkedMembers.flatMap((members, index) => {
			return {
				name: `Team ${index + 1}`,
				members
			}
		})

		// @ts-ignore
		teams = newTeams
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
				bind:value={teamNumber}
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
				bind:value={listTeams}
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
						<div class="flex-1 bg-base-100 rounded-lg p-2">
							{#each team.members as member}
								<span id="quizz-members">
									{member} <br />
								</span>
							{/each}
						</div>
					{/each}
				</div>
			</div>
		{/if}

		<button type="submit" class="btn btn-primary my-8"> Submit </button>
	</form>
</div>

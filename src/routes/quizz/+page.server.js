export const actions = {
	create: async ({ request }) => {
		const formData = await request.formData()

		const name = formData.get('name')
		const teamCount = formData.get('teamCount')
		const teams = formData.get('teams')

		const response = await fetch('http://127.0.0.1:3000/quizz', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ name, teamCount, teams })
		})
		const jsonData = await response.json()

		return jsonData
	}
}

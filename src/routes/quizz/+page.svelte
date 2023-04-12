<script>
  import { onMount } from 'svelte'
  import { apiData } from '../../store/store'

  let quizzes = []

  onMount(async () => {
    try {
      const response = await fetch('http://127.0.0.1:3000/quizz', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const jsonData = await response.json()
      apiData.set(jsonData)
    } catch (error) {
      console.error(error)
      throw error
    }
  })
</script>

<div class="overflow-x-auto">
  <table class="table w-full">
    <!-- head -->
    <thead>
      <tr>
        <th />
        <th>Name</th>
        <th>Job</th>
        <th>Favorite Color</th>
      </tr>
    </thead>
    <tbody>
      <!-- row 1 -->
      <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
      </tr>
      <!-- row 2 -->
      <tr>
        <th>2</th>
        <td>Hart Hagerty</td>
        <td>Desktop Support Technician</td>
        <td>Purple</td>
      </tr>
      <!-- row 3 -->
      <tr>
        <th>3</th>
        <td>Brice Swyre</td>
        <td>Tax Accountant</td>
        <td>Red</td>
      </tr>
    </tbody>
  </table>
</div>

<script>
  import { goto } from '$app/navigation'

  const onGetStartedClick = () => goto('quizz')
</script>

<main>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold text-white">Quizz app</h1>
        <p class="py-6 text-white">The best modern and fun quizz application</p>
        <button class="btn btn-primary" on:click={onGetStartedClick}> Get Started </button>
      </div>
    </div>
  </div>
</main>

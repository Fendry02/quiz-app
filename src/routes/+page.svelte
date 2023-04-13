<script>
  import { goto } from '$app/navigation'

  const onGetStartedClick = () => goto('quiz')
</script>

<main>
  <div class="hero min-h-screen">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <h1 class="text-5xl font-bold dark:text-white">Quiz app</h1>
        <p class="py-6 dark:text-white">The best modern and fun quiz application</p>
        <button class="btn btn-primary" on:click="{onGetStartedClick}"> Get Started </button>
      </div>
    </div>
  </div>
</main>

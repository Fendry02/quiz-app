<script>
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'

  import '../app.css'
  import PreviousButton from '../components/PreviousButton.svelte'

  $: isMainPage = $page.url.pathname === '/quizzes'
</script>

<div class="flex flex-col p-8 container mx-auto max-w-4xl">
  <section class="flex pb-8">
    <div class="fit">
      {#if !isMainPage}
        <PreviousButton />
      {/if}
    </div>
    <h1 class="mx-auto text-3xl self-center dark:text-white">Quiz Master</h1>
    <button on:click="{() => goto('/quizzes')}">
      <img src="/icon.svg" alt="lamp" class="h-12" />
    </button>
  </section>
  <slot />
</div>

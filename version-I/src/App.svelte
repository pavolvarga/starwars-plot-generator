<script lang="ts">
  import { onMount } from 'svelte';
  import { Router, Route } from "svelte-routing";
  import Home from './pages/home/Home.svelte';
  import Result from './pages/result/Result.svelte';
  import { loadStarWarsData} from './common/load-data';

  export let url = "";

  export let isLoading = true;

  onMount(async () => {
    const result = await loadStarWarsData();
    isLoading = false;
  });

</script>

<svelte:head>
  <meta charSet="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <title>SW Gen Version I</title>
</svelte:head>

{#if isLoading}
  <div class="container mx-auto">
    <div class="flex flex-col items-center justify-center">
      <h1 class="text-center text-4xl my-8">Loading ...</h1>
    </div>
  </div>
{:else}
  <Router url="{url}">
    <div>
      <Route path="home" component="{Home}" />
      <Route path="result" component="{Result}" />
      <Route path="/"><Home /></Route>
    </div>
  </Router>
{/if}

<style>
</style>

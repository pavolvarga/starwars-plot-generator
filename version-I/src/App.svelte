<script lang="ts">
  import { Router, Link, Route } from "svelte-routing";
  import Home from './pages/home/Home.svelte';
  import Result from './pages/result/Result.svelte';

  export let url = "";
</script>

<svelte:head>
  <meta charSet="utf-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="theme-color" content="#000000" />
  <title>SW Gen Version I</title>
</svelte:head>

<Router url="{url}">
  <div>
    <Route path="home" component="{Home}" />
    <Route path="result" component="{Result}" />
    <Route path="/"><Home /></Route>
  </div>
</Router>

<style>
</style>

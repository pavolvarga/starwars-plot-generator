
<script>
  import DOMPurify from 'isomorphic-dompurify';
  import { navigate } from "svelte-routing"
  import { onDestroy } from "svelte";
  import { inputFormStore } from "../../common/inputForm-store";
  import { generatePlot } from "../../common/plotGenerator";

  let resources;
  let title;
  let markup;
  const unsubscribe = inputFormStore.subscribe(inputForm => {
    const selected = inputForm.filter(item => item.selected !== undefined).map(item => item.selected);
    const names = selected.map(item => item.name);
    resources = selected.map(item => item.url);
    const plot = generatePlot(...(names));
    markup = DOMPurify.sanitize(plot.description);
    title = plot.title;
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
</script>

<div>
  <div class="flex flex-col items-center justify-center my-8">
    <h1 class="text-center text-4xl">Star Wars Plot Generator</h1>
  </div>
  <div class="flex flex-col items-center justify-center my-6">
    <h1 class="text-center text-3xl">{title}</h1>
  </div>
  <div class="flex flex-col items-center justify-center my-4">
    <p class="text-center text-xl bg-black text-yellow-200">
      {@html markup}
    </p>
  </div>
  <div class="flex flex-col items-center my-4 text-left">
    <h1 class="text-center text-3xl my-2">Resources</h1>
    <ul>
    {#each resources as url}
      <li class="my-1"><a class="text-blue-600 focus:outline-none focus:ring focus:ring-blue-100" href={url}>{url}</a></li>
    {/each}
    </ul>
  </div>
  <div class="flex items-center justify-center my-4">
    <button
      class="text-white text-xl mx-4 p-3 rounded-md bg-blue-500"
      type="button"
      on:click={() => navigate('/home')}
    >
      {'Generate New Plot'}
    </button>
  </div>
</div>

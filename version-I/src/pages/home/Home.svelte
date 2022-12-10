<script>
  import {onDestroy} from "svelte";
  import {dataStore} from "../../common/data-store";
  import SWInput from "./SWInput.svelte";

  let resources;

  const unsubscribe = dataStore.subscribe(it => resources = it);

  const mandatory = Object.values(resources).filter(r => r.mandatory);

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

  const colors = ["White", "Red", "Yellow", "Green", "Blue", "Black"]
  let selectedColor

</script>

<div>
  <h1 class="text-center text-4xl my-8">Star Wars Plot Generator</h1>
  <div class="flex w-full flex-col">
    {#each mandatory as resource}
      <SWInput items={resource.suggestions} label={resource.label ?? resource.singular} />
    {/each}
  </div>
</div>


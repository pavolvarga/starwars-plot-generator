<script>
  import { onDestroy } from "svelte";
  import { inputFormStore } from "../../common/inputForm-store";
  import SWInput from "./SWInput.svelte";
  import SWButton from "./SWButton.svelte";

  let inputs;
  let buttons;
  const unsubscribe = inputFormStore.subscribe(inputForm => {
    inputs = inputForm.filter(item => item.visible).map(item => item.resourceKey);
    buttons = inputForm.filter(item => !item.mandatory).map(item => item.resourceKey);
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
</script>


<div class="flex w-full flex-col">
  {#each inputs as input}
    <SWInput resourceKey={input} />
  {/each}
  <div class="flex w-full justify-between">
    {#each buttons as button}
      <SWButton resourceKey={button} />
    {/each}
  </div>
</div>

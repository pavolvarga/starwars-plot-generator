<script>
  import { onDestroy } from "svelte";
  import { inputFormStore } from "../../common/inputForm-store";

  export let resourceKey;

  let label;
  const unsubscribe = inputFormStore.subscribe(inputForm => {
    const inputState = inputForm.find(item => item.resourceKey === resourceKey);
    label = `${inputState.visible ? 'Remove' : 'Add'} ${inputState.label}`;
  });

  function onClick() {
    inputFormStore.toggleVisibility(resourceKey);
  }

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

</script>

<button
  class="text-white bg-blue-500 text-xl mx-4 p-3 rounded-md focus:outline-none focus:ring focus:ring-blue-700"
  type="button"
  on:click={onClick}
>
  {label}
</button>

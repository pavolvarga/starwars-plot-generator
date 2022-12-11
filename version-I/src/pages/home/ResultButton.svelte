<script>
  import { navigate } from "svelte-routing";
  import { onDestroy } from "svelte";
  import { inputFormStore } from "../../common/inputForm-store";

  let disabled;
  const unsubscribe = inputFormStore.subscribe(inputForm => {
    const mandatory = inputForm.filter(item => item.mandatory);
    const mandatorySelected = inputForm.filter(item => item.mandatory && item.selected !== undefined);
    disabled = mandatory.length !== mandatorySelected.length;
  });

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });
</script>

<button
  class="text-white text-xl mx-4 p-3 rounded-md { disabled ? 'bg-gray-500' :'bg-blue-500' }"
  type="button"
  on:click={() => navigate('/result')}
>
  {'Generate Plot'}
</button>


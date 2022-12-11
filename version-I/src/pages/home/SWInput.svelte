<script>
  import AutoComplete from "simple-svelte-autocomplete"
  import {inputFormStore} from "../../common/inputForm-store";
  import {onDestroy} from "svelte";

  let inputForm;
  const unsubscribe = inputFormStore.subscribe(it => inputForm = it);

  export let resourceKey;

  const inputState = inputForm.find(item => item.resourceKey === resourceKey);
  const label = inputState.label;

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

</script>

<div class="w-full mb-8 flex">
  <label class="text-xl capitalize w-1/4 text-left">{label}</label>
  <AutoComplete
    items="{inputState.data}"
    labelFieldName="name"
    noInputStyles
    class="w-full text-2xl border-2 border-solid border-slate-300"
    placeholder={`Please enter ${label}`}
  />
</div>

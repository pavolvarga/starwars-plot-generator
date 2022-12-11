<script>
  import AutoComplete from "simple-svelte-autocomplete"
  import {inputFormStore} from "../../common/inputForm-store";
  import {onDestroy} from "svelte";

  let inputForm;
  const unsubscribe = inputFormStore.subscribe(it => inputForm = it);

  export let resourceKey;

  const inputState = inputForm.find(item => item.resourceKey === resourceKey);
  const label = inputState.label;

  function onChange(value) {
    inputFormStore.selectValue(resourceKey, value);
  }

  onDestroy(() => {
    if (unsubscribe) {
      unsubscribe();
    }
  });

</script>

<div class="w-full mb-8 flex justify-between">
  <label class="text-xl capitalize w-1/4 text-left">{label}</label>
  <AutoComplete
    items="{inputState.data}"
    labelFieldName="name"
    noInputStyles
    class="text-2xl border-2 border-solid border-slate-300"
    placeholder={`Please enter ${label}`}
    onChange={onChange}
    lock={true}
  />
</div>

<script>
  import AutoComplete from "simple-svelte-autocomplete"

  export let items;
  export let label;

  let selectedIItem;

  console.log(items);

</script>

<div class="w-full mb-8 flex">
  <label class="text-xl capitalize w-1/4 text-left">{label}</label>
  <AutoComplete items="{items}" bind:selectedItem="{selectedIItem}" labelFieldName="name" noInputStyles class="w-full text-2xl border-2 border-solid border-slate-300" />
</div>

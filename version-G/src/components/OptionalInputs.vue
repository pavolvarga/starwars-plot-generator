<template>
  <div class="form-group row">
    <div
      v-for="name in getOptionalNames()"
      :key="name"
      class="col-md-4" >
      <button
        type="button"
        class="btn btn-secondary btn-lg"
        v-bind:disabled="!areMandatoryInputSelected()"
      >
        {{getOptionalButtonLabel(name)}}
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from "vuex";
import { key } from "@/store/store";

export default defineComponent({
  name: 'OptionalInputs',
  setup() {
    const store = useStore(key);

    function getOptionalNames() {
      return store.getters.getOptionalInputs.map(input => input.name);
    }
    function getOptionalButtonLabel(name) {
      const visible = store.getters.isInputVisible(name);
      return visible ? `Remove ${name}` : `Add ${name}`;
    }
    function areMandatoryInputSelected() {
      return store.getters.areMandatoryInputSelected;
    }

    return {
      getOptionalNames,
      getOptionalButtonLabel,
      areMandatoryInputSelected
    };
  }
});
</script>

<style scoped>
</style>

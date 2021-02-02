<template>
  <div class="form-group row">
    <div
      v-for="name in getOptionalNames()"
      :key="name"
      class="col-md-4" >
      <button
        v-bind:id="name"
        type="button"
        class="btn btn-secondary btn-lg"
        v-bind:disabled="!areMandatoryInputSelected() || hasLoadFailed(name)"
        v-on:click="onClick(name)"
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
      const loadingInProgress = store.getters.isLoadingInProgress(name);
      if (loadingInProgress) {
        return `Loading ${name}`;
      }
      const visible = store.getters.isInputVisible(name);
      return visible ? `Remove ${name}` : `Add ${name}`;
    }
    function areMandatoryInputSelected() {
      return store.getters.areMandatoryInputSelected;
    }
    function hasLoadFailed(name) {
      return store.getters.hasLoadFailed(name);
    }
    function onClick(name) {
      if (!store.getters.isInputDataLoaded(name)) {
        store.dispatch("setVisibility", { name, visible: true });
        store.dispatch("loadResource", { name });
      }
      else {
        store.dispatch("toggleVisibility", { name });
      }
    }

    return {
      getOptionalNames,
      getOptionalButtonLabel,
      areMandatoryInputSelected,
      onClick,
      hasLoadFailed,
    };
  }
});
</script>

<style scoped>
</style>

<template>
  <form v-if="isMandatoryDataLoaded()">
    <div class="form-group row">
      <div class="col-md-12 text-left">
        <label class="col-form-label-lg" for="character">Character</label>
        <input
          id="character"
        />
      </div>
    </div>
    <div class="form-group row">
      <div class="col-md-12 text-left">
        <label class="col-form-label-lg" for="planet">Planet</label>
        <input
          id="planet"
        />
      </div>
    </div>
  </form>
  <div class="row" v-if="hasLoadingOfMandatoryDataFailed()">
    <div class="col-lg-12">
      <div class="alert alert-danger" role="alert">
        Loading of mandatory data failed, please try again later.
      </div>
    </div>
  </div>
  <div class="row" v-if="!isMandatoryDataLoaded() && !hasLoadingOfMandatoryDataFailed()">
    <div class="col-md-12">
      <h3>Please wait while star wars data is being loaded</h3>
      <div class="spinner-border" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
import { key } from "@/store/store";

export default defineComponent({
  name: 'HomePage',
  setup() {
    const store = useStore(key);
    store.dispatch("loadMandatoryResources");

    function isMandatoryDataLoaded() {
      return store.getters.isMandatoryDataLoaded;
    }
    function hasLoadingOfMandatoryDataFailed() {
      return store.getters.hasLoadingOfMandatoryDataFailed;
    }

    return {
      isMandatoryDataLoaded,
      hasLoadingOfMandatoryDataFailed,
    }
  },
  data() {
    return {};
  }
})
</script>

<style scoped>
input {
  display: block;
  width: 100%;
}
.spinner-border {
  width: 5rem;
  height: 5rem;
}
</style>

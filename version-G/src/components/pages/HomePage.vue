<template>
  <form v-if="isMandatoryDataLoaded()">
    <star-wars-search
      v-for="input in getVisibleInputs()"
      :key="input.name"
      :name="input.name"
      :label="input.label">
    </star-wars-search>
    <optional-inputs v-if="getVisibleInputs().length > 0"></optional-inputs>
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
import StarWarsSearch from "@/components/StarWarsSearch";
import OptionalInputs from "@/components/OptionalInputs";

export default defineComponent({
  name: 'HomePage',
  components: {
    StarWarsSearch,
    OptionalInputs,
  },
  setup() {
    const store = useStore(key);
    store.dispatch("loadMandatoryResources");

    function getVisibleInputs() {
      return store.getters.getVisibleInputs;
    }
    function isMandatoryDataLoaded() {
      return store.getters.isMandatoryDataLoaded;
    }
    function hasLoadingOfMandatoryDataFailed() {
      return store.getters.hasLoadingOfMandatoryDataFailed;
    }

    return {
      hasLoadingOfMandatoryDataFailed,
      isMandatoryDataLoaded,
      getVisibleInputs
    }
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

<template>
  <div class="form-group row" v-if="getFailedOptionalResourceNames().length > 0">
    <div class="col-md-12" v-for="name in getFailedOptionalResourceNames()" :key="name">
      <div class="alert alert-danger" role="alert">
        Loading of {{name}} failed, please try again later.
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from "vuex";
import { key } from "@/store/store";

export default defineComponent({
  name: 'LoadFailedAlerts',
  setup() {
    const store = useStore(key);

    function getFailedOptionalResourceNames() {
      return store.getters.getFailedOptionalInputNames;
    }

    return {
      getFailedOptionalResourceNames,
    };
  }
});

</script>

<style scoped>
</style>

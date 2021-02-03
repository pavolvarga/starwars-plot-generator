<template>
  <div class="form-group row">
    <div class="col-md-12 text-left">
      <label class="col-form-label-lg" v-bind:for="name">{{ getLabel() }}</label>
      <!-- Currently (02.02.2021) there is no viable auto-complete component for VUE 3, fall back to simple but working select -->
      <select
        class="form-control"
        v-bind:id="name"
        v-bind:name="name"
        v-on:change="select"
        v-bind:disabled="isDisabled()">
        <option
          :selected="getSelected() === undefined"
          value>
          -- Select {{ getLabel() }} --
        </option>
        <option
          v-for="option in getOptions()"
          v-bind:value="option.url"
          v-bind:key="option.name"
          :selected="getSelected() === name">
          {{option.name}}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from "vuex";
import { key } from "@/store/store";

export default defineComponent({
  name: 'StarWarsSearch',
  props: {
    name: String,
  },
  setup(props) {
    const store = useStore(key);
    // eslint-disable-next-line vue/no-setup-props-destructure
    const { name } = props;

    function select(event) {
      const url = event.target.value;
      const suggestion = getOptions().find(s => s.url === url);
      store.dispatch("selectValue", { name, selected: suggestion });
    }
    function isDisabled() {
      return store.getters.isLoadingInProgress(name) || store.getters.hasLoadFailed(name);
    }
    function getSelected() {
      return store.getters.getSelected(name);
    }
    function getLabel() {
      return store.getters.getLabel(name);
    }
    function getOptions() {
      const data = store.getters.getData(name);
      // get rid of proxy wrapping and just get the data
      return Object
        .values(Object.assign({}, data))
        .map(v => Object.assign({}, v));
    }

    return {
      getOptions,
      select,
      isDisabled,
      getSelected,
      getLabel,
    }
  }
});
</script>

<style scoped>
select {
  display: block;
  width: 100%;
}
</style>

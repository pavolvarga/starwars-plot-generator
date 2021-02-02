<template>
  <div class="form-group row">
    <div class="col-md-12 text-left">
      <label class="col-form-label-lg" v-bind:for="name">{{ label }}</label>
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
          -- Select {{label}} --
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
    label: String,
    data: Array,
  },
  setup(props) {
    const store = useStore(key);

    // eslint-disable-next-line vue/no-setup-props-destructure
    const { name, data } = props;

    // get rid of proxy wrapping and just get the data
    const suggestions = Object
      .values(Object.assign({}, data))
      .map(v => Object.assign({}, v));

    function getOptions() {
      return suggestions;
    }
    function select(event) {
      const url = event.target.value;
      const suggestion = suggestions.find(s => s.url === url);
      store.dispatch("selectValue", { name, selected: suggestion });
    }
    function isDisabled() {
      return store.getters.isLoadingInProgress(name) || store.getters.hasLoadFailed(name);
    }
    function getSelected() {
      return store.getters.getSelected(name);
    }

    return {
      getOptions,
      select,
      isDisabled,
      getSelected,
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

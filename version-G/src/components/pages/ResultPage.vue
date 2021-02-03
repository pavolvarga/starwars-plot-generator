<template>
  <div class="row">
    <div class="col-md-12">
      <h2>{{getPlot().title}}</h2>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <p class="plot-text" v-html="getPlot().description">
      </p>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <h3>Used resources</h3>
      <ul class="used-resources">
        <li v-for="resource in getUsedResources()" v-bind:key="resource.name">
          <a v-bind:href="resource.url">{{resource.url}}</a>
        </li>
      </ul>
    </div>
  </div>
  <div class="row">
    <div class="col-md-12">
      <button
        type="button"
        class="btn btn-primary btn-lg"
        v-on:click="onClick()"
      >
        Generate New Plot
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { key } from "@/store/store";
import { generatePlot } from "@/utils/plotGenerator";

export default defineComponent({
  name: 'ResultPage',
  setup() {
    const store = useStore(key);
    const router = useRouter()

    function getPlot() {
      const selected = store.getters.getSelectedSuggestions;
      return generatePlot(...(selected.map(i => i.value.name)));
    }
    function getUsedResources() {
      return store.getters.getSelectedSuggestions.map(s => s.value);
    }
    function onClick() {
      // if returning from the /result page, reset selected values to start from the beginning
      store.dispatch("resetSelected");
      store.dispatch("hideOptionalInputs");
      router.push('home');
    }

    return {
      getPlot,
      getUsedResources,
      onClick,
    };
  }
})
</script>

<style>
.used-resources {
  font-family: 'Comic Sans, Comic Sans MS, cursive;', serif;
  font-size: larger;
  list-style: none;
}

.plot-text {
  font-size: large;
  font-family: 'Comic Sans, Comic Sans MS, cursive;', serif;
  color: yellow;
  background: black;
  text-align: justify;
  padding: 10px;
}

.highlight-word {
  color: orangered;
}
</style>

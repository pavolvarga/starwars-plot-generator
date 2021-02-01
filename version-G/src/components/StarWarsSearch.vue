<template>
  <div class="form-group row">
    <div class="col-md-12 text-left">
      <label class="col-form-label-lg" v-bind:for="name">{{ label }}</label>
      <input
        v-bind:id="name"
      />
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'StarWarsSearch',
  props: {
    name: String,
    label: String,
  }
});
</script>

<style scoped>
input {
  display: block;
  width: 100%;
}
</style>

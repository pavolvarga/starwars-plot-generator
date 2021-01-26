<template>
  <header>
    <h1>{{ header }}</h1>
  </header>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  data: function() {
    return {
      header: 'Star Wars Plot Generator'
    }
  }
})
</script>

<style scoped>
  header {
    width: 100%;
  }
</style>

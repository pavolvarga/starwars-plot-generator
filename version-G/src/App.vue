<template>
  <div class="container-lg text-center">
    <the-header></the-header>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader';

export default {
  components: {
    TheHeader
  }
}
</script>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}
</style>

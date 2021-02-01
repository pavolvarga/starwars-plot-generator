<template>
  <div class="container-lg text-center">
    <the-header></the-header>
    <div class="row">
      <div class="col-md-12">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import TheHeader from '@/components/TheHeader';

export default defineComponent({
  components: {
    TheHeader
  }
})
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

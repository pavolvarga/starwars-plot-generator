<template>
  <header>
    <h1>{{ header }}</h1>
  </header>
</template>

<script>
module.exports = {
  data: function() {
    return {
      header: 'Star Wars Plot Generator'
    }
  }
}
</script>

<style scoped>
  header {
    width: 100%;
  }
</style>

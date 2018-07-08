<template>
  <div class="wrapper">
    <div class="hello" data-text="PostCSS Glitch">PostCSS Glitch</div>
  </div>
</template>

<script>
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wrapper {
    position: relative;
  }
  .hello {
    font-weight: 700;
    font-size: 23pt;
    glitch: 42px #f00 #00f 2px;
  }
</style>

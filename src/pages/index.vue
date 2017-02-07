<template>
  <div>
    <div class="page-title">
      <h1>Mint UI</h1>
    </div>
    <div class="projects">
      <mt-cell title="color-picker" :is-link="true" to="/colorPicker"></mt-cell>
      <mt-cell title="gesture" :is-link="true" to="/gesture"></mt-cell>
    </div>
  </div>
</template>

<style lang="scss" rel="stylesheet/scss">
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .slideFromBottom-enter, .slideFromBottom-leave-to {
    transform: translate3d(0, 100%, 0);
  }

  .slideFromBottom-enter-active, .slideFromBottom-leave-active {
    transition: transform .5s;
  }
</style>


<script lang="es6">
  export default {};
</script>

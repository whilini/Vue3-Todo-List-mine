<template>
  <div class="spinner-container">
    <div
      class="spinner-border"
      role="status">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 2
    },
    absolute: {
      type: Boolean,
      default: false
    },
    fixed: {
      type: Boolean,
      default: false
    },
    zIndex: {
      type: Number,
      default: 0
    }
  },
}
</script>

<style lang="scss" scoped>
@keyframes spinner {
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  } 
}
.spinner-container {
  margin: auto;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  .spinner-border {
    animation-name: spinner;
    animation-duration: .5s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}
</style>
<template>
  <div class="hero">
    <h1 class="tagline">this is {{projectName}}</h1>
  </div>
</template>

<script>
export default {
  name: "Hero",
  props: {
    projectName: {
      type: String,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
.hero {
  @apply p-xxxl;
}
</style>

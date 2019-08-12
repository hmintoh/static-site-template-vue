<template>
  <div class="hero">
    <img src="/_assets/images/prototype.png" />
    <h1 class="tagline">welcome to {{projectName}}</h1>
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  img {
    width: 20%;
  }

  h1 {
    @apply p-xxxl text-gray-400;
  }
}
</style>

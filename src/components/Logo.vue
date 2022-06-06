<template>
  <RouterLink
    to="/"
    class="logo">
    CREATE<br />
    <span>TODO</span>
  </RouterLink>
</template>

<style lang="scss" scoped>
.logo {
  font-family: "Syntha-Nova", sans-serif;
  font-size: 24px;
  color: $black;
  text-decoration: none;
  line-height: 95%;
  margin-right: 30px;
  &:hover {
    color: $black
  }
  span {
    font-family: "Syntha-Nova-Black";
    color: $primary;
    font-size: 32px;
  }
}
</style>

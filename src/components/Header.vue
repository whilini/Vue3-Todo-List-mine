<template>
  <header>
    <div class="container">
      <Logo />
      <div class="nav nav-pills">
        <div
          v-for="nav in navigations"
          :key="nav.name"
          class="nav-item">
          <RouterLink
            :to="nav.href"
            active-class="active"
            :class="{ active: isMatch(nav.path)}"
            class="nav-link">
            {{ nav.name }}
          </RouterLink>
        </div>
      </div>
    </div>
    <div
      class="user"
      @click="toAbout">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import { mapState } from 'vuex'
import Logo from './Logo.vue'
export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: 'ToDo',
          href: '/'
        },
        {
          name: 'About',
          href: '/about'
        }
      ],
    }
  },
  computed: {
    ...mapState('about', [
      'image',
      'name'
    ]),
  },
  methods: {
    isMatch(path) {
      if (!path) return false
      return path.test(this.$route.fullPath)
    },
    toAbout() {
      this.$router.push('/about')
    }
  },
}
</script>

<style lang="scss" scoped>
header {
  font-family: "Multicolore", sans-serif;
  font-size: 14px;
  margin: 0 auto 20px;
  width: max(60vw, 800px);
  height: 70px;
  padding: 0 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: relative;
  .container {
    display: flex;
    .nav-link {
      text-align: center;
      width: 100px;
    }
  }
  .user {
    right: 0;
    width: 50px;
    height: 50px;
    padding: 6px;
    border-radius: 50%;
    background-color: $gray-200;
    cursor: pointer;
    top: 0;
    bottom: 0;
    right: 50px;
    transition: .3s;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
}
</style>

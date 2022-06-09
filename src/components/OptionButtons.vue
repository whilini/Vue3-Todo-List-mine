<template>
  <div class="container">
    <ul class="nav nav-tabs">
      <li
        v-for="nav in navigations"
        :key="`/todo/${nav.href}`"
        class="nav-item">
        <button
          :class="`nav-link ${type === nav.href ? 'active' : ''}`"
          active-class="active"
          @click="updateType(nav.href)">
          {{ nav.name }}
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return{
      navigations:[
        {
          name: 'ALL',
          href: 'all'
        },
        {
          name: 'DONE',
          href: 'done'
        },
        {
          name: 'NOT YET',
          href: 'notyet'
        }
      ]
    }
  },
  computed: {
    type() {
      return this.$store.state.todo.type
    }
  },
  methods: {
    routeLink(path) {
      this.$router.push(path)
      return
    },
    updateType(type) {
      this.$store.dispatch('todo/updateType', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  margin-top: 70px;
  .nav {
      .nav-item {
        .nav-link {
          width: 126px;
          font-family: 'Multicolore', sans-serif;
      }
    }
  }
}
</style>
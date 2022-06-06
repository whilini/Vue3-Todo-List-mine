<template>
  <TodayDate />
  <CreateTodo />
</template>

<script>
import CreateTodo from '@/components/CreateTodo.vue'
import TodayDate from '@/components/TodayDate.vue'

export default {
  components: {
    CreateTodo,
    TodayDate
},
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>

</style>

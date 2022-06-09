<template>
  <TodayDate />
  <CreateTodo />
  <TodoList />
</template>

<script>
import CreateTodo from '@/components/CreateTodo.vue'
import TodayDate from '@/components/TodayDate.vue'
import TodoList from '@/components/TodoList.vue'

export default {
  components: {
    CreateTodo,
    TodayDate,
    TodoList
  },
}
</script>

<style lang="scss" scoped>

</style>

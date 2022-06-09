<template>
  <OptionButtons />
  <div class="box-container">
    <div class="list-box container">
      <TodoCard
        v-for="(todo, idx) in todos"
        :key="todo.id"
        :day-slot="daySlots[idx]"
        :todo="todo" />
    </div>
  </div>
</template>

<script>
import OptionButtons from '@/components/OptionButtons.vue'
import TodoCard from "./TodoCard.vue"

export default {
  components: {
    TodoCard,
    OptionButtons,
  },
  computed: {
    type() {
      return this.$store.state.todo.type
    },
    todos() {
      const todoList = this.$store.state.todo.todos
      const todoType = this.type;
      if (todoType === 'all') return todoList

      const result = todoType === 'done' ? todoList.filter((todo) => todo.done ) : todoList.filter((todo) => !todo.done)
      return result
    },
    daySlots() {
      const res = this.$store.state.todo.todos
      if(!res) return 

      const daySlots = res.map((item) => {
        return item.title.slice(-1)
      });
      
      return daySlots
    }
  },
  created() {
    this.readTodos()
  },
  methods: {
    async readTodos() {
      this.$store.dispatch('todo/readTodos')
    }
  },
}
</script>

<style lang="scss" scoped>
.box-container {
  display: flex;
  .list-box {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    height: 100%;
    background-color: $gray-200;
    left: 35%;
    border-radius: 10px;
  }
}
</style>

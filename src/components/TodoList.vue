<template>
  <OptionButtons />
  <div class="box-container">
    <div class="list-box container">
      <div
        v-if="storeTodo.length === 0"
        class="default-message">
        <p>{{ defaultMessage['all'] }}</p>
      </div>
      <div
        v-else-if="todos.length === 0"
        class="default-message">
        <p>{{ defaultMessage[type] }}</p>
      </div>
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
  data() {
    return {
      defaultMessage: {
        'all': "Let us create TODO! 📝",
        'done': "There is nothing Done 😓",
        'notyet': "You did all Done! 👍"
      }
    }
  },
  computed: {
    storeTodo() {
      return this.$store.state.todo.todos
    },
    type() {
      return this.$store.state.todo.type
    },
    todos() {
      const todoList = this.storeTodo
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
    display: block;
    height: 100%;
    min-height: 330px;
    background-color: $gray-200;
    left: 35%;
    border-radius: 10px;
    .default-message {
      display: block;
      margin: auto;
      padding-top: 130px;
      p {
        font-family: 'Multicolore', sans-serif;
        font-size: 30px;
        color: $gray-500;
      }
    }
  }
}
</style>

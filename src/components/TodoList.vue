<template>
  <OptionButtons />
  <div class="box-container container">
    <Loader
      v-if="loading" />
    <div
      v-else
      class="list-box container">
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
      <div v-if="type === 'done' && !(todos.length === 0)">
        <button
          class="delete-all btn btn-secondary"
          @click="deleteAll">
          Delete All
        </button>
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
import Loader from './Loader.vue'
import TodoCard from "./TodoCard.vue"

export default {
  components: {
    TodoCard,
    OptionButtons,
    Loader
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
    loading() {
      return this.$store.state.todo.loading
    },
    storeTodo() {
      return this.$store.state.todo.todos
    },
    type() {
      return this.$store.state.todo.type
    },
    todos() {
      const todoList = this.storeTodo
      const todoType = this.type;
      let result
      
      switch(todoType) {
        case 'all':
          result = todoList
          break;
        case 'done':
          result = todoList.filter((todo) => todo.done)
          break
        case 'notyet':
          result = todoList.filter((todo) => !todo.done)
          break
      }
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
    },
    deleteAll() {
      if(!this.type === 'done') return
      const res = this.storeTodo.filter((todo) => todo.done)
      this.$store.dispatch('todo/deleteAll', res)
    }
  },
}
</script>

<style lang="scss" scoped>
.box-container {
  display: flex;
  min-height: 330px;
  background-color: $gray-200;
  border-radius: 10px;
  .list-box {
    display: block;
    height: 100%;
    left: 35%;
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
.delete-all {
  display: block;
  margin-top: 20px;
  margin-left: auto;
  right: 20px;
  font-size: 20px;
  color: #fff;
  font-family: 'Multicolore', sans-serif;
  position: relative;
  z-index: 2;
}
</style>

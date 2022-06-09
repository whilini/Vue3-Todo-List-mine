<template>
  <div :class="`todo-card ${done ? 'done' : ''}`">
    <div
      v-if="show"
      class="todo off-edit">
      <div class="off-title">
        <p>{{ newDate }}</p>
        <img
          :src="require(`@/assets/${daySlot}.png`)"
          alt="" />
      </div>
      <p>{{ newTitle }}</p>
      <div
        class="form-check form-switch d-flex justify-content-center"
        :value="todo.done"
        @click="changeTodo('checkbox')">
        <input
          id="flexSwitchCheckDefault"
          data-bs-toggle="tooltip"
          data-bs-placement="top"
          :title="!todo.done ? 'Done? check here!':'Not yet? check here!'"
          class="form-check-input"
          type="checkbox"
          role="switch"
          :checked="todo.done" />
      </div>
      <div class="btn-container">
        <button
          class="btn btn-primary"
          @click="editButton">
          수정
        </button>
        <button
          class="btn btn-primary"
          @click="deleteTodo(todo.id)">
          삭제
        </button>
      </div>
    </div>
    <div
      v-else
      class="on-edit todo">
      <div class="selcts d-flex">
        <select
          v-for="date in chooseDate"
          :key="date.name"
          v-model="$data[date.name]"
          class="form-select">
          <option
            v-for="item in date.items"
            :key="item">
            {{ item }}
          </option>
        </select>
        <select
          v-model="day"
          class="form-select">
          <option
            v-for="chooseDay in days[Number(month)-1]"
            :key="chooseDay">
            {{ chooseDay }}
          </option>  
        </select>
        <select
          v-model="slot"
          class="form-select">
          <option
            disabled
            selected
            hidden>
          </option>
          <option
            v-for="timezone in Object.keys(slots)"
            :key="timezone"
            :value="slots[timezone]">
            {{ timezone }}
          </option>
        </select>
      </div>
      <input
        class="form-control"
        :value="title"
        @input="title = $event.target.value"
        @keypress.enter="changeTodo('submit')" />
      <button
        class="btn btn-primary"
        @click="changeTodo('submit')">
        수정 완료
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: {
      type: Object,
      default: () => {}
    },
    daySlot: {
      type: String,
      default: '0'
    }
  },
  data() {
    return {
      show: true,
      title: this.todo.title.split(':')[1],
      done: this.todo.done,
      slot: (() => {
        const slot = this.daySlot
        return slot
      })(),
      slots: {'아침': '1', '오후': '2', '저녁': '3', '밤': '4'},
      year: (() => {
        const year = this.todo.title.split(' ')[0].substring(0, 4)
        return year
      })(),
      month: (() => {
        const date = this.todo.title.split(':')[0];
        const res = date.split(' ');
        const month = res[1].slice(0, res[1].length-1);
        return month
      })(),
      day: (() => {
        const date = this.todo.title.split(':')[0];
        const res = date.split(' ');
        const day = res[2].slice(0, res[2].length-1);
        return day
      })(),
      days: (() => {
        const months = {'1': 31, '2': 28, '3': 31, '4': 30, '5': 31, '6': 30, '7': 31, '8': 31, '9': 30, '10': 31, '11': 30, '12': 31}

        const result = []
        Object.keys(months).forEach((key) => {
          const day = months[key]
          result.push(Array.from({length: day}, (_, i) => i+1))
        })

        return result 
      })(),
      chooseDate: [
        {
          name: 'year',
          items: (() => {
            const years = []
            const thisYear = new Date().getFullYear()
            for (let i = thisYear; i <= (thisYear + 20); i += 1) {
              years.push(i)
            }
            return years
          })()
        },
        {
          name: 'month',
          items: (() => {
            const months = []
            for (let i = 1; i < 13; i += 1) {
              months.push(i)
            }
            return months
          })()
        },
      ],
    }
  },
  computed: {
    newTitle() {
      return this.todo.title.split(':')[1]
    },
    newDate() {
      return this.todo.title.split(':')[0]
    },
  },
  methods: {
    editButton() {
      return this.show = !this.show
    },
    async deleteTodo(id) {
      this.$store.dispatch('todo/deleteTodo', {
        id: id
      })
    },
    async changeTodo(button) {
      if(!this.title.trim()) return
      
      if(button === 'checkbox') this.done = !this.done
      
      const todoDate = (this.year + '년 ' + this.month + '월 ' + this.day + '일')
      this.$store.dispatch('todo/updateTodo', {
        id: this.todo.id,
        done: this.done,
        title: todoDate + ':' + this.title + ':' + this.slot
      })

      if (button === 'checkbox') return
      this.editButton()
    },
  }
}
</script>

<style lang="scss" scoped>
.todo-card {
  flex-shrink: 0;
  width: 100%;
  height: 60px;
  margin: 20px auto 20px;
  border-radius: 10px;
  background-color: $white;
  transition: all .3s;
  
  .off-edit {
    display: flex;
    margin: auto;
    height: 100%;
    .off-title {
      display: flex;
      align-items: center;
      p {
        font-family: 'NanumBarunpenB', sans-serif;
        font-size: 24px;
        margin-left: 20px;
        margin-right: 10px;
        width: 160px;
      }
      img {
        width: 30px;
        height: auto;
      }
    }
    p {
      font-family: 'NanumBarunpenB', sans-serif;
      font-size: 24px;
      margin: auto;
      padding: 0;
    }
    .form-check {
      margin: 15px 0 15px;
      width: 50px;
      input {
        transform: scale(1.3);
        margin-right: 10px;
      }
    }
    .btn-container {
      margin: auto 10px;
      display: flex;
      .btn-primary {
      font-family: 'NanumSquareRoundEB', sans-serif;
      width: 70px;
      height: 36px;
      color: $white;
      margin-right: 10px;
      }
    }
  }
  .on-edit {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    height: 100%;
    .selcts {
      display: flex;
      margin-left: 5px;
      select {
        width: 90px;
        margin-left: 10px;
      }
    }
    input {
      margin: auto 10px;
      width: 100%;
    }
    .btn-primary {
      right: 15px;
      font-family: 'NanumSquareRoundEB', sans-serif;
      width: 90px;
      height: 36px;
      color: $white;
      margin-right: 10px;
      flex-shrink: 0;
    }
  }
  
}
.done {
  background-color: $gray-300;
  transition: all .2s;
  color: rgb(166, 173, 180);
  img {
    opacity: .3;
  }
  .btn {
    opacity: .6;
  }
}

</style>
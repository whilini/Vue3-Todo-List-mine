<template>
  <div class="card">
    <div
      v-if="show"
      class="card-body off-edit">
      <div class="card-title">
        <h5>{{ newDate }}</h5>
        <h4> {{ newTitle }}</h4>
        <img
          :src="require(`@/assets/${daySlot}.png`)"
          alt="" />
      </div>
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
    <div
      v-else
      class="on-edit card-body">
      <div class="selcts d-flex">
        <select
          v-for="date in chooseDate"
          :key="date.name"
          v-model="$data[date.name]"
          class="form-select-sm">
          <option
            v-for="item in date.items"
            :key="item">
            {{ item }}
          </option>
        </select>
        <select
          v-model="day"
          class="form-select-sm">
          <option
            v-for="chooseDay in days[Number(month)-1]"
            :key="chooseDay">
            {{ chooseDay }}
          </option>  
        </select>
        <select
          v-model="slot"
          class="form-select-sm">
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
      <div class="input-container d-block">
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
.card {
  flex-shrink: 0;
  width: 300px;
  height: 315px;
  margin: 20px auto 10px;
  .off-edit {
    display: block;
    .card-title {
      margin-bottom: 10px;
      img {
        width: 40px;
      }
    }
    .form-check {
      margin: 15px auto 15px;
      input {
        transform: scale(1.3);
        margin-right: 10px;
      }
    }
  }
  .on-edit {
    display: block;
    justify-content: center;
    flex-shrink: 0;
    .selcts-container {
      display: flex;
      .selects {
        display: flex;
      }
    }
  }
  .btn-primary {
    font-family: 'NanumSquareRoundEB', sans-serif;
    width: 70px;
    color: $white;
    margin-right: 10px;
  }
}
</style>
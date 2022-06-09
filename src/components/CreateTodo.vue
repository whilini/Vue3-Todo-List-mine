<template>
  <div class="container">
    <div class="todo-date">
      일정 날짜
    </div>
    <div class="selects">
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
          slot
        </option>
        <option
          v-for="timezone in Object.keys(slots)"
          :key="timezone"
          :value="slots[timezone]">
          {{ timezone }}
        </option>
      </select>
    </div>
  </div>
  <div class="input-container">
    <input
      class="form-control"
      :value="title"
      @input="title = $event.target.value"
      @keypress.enter="createTodo" />
    <button
      class="btn btn-primary"
      @click="createTodo">
      CREATE
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      year: new Date().getFullYear(),
      month: new Date().getMonth() + 1,
      day: new Date().getDate(),
      slot: 'slot',
      slots: {'아침': '1', '오후': '2', '저녁': '3', '밤': '4'},
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
  methods: {
    async createTodo() {
      const nan = this.month + this.day + this.slot
      
      if(!this.title.trim() || isNaN(nan) === true) return
      
      const todoDate = (this.year + '년 ' + this.month + '월 ' + this.day + '일')
      this.$store.dispatch('todo/createTodo', {
        title: todoDate + ':' + this.title + ':' + this.slot,
      })

      this.title = ''
      this.year = new Date().getFullYear()
      this.month = new Date().getMonth() + 1
      this.day = new Date().getDate()
      this.slot = 'slot'
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  font-family: 'NanumSquareRoundEB', sans-serif;
  .todo-date{
    font-size: 20px;
    height: 100%;
    margin-right:15pxs;
  }
  > * {
    flex-shrink: 0;
    height: 38px;
    margin-right: 10px;
    font-size: 15px;
    &:last-child {
      margin-right: 0;
    }
  }
  .selects {
    display: flex;
    text-align: right;
    font-family: 'NanumSquareRoundB', sans-serif;
    select {
      width: 120px;
      margin-right: 10px;
      &:last-child {
        margin-right: 0;
      }
    }
  }
}
.input-container {
  display: flex;
  margin: 20px auto 20px;
  width: 600px;
  flex-shrink: 0;
  input {
    margin-right: 10px;
    text-align: right;
  }
  .btn {
    font-family: "Multicolore", sans-serif;
    flex-shrink: 0;
    color: $white;
    font-size: 14px;
  }
}
</style>

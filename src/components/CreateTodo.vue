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
          :value="date.name"
          disabled
          selected
          hidden>
          {{ date.name }}
        </option>
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
          disabled
          selected
          hidden>
          day
        </option>
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
  <div class="container">
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
      month: 'month',
      day: 'day',
      slot: 'slot',
      slots: {'새벽': 1, '아침': 2, '오후': 3, '저녁': 4},
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
    fillZero() {
      this.month = this.month.toString().length < 2? '0' + this.month : this.month
      this.day = this.day.toString().length < 2? '0' + this.day : this.day
      this.slot = this.slot + '00'
    },
    async createTodo() {
      const todoDate = Number(this.year + this.month + this.day + this.slot)
      
      if(!this.title.trim() || isNaN(todoDate) === true) return

      this.fillZero()
      this.$store.dispatch('todo/createTodo', {
        title: this.title,
        order: todoDate
      })

      this.title = ''
      this.year = new Date().getFullYear()
      this.month = 'month'
      this.day = 'day'
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
.container {
  display: flex;
  margin-bottom: 10px;
  width: 625px;
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

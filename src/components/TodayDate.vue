<template>
  <p>{{ date.year }}년 {{ date.month }}월 {{ date.day }}일</p>
</template>

<script>
export default {
  data() {
    return {
      date: (() => {
          const thisYear = new Date().getFullYear()
          const thisMonth = new Date().getMonth()
          const thisDay = new Date().getDate()
          return {
            year: thisYear,
            month: thisMonth,
            day: thisDay
          }
      })()
    }
  }
}
</script>

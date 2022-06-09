<template>
  <div class="container">
    <p>
      {{ date.year }}년 {{ date.month }}월 {{ date.day }}일
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: true,
      date: (() => {
          const thisYear = new Date().getFullYear()
          const thisMonth = new Date().getMonth()
          const thisDay = new Date().getDate()
          return {
            year: thisYear,
            month: thisMonth + 1,
            day: thisDay
          }
      })()
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('https://fonts.googleapis.com/css2?family=Do+Hyeon&display=swap');
.container {
  margin: 30px auto 30px;
  p {
    font-family: 'Do Hyeon', sans-serif;
    font-size: 28px;
  }
}
</style>

# 📌 할 일 관리(Todo) 프로젝트

## 요구사항

### 필수 요구사항

- [x] 할 일 목록(list)을 조회(Read)할 수 있어야 합니다.
- [x] 할 일 항목(item)을 추가(Create)할 수 있어야 합니다.
- [x] 할 일 항목을 수정(Update)할 수 있어야 합니다.
- [x] 할 일 항목을 삭제(Delete)할 할 수 있어야 합니다.
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### 선택 요구사항

- [ ] 할 일 항목의 순서를 바꿀 수 있도록 만들어 보세요.
- [x] 할 일을 완료하지 않은 항목과 완료한 항목을 분류해서 출력해 보세요.
- [x] 할 일을 완료한 항목을 한번에 삭제할 수 있도록 만들어 보세요.
- [ ] 할 일 항목의 최신 수정일을 표시해 보세요.
- [x] 최초 API 요청(Request)에 대한 로딩 애니메이션을 추가해 보세요.
- [x] SCSS, Bootstrap 등을 구성해 프로젝트를 최대한 예쁘게(?) 만들어 보세요.


# 💡CUSTOM


**💡하루 중에서도 시간대를 나누어  선택할 수 있도록 하고 할일의 마지막에 시간대(아침, 점심, 저녁, 밤)를 표시**

```jsx
async createTodo() {
  const nan = this.month + this.day + this.slot
  // 할일 또는 날짜를 하나라도 지정하지 않았을 때에는 동작하지 않도록 함
  if(!this.title.trim() || isNaN(nan) === true) return

  this.month = this.month.toString().length < 2? '0' + this.month : this.month
  this.day = this.day.toString().length < 2? '0' + this.day : this.day

	const todoDate = (this.year + this.month + this.day)

  this.$store.dispatch('todo/createTodo', {
    title: this.title + ':' + this.slot,
    order: todoDate
  })
	// select option 초기화
  this.title = ''
  this.year = new Date().getFullYear()
  this.month = 'month'
  this.day = 'day'
  this.slot = 'slot'
}
```
<br />

**💡title에 추가한 `‘:+this.slot’`을 제외한 할일 부분만 출력**

```jsx
newTitle() {
  return this.todo.title.split(':')[0]
}
```
<br>

**💡일정이 없을 때의 기본 메세지와 일정이 있을 때의 기본 메세지를 다르게 출력**

```jsx
<template>
	<div
		// API에 등록된 todo가 없을 때
	  v-if="storeTodo.length === 0"
	  class="default-message">
	  <p>{{ defaultMessage['all'] }}</p>
	</div>
	<div
		// API에 등록된 todo는 있지만 done 또는 notyet에서 빈칸일 때
	  v-else-if="todos.length === 0"
	  class="default-message">
	  <p>{{ defaultMessage[type] }}</p>
	</div>
</template>

<script>
export default {
	data() {
    return {
      defaultMessage: {
        'all': "Let us create TODO! 📝",
        'done': "There is nothing Done 😓",
        'notyet': "You did all Done! 👍"
      }
    }
  }
}
</script>
```

<br>

**💡’모두 삭제’ 버튼을 ‘done’ 목록을 볼 때만 뜨도록 함**

```jsx
<div v-if="type === 'done' && !(todos.length === 0)">
  <button
    class="delete-all btn btn-secondary"
    @click="deleteAll">
    Delete All
  </button>
</div>
```
<br>

**💡’done’과 ‘not yet’을 computed로 필터링함**

```jsx
todos() {
  const todoList = this.storeTodo
  const todoType = this.type;
  let result
      
  switch(todoType) {
    case 'all':
      result = todoList
      break
    case 'done':
      result = todoList.filter((todo) => todo.done)
      break
    case 'notyet':
      result = todoList.filter((todo) => !todo.done)
      break
  }
  return result
}
```

# ⚠️Issue

**⚠️`new Date().getMonth()`로 오늘 날짜를 가져오려 했으나 5월이라고 출력**

❗문서를 찾아보니 January는 0으로 표기됨. 월은 0부터 시작한다고 함.

```jsx
const thisYear = new Date().getFullYear()
const thisMonth = new Date().getMonth()
const thisDay = new Date().getDate()
return {
  year: thisYear,
  month: thisMonth + 1,
  day: thisDay
}
```

**⚠️월마다 일수가 다르므로 모두 다르게 등록해야함(윤달까지 계산하기에는 시간이 부족ㅠㅠ)**

```jsx
days: (() => {
	// 월마다 마지막 일을 등록
  const months = {'1': 31, '2': 28, '3': 31, '4': 30, '5': 31, '6': 30, '7': 31, '8': 31, '9': 30, '10': 31, '11': 30, '12': 31}

	// 일(day)을 넣어줄 빈 리스트를 만들고
  const result = []
	// months의 key값을 순차적으로 순회를 하며
  Object.keys(months).forEach((key) => {
	// day라는 지역변수에 months의 value값인 31, 28, 31, 30...을 할당
    const day = months[key]
	// 2월이면 length가 28이고 0부터 28개(27까지)의 숫자를 만들고 그 요소에 각 1씩 더해준 값을 result에 push
    result.push(Array.from({length: day}, (_, i) => i+1))
  })

  return result 
})(),
```
<br>

**⚠️할일 완료 버튼과 할일 수정 버튼의 methods가 같으나 수정 버튼을 눌렀을 때만 edit모드가 켜졌으면 함**

```jsx
async changeTodo(button) {
	// 할일 완료 버튼일 때는 edit모드 전환이 일어나지 않음
  if (button === 'checkbox') return
  this.editButton()
},
```

## 후기
항상 시간에 쫓기듯 과제하긴 했지만 이번은 더 심각했다.. 강의 듣는 것에 너무 욕심 부린 나머지 일주일도 안되는 시간동안 만들어서 선택 항목을 다 구현하지는 못한 것이 아쉽다. 그래도 이로써 API 다루는 방법을 좀 더 알게된 것 같아 뿌듯하다!
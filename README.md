# π ν  μΌ κ΄λ¦¬(Todo) νλ‘μ νΈ

### λ°°ν¬ μ¬μ΄νΈ
[Todo list with Vue3](https://animated-llama-a2d661.netlify.app/)

## μκ΅¬μ¬ν­

### νμ μκ΅¬μ¬ν­

- [x] ν  μΌ λͺ©λ‘(list)μ μ‘°ν(Read)ν  μ μμ΄μΌ ν©λλ€.
- [x] ν  μΌ ν­λͺ©(item)μ μΆκ°(Create)ν  μ μμ΄μΌ ν©λλ€.
- [x] ν  μΌ ν­λͺ©μ μμ (Update)ν  μ μμ΄μΌ ν©λλ€.
- [x] ν  μΌ ν­λͺ©μ μ­μ (Delete)ν  ν  μ μμ΄μΌ ν©λλ€.
- [x] μ€μ  μλΉμ€λ‘ λ°°ν¬νκ³  μ κ·Ό κ°λ₯ν λ§ν¬λ₯Ό μΆκ°ν΄μΌ ν©λλ€.

### μ ν μκ΅¬μ¬ν­

- [ ] ν  μΌ ν­λͺ©μ μμλ₯Ό λ°κΏ μ μλλ‘ λ§λ€μ΄ λ³΄μΈμ.
- [x] ν  μΌμ μλ£νμ§ μμ ν­λͺ©κ³Ό μλ£ν ν­λͺ©μ λΆλ₯ν΄μ μΆλ ₯ν΄ λ³΄μΈμ.
- [x] ν  μΌμ μλ£ν ν­λͺ©μ νλ²μ μ­μ ν  μ μλλ‘ λ§λ€μ΄ λ³΄μΈμ.
- [ ] ν  μΌ ν­λͺ©μ μ΅μ  μμ μΌμ νμν΄ λ³΄μΈμ.
- [x] μ΅μ΄ API μμ²­(Request)μ λν λ‘λ© μ λλ©μ΄μμ μΆκ°ν΄ λ³΄μΈμ.
- [x] SCSS, Bootstrap λ±μ κ΅¬μ±ν΄ νλ‘μ νΈλ₯Ό μ΅λν μμκ²(?) λ§λ€μ΄ λ³΄μΈμ.


# π‘CUSTOM


**π‘νλ£¨ μ€μμλ μκ°λλ₯Ό λλμ΄  μ νν  μ μλλ‘ νκ³  ν μΌμ λ§μ§λ§μ μκ°λ(μμΉ¨, μ μ¬, μ λ, λ°€)λ₯Ό νμ**

```jsx
async createTodo() {
  const nan = this.month + this.day + this.slot
  // ν μΌ λλ λ μ§λ₯Ό νλλΌλ μ§μ νμ§ μμμ λμλ λμνμ§ μλλ‘ ν¨
  if(!this.title.trim() || isNaN(nan) === true) return

  this.month = this.month.toString().length < 2? '0' + this.month : this.month
  this.day = this.day.toString().length < 2? '0' + this.day : this.day

	const todoDate = (this.year + this.month + this.day)

  this.$store.dispatch('todo/createTodo', {
    title: this.title + ':' + this.slot,
    order: todoDate
  })
	// select option μ΄κΈ°ν
  this.title = ''
  this.year = new Date().getFullYear()
  this.month = 'month'
  this.day = 'day'
  this.slot = 'slot'
}
```
<br />

**π‘titleμ μΆκ°ν `β:+this.slotβ`μ μ μΈν ν μΌ λΆλΆλ§ μΆλ ₯**

```jsx
newTitle() {
  return this.todo.title.split(':')[0]
}
```
<br>

**π‘μΌμ μ΄ μμ λμ κΈ°λ³Έ λ©μΈμ§μ μΌμ μ΄ μμ λμ κΈ°λ³Έ λ©μΈμ§λ₯Ό λ€λ₯΄κ² μΆλ ₯**

```jsx
<template>
	<div
		// APIμ λ±λ‘λ todoκ° μμ λ
	  v-if="storeTodo.length === 0"
	  class="default-message">
	  <p>{{ defaultMessage['all'] }}</p>
	</div>
	<div
		// APIμ λ±λ‘λ todoλ μμ§λ§ done λλ notyetμμ λΉμΉΈμΌ λ
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
        'all': "Let us create TODO! π",
        'done': "There is nothing Done π",
        'notyet': "You did all Done! π"
      }
    }
  }
}
</script>
```

<br>

**π‘βλͺ¨λ μ­μ β λ²νΌμ βdoneβ λͺ©λ‘μ λ³Ό λλ§ λ¨λλ‘ ν¨**

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

**π‘βdoneβκ³Ό βnot yetβμ computedλ‘ νν°λ§ν¨**

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

# β οΈIssue

**β οΈ`new Date().getMonth()`λ‘ μ€λ λ μ§λ₯Ό κ°μ Έμ€λ € νμΌλ 5μμ΄λΌκ³  μΆλ ₯**

βλ¬Έμλ₯Ό μ°Ύμλ³΄λ Januaryλ 0μΌλ‘ νκΈ°λ¨. μμ 0λΆν° μμνλ€κ³  ν¨.

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

**β οΈμλ§λ€ μΌμκ° λ€λ₯΄λ―λ‘ λͺ¨λ λ€λ₯΄κ² λ±λ‘ν΄μΌν¨(μ€λ¬κΉμ§ κ³μ°νκΈ°μλ μκ°μ΄ λΆμ‘±γ γ )**

```jsx
days: (() => {
	// μλ§λ€ λ§μ§λ§ μΌμ λ±λ‘
  const months = {'1': 31, '2': 28, '3': 31, '4': 30, '5': 31, '6': 30, '7': 31, '8': 31, '9': 30, '10': 31, '11': 30, '12': 31}

	// μΌ(day)μ λ£μ΄μ€ λΉ λ¦¬μ€νΈλ₯Ό λ§λ€κ³ 
  const result = []
	// monthsμ keyκ°μ μμ°¨μ μΌλ‘ μνλ₯Ό νλ©°
  Object.keys(months).forEach((key) => {
	// dayλΌλ μ§μ­λ³μμ monthsμ valueκ°μΈ 31, 28, 31, 30...μ ν λΉ
    const day = months[key]
	// 2μμ΄λ©΄ lengthκ° 28μ΄κ³  0λΆν° 28κ°(27κΉμ§)μ μ«μλ₯Ό λ§λ€κ³  κ·Έ μμμ κ° 1μ© λν΄μ€ κ°μ resultμ push
    result.push(Array.from({length: day}, (_, i) => i+1))
  })

  return result 
})(),
```
<br>

**β οΈν μΌ μλ£ λ²νΌκ³Ό ν μΌ μμ  λ²νΌμ methodsκ° κ°μΌλ μμ  λ²νΌμ λλ μ λλ§ editλͺ¨λκ° μΌμ‘μΌλ©΄ ν¨**

```jsx
async changeTodo(button) {
	// ν μΌ μλ£ λ²νΌμΌ λλ editλͺ¨λ μ νμ΄ μΌμ΄λμ§ μμ
  if (button === 'checkbox') return
  this.editButton()
},
```
<br>

**β οΈorderμ κ°μ΄ κ°μ μνμμλ λ¦¬μ€νΈμ μμκ° λ±λ‘λ μμΌλ‘ μ λ ¬λμ§ μκ³  λ¬΄μμλ‘ λ³ν¨**

βcreatedAtμ΄ `new Date()`λ‘ κ³μ° λ  μ μλ κ°μ΄μ΄μ createλ λ μ§λ₯Ό κΈ°μ€μΌλ‘ sort ν¨μλ₯Ό μ

```jsx
readTodos(state, payload) {
  const sorted = payload.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  console.log(sorted)
  state.todos = sorted
}
```

## νκΈ°
ν­μ μκ°μ μ«κΈ°λ― κ³Όμ νκΈ΄ νμ§λ§ μ΄λ²μ λ μ¬κ°νλ€.. κ°μ λ£λ κ²μ λλ¬΄ μμ¬ λΆλ¦° λλ¨Έμ§ μΌμ£ΌμΌλ μλλ μκ°λμ λ§λ€μ΄μ μ ν ν­λͺ©μ λ€ κ΅¬ννμ§λ λͺ»ν κ²μ΄ μμ½λ€. κ·Έλλ μ΄λ‘μ¨ API λ€λ£¨λ λ°©λ²μ μ’ λ μκ²λ κ² κ°μ λΏλ―νλ€!

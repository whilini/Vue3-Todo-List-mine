<template>
  <div class="about">
    <div class="photo">
      <img
        :src="image"
        alt="name" />
    </div>
    <div class="name">
      {{ name }}
    </div>
    <div>{{ email }}</div>
    <div>{{ blog }}</div>
  </div>
</template>


<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState('about',[
      'image',
      'name',
      'email', 
      'blog',
    ]),
  },
}
</script>

<style lang="scss" scoped>
.about {
  text-align: center;
  font-family: 'NanumSquareRoundB', sans-serif;
  font-size: 18px;
  .photo {
    width: 250px;
    height: 250px;
    margin: 40px auto 20px;
    padding: 30px;
    border: 10px solid $gray-300;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    position: relative;
    img {
      width: 100%;
      border-radius: 50%;
    }
  }
  .name {
    font-size: 40px;
    font-family: "Syntha-Nova-Black", sans-serif;
    margin-bottom: 20px;
  }
}
</style>

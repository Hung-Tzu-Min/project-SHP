<template>
  <div class="cc">
    <h2>小名的錢包{{ money }}</h2>
    <button @click="give(50)">給BABA 50元</button>
    <br />
  </div>
</template>

<script>
import Mixin from './myMixin/myMixin'
export default {
  data() {
    return {
      money: 20000,
    };
  },
  mixins:[Mixin],
  
};
</script>

<style scoped>
.cc {
  background-color: aquamarine;
}
</style>
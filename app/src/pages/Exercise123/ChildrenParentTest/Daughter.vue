<template>
  <div class="cc">
    <h2>小洪的錢包{{ money }}</h2>
    <button @click="give(100)">給BABA 100元</button>
    <br />
  </div>
</template>

<script>
import Mixin from './myMixin/myMixin'
export default {
  data() {
    return {
      money: 30000,
    };
  },
  mixins:[Mixin],
 
};
</script>

<style scoped>
.cc {
  background-color: rgb(106, 106, 225);
}
</style>
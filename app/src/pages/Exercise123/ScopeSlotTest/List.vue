<template>
  <ul>
    <li v-for="(item, index) in todos" :key="index">
      <!-- 作用域插槽 -->
      <slot :todo="item"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  props:['todos'],
  };
</script>

<style>
</style>
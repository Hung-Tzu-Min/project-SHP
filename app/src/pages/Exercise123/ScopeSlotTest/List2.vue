<template>
  <ul>
    <li v-for="(item, index) in todos" :key="index">
      <!-- 作用域插槽 -->
      <slot :todo="item" :$index="index"></slot>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    todos: Array,
  },
};
</script>

<style>
</style>
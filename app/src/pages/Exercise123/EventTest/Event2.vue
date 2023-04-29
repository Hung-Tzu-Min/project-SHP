<template>
  <div class="cc">
    <h2>Event2</h2>
    <!-- 下面的@click是原生DOM事件 -->
    <button @click="$emit('click','可以傳送參數click給父組件')">分發自訂義click事件</button>
    <button @click="$emit('xxx','可以傳送參數xxx給父組件')">分發自訂義xxx事件</button>
  </div>
</template>

<script>
export default {
    name: "Event2s",
}
</script>

<style scoped>
.cc{
    background-color: antiquewhite;
}
</style>
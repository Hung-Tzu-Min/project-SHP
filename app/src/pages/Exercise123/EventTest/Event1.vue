<template>
  <div class="cc">
    <h2>Event1</h2>
    <h3>這樣寫@click.native就可以把在組件標籤上的@click轉換成原生的DOM事件</h3>
    <button>點我也會觸發</button>
  </div>
</template>

<script>
export default {
  name: "Event1",
};
</script>

<style scoped>
.cc{
    background-color: aqua;
}
</style>
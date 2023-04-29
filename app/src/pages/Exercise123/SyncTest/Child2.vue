<template>
  <div class="cc">
    <span>小名每次花100元</span>
    <button @click="$emit('update:money',money - 100)">花錢</button>
    爸爸還剩{{ money }}元
  </div>
</template>

<script>
export default {
props:['money']
}
</script>

<style>

</style>
<template>
  <div class="cc">
    <h2>input包裝組件</h2>
    <input
      type="text"
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  props: ['value'],
};
</script>

<style scoped>
.cc {
  background-color: gray;
}
</style>
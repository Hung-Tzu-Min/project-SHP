<template>
  <div>
    <h2>自訂義帶Hover提示的按鈕</h2>
    <!-- 
        當用戶在使用我封裝的按鈕時,需要向HintButton組件傳遞相應的參數 (el-button進行二次封裝)
     -->
    <HintButton
      type="success"
      icon="el-icon-delete"
      size="mini"
      title="提示按鈕"
      @click="handler"
    />
  </div>
</template>

<script>
import HintButton from "./HintButton/index.vue";

export default {
  name: "AttrsListenersTest",
  components: { HintButton },
  methods: {
    handler() {
      alert("666");
    },
  },
};
</script>

<style>
</style>
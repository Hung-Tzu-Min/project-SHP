<template>
  <div>
    <!-- 可以巧妙利用a標籤實現按鈕帶有提示功能 -->
    <a :title="title">
        <!-- 下面的v-bind不可用簡寫,不可用【：】 
             下面的v-on不可用簡寫,不可用【@】 
        -->
        <el-button v-bind="$attrs" v-on="$listeners"></el-button>
    </a>
  </div>
</template>

<script>
export default {
  props: ["title"],
  mounted() {
    //$attrs屬於組件的一個屬性,可以獲取到父組件傳遞過來的props參數
    /*
    另外對於子組件而言,父組件給的數據可以利用props接收,
    但是需注意! 如果子組件通過props接收的屬性,在$attrs屬性當中是獲取不到的
    */
    console.log(this.$attrs);
    //$listeners,也是組件實例自身上的一個屬性,它可以獲取到父組件給子組件,傳遞的自訂義事件
    console.log(this.$listeners)
  },
};
</script>

<style>
</style>
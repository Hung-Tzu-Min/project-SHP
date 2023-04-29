<template>
    <div>
        小名的爸爸現在有{{ money }}元
        <h2>不使用sync修飾符</h2>
        <!-- 
            【:money】父組件給子組件傳遞props
            【@updata:money】給子組件綁定的自訂義事件,只不過名字取叫 "update:money"
            目前的這種操作,其實和v-model很相似,可以實現父子組件數據同步
         -->
        <Child1 :money="money" @update:money="money = $event"/>
        <h2>使用sync修飾符</h2>
        <!-- 
            【:money.sync】
            第1個含意:父組件給子組件傳遞props----money
            第2個含意:給當前子組件綁定一個自訂義事件,而且事件名稱即為update:money
         -->
        <Child2 :money.sync="money"/>
    </div>
</template>

<script>
import Child1 from "./Child1.vue";
import Child2 from "./Child2.vue";
export default {
  name: "SyncTest",
  components: { Child1, Child2 },
  data(){
    return{
        money:1000
    }
  }
};
</script>

<style>
</style>
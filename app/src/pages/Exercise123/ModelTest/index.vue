<template>
  <div>
    <h2>深入v-model</h2>
    <input type="text" v-model="keyword"/>
    <span>{{ keyword }}</span>
    <hr/>
    <h2>v-model實現原理(vue2)</h2>
    <!-- 
        原生DOM當中是有oninput事件,它經常結合表單元素一起使用,當表單元素的文本內容發生變化的
        時候就會發出一次回調
        vue2當中:可以通過value與input事件實現v-model功能
     -->
    <input type="text" :value="keyword" @input="keyword = $event.target.value"/>  <!--【:value】的寫法屬於數據的單向同步-->
    <span>{{ keyword }}</span>
    <hr/>

    <!-- 
        下面的【:value】是什麼意思?
        A:父子組件通信
        下面的【@input】是什麼意思?
        A:並非原生DOM的input事件,屬於自訂義事件
     -->
    <CustomInput :value="keyword" @input="keyword = $event"/>
    <!-- 下面是23行的簡化寫法 -->
    <CustomInput v-model="keyword"/>
  </div>
</template>

<script>
import CustomInput from "./CustomInput.vue";
export default {
  name: "ModelTest",
  components: { CustomInput },
  data(){
    return{
        keyword:'',
    }
  },
  
};
</script>

<style>
</style>
<template>
  <div>
    <h1>EventTest組件</h1>
    <!-- 原生DOM綁定系統事件 -->
    <button @click="handler1">原生DOM綁定原生事件</button>
    <!-- Event1組件:Event1非原生DOM節點,而綁定的click事件並非原生DOM事件,而是自訂義事件
        @click.native,可以把自訂義事件轉變為原生DOM事件
        當前原生DOMclick事件,其實是給子組件的根結點綁定了點擊事件---利用事件委派
     -->
    <Event1 @click.native="handler2"></Event1>

    <!-- 下面寫法是給原生DOM綁定自訂義事件
        ※給原生DOM綁定自訂義事件,是沒有任何意義的,因為沒有辦法發出$emit函數 (按了沒任何反應)
    -->
    <button @xxx="handler3">原生DOM綁定自訂義事件</button>

    <!-- 凡是在組件標籤上寫的@click、@xxx行為,都是屬於綁定自訂義事件的動作 -->
    <Event2 @click="handler4" @xxx="handler5"></Event2>
  </div>
</template>

<script>
import Event1 from './Event1.vue'
import Event2 from './Event2.vue'
export default {
  name: "EventTest",
  components:{Event1,Event2},
  methods:{
    //原生DOM按鈕的事件回調
    handler1(a){
        console.log('原生',a)
    },
    handler2(a){
        console.log('event1',a)
    },
    //原生DOM綁定自訂義事件
    handler3(){
        console.log('沒有反應')
    },
    handler4(params){
        console.log('event2會觸發',params)
    },
    handler5(abc){
        console.log('xxx',abc)
    }
  }
};
</script>

<style>
</style>
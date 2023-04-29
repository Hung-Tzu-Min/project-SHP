<template>
  <div>
    <h2>BABA有存款:{{ money }}</h2>
    <button @click="borrowMoney">找小名借100元</button>
    <button @click="borrowMoney2">找小洪借150元</button>
    <button @click="borrowMoneyAll">找所有孩子借200元</button>
    <br />
    <Son ref="xm"/>
    <br />
    <Daugher ref="xh"/>
  </div>
</template>

<script>
import Daugher from "./Daughter.vue";
import Son from "./Son.vue";
export default {
  name: "ChildrenParentTest",
  components: { Daugher, Son },
  data() {
    return {
      money: 1000,
    };
  },
  methods:{
    //向兒子小名借錢
    borrowMoney(){
        //父組件的錢數量累加100元
        this.money += 100
        //ref可以獲取真實DOM節點,也可以獲取子組件標籤(進而操作子組件的數據與方法)
        this.$refs.xm.money -= 100
        console.log(this.$refs.xm)
    },
    //向女兒小紅借錢
    borrowMoney2(){
        this.money += 150
        this.$refs.xh.money -= 150
    },
    borrowMoneyAll(){
        this.money +=400
        console.log(this.$children)
        //組件實例自身擁有一個屬性$children,可以獲取到當前組件當中,全部的子組件
        this.$children.forEach((item)=>{
            item.money -= 200
        })
    },
  },
};
</script>

<style scoped>
</style>
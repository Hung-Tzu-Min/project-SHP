/*
    Mixin封裝:
    如果項目當中出現很多結構類似的功能,想到組件復用
    如果項目當中很多的組件,其JS業務邏輯相似,想到用mixin 
*/
export default {
    methods: {
        //兒子(女兒)給父親錢的回調函數
        give(money) {
          this.money -= money;
          //需要在子組件內部獲取到父組件,讓父組件的數據加上50元
          //可以通過$parent屬性,獲取到某一個父組件,進而操作父組件的數據的方法
          this.$parent.money += money
        },
      },
}
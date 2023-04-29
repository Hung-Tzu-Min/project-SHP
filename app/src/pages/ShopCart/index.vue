<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul
          class="cart-list"
          v-for="(cart, index) in cartInfoList"
          :key="cart.id"
        >
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked == 1"
              @change="updateChecked(cart, $event)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">
              {{ cart.skuName }}
            </div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{ cart.skuPrice }}</span>
          </li>
          <li class="cart-list-con5">
            <a
              href="javascript:void(0)"
              class="mins"
              @click="handler('minus', -1, cart)"
              >-</a
            >
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="handler('change', $event.target.value * 1, cart)"
            />
            <a
              href="javascript:void(0)"
              class="plus"
              @click="handler('add', 1, cart)"
              >+</a
            >
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a class="sindelet" @click="deleteCartById(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input
          class="chooseAll"
          type="checkbox"
          :checked="isAllCheck && cartInfoList.length > 0"
          @change="updateAllCartChecked"
        />
        <span>全选</span>
      </div>
      <div class="option">
        <a @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择 <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ totalPrice }}</i>
        </div>
        <div class="sumbtn">
          <!-- <a class="sum-btn" @click="$router.push('/trade')">结算</a> -->
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import _ from "lodash";
export default {
  name: "ShopCart",
  mounted() {
    this.getData();
  },
  methods: {
    //獲取個人購物車數據
    getData() {
      this.$store.dispatch("getCartList");
    },
    //修改產品個數
    handler: _.throttle(async function (type, disNum, cart) {
      //type:為了區分用戶的行為(點擊?加、減、輸入框改數字)
      //disNum形參: +變化量(1)  -變化量(-1)   input最終的值(不是變化量)
      //cart:點擊了哪一項產品【身上有ID】
      //最後要向服務器發請求,修改數量
      if (type == "add") {
        //加號
        disNum = 1;
      }
      if (type == "minus") {
        //判斷產品的個數大於1,才能給服務器傳-1
        if (cart.skuNum > 1) {
          disNum = -1;
        } else if ((cart.skuNum = 1)) {
          //產品的個數小於等於1時,就不能再變化,傳0
          disNum = 0;
        }
      }
      if (type == "change") {
        //用戶輸入的最終值,是非法的(帶有文字),則給服務器變化量為不變
        if (isNaN(disNum) || disNum < 1) {
          disNum = 0;
        } else {
          //當用戶正常輸入(parseInt小數取整),帶服務器的變化量,就是用戶輸入的最終值-商品的起始數量
          disNum = parseInt(disNum) - cart.skuNum;
        }
      }
      //派發action
      try {
        await this.$store.dispatch("AddOrUpdateShopCart", {
          skuId: cart.skuId,
          skuNum: disNum,
        });
        this.getData();
      } catch (error) {}
    }, 500),
    //從購物車刪除任一產品的操作
    async deleteCartById(cart) {
      try {
        //如果刪除成功再次發送請求獲取新的數據進行展示
        await this.$store.dispatch("deleteCartById", cart.skuId);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改某一個產品的勾選狀態
    async updateChecked(cart, event) {
      try {
        /*從【console.log(event.target.checked)】可以得知,event參數傳的值為布林值,
       但是服務器的isChecked需要獲取0|1,並非布林值,因此要給一個判斷 */
        let isChecked = event.target.checked ? "1" : "0";
        await this.$store.dispatch("updateCheckedById", {
          skuId: cart.skuId,
          isChecked,
        });
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //刪除全部選中的產品
    //
    async deleteAllCheckedCart() {
      try {
        //派發一個action
        await this.$store.dispatch("deleteAllCheckedCart");
        //再發請求獲得購物車列表
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
    //修改全部產品的選中狀態
    async updateAllCartChecked(event) {
      try {
        let isChecked = "";
        if (event.target.checked == true) {
          isChecked = "1";
        } else {
          isChecked = "0";
        }
        await this.$store.dispatch("updateAllCartIsChecked", isChecked);
        this.getData();
      } catch (error) {
        alert(error.message);
      }
    },
  },
  computed: {
    ...mapGetters(["cartList"]),
    //購物車的數據
    cartInfoList() {
      return this.cartList.cartInfoList || [];
    },
    //計算購買產品的總價
    totalPrice() {
      let sum = 0;
      this.cartInfoList.forEach((item) => {
        sum += item.skuNum * item.skuPrice;
      });
      return sum;
    },
    //判斷底部複選框是否勾選
    isAllCheck() {
      return this.cartInfoList.every((item) => item.isChecked == 1);
    },
  },
};
</script>




<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }
        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
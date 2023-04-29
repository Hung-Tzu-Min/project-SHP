<template>
  <div class="type-nav">
    <div class="container">
      <!-- 事件委派|事件代理 -->
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分類</h2>
        <!-- 過度動畫 標籤<transition> -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
                :class="{ cur: currentIndex == index }"
              >
                <h3 @mouseenter="changeIndex(index)">
                  <a
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                </h3>
                <!-- 2級分類、3級分類 -->
                <div
                  class="item-list clearfix"
                  :style="{ display: currentIndex == index ? 'block' : 'none' }"
                >
                  <div
                    class="subitem"
                    v-for="(c2, index) in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                      </dt>
                      <dd>
                        <em
                          v-for="(c3, index) in c2.categoryChild"
                          :key="c3.categoryId"
                        >
                          <a
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服裝城</a>
        <a href="###">美妝館</a>
        <a href="###">尚品匯超市</a>
        <a href="###">全球購</a>
        <a href="###">閃購</a>
        <a href="###">團購</a>
        <a href="###">有趣</a>
        <a href="###">秒殺</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

//寫【import _ from "lodash"】的引入方式是把lodash全部函數引入
//最好的方式是:按需加載 (此處用節流)
import throttle from "lodash/throttle";

export default {
  name: "TypeNav",
  data() {
    return {
      //存儲用戶游標移上哪一個一級分類
      currentIndex: -1,
      show: true,
    };
  },
  //組件掛載完畢:可以向服務器發請求
  mounted() {
    //當組件掛載完畢,讓show屬性變為false
    //如果不是Home路由組件,則將TypeNav進行隱藏
    if (this.$route.path != "/home") {
      this.show = false;
    }
  },
  computed: {
    ...mapState({
      //右側需要的是一個函數,當使用這個計算屬性的時候,右側函數會立即執行一次
      //注入一個參數state,其實即為大倉庫中的數據
      categoryList: (state) => {
        return state.Home.categoryList;
      },
    }),
  },
  methods: {
    //鼠標進入修改響應式數組currentIndex
    //throttle回調函數別用箭頭函式,可能會出現上下文this的問題
    changeIndex: throttle(function (index) {
      //index:鼠標移上某一個一級分類元素的索引值
      this.currentIndex = index;
    }, 50),
    //讓一級分類的鼠標移出的事件回調

    //進行路由跳轉的方法
    goSearch(event) {
      //最好的解決方案:編程式導航 + 事件委派
      //利用事件委派存在一些問題:1.如何知道點擊是a標籤 2.如何獲得參數 (1、2、3級分類的產品名稱、ID)
      //事件委派是把全部的子節點【h3、dt、d1、em】的事件委派給父節點
      //點擊<a>標籤的時候才會路由跳轉,那【怎樣才能確定點擊的一定是<a>標籤?】
      //還有一個問題:即使你能確定點擊的是<a>標籤,如何區分是一級、二級、三級分類的標籤?

      //第一個問題解決:把子節點當中的a標籤,我加上自訂義屬性 data-cateforyName,其餘的子節點是沒有的
      let element = event.target;
      //獲取到當前觸發這個事件的節點【h3、a、dt、d1】,需要帶有 data-cateforyName這樣的節點【一定是<a>標籤】
      //節點有一個屬性dataset屬性,可以獲取節點的自訂義屬性與屬性值
      let { categoryname, category1id, category2id, category3id } =
        element.dataset;
      //如果標籤身上擁有 categoryName 一定是<a>標籤
      if (categoryname) {
        //整理路由跳轉的參數
        let location = { name: "Search" };
        let query = { categoryName: categoryname };
        //一級分類、二級分類、三級分類的a標籤
        if (category1id) {
          query.category1Id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //判斷:如果路由跳轉的時候,帶有params參數,稍帶腳傳遞過去
        if (this.$route.params) {
          location.params = this.$route.params
          //動態給location配置對象添加query屬性
          location.query = query;
          //路由跳轉
          this.$router.push(location);
        }
      }
    },
    //鼠標移入的時候,讓商品分類列表進行展示
    enterShow() {
      if (this.$route.path != "/home") {
        this.show = true;
      }
    },
    leaveIndex() {
      //鼠標移出currentIndex,變回-1
      this.currentIndex = -1;

      //判斷如果是Search路由組件的時候才會執行
      if (this.$route.path != "/home") {
        this.show = false;
      }
    },
  },
};
</script>

<style scoped lang="less">
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
        .cur {
          background: skyblue;
        }
      }
    }

    //過度動畫的樣式
    //過度動畫開始狀態(進入)
    .sort-enter {
      height: 0px;
    }
    //過度動畫的結束狀態(進入)
    .sort-enter-to {
      height: 461px;
    }
    //定義動畫時間、速率
    .sort-enter-active {
      transition: all 0.3s linear;
    }
  }
}
</style>
<template>
  <div>
    <TypeNav />
    <!--商品分類三級列表-->
    <div class="main">
      <div class="py-container">
        <!--bread:麵包屑結構-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分類的麵包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 關鍵字的麵包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyWord">×</i>
            </li>
            <!-- 品牌的麵包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1]
              }}<i @click="removeTrademark">×</i>
            </li>
            <!--  -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
            >
              {{ attrValue.split(":")[1]
              }}<i @click="removeAttrValue(index)">×</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrsInfo="attrsInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <!-- 價格結構 -->
              <ul class="sui-nav">
                <li :class="{ active: isOne }" @click="changeOrder('1')">
                  <a
                    >综合 <span v-show="isOne">{{ toSort }}</span></a
                  >
                </li>
                <li :class="{ active: isTwo }" @click="changeOrder('2')">
                  <a
                    >價格<span v-show="isTwo">{{ toSort }}</span></a
                  >
                </li>
              </ul>
            </div>
          </div>
          <!-- 產品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(goods, index) in goodsList"
                :key="goods.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- 在路由跳轉時,切記要帶ID(params參數) -->
                    <router-link :to="`/Detail/${goods.id}`">
                      <!--因為用了圖片懶加載把 :src 替換成了 v-lazy,並且加上 :key="goods.defaultImg"-->
                      <img v-lazy="goods.defaultImg" :key="goods.defaultImg"/> 
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥</em>
                      <i>{{ goods.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a
                      target="_blank"
                      href="item.html"
                      title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】"
                      >{{ goods.title }}</a
                    >
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分頁器 -->
          <Pagination
            :pageNo="searchParams.pageNo"
            :pageSize="searchParams.pageSize"
            :total="total"
            :continues="5"
            @getPageNo="getPageNo"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelector from "./SearchSelector/SearchSelector";
import { mapGetters, mapState } from "vuex";

export default {
  name: "Search",
  components: {
    SearchSelector,
  },
  data() {
    return {
      //帶給服務器參數
      searchParams: {
        category1Id: "", //1級分類的ID
        category2Id: "", //2級分類的ID
        category3Id: "", //3級分類的ID
        categoryName: "", //分類名子
        keyword: "", //關鍵字
        order: "1:desc", //排序
        pageNo: 1, //pageNo這個參數寫或不寫,默認值都是1
        pageSize: 10, //代表每一頁展示幾個項目
        props: [], //平台售賣屬性操作的參數
        trademark: "", //品牌
      },
      toSort: "(down)",
    };
  },
  //在組件掛載完畢之前,先行獲得用戶點擊的搜尋參數(搜尋值)
  beforeMount() {
    //比較笨的寫法
    // this.searchParams.category1Id = this.$route.query.category1Id
    // this.searchParams.category2Id = this.$route.query.category2Id
    // this.searchParams.category3Id = this.$route.query.category3Id
    // this.searchParams.categoryName = this.$route.query.categoryName
    //this.searchParams.keyWord = this.$route.params.keyWord

    //Object.assign:ES6新增的語法,合併對象
    //在發請求之前,把接口需要傳遞的參數,進行整理(在給服務器發請求之前,把參數整理好,服務器就會返回查詢的數據)
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
  },
  //組件掛載完畢執行一次(僅僅只執行一次)
  mounted() {
    this.getData();
  },
  computed: {
    //mapGetters裡面的寫法:傳遞的是"數組",因為
    ...mapGetters(["goodsList"]),

    //下面用來調整"綜合排序"&"價格排序"的class狀態
    isOne() {
      return this.searchParams.order.indexOf("1") != -1;
    },
    isTwo() {
      return this.searchParams.order.indexOf("2") != -1;
    },
    isAsc() {
      return this.searchParams.order.indexOf("asc") != -1;
    },
    isDesc() {
      return this.searchParams.order.indexOf("desc") != -1;
    },
    //
    ...mapState({
      total: (state) => state.Search.searchList.total,
    }),
  },
  methods: {
    //向服務器發送請求獲取search模塊數據(根據參數不同返回不同的數據進行展示)
    //把這次請求封裝為一個函數:當你需要調用的時候調用即可
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    removeCategoryName() {
      //把帶給服務器的參數置空,並且需向服務器再次發送請求
      //另外帶給服務器的參數,是可有可無的:如果屬性值為"空"字串,拿還是會把相應的空字串帶給服務器
      //但是把相應的字串改為undefined,當前這個字段就不會帶給服務器(比較省資源)
      this.searchParams.categoryName = undefined;
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
      this.getData();
      //網址欄也需要清空:依靠路由跳轉 /Search
      //嚴謹:本意是刪除query,如果路徑當中有params時,不應該刪除,路由跳轉的時候應該帶著
      if (this.$route.params) {
        this.$router.push({ name: "Search", params: this.$route.params });
      }
    },
    removeKeyWord() {
      this.searchParams.keyword = undefined;
      this.getData();
      //通知兄弟組件Header清除keyWord
      this.$bus.$emit("clear");
      if (this.$route.query) {
        this.$router.push({ name: "Search", query: this.$route.query });
      }
    },
    //自訂義事件的回調
    trademarkInfo(trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      this.getData();
    },
    //刪除品牌的信息
    removeTrademark() {
      //將品牌信息置空
      this.searchParams.trademark = undefined;
      this.getData();
    },
    //蒐集平台屬性的回調函數 (自訂義事件)
    attrsInfo(attrs, attrValue) {
      //先將參數格式整理好
      let props = `${attrs.attrId}:${attrValue}:${attrs.attrName}`;
      //判斷數組中相同的值,並且去掉只留唯一一個
      if (this.searchParams.props.indexOf(props) == -1) {
        this.searchParams.props.push(props);
      }
      this.getData();
    },
    //
    removeAttrValue(index) {
      console.log(index);
      this.searchParams.props.splice(index, 1);
      this.getData();
    },
    //排序操作:flag用來區分用戶點擊的是"綜合"or"價格"
    changeOrder(flag) {
      let originOrder = this.searchParams.order;
      let originFlag = this.searchParams.order.split(":")[0];
      let originSort = this.searchParams.order.split(":")[1];
      let newOrder = "";
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === "desc" ? "asc" : "desc"}`;
      } else {
        newOrder = `${flag}:${"desc"}`;
      }
      this.searchParams.order = newOrder;
      this.getData();
      this.toSort = this.isAsc ? "(up)" : "(down)";
      // if (this.isAsc) {
      //   this.toSort = "(up)";
      // }
      // if (this.isDesc) {
      //   this.toSort = "(down)";
      // }
    },
    //自訂義事件的回調---獲取當前第幾頁
    getPageNo(pageNo) {
      console.log(pageNo);
      //整理帶給服務器的參數
      this.searchParams.pageNo = pageNo;
      this.getData();
    },
  },
  //數據監聽:監聽組件實例身上屬性的屬性值變化
  watch: {
    //監聽路由的信息是否發生變化
    $route(newvalue, oldvalue) {
      //再次發請求之前,需再次整理帶給服務器的參數
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //然後再次發出請求
      this.getData();
      //每一次請求完畢,應該把相應的1、2、3級分類的id置空,好接受下一次查詢的ID
      this.searchParams.category1Id = "";
      this.searchParams.category2Id = "";
      this.searchParams.category3Id = "";
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
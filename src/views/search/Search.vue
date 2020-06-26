<template>
  <div id="search">
    <common-nav-bar
      class="common-nav-bar"
      :searchKey="searchKey">
    </common-nav-bar>
    <tab-control
      class="tab-control"
      :titles="['综合','销量','新品']"
      @tabClick="tabClick">
      <div  class="tab-control-item" :class="{activep: isActive}"
          @click="isActive = !isActive">
        <span>价格</span>
        <span class="price-down-btn"></span>
      </div>
    </tab-control>
    <transition name="fade">
      <search-price-area
        v-show="isActive"
        class="search-price-area"
        :priceFilters="priceFilter"
        @confirmPrice="confirmPrice"></search-price-area>
    </transition>
    <Scroll ref="scroll" class="content">
      <goods-list
        :goods="showGoods">
      </goods-list>
      <div class="no-goods" v-if="showGoods.length === 0">
        <div class="no-goods-img"></div>
        <p class="no-goods-tip">没有相关的商品结果哦~~</p>
      </div>
    </Scroll>
  </div>
</template>

<script>
  import CommonNavBar from 'components/content/commonNavBar/CommonNavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import SearchPriceArea from'./childComps/SearchPriceArea.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'

  import { getSearchResult } from 'network/search.js'
  import { imageMixin } from 'common/mixin.js'

  export default {
    name: 'Search',
    components: {
      CommonNavBar,
      TabControl,
      SearchPriceArea,
      GoodsList,
      Scroll
    },
    mixins: [imageMixin],
    data() {
      return {
        searchKey: '',
        isActive: false,
        priceFilter: [],
        goods: {
          'pop': { page: 0, list:[] },
          'new': { page: 0, list:[] },
          'sell': { page: 0, list:[] }
        },
        currentType: 'pop',
        isFilter: false,
        goodsFilter: [],
        minPrice: 0,
        maxPrice: 10000000
      }
    },
    created () {
      // 获取搜索关键词
      this.searchKey = this.$route.query.key || '';
      // 隐藏搜索功能
      this.controlShowSearch(false);
      // 请求搜索结果
      this.getSearchResultBykey()
    },
    deactivated() {
      this.$buds.$off("imgloaddown",this.scrollItemListener);
    },
    computed:{
      showGoods() {
        return this.isFilter ? this.goodsFilter : this.goods[this.currentType].list;
      }
    },
    methods: {
      /*
       ** 网络数据相关的方法
      */
      getSearchResultBykey() {
        getSearchResult().then((result) => {
          let goods = result.wall.docs;
          this.priceFilter.push(...result.priceList);
          this.goods['pop'].list.push(...goods);
          this.goods['sell'].list.push(...goods.reverse());
          this.goods['new'].list.push(...goods.splice(20));
          this.goods['new'].list.push(...goods);
        });
      },

      /*
       ** 功能相关的方法
      */
      // 控制显示隐藏搜索功能
      controlShowSearch (showValue) {
        this.$store.commit('search/setIsshow', showValue);
      },
      // 控制tab点击事件
      tabClick(index) {
        let goodsType = ['pop', 'sell', 'new']
        this.currentType = goodsType[index];
        this.isActive = false;
        this.$refs.scroll.scrollTo(0, 0, 0);
        if(this.maxPrice !== 10000000 || this.minPrice !== 0) {
          this.confirmPrice(this.minPrice, this.maxPrice);
        }
      },
      // 根据选择的价格区间展示商品
      confirmPrice(min, max) {
        this.minPrice = min || 0;
        this.maxPrice = max || 10000000;
        this.goodsFilter.splice(0);
        this.goodsFilter.push(...this.goods[this.currentType].list.filter((item) => item.price > this.minPrice && item.price < this.maxPrice ));
        this.isActive = false;
        this.isFilter = true;
        this.$refs.scroll.scrollTo(0, 0, 0);
      }
    }
  }
</script>

<style scoped>
  #search {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .common-nav-bar {
    border-bottom: 1px solid #c9c7c8;
    background: #fafafa;
  }

  .tab-control {
    border-bottom: 1px solid #eaeaea;
  }

  .price-down-btn {
    display: inline-block;
    height: 10px;
    width: 10px;
    border-left: 1px solid #c3c3c3;
    border-bottom: 1px solid #c3c3c3;
    transform: rotate(-45deg);
    margin: 3px 5px;
  }

  .content {
    height: calc(100% - 87px - 49px);
    overflow: hidden;
    background-color: rgb(239, 239, 239);
  }

  .activep {
    color: var(--color-high-text);
  }

  .search-price-area {
    position: absolute;
    top: 88px;
    left: 0;
    right: 0;
    z-index: 999;
    background-color: #fff;
    overflow: hidden;
  }

  .fade-enter-active, .fade-leave-active {
    transition: all 0.5s ease;
  }

  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    height: 0;
  }

  .no-goods-img {
    width: 100px;
    height: 100px;
    margin: 15px auto;
    background: url(~assets/img/common/noResult.png) no-repeat;
    background-size: 100% auto;
  }

  .no-goods-tip {
    text-align: center;
    font-size: 15px;
    color: #888;
  }

</style>

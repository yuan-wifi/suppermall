<template>
  <div id="home">
    <home-nav-bar :searchkey="hotWordkey"></home-nav-bar>
    <tab-control class="tab-control tabFixed" v-show="isTabFixed" :titles="['流行','新款','精选']" @tabClick="getGoods" ref="tabControl2"></tab-control>
    <scroll class="content" :probe-type="3" ref="scroll" @scroll="contentScroll" @pullingUp="loadMoreData">
      <home-swiper :banners="banners" @imageload="swiperLoad"></home-swiper>
      <hot-category :category="hotCategory" ></hot-category>
      <normal-category :category="normalCategory" @imageload="imageLoad"></normal-category>
<!--      <recommend-view :recommends="recommend"></recommend-view>
      <feature-view></feature-view> -->
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="getGoods" ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import HotCategory from './childComps/HotCategory.vue'
  import NormalCategory from './childComps/NormalCategory.vue'
  import HomeNavBar from './childComps/HomeNavBar.vue'
  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import { getHomeMultidata, getHomeGoods, getHomeCategory } from 'network/home.js'
  import { debounce } from 'common/utils.js'
  import { imageMixin } from 'common/mixin.js'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Home',
    components: {
      HomeNavBar,
      HomeSwiper,
      HotCategory,
      NormalCategory,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommend: [],
        goods: {
          'pop': { page: 0, list:[] },
          'new': { page: 0, list:[] },
          'sell': { page: 0, list:[] }
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        hotCategory: [],
        normalCategory: []
      }
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list;
      },
      ...mapGetters('search', {
        hotWordkey: 'hotWordkey'
      })
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求首页商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

      // 3.请求首页分类数据
      this.getHomeCtg();
    },
    mixins: [imageMixin],
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y;
      this.$buds.$off("imgloaddown",this.scrollItemListener);
    },
    methods: {
      /**
       * 网络请求相关代码
       */
      // 请求首页轮播数据
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banners = res.data.banner.list
          this.recommend = res.data.recommend.list
        });
      },
      // 请求首页商品数据
      getHomeGoods(type) {
        const page = this.goods[type].page + 1;
        getHomeGoods(type,page).then(res => {
          if(res != undefined) {
            this.goods[type].page += 1;
            this.goods[type].list.push(...res.data.list);
          }
          this.$refs.scroll.finishPullUp();
          this.$refs.scroll.refresh();
        })
      },
      // 请求首页分类数据
      getHomeCtg() {
        getHomeCategory().then(res => {
          if(res != undefined) {
            this.hotCategory.push(...res.hot.list);
            this.normalCategory.push(...res.normal.list);
          }
        });
      },

      /**
       * 事件监听相关代码
       */
      // 获取子组件TabControl传来的index类别
      getGoods (index) {
        let type = 'pop';
        if (parseInt(index) === 1) {
          type = 'new';
        } else
        if (parseInt(index) === 2) {
          type = 'sell';
        }
        this.currentType = type;
        this.$refs.tabControl.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      // 回到顶部的事件
      backClick () {
        this.$refs.scroll.scrollTo(0,0,500);
      },
      // 监听滚动位置
      contentScroll (position) {
        // 控制backtop的显示隐藏
        this.isShowBackTop = position.y < -1000 ? true : false;

        // tabcontrol是否置顶
        this.isTabFixed = -position.y > this.tabOffsetTop ;
      },
      // 上拉加载更多商品数据
      loadMoreData () {
        this.getHomeGoods(this.currentType);
      },

      //轮播图图片下载加载了一张的事件
      swiperLoad () {
        // 获取tab-control的offsettop
        // $el可以得到组件的dom
        this.tabOffsetTop = this.$refs.tabControl.$el.offsetTop;
      },
      // 显示搜索功能
      showSearch () {
        this.$store.commit('search/setIsshow');
      },
      // 热门图片加载完毕
      imageLoad () {
        debounce(this.$refs.scroll.refresh, 200)();
      }

    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    height: 100%;
    width: 100%;
  }

  .tabFixed {
    position: relative;
  }

  .content {
    width: 100%;
    position: absolute;
    top: 45px;
    bottom: 49px;
    left: 0;
    right: 0;
    overflow: hidden;
  }
</style>

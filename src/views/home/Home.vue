<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div  slot="center">购物街</div>
    </nav-bar>
    <tab-control class="tab-control tabFixed" v-show="isTabFixed" :titles="['流行','新款','精选']" @tabClick="getGoods" ref="tabControl2"></tab-control>
    <scroll class="content" :probe-type="3" ref="scroll" @scroll="contentScroll" @pullingUp="loadMoreData">
      <home-swiper :banners="banners" @imageload="swiperLoad"></home-swiper>
      <recommend-view :recommends="recommend"></recommend-view>
      <feature-view></feature-view>
      <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="getGoods" ref="tabControl"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import BackTop from 'components/content/backTop/BackTop.vue'

  import HomeSwiper from './childComps/HomeSwiper.vue'
  import RecommendView from './childComps/RecommendView.vue'
  import FeatureView from './childComps/FeatureView.vue'

  import { getHomeMultidata, getHomeGoods } from 'network/home.js'
  import { debounce } from 'common/utils.js'
  import { imageMixin } from 'common/mixin.js'

  export default {
    name: 'Home',
    components: {
      NavBar,
      HomeSwiper,
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
        saveY: 0
      }
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list;
      }
    },
    created() {
      // 1.请求多个数据
      this.getHomeMultidata()

      // 2.请求首页商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    mounted() {
/*      let refresh = debounce(this.$refs.scroll.refresh, 500);

      this.scrollItemListener = () => {
        //刷新scroll的高度
        refresh();
      }
      this.$buds.$on("imgloaddown", this.scrollItemListener ); */
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
      }

    }
  }
</script>

<style scoped>
  #home {
    position: relative;
    height: 100%;
    width: 100%;
   /* padding: 44px 0 49px; */
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
/*    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10; */
  }

  .tabFixed {
    position: relative;
  }

  .content {
    width: 100%;
    position: absolute;
    /* px-to-viewport-ignore-next */
    top: 44px;/* px-to-viewport-ignore */
    bottom: 49px; /* px-to-viewport-ignore */
    left: 0;
    right: 0;
    overflow: hidden;
  }

  /*.content {
    height: calc(100% - 93px);
    margin-top: 44px;
  }*/
</style>

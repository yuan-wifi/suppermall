<template>
  <div id="detail">
    <detail-nav-bar @tabclick="titleClick" ref="detailnav"></detail-nav-bar>
    <scroll class="content" :probe-type="3" ref="scroll" @scroll="contentScroll">
      <detail-swiper :topImages="topImages" @swiperload="swiperload"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-comment ref="comment" :detailComment="detailComment" @goRate="goRates"></detail-comment>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imgLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :detailPrams="detailParams"></detail-param-info>
      <detail-recommend ref="recommend" :detailRecommend="detailRecommend"></detail-recommend>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
    <detail-bottom-bar @addCart="addProduct"></detail-bottom-bar>
<!--    <toast :message="message" :show="show"></toast> -->
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar.vue'
  import DetailSwiper from './childComps/DetailSwiper.vue'
  import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
  import DetailComment from './childComps/DetailComment.vue'
  import DetailShopInfo from './childComps/DetailShopInfo.vue'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
  import DetailParamInfo from './childComps/DetailParamInfo.vue'
  import DetailRecommend from './childComps/DetailRecommend.vue'
  import DetailBottomBar from './childComps/DetailBottomBar.vue'

  import Scroll from 'components/common/scroll/Scroll.vue'
/*  import Toast from 'components/common/toast/Toast.vue' */

  import { getDetail, Goods, Shop, getRecommends } from 'network/detail.js'
  import { debounce } from 'common/utils.js'
  import { imageMixin, backTopMixin } from 'common/mixin.js'

  export default {
    name: 'Detail',
    data () {
      return {
        iid: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        detailParams: {},
        detailComment: {},
        detailRecommend: [],
        themeTopYs:[],
        getThemeTopY: null,
/*        message: '',
        show: false */
      }
    },
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailComment,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailRecommend,
      DetailBottomBar,
      Scroll,
/*      Toast */
    },
    created () {
      this.iid = this.$route.params.iid;
      // 获取商品详情数据
      this.getDetail( this.$route.params.iid)
      // 获取推荐商品
      this.getRecommend();
    },
    mixins: [imageMixin, backTopMixin],
    methods: {
      /**
       * 网络请求相关
       */
      // 获取商品详情
      getDetail(iid){
        getDetail(iid).then((res) => {
          console.log(res);
          const data = res.result;
          // 获取轮播图
          this.topImages = data.topImages;

          // 获取商品信息
          this.goods = new Goods(data.itemInfo, data.priceInfo, data.itemServices.columns, data.shopInfo.services);

          // 获取评论信息
          this.detailComment = data.rateInfo;

          // 获取店铺信息
          this.shop = new Shop(data.shopInfo);

          // 获取商品详情数据
          this.detailInfo = data.detailInfo;

          // 获取商品参数信息
          this.detailParams = data.itemParams;

          this.getThemeTopY = debounce(() => {
            this.themeTopYs = [];

            this.themeTopYs.push(0);
            this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
            this.themeTopYs.push(this.$refs.param.$el.offsetTop);
            this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
          }, 200)
        });
      },

      // 获取推荐商品信息
      getRecommend() {
        getRecommends().then((res) => {
          this.detailRecommend = res.list;
        })
      },

      /**
       * 业务逻辑相关
       */
      // 轮播图片加载完毕
      swiperload() {
        debounce(this.$refs.scroll.refresh, 500)();
      },
      // 商品图片加载完
      imageLoad() {
        // console.log(this.$refs.scroll)
        debounce(this.$refs.scroll.refresh, 500)();
        this.getThemeTopY();
      },

      //导航行点击事件
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200);
      },

      // 监听滚动位置
      contentScroll (position) {
        // 控制backtop的显示隐藏
        this.showBackTop(position);

        // 联动控制导航行的选中
        this.themeTopYs.forEach((item, index) => {
          if(-position.y >= item && index < this.themeTopYs.length - 1 && -position.y < this.themeTopYs[index+1]) {
            this.$refs.detailnav.currentIndex = index;
          } else if(-position.y >= item){
            this.$refs.detailnav.currentIndex = index;
          }
        })

      },

      // 加入购物车
      addProduct () {
        const product = {}
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;

        //将商品加入vuex的购物车
        this.$store.dispatch('cart/addProductToCart', product).then((data) => {
/*          this.message = data;
          this.show = true;

          setTimeout(()=> {
            this.message = '';
            this.show= false
          }, 1500); */
          this.$toast.show(data);
        });
      },
      // 进入评论页面
      goRates() {
        this.$router.push('/rate/'+this.iid)
      }
    },
    destroyed() {
      this.$buds.$off("imgloaddown",this.scrollItemListener);
    }
  }
</script>

<style scoped>
  #detail {
    position:relative;
    z-index: 100;
    background-color: #fff;
    height: 100%;
    width: 100%;
  }

 .content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 49px;
    overflow: hidden;
  }
</style>

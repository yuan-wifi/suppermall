<template>
  <div >
    <category-nav-bar :searchkey="hotWordkey"></category-nav-bar>
    <div class="category">
      <scroll class="content c-category">
        <category-detail ref="ccategory"
                         :categoryData="categoryData"
                         @categoryClick="categoryClick">
        </category-detail>
      </scroll>
      <div class="c-details">
        <tab-control class="tab-control1 tabFixed" style="z-index:10;" v-show="isTabFixed" :titles="['综合','销量','新品']" @tabClick="getGoods" ref="tabControl2"></tab-control>
        <scroll class="content" :probe-type="3" ref="scroll" @scroll="contentScroll">
          <category-cate :itemCategory="currentCategory" @imageLoad="imgLoad"></category-cate>
          <tab-control class="tab-control1" v-if="showGoods.length > 0" :titles="['综合','销量','新品']" @tabClick="getGoods" ref="tabControl"></tab-control>
          <goods-list :goods="showGoods" ref="goods" v-if="showGoods.length > 0" bgcolor="#fff"></goods-list>
        </scroll>
      </div>
    </div>
  </div>
</template>

<script>
  import CategoryNavBar from './childComps/CategoryNavBar.vue'
  import CategoryDetail from './childComps/CategoryDetail.vue'
  import CategoryCate from'./childComps/CategoryCate.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import TabControl from 'components/content/tabControl/TabControl.vue'
  import GoodsList from 'components/content/goods/GoodsList.vue'

  import { getCategory, getItemCateData, getItemData } from 'network/category.js'
  import { debounce } from 'common/utils.js'
  import { imageMixin, tabControlMixin } from 'common/mixin.js'
  import { mapGetters } from 'vuex'

  export default {
    name: 'Category',
    data() {
      return {
        categoryData: [],
        itemdataCate: {
          0: []
        },
        item: {
          0: {
            'pop': { page: 0, list:[] },
            'new': { page: 0, list:[] },
            'sell': { page: 0, list:[] },
          }
        },
        currentType: 'pop',
        currentKey: 0,
        saveY: 0
      }
    },
    mixins: [imageMixin, tabControlMixin],
    components: {
      CategoryNavBar,
      CategoryDetail,
      CategoryCate,
      Scroll,
      GoodsList
    },
    created() {
      // 获取分类数据
      getCategory().then((data) => {
        this.categoryData = data.list;

        this.$nextTick(function(){
          let key = this.categoryData[0]['maitKey'];
          // 点击第一个分类
          this.$refs.ccategory.checkItem(0, key);
        });
      })
    },
    activated() {
      this.$refs.scroll.refresh();
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
    },
    deactivated() {
      this.saveY = this.$refs.scroll.scroll.y;
      this.$buds.$off("imgloaddown",this.scrollItemListener);
    },
    computed:{
      showGoods() {
        return this.item[this.currentKey][this.currentType].list;
      },
      currentCategory() {
        return this.itemdataCate[this.currentKey];
      },
      ...mapGetters('search', {
        hotWordkey: 'hotWordkey'
      })
    },
    methods: {
      /**
       * 网络请求相关
       */

      // 获取分类子项分类数据
      getItemCateDataMain(key) {
        if(!this.itemdataCate.hasOwnProperty(key)) {
          this.$set(this.itemdataCate, key, []);
        }
        getItemCateData(key).then((data) => {
          if(Object.keys(data).length > 0) {
            this.itemdataCate[key].push(...data.list);
          }
        })
      },
      // 获取分类子项推荐数据
      getItemDataMain(key, type) {
        if(!this.item.hasOwnProperty(key)) {
          let start = {
            'pop': { page: 0, list:[] },
            'new': { page: 0, list:[] },
            'sell': { page: 0, list:[] },
          }
          this.$set(this.item, key, start)
        }
        const page = this.item[key][type].page + 1;
        getItemData(key, page, type).then((data) => {
          // 获取数据
          if(Object.keys(data).length > 0) {
            this.item[key][type].list.push(...data.result.wall.docs);
            this.item[key][type].page = page;
          }
        })
      },

      /**
       * 事件监听相关代码
       */
      // 类别切换事件
      categoryClick (key) {
        this.currentKey = key;
        if(!this.item.hasOwnProperty(key)) {
          this.getItemCateDataMain(key)
          this.getItemDataMain(key, 'pop');
          this.getItemDataMain(key, 'sell');
          this.getItemDataMain(key, 'new');
        }
        this.$refs.scroll.scrollTo(0, 0, 200);
      },

      // 获取子组件TabControl传来的index类别
      getGoods (index) {
        if(this.showGoods.length > 0) {
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
        }
      },
      // 监听滚动位置
      contentScroll (position) {
        // tabcontrol是否置顶//this.isTabFixed = -position.y > this.tabOffsetTop;
        this.fixedTab(position);
      },
      // 分类图片加载完毕
      imgLoad() {
        let that = this;
        debounce(function() {
          that.$refs.scroll.refresh;
          that.tabOffsetTop = that.$refs.tabControl.$el.offsetTop;
        }, 200)();
      },

    }
  }
</script>

<style scoped>
  .category {
    display: flex;
    width: 100%;
  }

  .content {
    height: calc(100vh - 49px - 44px);
    overflow: hidden;
  }

  .c-category {
    flex: 0 0 100px;
  }

  .c-details {
    flex: 1;
    position: relative;
    margin-top: 1px;
  }

  .tab-control1 {
    padding: 0 12px 0 10px;
  }

  .tabFixed {
    position: absolute;
    top: -1px;
    left: 0;
    bottom: 0;
  }
</style>

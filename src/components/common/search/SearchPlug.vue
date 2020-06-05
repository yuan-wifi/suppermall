<template>
  <div class="search-plug" v-show="isShow" >
    <nav-bar class="search-nav">
      <div slot="left" class="item" @click="goBack">
        <img class="back" src="~assets/img/common/back.svg">
      </div>
      <div slot="center" class="item">
        <input ref="inputs" class="search" :placeholder="hotWordkey">
      </div>
      <div slot="right" class="item" @click="search">
        搜索
      </div>
    </nav-bar>
    <div class="search-history">
      <div class="search-history-tools">
        <i class="shti"></i>
        <span class="shtt">历史搜索</span>
        <i class="shtd"></i>
      </div>
      <div>
        <ul class="history-list" v-if="historyList.length > 0">
          <li class="search-item" v-for="(item, index) in historyList" :key="index">
            {{ item }}
          </li>
        </ul>
        <div v-else class="no-history">暂无历史搜索</div>
      </div>
    </div>
    <div class="search-word">
      <div class="search-word-tools">
        <i class="swth"></i>
        <span class="shtt">热门搜索</span>
      </div>
      <div>
        <ul class="history-list" v-if="searchWordList.length > 0">
          <li class="search-item" v-for="(item, index) in wordlist"  :key="index">
            <a :style="{color: item.color ? item.color : '#666'}">{{ item.frontword }}</a>
          </li>
        </ul>
        <div v-else class="no-history">暂无热门搜索</div>
      </div>
    </div>
  </div>
</template>

<script>
  import NavBar from '../navbar/NavBar.vue'
  import { mapGetters } from 'vuex'
  import { getHomeSearchKey } from 'network/home.js'

  export default {
    name: 'SearchPlug',
    components: {
      NavBar
    },
    data() {
      return {
        historyList: [],
        isShow: false,
      }
    },
    created() {
      // 1.请求搜索关键词
      this.getHomeSearchWord();
    },
    mounted() {
      this.focusInput();
    },
    computed: {
      // 方式一
      //...mapGetters('cart',['cartLength'])
      // 方式二，可以取别名
      ...mapGetters('search', {
        searchWordList: 'searchWordList',
        hotWordkey: 'hotWordkey'
      })
    },
    methods: {
      /**
       * 网络请求相关
       */
      // 请求搜索关键词
      getHomeSearchWord() {
        getHomeSearchKey().then(res => {
          let data = res.data;
          this.$store.commit('search/setSearchWord', data.hotWord.data);
          this.$store.commit('search/setHotWord', data.sketch.data.frontword);
        })
      },

      // 显示搜索界面
      show() {
        this.isShow = true;
        this.focusInput();
      },
      // 关闭搜索界面
      goBack() {
        this.isShow = false;
      },
      // 聚焦输入框
      focusInput() {
        this.$nextTick(()=>{   //正确写法
          console.log(this.$refs.inputs)
          this.$refs.inputs.focus();
        })
      },
      // 搜索事件
      search() {
        console.log('sss')
        //this.$router.push('');
      }
    }
  }
</script>

<style scoped>
  .search-plug {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;;
    background-color: #fff;
    z-index: 998;
  }

  .search-nav {
    background-color: #fff;
    font-size: 14px;
  }

  .search-nav .item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    width: 100%;
  }

  .search {
    padding: 5px 10px;
    width: 100%;
    height: 25px;
    box-shadow: none;
    appearance: none;
    border-radius: 4px;
    border: 1px solid #aaa;
    font-size: 14px;
    line-height: 25px;
    vertical-align: middle;
    background: transparent;
    background-color: #FFF;
    outline: none;
  }

  .search:focus {
    border: 1px solid #FF5777;
  }

  .back {
    width: 22px;
    height: 20px;
  }

  .search-history , .search-word {
    margin-top: 5px;
    padding: 10px;
    min-height: 30px;
    font-size: 13px;
    color: #999;
  }

  .search-word {
    border-top: 1px solid #f4f4f4;
  }

  .shti, .shtd, .swth {
    height: 15px;
    width: 15px;
  }

  .shti {
    float: left;
    background: url(~assets/img/common/search.png) center center no-repeat;
    background-size: contain;
    margin-right: 2px;
    margin-top: 2px;
  }

  .shtt {
    height: 23px;
    line-height: 23px;
  }

  .shtd {
    float: right;
    background: url(~assets/img/common/delete.png) center center no-repeat;
    background-size: contain;
    margin-right: 10px;
  }

  .search-item {
    float: left;
    margin-top: 13px;
    margin-left: 12px;
    font-size: 13px;
    border-radius: 5px;
    border: 1px solid #f5f5f5;
    height: 25px;
    line-height: 25px;
  }

  .search-item a {
    padding: 0 11px;
  }

  .no-history {
    margin-top: 10px;
    margin-left: 17px;
    height: 23px;
    line-height: 23px;
    font-size: 13px;
  }

  .swth {
    float: left;
    background: url(~assets/img/common/hot.png) center center no-repeat;
    background-size: contain;
    margin-right: 2px;
    margin-top: 2px;
  }
</style>

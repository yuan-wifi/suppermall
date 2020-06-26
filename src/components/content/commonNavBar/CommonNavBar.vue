<template>
  <nav-bar class="common-nav">
    <div slot="left" class="item" @click="goBack">
      <img class="back" src="~assets/img/common/back.svg">
    </div>
    <div slot="center" class="item">
      <input class="search" :placeholder="searchkey" :value="searchKey"  @click="showSearch">
    </div>
    <div slot="right" class="item" @click="goCart">
      <img class="cart" src="~assets/img/common/cart.png">
    </div>
  </nav-bar>
</template>

<script>
  import { searchHeaderMixin } from 'common/mixin.js'

  export default {
    name: 'CommonNavBar',
    mixins: [searchHeaderMixin],
    props: {
      searchKey: {
        type: String,
        default: ''
      }
    },
    methods: {
      // 进入分类
      goBack() {
        this.$router.go(-1);
        this.$store.commit('search/setIsshow', false);
      },
      // 进入购物车
      goCart() {
        this.$router.push('/cart');
      },
      // 显示搜索功能
      showSearch () {
        this.$store.commit('search/setIsshow', true);
      },
    }
  }
</script>

<style scoped>
  .common-nav {
    background-color: #fff;
  }

  .common-nav .item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
    width: 100%;
  }

  .search {
    width: 100%;
    padding-left: 30px;
    height: 30px;
    border-radius: 3px;
    border: none;
    font-size: 14px;
    background: #eee url('~assets/img/home/search.png') no-repeat 7.5px center;
    background-size: 15px auto;
    outline: 0;
    appearance: none;
  }

  .back, .cart {
    width: 22px;
    height: 20px;
  }
</style>

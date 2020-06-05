<template>
  <nav-bar class="home-nav">
    <div slot="left" class="item" @click="goCtg">
      <img class="category" src="~assets/img/home/category.png">
    </div>
    <div slot="center" class="item">
      <input class="search" :placeholder="searchkey" @click="goSearch">
    </div>
    <div slot="right" class="item" >
      <img class="custom" src="~assets/img/home/custom.png">
    </div>
  </nav-bar>
</template>

<script>
  import { searchHeaderMixin } from 'common/mixin.js'

  export default {
    name: 'HomeNavBar',
    mixins: [searchHeaderMixin],
    methods: {
      // 进入分类
      goCtg() {
        this.$router.push('/category');
      }
    }
  }
</script>

<style scoped>
  .home-nav {
    background-color: #fff;
  }

  .home-nav .item {
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
    font-size: 12px;
    background: #eee url('~assets/img/home/search.png') no-repeat 7.5px center;
    background-size: 15px auto;
    outline: 0;
    appearance: none;
  }

  .category, .custom {
    width: 22px;
    height: 20px;
  }
</style>

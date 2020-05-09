<template>
  <div>
    <nav-bar class="title">
      <div slot="left" @click="backClick" class="item">
        <img src="~assets/img/common/back.svg" class="back">
      </div>
      <div slot="center" >购物车({{length}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import CartList from './childComps/CartList.vue'
  import CartBottomBar from './childComps/CartBottomBar.vue'

  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components:{
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      // 方式一
      //...mapGetters('cart',['cartLength'])
      // 方式二，可以取别名
      ...mapGetters('cart',{
        length: 'cartLength'
      })
    },
    methods: {
      // 返回上一个页面
      backClick () {
        this.$router.go(-1);
      },
    }
  }
</script>

<style scoped>
  .title {
    background-color: var(--color-tint);
    color: #fff;
  }
  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 44px;
  }

  .back {
    width: 22px;
    height: 22px;
  }
</style>

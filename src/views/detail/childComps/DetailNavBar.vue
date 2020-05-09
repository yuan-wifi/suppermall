<template>
  <div class="detail-nav-bar">
    <nav-bar>
      <div slot="left" @click="backClick" class="item">
        <img src="~assets/img/common/back.svg" class="back">
      </div>
      <div slot="center" class="nav-titles">
        <span class="nav-item"
              v-for="(item, index) in titles"
              :key="index"
              :class="{ active: index === currentIndex }"
              @click="itemClick(index)">{{item}}</span>
      </div>
      <div slot="right" @click="goCart" class="item">
        <img src="~assets/img/profile/cart.png" class="cart">
      </div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'

  export default {
    name: 'DetailNavBar',
    data () {
      return {
        titles: ['商品','评论','参数','推荐'],
        currentIndex: 0,
        detailData: null
      }
    },
    components: {
      NavBar
    },
    methods: {
      // 点击item
      itemClick (index) {
        this.currentIndex = index;
        this.$emit('tabclick', index);
      },
      // 返回上一个页面
      backClick () {
        this.$router.go(-1);
      },
      //进入购物车
      goCart () {
        console.log(this.$router)
        this.$router.push('/cart');
      }
    }
  }
</script>

<style scoped>
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

  .cart {
    width: 28px;
  }

  .nav-titles {
    display: flex;
  }

  .nav-item {
    flex: 1;
    font-size: 13px;
  }

  .active {
    color: var(--color-high-text);
  }


</style>

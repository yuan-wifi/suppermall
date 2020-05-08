<template>
  <div class="detail-bottom-bar">
    <div class="bottom-bar icons">
      <div class="icons-item">
        <div class="icons-item-icon shop-icon"></div>
        <div class="icons-item-text">店铺</div>
      </div>
      <div class="icons-item">
        <div class="icons-item-icon service-icon"></div>
        <div class="icons-item-text">客服</div>
      </div>
      <div class="icons-item">
        <div class="icons-item-icon collect-icon"></div>
        <div class="icons-item-text">收藏</div>
      </div>
    </div>
    <div class="bottom-bar btns">
      <div class="btns-cart" @click="addToCart">加入购物车</div>
      <div class="btns-buy">购买</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBottomBar',
    methods: {
      addToCart() {
        this.$emit('addCart');
      }
    }
  }
</script>

<style scoped>
  .detail-bottom-bar {
    position: relative;
    height: 49px;
    background-color: #fff;
    display: flex;
  }

  .bottom-bar {
    display: flex;
    flex: 1;
    border-top: 1px solid #ededed;
  }

  .icons {
    font-size: 10px;
  }

  .icons-item {
    flex: 1;
    height: 48px;
    border-right: 1px solid #ededed;
    text-align: center;
  }

  .icons-item-icon {
    height: 18px;
    margin-top: 6px;
    background-size: 18px;
    background-image: url(~assets/img/detail/detail_bottom.png);
    background-repeat: no-repeat;
  }

  .shop-icon {
    background-position: center -80px;
  }

  .service-icon {
    background-position: center -43px;
  }

  .collect-icon {
    background-position: center 0px;
  }

  .icons-item-text {
    margin-top: 7px;
  }

  .btns div{
    flex: 1;
    font-size: 12px;
    height: 48px;
    line-height: 48px;
    text-align: center;
  }

  .btns-cart {
    color: #ff5777;
    background-color: #ffe6e8;
  }

  .btns-buy {
    color: #fff;
    background: linear-gradient(90deg,#ff5777,#ff468f);
  }
</style>

<template>
  <div v-if="Object.keys(barinfo).length > 0" class="cart">
    <div class="cart-item cart-left" @click="goCart()">
      {{barinfo.itemListInfo[0].title}}
    </div>
    <div class="cart-item cart-right">
      <div class="item" v-for="(item,index) in rightInfo" :key="index">
        <div >{{item.title}}</div>
        <div class="item-subtitle">
          {{item.subTitle}}
          <img src="~assets/img/profile/more.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProfileCart',
    props: {
      barinfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    computed:{
      rightInfo () {
        return this.barinfo.itemListInfo.filter((item, index) => index > 0);
      }
    },
    methods:{
      goCart() {
          this.$router.push('/cart').catch(err => { console.log(err) })
      }
    }
  }
</script>

<style scoped>
  .cart {
    display: flex;
    justify-content: space-between;
  }

  .cart-item {
    width: 171px;
    background-color: #fff;
    border-radius: 6px;
    font-size: 14px;
    color: #333;
  }

  .cart-left {
    width: 171px;
    height: 120px;
    padding: 10px 12px;
    background: url(~assets/img/profile/profilecart.png) 0px 0px / 171px 120px no-repeat;
  }

  .cart-item .item {
    display: flex;
    margin: 0 10px;
    line-height: 40px;
    height: 40px;
    border-bottom: 1px solid #EFEFEF;
    justify-content: space-between;
  }

  .item-subtitle {
    font-size: 11px;
    color: #999;
  }

  .item-subtitle img {
    width: 5px;
    height: 9px;
  }
</style>

<template>
  <div class="cart-bottom-bar">
    <div class="check-all">
      <check-button class="check-button" :isChecked="isCheckedAll" @click.native="checkAll()"></check-button>
    </div>
    <div class="total-price">
      总计: ¥{{cartCheckedAllPrice}}
    </div>
    <div class="to-buy" @click="toBuy">
      去结算({{cartCheckedAll.length}})
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue'

  import { mapGetters } from 'vuex'

  export default {
    name: 'cartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters('cart', ['cartCheckedAll','cartCheckedAllPrice', 'cartList']),
      isCheckedAll() {
        if(this.cartList.length === 0) return false;
        return this.cartCheckedAll.length === this.cartList.length;
      }
    },
    methods: {
      checkAll() {
        this.$store.commit('cart/checkAllProduct', this.isCheckedAll);
      },
      toBuy() {
        if(!this.cartCheckedAll.length) {
          this.$toast.show('请选择商品')
        }
      }
    }
  }
</script>

<style scoped>
  .cart-bottom-bar {
    height: 40px;
    display: flex;
    background-color: #EFEFEF;
    border-top: 1px solid #EFEFEF;
    align-items: center;
    font-size: 14px;
  }

  .check-button {
    width: 20px;
    height: 20px;
    margin-left: 10px;
    margin-right: 5px;
  }

  .total-price {
    flex: 1;
  }

  .to-buy {
    width: 120px;
    text-align: center;
    background-color: #FF8198;
    color: #fff;
    height: 39px;
    line-height: 39px;
  }
</style>

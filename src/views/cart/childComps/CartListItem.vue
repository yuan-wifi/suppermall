<template>
  <div class="product">
    <div class="p-check">
      <check-button class="check-button" :isChecked="product.isChecked" @click.native="checkItem"></check-button>
    </div>
    <div class="p-img" >
      <img :src="product.image" @click="goDetail"/>
    </div>
    <div class="p-info">
      <div class="p-title" @click="goDetail">{{product.title}}</div>
      <div class="p-desc">{{product.desc}}</div>
      <div class="p-price-count">
        <span class="p-price">¥{{product.price}}</span>
        <div class="p-count">
          <span class="p-count-reduce" @click="reduceCount()" :class="{'p-count-reduce-one': product.count <= 1}">&minus;</span>
          <span class="p-count-count">{{product.count}}</span>
          <span class="p-count-add" @click="addCount()">+</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton.vue'

  export default {
    name: 'CartListItem',
    props: {
      product: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    components: {
      CheckButton
    },
    methods: {
      // 选中商品
      checkItem() {
        this.$store.commit('cart/checkProduct', this.product);
      },
      // 减少数量
      reduceCount() {
        this.$store.commit('cart/reduceCounter', this.product);
      },
      //增加数量
      addCount() {
        this.$store.commit('cart/addCounter', this.product);
      },
      // 进入商品详情
      goDetail() {
        this.$router.push('/detail/'+this.product.iid);
      }
    }
  }
</script>

<style scoped>
  .product {
    display: flex;
    border-bottom: 1px solid #d8d9da;
    padding: 10px;
  }

  .p-check {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
  }

  .check-button {
    width: 20px;
    height: 20px;
  }

  .p-img {
    flex: 0 0 80px;
    height: 105px;
    margin-right: 10px;
  }

  .p-img img {
    width: 80px;
    height: 105px;
    border-radius: 5px;
  }

  .p-info {
    flex: 1;
    overflow: hidden;
    position: relative;
  }

  .p-title {
    font-size: 16px;
    font-weight: 600;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .p-desc {
    font-size: 14px;
    margin-top: 15px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
  }

  .p-price-count {
    display: flex;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    align-items: center;
    font-size: 16px;
    justify-content: space-between;
  }

  .p-price {
    color: #f46;
  }

  .p-count {
    background: #f7f7f7;
    border-radius: 18px;
    height: 22px;
    line-height: 22px;
    font-size: 16px;
  }

  .p-count span {
    display: inline-block;
    width: 25px;
    text-align: center;
    color: rgb(139, 136, 136);;
  }

  .p-count-count {
    padding: 0 4px;
    font-weight: 700;
    color: #333 !important;
    width: 30px !important;
    font-size: 13px;
  }

  .p-count-reduce-one {
    color: rgb(236,236,236) !important;
  }

</style>

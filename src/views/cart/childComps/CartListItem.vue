<template>
  <div class="product">
    <div class="p-check">
      <check-button class="check-button" :isChecked="product.isChecked" @click.native="checkItem"></check-button>
    </div>
    <div class="p-img">
      <img :src="product.image" />
    </div>
    <div class="p-info">
      <div class="p-title">{{product.title}}</div>
      <div class="p-desc">{{product.desc}}</div>
      <div class="p-price-count">
        <span class="p-price">¥{{product.price}}</span>
        <span class="p-count">x{{product.count}}</span>
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
      checkItem() {
        this.$store.commit('cart/checkProduct', this.product);
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
    width: 80px;
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
  }

  .p-price-count span {
    font-size: 16px;
    flex: 1;
  }

  .p-price {
    color: #dada0a;
  }

  .p-count {
    text-align: right;
  }
</style>

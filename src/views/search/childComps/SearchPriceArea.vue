<template>
  <div class="search-price-area">
    <div class="quick-btn-lists">
      <div class="quick-btn-item"
           v-for="(item, index) in priceFilters"
           :key="index"
           @click="choicePrice(item.minPrice, item.maxPrice)">{{item.minPrice}} - {{item.maxPrice}}</div>
    </div>
    <div class="price-input">
      <div class="pi-item">区间(元)</div>
      <input class="pi-item min-price" v-model="minPrice" type="number"/>
      <div class="pi-item price-sign "></div>
      <input class="pi-item max-price" v-model="maxPrice" type="number"/>
      <a class="pi-item confirm-btn" @click="confirmPrice">确认</a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'SearchPriceArea',
    props: {
      priceFilters: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        minPrice: '',
        maxPrice: ''
      }
    },
    methods: {
      //选择价格区间
      choicePrice(min, max) {
        this.minPrice = min || 0;
        this.maxPrice = max || 0;
        this.confirmPrice();
      },
      // 确定选择的价格
      confirmPrice() {
        this.$emit('confirmPrice', this.minPrice, this.maxPrice);
      }
    }
  }
</script>

<style scoped>
  .search-price-area {
    width: 100%;
    color: #333333;
    height: 100px;
  }

  .quick-btn-lists {
    margin: 14px 8px;
    display: flex;
    justify-content: space-between;
  }

  .quick-btn-item {
    background-color: #f3f3f3;
    text-align: center;
    font-size: 14px;
    height: 28px;
    line-height: 28px;
    width: 110px;
  }

  .price-input {
    margin: 0 8px 8px;
    line-height: 36px;
    height: 36px;
  }

  .price-input .pi-item {
    float: left;
  }

  input{
    outline-color: invert ;
  	outline-style: none ;
  	outline-width: 0px ;
  	border: none ;
  	border-style: none ;
  	text-shadow: none ;
  	-webkit-appearance: none ;
  	-webkit-user-select: text ;
  	outline-color: transparent ;
  	box-shadow: none;
  }

  .confirm-btn, .price-input input {
    height: 30px;
    line-height: 30px;
    border-radius: 2px;
    text-align: center;
    font-size: 14px;
    margin: 2px 0 0 10px;
    width: 80px;
  }

  .price-input input {
    border: 1px solid #e5e5e5;
    padding: 2px 8px;
  }

  .price-sign {
    display: inline-block;
    width: 10px;
    height: 0;
    border-top: 1px solid #cbcbcb;
    margin: 16px 0 0 10px;
  }

  .confirm-btn {
    background-color: #ff5b76;
    color: #fff;
  }
</style>

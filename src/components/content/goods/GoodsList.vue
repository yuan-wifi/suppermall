<template>
  <div class="goods" :style="{backgroundColor: bgcolor}">
      <goods-list-item class="goods-list-item"  v-for="(item, index) in goods" :goodsItem="item" :key="index"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem.vue'

  export default {
    name: 'GoodsList',
    props: {
      goods: {
        type: Array,
        default () {
          return []
        }
      },
      bgcolor: {
        type: String,
        default: '#EFEFEF'
      }
    },
    components: {
      GoodsListItem
    }
  }
</script>

<style>
  .goods {
    display: flex;
    flex-wrap:wrap;
    justify-content: space-between;
    padding: 15px 15px 3px;
    background-color: #EFEFEF;
  }

</style>

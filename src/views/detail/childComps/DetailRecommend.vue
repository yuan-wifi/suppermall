<template>
  <div class="detail-recommend">
    <goods-list :goods="detailRecommend"></goods-list>
  </div>
</template>

<script>
  import GoodsList from 'components/content/goods/GoodsList.vue'

  export default {
    name: 'DetailRecommend',
    props: {
      detailRecommend: {
        type: Array,
        default() {
          return []
        }
      }
    },
    components: {
      GoodsList
    }
  }
</script>

<style scoped>
</style>

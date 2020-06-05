<template>
  <div class="categoryCate" v-if="itemCategory.length > 0">
    <a class="c-item" v-for="(item, index) in itemCategory" :key="index" >
      <div class="item-img">
        <img :src="item.image" alt="" @load="imageLoad">
      </div>
      <p>{{item.title}}</p>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'CategoryCate',
    props: {
      itemCategory: {
        type: Array,
        default() {
          return {}
        }
      }
    },
    methods: {
      imageLoad() {
        this.$emit('imageLoad')
      }
    }
  }
</script>

<style scoped>
  .categoryCate {
    display: flex;
    flex-wrap:wrap;
    justify-content: flex-start;
    width: 100%;
    padding: 15px 10px 0 10px;
  }

  .c-item {
    position: relative;
    width: 33%;
    margin: 10px 0;
    overflow: hidden;
    text-align: center;
  }

  .item-img {
    position: relative;
    margin: 0 auto;
    width: 80%;
  }

  .item-img img {
    width: 100%;
  }

  .c-item p {
    font-size: 12px;
    color: #666666;
    text-align: center;
    line-height: 19px;
    margin-top: 8px;
  }

</style>

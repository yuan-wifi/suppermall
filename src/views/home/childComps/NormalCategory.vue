<template>
  <div class="normal-category">
    <a v-for="(item, index) in category" :key="index" class="c-item">
      <div class="c-item-icon">
        <img :src="item.image" @load="imageLoad"/>
      </div>
      <div class="c-item-title">
        {{item.title}}
      </div>
    </a>
  </div>
</template>

<script>
  export default {
    name: 'NormalCategory',
    props: {
      category: {
        type: Array,
        default () {
          return []
        }
      }
    },
    methods: {
      imageLoad() {
        this.$emit('imageload')
      }
    }
  }
</script>

<style scoped>
  .normal-category {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
  }

  .c-item {
    width: 20%;
    padding-top: 5px;
    padding-bottom: 5px;
  }

  .c-item-icon {
    position: relative;
    width: 50px;
    height: 50px;
    overflow: hidden;
    margin: 0 auto;
  }

  .c-item-icon img {
    width: 100%;
    border-radius: 50%;
  }

  .c-item-title {
    text-align: center;
    color: rgb(102, 102, 102);
    font-size: 13px;
    height: 18px;
    line-height: 18px;
    font-weight: 400;
    text-align: center;
    margin-top: 4px;
  }

</style>

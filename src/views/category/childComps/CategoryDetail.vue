<template>
  <ul class="c-detail" >
    <li v-for="(item, index) in categoryData"
        :key="index"
        class="item-title"
        @click="checkItem(index, item.maitKey)"
        :class="{active:currentIndex === index}">
      <p>{{item.title}}</p>
    </li>
  </ul>
</template>

<script>
  export default {
    name: 'CategoryDetails',
    props: {
      categoryData: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data() {
      return {
        currentIndex: 0,
      }
    },
    methods: {
      checkItem(index, key) {
        this.currentIndex = index;
        this.$emit('categoryClick', key)
      }
    }
  }
</script>

<style scoped>
  .c-detail {
    background-color: #F6F6F6;
    position: relative;
  }

  .item-title {
    position: relative;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    color: #666666;
  }

  .item-title p {
    position: absolute;
    width: 80%;
    height: 16px;
    top: 50%;
    left: 50%;
    margin-top: -8px;
    margin-left: -50px;
    line-height: 16px;
    border-left: solid #F6F6F6 3px;
  }

  .item-title.active {
    background-color: #fff;
    color: #FF5777;
  }

  .item-title.active p {
    border-left: solid #FF5577 4px;
    font-weight: bold;
  }


</style>

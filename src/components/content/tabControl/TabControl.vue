<template>
  <div class="tab-control">
    <div  class="tab-control-item"
          :class="{active: index === currentIndex}"
          v-for="(item, index) in titles"
          :key="index"
          @click="tabClick(index)">
      <span>{{ item }}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'TabControl',
    data () {
      return {
        currentIndex: 0
      }
    },
    props: {
      titles: {
        type: Array,
        default () {
          return [];
        }
      }
    },
    mounted () {
      // 获取分类下的商品列表
      if (this.titles.length > 0) {
        this.tabClick(0);
      }
    },
    methods: {
      tabClick (index) {
        this.currentIndex = index;
        this.$emit('tabClick', index);
      }
    }
  }
</script>

<style>
  .tab-control {
    display: flex;
    height: 44px;
    line-height: 44px;
    width: 100%;
    font-size: 14px;
    text-align: center;
    background-color: #fff;
    z-index: 9;
  }

  .tab-control-item {
    flex: 1;
  }

  .tab-control-item span {
    padding: 5px;
  }

  .active {
    color: var(--color-high-text);
  }

  .active span {
    border-bottom: 3px solid var(--color-tint);
  }
</style>

<template>
  <div class="rate-tags" >
    <div :class="{'rate-list-outbox': moretags}">
      <div class="rate-list">
        <div
          v-for="(item ,index) in rateTags"
          :key="index"
          class="rate-item"
          :class="{'active': index === active}"
          @click="changeTag(index)">
          <span>{{item.value}}</span>
          <span v-if="item.num > 0" class="item-num">{{item.num}}</span>
        </div>
      </div>
    </div>
    <div class="bottom" v-if="moretags" @click="showMoreTags">
      <img src="~assets/img/common/bottom.png"/>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'RateTags',
    props: {
      rateTags: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        active: 0,
        moretags: false
      }
    },
    watch: {
      rateTags(val, oldval) {
        if(val.length >= 8) {
          this.moretags = true;
        }
      }
    },
    methods: {
      // 显示更多标签
      showMoreTags() {
        this.moretags = false;
      },
      // 切换标签
      changeTag(index) {
        this.active = index;
        this.$emit('changeItem', index);
      }
    }
  }
</script>

<style scoped>
  .rate-tags {
    font-size: 12px;
    padding: 10px 16px 2px;
    background: #fff;
  }

  .rate-list-outbox {
    max-height: 64px;
    overflow: hidden;
  }

  .rate-list {
    display: flex;
    flex-wrap: wrap;
  }

  .rate-item {
    padding: 0 11px;
    line-height: 2;
    background-color: #F13E3A;
    margin: 0 5px 8px 0;
    color: #333;
    background-color: #fff6f6;
  }

  .item-num {
    margin-left: 5px;
  }

  .active {
    color: #fff;
    background-color: #fc4769;
  }

  .active span {
    border: none !important;
  }

  .bottom {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 24px;
  }

  .bottom img {
    width: 20px;
    height: 20px;
  }
</style>

<template>
  <div v-if="Object.keys(detailInfo).length > 0" class="goods-info-detail">
    <div class="info-desc clear-fix">
      <div  class="desc-start lineBar"><i  class="lineBar-dot"></i></div>
      <div class="info-desc-text">{{detailInfo.desc}}</div>
      <div  class="desc-end lineBar"><i  class="lineBar-dot"></i></div>
    </div>
    <ul v-for="(info, mindex) in detailInfo.detailImage" :key="mindex">
      <li class="item-info-key">{{info.key}}</li>
      <li class="item-info-desc">{{ info.desc }}</li>
      <li class="item-info-list">
        <img v-for="(item, index) in info.list" :key="index" :src="item" @load="imgLoad" alt=""/>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'DetailGoodsInfo',
    props: {
      detailInfo: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      imgLoad() {
        this.$emit('imgLoad')
      }
    }
  }
</script>

<style scoped>
  .goods-info-detail {
    position: relative;
    width: 100%;
  }

  .info-desc {
    padding: 15px 10px;
    font-size: 13px;
  }

  .lineBar {
    width: 25%;
    height: 1px;
    background: #a3a3a5;
    position: relative;
  }

  .info-desc-text {
    white-space: pre-wrap;
    color: #727272;
    font-size: 12px;
    padding: 15px 0;
    line-height: 18px;
  }

  .lineBar-dot {
    display: inline-block;
    width: 4px;
    height: 4px;
    background: #000;
    border-radius: 50%;
    position: absolute;
    top: -1px;
  }

  .desc-end {
      float: right;
  }

  .desc-end i {
    right: 0;
  }

  .item-info-key {
      margin-top: 6px;
      height: 20px;
      line-height: 20px;
      text-indent: 12px;
      color: #303030;
      font-weight: 400;
      font-size: 13px;
  }

  .item-info-desc {
      white-space: pre-wrap;
      padding: 0 12px;
      line-height: 20px;
      text-indent: 12px;
      color: #727272;
      font-size: 11px;
  }

  .item-info-list {
    width: 100%;
    margin-top: 7px;
  }

  .item-info-list img {
    width: 100%;
  }
</style>

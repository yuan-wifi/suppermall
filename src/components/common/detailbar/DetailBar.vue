<template>
  <div v-if="Object.keys(barinfo).length > 0">
    <div v-if="barinfo.title" class="bar-info">
      <div class="bar-title">{{barinfo.title}}</div>
      <a v-if="barinfo.subTitle" class="bar-subtitle">
        {{barinfo.subTitle}}
        <img src="~assets/img/profile/more.png" />
      </a>
    </div>
    <div class="bar-list">
      <a class="bar-item" v-for="(item, index) in barinfo.itemListInfo" :key="index">
        <img  :src="item.iconUrl" />
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBar',
    props: {
      barinfo: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .bar-info {
    margin: 0 9px;
    border-bottom: 1px solid #EFEFEF;
    height: 40px;
    line-height: 40px;
    display: flex;
  }

  .bar-title {
    flex: 1;
    font-size: 14px;
    color: #333;
  }

  .bar-subtitle {
    width: 150px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 11px;
    color: #999;
  }

  .bar-subtitle img {
    width: 5px;
    height: 9px;
    margin-left: 3px;
    margin-top: -1px;
  }

  .bar-list {
    display: flex;
    text-align: center;
    flex-wrap: wrap;
  }

  .bar-item {
    text-align: center;
    height: 50px;
    font-size: 12px;
    width: 50px;
    margin: 5px 9px;
    line-height: 1.5;
  }

  .bar-item img {
    width: 25px;
    height: 25px;
    margin: 3px;
    vertical-align: middle;
  }

</style>

<template>
  <div class="rate-list">
    <div class="rate-list-item" v-for="(item, index) in rateList" :key="index">
      <div class="user-info">
        <div class="user-avatar">
          <img :src="item.user.avatar"/>
        </div>
        <div class="user-other">
          <p class="user-name">{{item.user.uname}}</p>
          <p class="size-info">
            <span v-if="item.sizeInfo" class="desc">{{item.sizeInfo.desc}}</span>
            <span v-if="item.sizeInfo">&nbsp;|</span>
            <span v-if="item.sizeInfo">&nbsp;{{item.sizeInfo.height}}</span>
            <span v-if="item.sizeInfo">&nbsp;{{item.sizeInfo.weight}}</span>
            <span v-if="item.style">&nbsp;{{item.style}}</span>
          </p>
        </div>
      </div>
      <div class="rate-content">
        <div class="rate-content-body">{{item.content}}</div>
        <ul class="rate-content-img">
          <li class="rate-content-img-item" v-for="(img, iindex) in item.images" :key="iindex">
            <img :src="img"/>
          </li>
        </ul>
      </div>
      <div class="rate-other-info">
        <span>{{item.created | convertTime}}</span>
        <span></span>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/utils.js'

  export default {
    name: 'RateList',
    props: {
      rateList: {
        type: Array,
        default() {
          return []
        }
      }
    },
    filters: {
      convertTime(value) {
        let date = new Date(value*1000)
        return formatDate(date,'yyyy年MM月dd日')
      }
    }
  }
</script>

<style scoped>
  .rate-list {
    wdith: 100%;
    font-size: 12px;
  }

  .rate-list-item {
    padding: 12px 0;
    margin-top: 9px;
    line-height: 1.6;
    background-color: #ffffff;
  }

  .user-info {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 12px;
    margin-bottom: 9px;
  }

  .user-avatar {
    flex: 0 0 40px;
    height: 40px;
    margin-right: 9px;
  }

  .user-avatar img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
  }

  .user-other {
    color: #999;
  }

  .user-name {
    font-size: 14px;
    font-weight: 400;
    color: #333333;
  }

  .size-info {
    color: #999;
  }

  .size-info .desc {
    color: #f46;
  }

  .rate-content {
    padding: 0 12px;
  }

  .rate-content-body {
    margin-bottom: 9px;
    color: #333;
  }

  .rate-content-img {
    display: flex;
    flex-wrap: wrap;
    margin: 0 -1%;
    margin-bottom: 9px;
  }

  .rate-content-img-item {
    width: 32%;
    margin: 0 0 1% 1%;
    background-color: #e4e4e4;
    height: 115px;
    overflow: hidden;
  }

  .rate-content-img-item img {
    width: 100%;
  }

  .rate-other-info {
    padding: 0 12px;
    color: #999;
  }

</style>

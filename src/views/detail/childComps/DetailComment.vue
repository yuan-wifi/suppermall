<template>
  <div class="detail-comment">
    <a class="head">
      <span  class="head-title">买家评价 {{detailComment.cRate}} | 销量 {{detailComment.sales}}</span>
      <span  class="head-more" @click="goRate"><img src="../../../assets/img/detail/more.png"></span>
    </a>
    <div class="tags">
      <span class="tags-item" :class="{negative: item.emotion === 'negative'}" v-for="(item, index) in detailComment.rateTags" :key="index">{{ item.value }} ({{ item.num }})</span>
    </div>
    <div class="comment-list">
      <div class="c-item" v-for="(item, index) in detailComment.list" :key="index">
        <div class="item-user">
          <div class="i-user-avatar"><img :src="item.user.avatar"/></div>
          <span class="i-user-name">{{item.user.uname}}</span>
        </div>
        <p class="c-content">
          {{item.content}}
        </p>
        <div class="c-info">
          <div class="c-info-time">{{item.created | formatTime}}</div>
          <div class="c-info-size" v-if="item.sizeInfo">
            <span  v-if="item.sizeInfo.height">身高：{{item.sizeInfo.height}}</span>
            <span  v-if="item.sizeInfo.weight">体重：{{item.sizeInfo.weight}}</span>
            <span  v-if="item.sizeInfo.desc">是否合身：{{item.sizeInfo.desc}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {formatDate} from 'common/utils.js'

  export default {
    name: 'DetailComment',
    props: {
      detailComment: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    filters: {
      formatTime(value) {
        let mydate = new Date(value*1000);
        return formatDate(mydate, 'yyyy-MM-dd')
      }
    },
    methods: {
      goRate() {
        this.$emit('goRate');
      }
    }
  }
</script>

<style scoped>
  .detail-comment {
    padding: 0 12px;
    background-color: #fff;
    border-bottom: 7px solid #eaeaea;
  }

  .head {
    height: 36px;
    line-height: 48px;
    padding: 16px 0 12px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .head-title {
    color: #999999;
    font-size: 11px;
    flex: 1;
  }

  .head-more {
    flex: 1;
    text-align: right;
  }

  .head-more img {
    margin-top: 16px;
    height: 22px;
  }

  .tags-item {
    font-size: 10px;
    display: inline-block;
    margin-right: 5px;
    margin-top: 5px;
    padding: 5px;
    color: #FF2255;
    background-color: #FFE8EE;
  }

  .negative {
    color: #666666;
    background-color: #F6F6F6;
  }

  .comment-list {
    font-size: 12px;
  }

  .c-item {
    border-bottom: 1px solid #eee;
    padding-top: 12px;
    padding-bottom: 12px;
  }

  .item-user {
    font-size: 12px;
    display: flex;
    line-height: 32px;
  }

  .i-user-avatar {
    height: 25px;
    width: 25px;
  }

  .item-user img{
    height: 25px;
    border-radius: 50%;
    border: 1px solid #efefef;
  }

  .i-user-name {
    margin-left: 8px;
    color: #424242;
  }

  .c-content {
    font-size: 12px;
    line-height: 15px;
    margin-top: 4px;
  }

  .c-info {
    margin-top: 6px;
    line-height: 12px;
    font-size: 10px;
  }

  .c-info-size span {
    margin-right: 10px;
  }
</style>

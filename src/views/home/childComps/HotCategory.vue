<template>
  <div class="hot-category">
    <a v-for="(item, index) in category" :key="index" class="item">
      <div class="item-bg" :style="{backgroundImage: 'url('+item.backgroundImage+')'}">
        <div class="time" v-if="index === 0">
          <span>{{hourMinuteSecond.hour}}</span>
          <em></em>
          <span>{{hourMinuteSecond.minute}}</span>
          <em></em>
          <span>{{hourMinuteSecond.second}}</span>
        </div>
        <p class="item-title">
          {{item.title}}
        </p>
      </div>
    </a>
  </div>
</template>

<script>
  import { getHourMinuteSecond } from 'common/utils.js'

  export default {
    name: 'HotCategory',
    props: {
      category: {
        type: Array,
        default() {
          return []
        }
      }
    },
    data() {
      return {
        count: 0
      }
    },
    watch: {
      getCounter(val) {
        if(val > -1){
          this.count = val;
          let countdown = setInterval(() => {
            if(this.count === 0 ) {
              clearInterval(countdown);
              this.count != -1;
            }
            else this.count--;
          }, 1000);
        }
      }
    },
    computed: {
      hourMinuteSecond() {
        return getHourMinuteSecond(this.count);
      },
      getCounter() {
        return this.category.length === 0 ? 0 : this.category[0].countdown;
      }
    }
  }
</script>

<style scoped>
  .hot-category {
    padding: 9px;
    display: flex;
    justify-content: space-between;
  }

  .item {
    position: relative;
    width: 82px;
  }

  .item-bg {
    width: 82px;
    height: 82px;
    background-size: cover;
  }

  .time {
    position: absolute;
    bottom: 21px;
    display: -webkit-box;
    display: -webkit-flex;
    display: -moz-box;
    display: -ms-flexbox;
    display: flex;
    color: #fff;
    width: 60px;
    left: 50%;
    margin-left: -30px;
  }

  .time span {
    background: #333;
    border-radius: 2px;
    width: 16px;
    height: 16px;
    text-align: center;
    line-height: 16px;
    font-size: 10px;
    font-weight: 700;
  }

  .time em {
    font-style: normal;
    position: relative;
    display: inline-block;
    width: 3px;
    height: 6px;
    margin: 2px;
    top: 6px;
    background: url(~assets/img/common/time.png) no-repeat 50%;
  }

  .item-title {
    position: absolute;
    bottom: 4px;
    left: 0;
    width: 100%;
    font-size: 14px;
    color: #fff;
    text-align: center;
    font-weight: 700;
  }
</style>

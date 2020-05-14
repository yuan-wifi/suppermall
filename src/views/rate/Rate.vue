<template>
  <div id="rate">
    <nav-bar class="nav-bar">
      <div slot="left" @click="backClick" class="item">
        <img src="~assets/img/common/back.svg" class="back">
      </div>
      <div slot="center" class="nav-titles">所有评价</div>
    </nav-bar>
    <scroll class="content">
      <div class="score">
        综合评分<span class="ascore">{{score}}</span>
      </div>
      <rate-tags :rate-tags="rateTags" @changeItem="changeTags"></rate-tags>
      <rate-list :rate-list="currentTagData"></rate-list>
    </scroll>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'

  import RateTags from './childComps/RateTags.vue'
  import RateList from './childComps/RateList.vue'

  import { getRateData, getRateBaseInfo } from 'network/rate.js'

  export default {
    name: 'Rate',
    data() {
      return {
        iid: '',
        rateInfos: {},
        rateTags: [],
        score: 0,
        currentTag: ''
      }
    },
    components: {
      NavBar,
      Scroll,
      RateTags,
      RateList
    },
    created() {
      this.iid = this.$route.params.iid;
      //获取评论基础数据
      getRateBaseInfo().then((data) => {
        this.rateTags.push(...data.rateTags)
        this.score = data.averageScore;
        let tag = this.rateTags[0]['value'];
        // 获取评论数据
        this.getRateDatas(tag);

        this.$nextTick(() => {
          // 点击第一个分类
          //this.$refs.ccategory.checkItem(0, key);
        })
      })
    },
    computed: {
      currentTagData() {
        return this.rateInfos[this.currentTag] ? this.rateInfos[this.currentTag].list : [];
      }
    },
    methods: {
      /**
       * 网络相关
       */
      //获取评论数据
      getRateDatas(type) {
        this.currentTag = type;
        if(!this.rateInfos[type]) {
          this.$set(this.rateInfos, type, { page:0, list: [] });
        }
        let page = this.rateInfos[type].page + 1;
        getRateData(this.iid, type, page).then((data) => {
          this.rateInfos[type].page += 1;
          this.rateInfos[type].list.push(...data.list)
        })
      },

      /**
       * 事件相关
       */
      // 返回上一页
      backClick() {
        this.$router.go(-1);
      },
      // 切换评论标签
      changeTags(index) {
        console.log(this.rateTags[index]);
      }
    }
  }
</script>

<style scoped>
  #rate {
    position:relative;
    z-index: 100;
    height: 100%;
    width: 100%;
    background-color: #f6f6f6;
  }

  .nav-bar {
    background-color: rgb(250,250,250);
  }

  .item {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .item img {
    width: 22px;
    height: 22px;
  }

  .content {
    position: absolute;
    top: 44px;
    left: 0;
    right: 0;
    bottom: 0;
    overflow: hidden;
  }

  .score {
    font-size: 13px;
    padding: 11px 12px;
    color: #777;
    background-color: #fef0f0;
  }

  .ascore {
    margin-left: 2px;
    color: #fc5785;
    line-height: 1.5;
  }

</style>

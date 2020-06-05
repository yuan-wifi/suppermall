<template>
  <div id="rate">
    <nav-bar class="nav-bar">
      <div slot="left" @click="backClick" class="item">
        <img src="~assets/img/common/back.svg" class="back">
      </div>
      <div slot="center" class="nav-titles">所有评价</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <div class="score">
        综合评分<span class="ascore">{{score}}</span>
      </div>
      <rate-tags :rate-tags="rateTags" @changeItem="changeTags"></rate-tags>
      <rate-list :rate-list="currentTagData" @preview="previewImg" @rateImgLoad="imgLoad"></rate-list>
    </scroll>
    <transition name="bounce">
      <preview-img :imgsrc="imgSrc" v-show="showPre" @hidden="hiddenPre" :index="preindex"></preview-img>
    </transition>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar.vue'
  import Scroll from 'components/common/scroll/Scroll.vue'
  import PreviewImg from 'components/common/previewimg/PreviewImg.vue'

  import RateTags from './childComps/RateTags.vue'
  import RateList from './childComps/RateList.vue'

  import { getRateData, getRateBaseInfo } from 'network/rate.js'

  import { debounce } from 'common/utils.js'

  export default {
    name: 'Rate',
    data() {
      return {
        iid: '',
        rateInfos: {},
        rateTags: [],
        score: 0,
        currentTag: '',
        imgSrc: [],
        showPre: false,
        preindex: 0
      }
    },
    components: {
      NavBar,
      Scroll,
      PreviewImg,
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
        alert('正在开发')
      },
      // 显示图片预览
      previewImg(imglist, index) {
/*        this.imgSrc.splice(0,this.imgSrc.length);
        this.imgSrc.push(...imglist);
        let cvalue = this.imgSrc.splice(index,1);
        this.imgSrc.unshift(...cvalue); */
        this.imgSrc = JSON.parse(JSON.stringify(imglist));;
        this.preindex = index;
        setTimeout( ()=> {
          this.showPre = true;
        }, 100);
      },
      // 隐藏图片预览
      hiddenPre() {
        this.showPre = false;
        this.imgSrc.splice(0,this.imgSrc.length);
        this.preindex = 0;
      },
      // 评论列表图片加载
      imgLoad() {
        debounce(() => {
          this.$refs.scroll.refresh();
        }, 500)();
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

  .bounce-enter-active {
    animation: bounce-in .2s;
  }
  .bounce-leave-active {
    animation: bounce-in .2s reverse;
  }
  @keyframes bounce-in {
    0% {
      transform: scale(0);
    }

    100% {
      transform: scale(1);
    }
  }

</style>

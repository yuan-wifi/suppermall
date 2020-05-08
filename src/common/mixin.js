import { debounce } from './utils.js'
import BackTop from 'components/content/backTop/BackTop.vue'

export const imageMixin = {
  data() {
    return {
      srcollItemListener: null,
    }
  },
  mounted() {
    let refresh = debounce(this.$refs.scroll.refresh, 500);

    this.scrollItemListener = () => {
      //刷新scroll的高度
      refresh();
    }
    this.$buds.$on("imgloaddown", this.scrollItemListener );
  }
}

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    }
  },
  components: {
    BackTop
  },
  methods: {
    // 回到顶部的事件
    backClick () {
      this.$refs.scroll.scrollTo(0,0,500);
    },
    // 控制图标的显示隐藏
    showBackTop (position) {
      this.isShowBackTop = position.y < -1000 ? true : false;      
    }
  }
}

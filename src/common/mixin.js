import { debounce } from './utils.js'
import BackTop from 'components/content/backTop/BackTop.vue'
import TabControl from 'components/content/tabControl/TabControl.vue'
import NavBar from 'components/common/navbar/NavBar.vue'

// 图片加载完 刷新事件的mixin
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

// 返回顶部的mixin
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

// 固定控制条的mixin
export const tabControlMixin = {
  data () {
    return {
      isTabFixed: false,
      tabOffsetTop: 0,
    }
  },
  components: {
    TabControl
  },
  methods: {
    fixedTab(position) {
      this.isTabFixed = -position.y > this.tabOffsetTop;
    }
  }
}

// 显示搜索header的mixin
export const searchHeaderMixin = {
  props: {
    searchkey: {
      type: String,
      default: '上衣'
    }
  },
  components: {
    NavBar
  },
  methods: {
    goSearch() {
      this.$emit('showSearch');
    }
  }
}

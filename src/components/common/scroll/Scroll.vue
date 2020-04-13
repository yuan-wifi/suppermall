<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      isclick: {
        type: Boolean,
        default: true
      },
      probeType: {
        type: Number,
        default: 0
      },
      pullup: {
        type: Boolean,
        default: true
      }
    },
    data () {
      return {
        scroll: null
      }
    },
    mounted () {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullup: this.pullup,
        click: this.isclick
      })

      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position);
        })
      }

      if (this.pullup) {
        this.scroll.on('pullingUp', () => {
          console.log('上拉加载更多pullingUp')
          this.$emit('pullingUp')
        })
      }

      // 是否派发滚动到底部事件，用于上拉加载
      //if (this.pullup) {
/*      this.scroll.on('scrollEnd', () => {
        // 滚动到底部
        if (this.scroll.y <= (this.scroll.maxScrollY + 50)) {
          //console.log('上拉加载更多')
          //this.$emit('pullingUp')
        }
        //})
      }) */
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.scroll && this.scroll.finishPullUp();
      },
      refresh() {
        this.scroll && this.scroll.refresh();
      }

    }
  }
</script>

<style scoped>
</style>

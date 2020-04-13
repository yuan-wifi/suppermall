<template>
  <swiper>
    <swiper-item v-for="(item,index) in banners" :key="index">
      <a :href="item.link">
        <img :src="item.image" alt="" @load="imgLoad"/>
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
  import Swiper from 'components/common/swiper/Swiper.vue'
  import SwiperItem from 'components/common/swiper/SwiperItem.vue'

  export default {
    name: 'HomeSwiper',
    props: {
      banners: {
        type: Array,
        default () {
          return []
        }
      }
    },
    data () {
      return {
        isload: false
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      imgLoad () {
        if (!this.isload) {
          this.$emit('imageload');
          this.isload = true;
        }
      }
    }
  }
</script>

<style>
</style>

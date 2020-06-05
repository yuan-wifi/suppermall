<template>
  <div class="preview-img" @click="hiddenPre">
    <div class="p-bg" ></div>
    <div class="p-img" v-if="imgsrc.length > 0">
      <div class="img-body">
        <swiper :show-indicator="false" class="item" :is-scroll="false" :index="index" :anim-duration="0">
          <swiper-item v-for="(item,index) in imgsrc" :key="index" class="item">
            <a class="item">
              <img class="item" :src="item" alt="" />
            </a>
          </swiper-item>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from '../swiper/Swiper.vue'
  import SwiperItem from '../swiper/SwiperItem.vue'

  export default {
    name: 'PreviewImg',
    props: {
      imgsrc: {
        type: Array,
        default() {
          return []
        }
      },
      index: {
        type: Number,
        default: 0
      }
    },
    components: {
      Swiper,
      SwiperItem
    },
    methods: {
      hiddenPre() {
        this.$emit('hidden');
      }
    }
  }
</script>

<style scoped>
  .preview-img {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .p-bg {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }

  .p-img {
    width: 100%;
    max-height: 80%;
    overflow: hidden;
    position: relative;
    z-index: 2;
  }

  .img-body {
    width: 100%;
    height: 100%;
  }

  item {
    width: 100%;
  }
</style>

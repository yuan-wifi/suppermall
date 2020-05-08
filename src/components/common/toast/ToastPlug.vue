<template>
  <div class="toast-plug" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: 'ToastPlug',
    data() {
      return {
        message: '',
        isShow: false
      }
    },
    methods: {
      show(message = '我是消息', duration = 2000) {
        this.message = message;
        this.isShow = true;

        setTimeout(() => {
          this.message = '';
          this.isShow = false
        }, duration);
      }
    }
  }
</script>

<style scoped>
  .toast-plug {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, .75);
    padding: 8px;
    color: #fff;
    font-size: 13px;
    border-radius: 5px;
    z-index: 999;
  }
</style>

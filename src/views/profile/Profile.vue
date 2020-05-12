<template>
  <div class="content-container">
    <div class="content-inner-container">
      <div class="profile content">
        <profile-top :userinfo="userinfo"></profile-top>
        <div class="blockinfo" v-for="(item,index) in blockinfo" :key="index">
          <detail-bar class="detail" v-if="parseInt(item.layoutType) === 0" :barinfo="item"></detail-bar>
          <profile-cart v-else :barinfo="item"></profile-cart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import ProfileTop from './childComps/ProfileTop.vue'
  import ProfileCart from './childComps/ProfileCart.vue'
  import DetailBar from 'components/common/detailbar/DetailBar.vue'

  import { getProfileInfo } from 'network/profile.js'

  export default {
    name: 'Profile',
    components: {
      ProfileTop,
      ProfileCart,
      DetailBar
    },
    data() {
      return {
        userinfo: {},
        blockinfo: []
      }
    },
    created() {
      // 获取用户信息
      getProfileInfo().then((data) => {
        console.log(data)
        this.userinfo = data.homeProfile;
        this.blockinfo = data.blockInfo;
      });
    }
  }
</script>

<style scoped>
  .content-container, .content {
  	width: 100%;
  	height: calc(100vh - 49px);
  }

  .content-container {
      position: relative;
      overflow: hidden;
  }
  .content-inner-container {
      position: absolute;
      left: 0;
      overflow-x: hidden;
      overflow-y: scroll;
      background-color: #f6f6f6;
  }

   /* for Chrome */
  .content-inner-container::-webkit-scrollbar {
      display: none;
  }

  .profile {
    background-color: #f6f6f6;
  }

  .blockinfo {
    width: 94%;
    margin: 0 auto 9px;
  }

  .detail {
    padding: 5px;
    border-radius: 6px;
    background-color: #fff;
  }
</style>

<template>
  <div class="profileinfo">
    <div class="userinfo">
      <div class="user">
        <div class="usericon">
          <img  src="~assets/img/profile/profileicon.jpg"/>
        </div>
        <img class="vip" src="~assets/img/profile/profilegrade.png"/>
      </div>
      <div class="username">{{userinfo.userName}}</div>
      <img class="buyvip" src="~assets/img/profile/profilevip.png"></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ProfileTop',
    props: {
      userinfo: {
        type: Object,
        default() {
          return {

          }
        }
      }
    }
  }
</script>

<style scoped>
  .profileinfo {
    background: url('~assets/img/profile/profiletop.png') 0 -22px no-repeat;
    background-size: 375px 115px;
    overflow: hidden;
    margin-bottom: 9px;
  }

  .userinfo {
    margin: 45px auto 0;
    height: 126px;
    width: 94%;
    border-radius: 6px;
    background: #fff;
    position: relative;
    text-align: center;
  }

  .user {
    position: absolute;
    left: 50%;
    top: -33px;
    width: 66px;
    height: 66px;
    z-index: 99;
    margin-left: -33px;
  }

  .usericon {
    border: 3px solid #fff;
    border-radius: 100%;
    overflow: hidden;
  }

  .usericon img {
    width: 100%;
  }

  .vip {
    position: absolute;
    right: 3px;
    bottom: 3px;
    width: 20px;
    height: 20px;
    overflow: hidden;
  }

  .username {
    text-align: center;
    padding-top: 45px;
    font-size: 17px;
    font-weight: 700;
  }

  .buyvip {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
  }
</style>

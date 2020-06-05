<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view/>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
    <search></search>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabbar/MainTabBar.vue'
import Search from 'components/common/search/Search.vue'

export default {
  name: 'App',
  components: {
    MainTabBar,
    Search
  }
}
</script>

<style>
@import "assets/css/base.css";

#app {
  height: 100%;
}
</style>

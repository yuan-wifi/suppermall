<template>
  <div class="checkButton" :class="{checked: isChecked}">
    <img src="../../../assets/img/cart/tick.svg"/>
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>
  .checkButton {
    background-color: #fff;
    border: 1px solid #A3A3A5;
    border-radius: 50%;
  }

  .checkButton img {
    width: 92%;
  }

  .checked {
    background-color: #f13e3a;
    border: 1px solid #f13e3a;
  }
</style>

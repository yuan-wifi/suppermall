<template>
  <div class="param-info" v-if="Object.keys(detailPrams).length > 0">
    <table class="size-table">
      <tr v-for="(item, index) in detailPrams.rule.tables[0]" :key="index">
        <td v-for="(itemlist, indexlist) in item" :key="indexlist">{{itemlist}}</td>
      </tr>
    </table>
    <ul class="other-param">
      <li class="params-item" v-for="(value,key, index) in detailPrams.info.set" :key="index">
        <span class="item-name">{{key}}</span>
        <span class="item-content">{{value}}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  export default {
    name: 'DetailParamInfo',
    props: {
      detailPrams: {
        type: Object,
        default () {
          return {}
        }
      }
    }
  }
</script>

<style scoped>
  .param-info {
    position: relative;
    width: 100%;
    padding: 0 12px;
    margin-top: 16px;
    font-size: 12px;
  }

  .size-table {
    width: 100%;
    text-align: left;
    border-collapse: collapse;
  }

  .size-table tr td {
    line-height: 32px;
    text-align: left;
    color: #eb4868;
  }

  .size-table tr td:nth-child(1){
    width: 80px;
  }

  .size-table tr td:first-child {
    color: #727272;
  }

  .size-table tr:first-child td {
    color: #727272;
  }

  .size-table tr, .other-param li {
    border-bottom: 1px solid #f4f4f4;
  }

  .other-param {
    text-align: left;
    line-height: 1.5;
  }

  .other-param span {
    display: inline-block;
    padding: 7px 0;
    vertical-align: top;
    white-space: normal;
  }

  .item-name {
    width: 80px;
  }

  .item-content {
    color: #eb4868;
    width: calc(100vw - 104px);
  }


</style>

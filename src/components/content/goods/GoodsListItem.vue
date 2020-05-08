<template>
  <div class="goods-item" @click="itemClick">
    <img :src="imagesrc" @load="imgLoad" />
    <div class="goods-info">
      <p>{{goodsItem.title}}</p>
      <div>
        <div class="price">
          ¥{{goodsItem.price}}
        </div>
        <div class="favorite">
          {{goodsItem.cfav}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'GoodsListItem',
    props: {
      goodsItem: {
        type: Object,
        default () {
          return {}
        }
      }
    },
    methods: {
      imgLoad () {
        this.$buds.$emit('imgloaddown');
      },
      itemClick () {
        this.$router.push('/detail/'+this.goodsItem.iid)
      }
    },
    computed: {
      imagesrc () {
        return this.goodsItem.img ? this.goodsItem.img : this.goodsItem.image;
      }
    }
  }
</script>

<style>
  .goods-item {
    position: relative;
    padding-bottom: 40px;
    width: 47%;
    background-color: #fff;
    margin-bottom: 10px;
    border-radius: 3px 3px 0 0;
  }

  .goods-item img {
    width: 100%;
    border-radius: 3px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    height: 40px;
    overflow: hidden;
    text-align: center;
    padding: 0 3px;
  }

  .goods-info p {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 4px 0 0 2px;
    color: rgb(51, 51, 51);
  }

  .goods-info .price {
    float: left;
    font-weight: 700;
    font-size: 14px;
    color: rgb(51, 51, 51);
    line-height: 24px;
  }

  .goods-info .favorite {
    float: right;
    padding-right: 15px;
    background: url('~assets/img/common/collect.svg') 100% no-repeat;
    background-size: auto 14px;
    color: #666;
    line-height: 24px;
    margin-right: 3px;
  }

</style>

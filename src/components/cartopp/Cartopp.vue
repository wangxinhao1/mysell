<template>
    <div class="cartopp">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count>0" @click="subCart"></div>
      <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
      <div class="cart-add icon-add_circle" @click="addCart"></div>
    </div>

</template>

<script>
  import Vue from 'vue';
  export default {
    props:['food'],

    /*components:{

    },*/
    methods: {
      addCart(){
        if(!this.food.count){
          Vue.set(this.food,'count',1)
        }else{
          this.food.count++;
        }
      },
      subCart(){
        this.food.count--;
      }
    }
  };
</script>

<style lang="less" rel="stylesheet/less">
  .cartopp{
    font-size: 0;
    width:96px;
    height:36px;
    .cart-decrease, .cart-count, .cart-add{
      display: inline-block;
      padding:6px;//增大点击区域

      font-size:24px;
      line-height: 24px;
      color:rgb(0,160,220);
    }
    .cart-add{
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color:rgb(0,160,220);
      position: absolute;
      right:0;
    }


    .cart-count{
      display: inline-block;
      vertical-align: top;
      width: 12px;
      padding-top: 12px;

      text-align: center;
      font-size: 10px;
      color:rgb(147,153,159);
    }
  }
</style>

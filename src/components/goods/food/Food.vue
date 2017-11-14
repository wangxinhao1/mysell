<template>
    <div class="food"  v-if="foods!=null" v-show="flag">
      <div class="foodList" ref="detailSwiper">
        <div>
          <i class="close icon-close" @click="flag=false"></i>
          <div class="img">
            <img :src="foods.image" class="foodImg" alt="">
            <div class="food-head">
                <span class="name">{{foods.name}}</span>
                <div class="numAndRate">
                  <span class="num">月售{{foods.sellCount}}份</span>
                  <span class="rate">好评率{{foods.rating}}</span>
                </div>
                <div class="price">
                  <span class="now">￥<em class="nowprice">{{foods.price}}</em></span>
                  <span class="old">￥{{foods.oldprice}}</span>
                </div>
                <span class="cart">加入购物车</span>
              </div>
            <div class="introduction">
              <span class="name">商品介绍</span>
              <span class="info">{{foods.info}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

</template>

<script>
  import axios from 'axios';
  export default {
    props:['foods','flag'],
    data(){
      return {
        detailScroll:''
      }
    },
    created(){
      let that=this;
      axios.get("http://192.168.1.66:8080/api/goods").then(res=>{
        console.log(res);
        that.$nextTick(()=>{
          that.detailScroll=new BetterScroll(this.$refs.detailSwiper,{click:true});
        });
      }).catch(err=>{
        console.log(err);
      });
    },
    methods:{
      change(){

      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .food{
    position: absolute;
    background: rbga(7,17,27,0.3);
    top: 0px;
    bottom: 0;
    left: 0px;
    background: rgb(255,255,255);
    z-index: 1;
    .foodList{
      position: absolute;
      top: 0;
      bottom: 0;
      .close{
        position: absolute;
        left: 18px;
        top: 18px;
        color:rgba(7,17,27,0.5);
        z-index: 1;
      }
      .img{
        background: #fff;
        position: relative;
        top: 0px;
        left: 0;
        img{
          width:375px;
          height: 390px;
        }
        .food-head{
          padding:18px;
          position: relative;
          .name{
            font-size: 14px;
            color:rgb(7,17,27);
            line-height:14px;
          }
          .numAndRate{
            margin-top: 8px;
            .num,.rate{
              font-size: 10px;
              color:rgb(147,153,159);
              line-height: 10px;
              margin-right: 12px;
            }

          }
          .price{
            margin-top: 18px;
            .now{
              font-size: 10px;
              color:rgb(240,20,20);
              line-height: 24px;
              font-weight: normal;
              .nowprice{
                font-size:14px;
                font-weight: 700;
                font-style: normal;
              }
            }
            .old{
              font-size: 10px;
              color:rgb(147,153,159);
              line-height: 24px;
              text-decoration-line: line-through;
            }
          }
          .cart{
            position: absolute;
            top: 68px;
            right:18px;
            display: block;
            padding: 6px 12px;
            box-sizing: border-box;
            width: 90px;
            height: 24px;
            -webkit-border-radius: 12px;
            -moz-border-radius: 12px;
            border-radius: 12px;
            background:rgb(0,160,220);
            text-align: center;
            color:rgb(255,255,255);
            font-size: 10px;
            line-height: 12px;
            float:right;
          }
        }
        .introduction{
          margin-top: 16px;
          background: #fff;
          padding:18px;
          .name{
            display: block;
            font-size: 14px;
            color:rgb(7,17,27);
            line-height: 14px;
          }
          .info{
            margin-top: 6px;
            padding:0 8px;
            color:rgb(77,85,93);
            font-size: 12px;
            line-height: 24px;
            font-weight: 200;
          }
        }

      }
    }

  }
</style>

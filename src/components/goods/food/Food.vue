<template>
  <!--<transition  name="slide">-->
    <div class="food" ref="detailWrapper" v-if="foods!=null">
      <div>
        <div  v-show="flag">
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
                <span class="cart" @click="food_add()">加入购物车</span>
              </div>
            <div class="introduction">
              <span class="name">商品介绍</span>
              <span class="info">{{foods.info}}</span>
            </div>
            <div class="rating-head">
              <span class="title">商品评价</span>
              <div class="rating-item">
                <span class="item item-all" @click="getData(-1)">全部 <em class="num">{{all()}}</em> </span>
                <span class="item item-recommend" @click="getData(0)">推荐 <em class="num">{{recommend()}}</em> </span>
                <span class="item item-unrecommend" @click="getData(1)">吐槽 <em class="num">{{unrecommend()}}</em></span>
              </div>
              <div class="part-rating" @click="getFlag()">
                <i class="icon-check_circle" :class="{righted:flag0}" ></i>
                <span class="content">只查看有内容的评价</span>
              </div>
            </div>
            <div class="rating-list">
              <ul>
                <li class="rating-list-cont"  v-for="rat in foods.ratings" v-show="isShow(rat.rateType,rat.text)">
                  <div class="timeAndName">
                    <span class="time">{{rat.rateTime | getTime}}</span>
                    <div class="name">
                      <span class="customerName">{{rat.username}}</span>
                      <img class="customerImg" :src="rat.avatar" alt="" width="12" height="12">
                    </div>
                  </div>
                  <div class="vot-wrapper">
                    <i :class="thumb(rat.rateType)" class="icon"></i>
                    <span class="rating-content">{{rat.text}}</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  <!--</transition>-->
</template>

<script>
  import BetterScroll from 'better-scroll';
  import axios from 'axios';
  import Vue from 'vue'
  export default {
    props:['foods'],
    data(){
      return {
        detailScroll:null,
        flag:false,
        type:'',
        flag0:false,
        count0:0
      }
    },
    methods:{
      getData(num){
        this.type=num;
        console.log(num);
        this.$nextTick(()=>{
          this.detailScroll.refresh();
        });

      },
      isShow(ratetype,text){
        if(this.flag0 && text==''){
          return false;
        }
        if(this.type==-1){
          return true;
        }else if(ratetype==this.type){
          return true;
        }
        return false;
      },
      getFlag(){
        this.flag0=!this.flag0;
        console.log(this.flag0)
      },
      show(){
        this.flag=true;
        this.$nextTick(()=>{
          this.detailScroll=new BetterScroll(this.$refs.detailWrapper,{
            click:true
          });
        });
      },
      all(){
        let count=0;
        this.foods.ratings.forEach(res=>{
          count++;
        });
        return count;
      },
      recommend(){
        let count=0;
        this.foods.ratings.forEach(res=>{
          if(res.rateType==0){
            count++;
          }
        });
        return count;
      },
      unrecommend(){
        let count=0;
        this.foods.ratings.forEach(res=>{
          if(res.rateType==1){
            count++;
          }
        });
        return count;
      },
      thumb(rate){
        let arr=["icon-thumb_up","icon-thumb_down"];
        return arr[rate];
      },
      food_add(){
        if(!this.foods.count){
          Vue.set(this.foods,'count',1);
        }else{
          this.foods.count++;
        }
      }
    },
    computed:{

    },
    filters:{
      getTime(time){
        var data=new Date(time);
        return data.getFullYear()+"-"+data.getMonth()+"-"+data.getDate()+" "+data.getHours()+":"+data.getMinutes();
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .food{
    position:absolute;
    top: 0px;
    bottom: 46px;
    height:100%;
    overflow: hidden;
    background:rgba(7,17,27,0.2);
      .close{
        position: fixed;
        left: 18px;
        top: 18px;
        color:rgba(7,17,27,0.5);
        z-index: 1;
        color:#fff;
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
        .rating-head{
          margin-top:16px;
          background:#fff;
          padding: 18px;
          border-bottom: 1px solid rgba(7,17,27,0.2);
          .title{
            display: block;
            font-size: 14px;
            color:rgb(7,17,27);
            line-height: 14px;
          }
          .rating-item{
            padding:18px 0;
            border-bottom: 1px solid rgba(7,17,27,0.2);

            .item{
              display:inline-block;
              /*float: left;*/
              padding: 8px;
              font-size: 12px;
              line-height:16px;
              text-align: center;
              margin-right:8px;

              &.item-all{
                color:rgba(7,17,27,0.8);
                background:rgba(0,0,255,0.6);
              }
              &.item-recommend{
                color:rgba(7,17,27,0.7);
                background: rgba(0,0,255,0.4);
              }
              &.item-unrecommend{
                color:rgba(7,17,27,0.6);
                background: rgba(0,0,255,0.2);
              }
              .num{
                font-size: 10px;
                font-style: normal;
              }
            }
          }
          .part-rating{
            padding:12px 0;
            &.righted{
              color:rgba(0,0,255,0.8);
              font-size:20px;
            }
            .icon-check_circle{
              color:rgb(147,153,159);
              font-size: 24px;
              line-height: 24px;
              margin-right:4px;

            }
            .content{
              font-size: 12px;
              line-height: 24px;
              color:rgb(147,153,159);
            }
          }
        }
        .rating-list{
          padding:0 12px 50px 12px;
          .rating-list-cont{
            padding:12px 0 48px 0;
            border-bottom: 1px solid rgba(7,17,27,0.2);
            box-sizing: border-box;
            .timeAndName{
              .time{
                float: left;
                font-size: 10px;
                color:rgb(147,153,159);
                line-height: 12px;
              }
              .name{
                float: right;
                .customerName{
                  font-size:10px;
                  color:rgb(147,153,159);
                  line-height: 12px;
                  margin-right:6px;
                }
                .customerImg{
                  width:12px;
                  height: 12px;
                  border-radius: 50%;
                  display: inline-block;
                }
              }
            }
            .vot-wrapper{
              float: left;
              width:100%;
              display: block;
              .icon{
                font-size: 12px;
                line-height: 24px;
                color:rgb(147,153,159);
                margin-right:4px;
              }
              .rating-content{
                font-size:12px;
                color:rgb(7,17,27);
                line-height: 16px;
              }

            }
          }
        }

      }
    .selected{
      color:rgb(255,255,255);
      background:rgb(0,0,255);
    }


  }
</style>

<template>
    <div class="seller" ref="sellerWrapper">
      <div>
        <div class="seller-wrapper">
          <div class="sellerInfo">
           <div class="sellerName">{{seller.name}}</div>
           <div class="star">
             <star :score="seller.score" :width="18"></star>
           </div>
           <div class="count">({{seller.rankRate}})</div>
           <div class="order">月售{{seller.sellCount}}单</div>
          </div>
          <div class="collect">
           <i class="icon-collect icon-favorite"></i>
           <span class="collected0">收藏</span>
           <span class="collected" v-if="0>1">已收藏</span>
           </div>
        </div>
        <div class="delivery">
          <div class="content">
            <span class="title">起步价</span>
            <div class="price">
              <span class="unit">{{seller.minPrice}}</span>元
            </div>
          </div>
          <div class="content">
            <span class="title">商家配送</span>
            <div class="price">
              <span class="unit">{{seller.deliveryPrice}}</span>元
            </div>
          </div>
          <div class="content">
            <span class="title">平时配送时间</span>
            <div class="price">
              <span class="unit">{{seller.deliveryTime}}</span>分钟
            </div>
          </div>

        </div>
        <div class="noticeAndActivity">
          <div class="notice">
            <div class="title">
              公告与活动
            </div>
            <p class="noticeContent">{{seller.bulletin}}</p>
          </div>
          <div class="activity">
            <ul class="supports">
              <li class="support-item" v-for="support in seller.supports">
                <span class="icon" :class="picMap[support.type]"></span>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
          </div>
        </div>
        <div class="factView">
          <span class="title">商家实景</span>
          <div class="imgList" ref="imgWrapper">
            <ul>
              <li class="img" v-for="imgItem in seller.pics">
                <img :src="imgItem" alt="" width="120" height="90">
              </li>
            </ul>
          </div>
        </div>
        <div class="sellerInfo">
          <span class="title">商家信息</span>
          <ul class="infoList">
            <li class="info-item" v-for="info in seller.infos">
              <p>{{info}}</p>
            </li>
          </ul>
        </div>

      </div>
      <div class="shop">
        <shopcart :selectFoods="selectFoods"></shopcart>
      </div>
    </div>

</template>

<script>
  /*import*/
  import axios from 'axios';
  import BetterScroll from 'better-scroll';
  import Star from '../star/Star.vue'
  import Shopcart from '../shopcart/shopCart.vue'
  export default {

    components:{
      Star,
      Shopcart
    },
    data(){
      return {
        picMap:[],
        seller:[],
        sellerScroll:null,
        imgScroll:null,
        goods:[]
      }
    },
    created(){
      let that=this;
      axios.get("http://192.168.1.66:8080/api/seller").then(res=>{

        that.seller=res.data.data;

        that.$nextTick(()=> {
          //保证数据更新后引起的dom 更新后被调用

          that.sellerScroll = new BetterScroll(that.$refs.sellerWrapper, {click: true});
          that.imgScroll=new BetterScroll(that.$refs.imgWrapper,{click:true,/*direction: 'vertical'*/scrollX:true });
          //计算高度
          /*that.goodsScroll.on("scroll",(pos)=>{
            that.scrollY=Math.abs(Math.round(pos.y));
            console.log(that.scrollY);*/
        });
      }).catch(err=>{
        console.log(err);
      });
      axios.get("http://192.168.1.66:8080/api/goods").then(res=>{
        that.goods=res.data.data;
      }).catch(err=>{
        console.log(err);
      });
      this.picMap=['decrease','discount','guarantee','invoice','special']
    },
    computed:{
      selectFoods(){
        let foods=[];
        this.goods.forEach(good=>{
          good.foods.forEach(food=>{
            if(food.count){
              foods.push(food);
            }
          });
        });
        return foods;
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .seller{

    position: absolute;
    width:100%;
    top:175px;
    bottom:46px;

    overflow: hidden;

    .seller-wrapper{
      display:block;
      font-size:10px;
      margin:18px;

      height:150px;
      background:#fff;

      .sellerInfo{
        display: inline-block;
        border:1px solid rgba(255,255,255,0.2);
        width:100%;
        height:76px;
        .sellerName{
          display:block;
          font-size: 14px;
          color:rgb(7,17,27);
          line-height:14px;
        }
        .star{
          display: inline-block;
          height:18px;

          margin-top:8px;

        }
        .count{
          display: inline-block;
          margin-left:8px;
        }
        .order{
          display: inline-block;
          height:18px;
          color:rgb(77,85,93);
          line-height: 18px;
          margin-left: 12px;
        }

      }
      .collect{
        display: inline-block;
        height:76px;
        width:30px;
        margin-right: 0;
        position:absolute;
        right:18px;
        top:18px;
        .icon-collect{
          font-size: 24px;
          color:rgb(240,20,20);
          line-height: 24px;
        }
        .collected{
          margin-top: 4px;
          color:rgb(77,85,93);
          line-height: 10px;
        }
      }
    }
    .delivery{
      display: flex;
      width: 100%;
      height:74px;
      border:1px solid rgba(7,17,27,0.1);

      background:#fff;
      position: absolute;

      top:76px;
      left:0;
      .content{
        flex: 1;
        margin-top: 18px;
        text-align: center;

        display: inline-block;
        width:33.3%;
        height:auto;
        border-right:1px solid rgba(7,17,27,0.1);
        &:last-child{
          border-right:0 none;
          width:33%;
        }
        .title{
          font-size:10px;
          color:rgb(147,153,159);
          line-height: 10px;
          width:100%;
          text-align: center;
          /*margin:0 auto;*/

        }
        .price{
          width:100%;
          text-align: center;
          display: inline-block;
          margin-top: 4px;
          font-size:10px;
          vertical-align: bottom;
          font-weight: 200;
          color:rgb(7,17,27);
          .unit{
            font-size: 24px;
          }
        }

      }

    }
    .noticeAndActivity{
      width: 100%;
      height:auto;
      margin:0 auto;


      background: rgb(255,255,255);

      border-top:1px solid rgba(255,255,255,0.1);
      .notice{
        .title{
          font-size:14px;
          padding:16px;
          color:rgb(7,17,27);
          line-height: 14px;
        }
        .noticeContent{
          width:100%;
          padding:16px;
          box-sizing: border-box;
          font-size: 12px;
          font-weight: 200;
          color:rgb(240,20,20);
          line-height: 24px;
        }
      }
      .activity{
        border-top:1px solid rgba(7,17,27,0.4);
        width: 95%;
        height:auto;
        margin:0 auto;
        .supports{

          width:100%;
          margin:0 auto;

          .support-item{
            border-top:1px solid rgba(7,17,27,0.2);
            padding:16px;
            box-sizing: border-box;


            font-size: 0;
            &:first-child{
              border-top:0 none;
            }

            .icon{
              height: 32px;
              width: 32px;
              display: inline-block;
              margin-right: 6px;
              background-size:32px 32px;
              vertical-align: top;
              &.decrease{
                background: url("images/decrease_1@2x.png") no-repeat;
              }
              &.discount{
                background: url("images/discount_1@2x.png") no-repeat;
              }
              &.guarantee{
                background: url("images/guarantee_1@2x.png") no-repeat;
              }
              &.invoice{
                background: url("images/invoice_1@2x.png") no-repeat;
              }
              &.special{
                background: url("images/special_1@2x.png") no-repeat;
              }
            }
            & .text{
              font-size: 12px;
              font-weight: 200;
              vertical-align: middle;
              line-height: 12px;
            }
          }
        }
      }
    }
    .factView{

      height:138px;
      margin:16px;
      overflow-X: hidden;
      .title{
        font-size:14px;
        color:rgb(7,17,27);
        line-height: 14px;
      }

      .imgList{
        margin-top: 12px;

        width:100%;
        float: left;
        ul{
          width:150%;

          .img{

            width:120px;
            height:90px;
            display: inline-block;
            margin-right:6px;
            & img{
              width:100%;
              height:100%;
              display: inline-block;
            }
          }
        }

      }

    }
    .sellerInfo{

      height:auto;
      padding:16px;

      .title{
        font-size:14px;
        line-height: 14px;
        color:rgb(7,17,27);
      }
      .infoList{

        width:100%;
        margin-top:12px;
        margin-right:16px;
        box-sizing: border-box;
        .info-item{
          border-top:1px solid rgba(7,17,27,0.1);


          & p{
            margin:12px;
            font-size: 12px;
            font-weight: 200;
            color:rgb(7,17,27);
            line-height: 20px;
          }
        }
      }

    }
    .shop{

      position: absolute;
      bottom:0;
      left: 0;
    }
  }
</style>

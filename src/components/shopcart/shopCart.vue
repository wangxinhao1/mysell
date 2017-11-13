<template>
    <div class="shopcart" v-if="selectFoods!=null">
      <div class="content">
        <div class="shoppingCart" v-show="flag">
          <div class="title">
            <span class="cart">购物车</span>
            <span class="clear" @click="clear(),cart()" >清空</span>
          </div>
          <div class="cart-list" ref="foodSwiper">
            <ul >
              <li class="list-item" v-for="food in selectFoods">
                <span class="name">{{food.name}}</span>
                <span class="price">单价￥<em class="num">{{food.price}}</em></span>
                <div class="cartopp1">
                  <cartopp :food="food"></cartopp>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="content-left">
          <div class="logo-wrapper">
           <div class="logo" :class="{highlight:totalCount>0}" @click="cart()">
             <i class="icon-shopping_cart" ></i>

           </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" >
          共计 <span :class="{highlight:totalPrice>0}">{{totalPrice}}</span>元
          </div>
          <div class=" desc">另需配送费元</div>
        </div>
        <div class="content-right">
          <div class="pay">
            <span class="not-enough" v-if="totalPrice==0">差{{20-totalPrice}}元起送</span>
            <span class="enough" v-if="totalPrice>0&&totalPrice<20">还差{{20-totalPrice}}元</span>
            <span class="redBg" v-if="totalPrice>=20" style="">结算</span>

          </div>
        </div>
      </div>
    </div>

</template>

<script>
  import BetterScroll from 'better-scroll';
  import Cartopp from '../cartopp/Cartopp.vue';
  export default {
    props:['selectFoods'],
    data(){
      return {
       flag:false
      }
    },
    components:{
      Cartopp
    },
    methods:{
      cart(){
        /*if(this.flag){
          flag=false;
        }else{
          flag=true;
        }*/
        this.flag=!this.flag;
        this.$nextTick(()=>{
          this.foodScroll=new BetterScroll(this.$refs.foodSwiper,{click:true,});
        });

      },
      clear(){
        this.selectFoods.forEach(num=>{
          num.count=0;
        });

      },
  },
    computed:{
      totalCount(){
        let count=0;
        this.selectFoods.forEach(food=>{
          count+=food.count;
          console.log(this.selectFoods);

        });
        return count;
      },
      totalPrice(){
        let prices=0;
        this.selectFoods.forEach(pri=>{
          prices+=(pri.price)*(pri.count);
        });
        return prices;
      },




    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .shopcart{
    width:100%;
    position:fixed;
    bottom:0;
    left:0;
    z-index: 50;
    height:48px;
    .content{
      display: flex;
      background: #141d27;
      color:rgba(255,255,255,0.4);
      .shoppingCart{
        position: absolute;
        width:100%;
        height:232px;
        bottom:50px;
        left: 0;
        overflow: hidden;
        .title{
          width:100%;
          height:40px;
          background:#f3f5f7;
          position: absolute;
          z-index: 2;
          border-bottom:1px solid rgba(7,17,27,0.2);
          .cart{
            height: 100%;
            line-height:40px;
            font-size: 14px;
            font-weight: 200;
            color:rgb(7,17,27);
            padding:0 20px;
          }
          .clear{
            font-size: 12px;
            color:rgb(0,160,220);
            line-height: 40px;
            float: right;
            margin-right:20px;
          }
        }
        .cart-list{
          width:100%;
          height:192px;
          background: #ddd;
          position: absolute;
          transform: translateY(40px);
          z-index: 1;
          & ul{
            .list-item{
              padding:12px;
              width: 100%;
              height:48px;
              line-height: 24px;
              border-bottom: 1px solid #7,17,27,0.1;
              background: #fff;
              box-sizing: border-box;
              .name{
                display: inline-block;
                width:33.33%;
                font-size:14px;
                color:rgb(7,17,27);
                overflow:hidden;

              }
              .price{
                display: inline-block;
                font-size: 10px;
                color:rgb(240,20,20);
                font-weight: normal;
                line-height:24px;
                margin-right:10px;
                box-sizing: border-box;
                .num{
                  display: inline-block;
                  font-size: 14px;
                  font-weight: 700;
                }
              }
              .cartopp1{

                display: inline-block;
                float: right;
              }
            }
          }
        }

      }
      .content-left{
        flex: 1;
        .logo-wrapper{
          display: inline-block;
          position: relative;
          top: -10px;
          margin:0 12px;
          padding: 6px;
          width: 56px;
          height: 56px;
          box-sizing: border-box;
          vertical-align: top;
          border-radius: 50%;
          background: #141d26;
          .logo{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            background: #2b343c;
            text-align: center;
            &.highlight{
              background:rgb(0,160,220);
            }
            .icon-shopping_cart{
              line-height: 44px;
              font-size: 44px;
              color:#80858a;
              &.highlight{
                color: #ffffff;
              }
            }

          }
          .num{
            position: absolute;
            top: 0;
            right: 0;
            width: 24px;
            height: 16px;
            line-height: 16px;
            text-align: center;
            border-radius:16%;
            font-size: 9px;
            font-weight: 700;
            color: #ffffff;
            background: rgb(240,20,20);
            box-shadow:0 4px 8px 0 rgba(0,0,0,0.4);
          }
        }
        .price{
          display:inline-block;
          vertical-align: top;
          line-height: 24px;
          margin-top: 12px;
          box-sizing: border-box;
          padding-right: 12px;
          border-right:1px solid rgba(255,255,255,0.1);
          font-size: 16px;
          font-weight: 700;
          color: rgba(255,255,255,0.4);
          & .highlight{
            color: #ffffff;

          }

        }
        .desc{
          display:inline-block;
          margin: 12px 0 0 12px;
          line-height: 24px;
          vertical-align: top;
          color:rgba(255,255,255,0.4);
          font-size: 10px;

        }
      }
      .content-right{
        flex:0 0 105px;
        width: 105px;
        height: 48px;
        .pay{

          width:105px;
          height:48px;
          line-height: 48px;
          text-align: center;
          font-size: 12px;
          font-weight: 700;
          background: #2b333b;

          & .not-enough{
            width:100%;
            height: 100%;
            display: inline-block;
            background: #2b333b;
          }
          & .enough{
            width:100%;
            height: 100%;
            display: inline-block;
            background: #00b43c;
            color: #fff;
          }
          & .redBg{

            width:100%;
            height: 100%;
            display: inline-block;
            color:#fff;
            background:red;
          }
        }
      }
    }
  }
</style>

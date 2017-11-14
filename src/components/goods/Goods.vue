<template>
  <div>
    <div class="goods"  v-if="goods!=null">
      <div class="menu-wrapper"  ref="menuWrapper">
        <ul>
          <li class="menu-item" v-for="(good,index) in goods" :class="{current:menuCurrIndex==index}" >
            <span class="text">
              <!--<span class="icon"></span>-->
              {{good.name}}
            </span>
          </li>
        </ul>
      </div>
      <div class="goods-wrapper"  ref="goodsWrapper">
        <ul>
          <li class="food-list" v-for="good in goods" >
            <h3 class="title">{{good.name}}</h3>
            <ul>
              <li class="food-item" v-for="food in good.foods" @click="nowfood=food">
                <div class="icon">
                  <img :src="food.image" @click="food0()" width="57" height="57" alt="">
                </div>
                <div class="content">
                  <h2 class="name">{{food.name}}</h2>
                  <p class="desc">{{food.description}}</p>
                  <div class="extra">
                    <span class="count">月售{{food.sellCount}}</span>
                    <span>好评率{{food.rating}}%</span>
                  </div>
                  <div class="price">
                    <span class="now">￥{{food.price}}</span>
                    <span class="old">{{food.oldPrice}}</span>
                  </div>
                  <div class="cartopp-wrapper">
                    <cartopp :food="food"></cartopp>
                  </div>
                </div>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      <!--购物车组件-->
      <div class="cart-wrapper">
        <shopcart :selectFoods="selectFoods"></shopcart>
      </div>
      <!--商品详情页-->
    </div>
  <food :foods="nowfood" :flag="flag1"></food>
  </div>
</template>
<script>
  import Food from './food/Food.vue';
  import Shopcart from '../shopcart/Shopcart.vue';
  import BetterScroll from 'better-scroll';
  import Cartopp from '../cartopp/Cartopp.vue';
  import axios from 'axios';

  export default {
    data(){
      return {
        goods:null,
        picMap:[],
        menuScroll:null,
        goodsScroll:null,
        scrollY:0,
        foodsHeight:[],
        flag1:false,
        nowfood:'',
      }
    },
    components:{
      Shopcart,
      Cartopp,
      Food
    },
    created(){
      console.log("ooo")
      let that=this;
      axios.get("http://192.168.1.66:8080/api/goods").then(res=>{
        that.goods=res.data.data;

        that.$nextTick(()=>{
          //保证数据更新后引起的dom 更新后被调用
          that.menuScroll=new BetterScroll(that.$refs.menuWrapper,{});
          that.goodsScroll=new BetterScroll(that.$refs.goodsWrapper,{click:true,probeType:3});
          //计算高度
          that.goodsScroll.on("scroll",(pos)=>{
            that.scrollY=Math.abs(Math.round(pos.y));
          });


        that.calcHeight();
        });
      }).catch(err=>{
        console.log(err);
      });
      this.picMap=["decrease","discount","guarantee","invoice","special"];

    },
    methods:{
      food0(){
        this.flag1=!this.flag1;
        console.log(this.flag1);
      },
      calcHeight(){
        let foodsList=this.$refs.goodsWrapper.getElementsByClassName("food-list");
        let height=0;
        this.foodsHeight.push(height);
        for(let i=0;i<foodsList.length;i++){
          let obj=foodsList[i];
          height+=obj.clientHeight;
          this.foodsHeight.push(height);

        };

      }
    },
    computed:{
      menuCurrIndex(){
        for(let i=0;i<this.foodsHeight.length;i++){
          let h1=this.foodsHeight[i];
          let h2=this.foodsHeight[i+1];
          if(this.scrollY>h1&&this.scrollY<h2){
            return i;
          }
        }
        return 0;
      },
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
 .goods{
   position: absolute;
   width:100%;
   top:175px;
   bottom:46px;
   display: flex;
   overflow: hidden;

   & .menu-wrapper{
     flex: 0 0 80px;
     width:80px;
     background: #f3f5f7;
     .menu-item{
       display: block;
       height:54px;
       width:80px;
       line-height:16px;
       &.current{
         height:54px;
         width:80px;
         background: #fff;


         z-index: 10;

         .text{
           border-bottom: none;
           font-weight: 600;

           .icon{
             display: inline-block;
             width:16px;
             height:16px;
             margin-right:6px;
             background-size: 16px;
             vertical-align: top;
             &.decrease{
               background-image: url("images/decrease_1@2x.png");
             }
             &.discount{
               background-image: url("images/discount_1@2x.png");
             }
             &.guarantee{
               background-image: url("images/guarantee_1@2x.png");
             }
             &.invoice{
               background-image: url("images/invoice_1@2x.png");
             }
             &.special{
               background-image: url("images/special_1@2x.png");
             }

           }
         }
       }
       .text{
         width:80px;
         height: 54px;
         display: block;
         font-size: 12px;
         text-align: center;
         line-height: 27px;
         &:after{
           display: block;
           left: 0;
           bottom: 0;
           position: absolute;
           width:100%;
           border-top: 1px solid rgba(7,17,27,0.1);
           content: '';
         }
       }
     }

   }
   .goods-wrapper{
     flex:1;
     .title{
       padding-left:14px;
       height:26px;
       line-height:26px;
       border-left:2px solid #d9eeee;
       font-size:12px;
       color:rgba(147,153,159,1);
       background:#f3f5f7;
     }
     .food-item{
       display: flex;
       margin: 18px;
       padding-bottom:18px;
       border-bottom: 0.004em solid rgba(7,17,27,1);
       &:last-child{
         border-bottom: none;

       }
       /*&:after{
         width:100%;
         height:1px;
         background:rgba(7,17,27,0.8);
         position:absolute;
         bottom: 0;
         left:0;
         content: '';
       }*/
       .icon{
         flex:0 0 57px;
         margin-right:10px;
       }
       .content{
       flex:1;
         position:relative;
         .name{
           margin:2px 0 8px 0;
           color:rgba(7,17,27,1);
           font-size: 14px;
           line-height: 14px;
           height: 14px;
         }
         .desc, .extra{
           font-size: 10px;
           line-height: 10px;
           color:rgba(147,153,159,1);

         }
         .desc{
           margin-bottom: 8px;
           line-height: 12px;
         }
         .extra{
           .count{
             margin-right: 12px;
           }
         }
         .price{
           font-weight: 700;
           line-height: 24px;
           .now{
             margin-right: 8px;
             font-size: 14px;
             color:rgba(240,20,20,1)
           }
           .old{
             text-decoration-line: line-through;
             color:rgb(147,153,159);
             font-size: 10px;

           }
         }
         .cartopp-wrapper{
           position: absolute;

           right: 0;
           bottom:0;
         }
       }
     }
   }
 }
</style>

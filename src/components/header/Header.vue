<template>
    <div class="header" v-if="seller">
      <div class="content-wrapper">
        <div class="avatar">
          <img :src="seller.avatar" alt="" width="64px" height="64px">
        </div>
        <div class="content">
          <div class="title">
            <span class="brand"></span>
            <span class="name">{{seller.name}}</span>
          </div>
          <div class="description">
            {{seller.description}}/{{seller.deliveryTime}} 分钟送达
          </div>
          <div class="support">
            <span class="icon" :class="picMap[seller.supports[0].type]"></span>
            <span class="text">{{seller.supports[0].description}}</span>
          </div>
        </div>
        <div class="support-count" @click="detailShow=true">

          <span class="count">{{seller.supports.length}}个</span>
          <i class="icon-keyboard_arrow"></i>
        </div>
      </div>
      <div class="bulletin-wrapper" @click="detailShow=true">
        <span class="bulletin-title"></span>
        <span class="bulletin-text">{{seller.bulletin}}</span>
        <i class="icon-keyboard_arrow_right"></i>
      </div>
      <!--模糊背景-->
      <div class="background">
        <img :src="seller.avatar" alt="">
      </div>
      <!--详情弹层-->
      <transition name="fade">
        <!---->
        <div class="detail" v-show="detailShow" >
        <!--css sticky footers-->
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <div class="star-wrapper">
              <!--星级评定-->
              <star :score="seller.score"></star>
            </div>
            <!--优惠信息-->
            <div class="title">
              <div class="line"></div>
              <div class="text">优惠信息</div>
              <div class="line"></div>
            </div>
            <ul class="supports">
              <li class="support-item" v-for="support in seller.supports">
                <span class="icon" :class="picMap[support.type]"></span>
                <span class="text">{{support.description}}</span>
              </li>
            </ul>
            <!--优惠信息end-->
            <!--商家信息-->
            <div class="title">
              <div class="line"></div>
              <div class="text">商家信息</div>
              <div class="line"></div>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
            <div class="bulletin">
              <p class="content">{{seller.bulletin}}</p>
            </div>
            <!--商家信息 end-->
          </div>
        </div>
        <div class="detail-close" @click="detailShow=false">
          <span class="icon-close"></span>
        </div>
      </div>
      </transition>
    </div>


</template>

<script>
  import Star from '../star/Star.vue'
  export default {
    props:["seller"],
    data(){
      return{
        picMap:[],
        detailShow:false
      }
    },
    created(){
      this.picMap=['decrease','discount','guarantee','invoice','special']
    },
    components:{
      Star
    }


  }

</script>

<style lang="less" rel="stylesheet/less">
  .header{
    color:#fff;
    overflow:hidden;
    background: rgba(7,17,27,0.5);
    position:relative;
    & .content-wrapper{
      position:relative;
      padding:24px 12px 18px 24px;

      & .avatar{//商家的照片

        width:64px;
        height:64px;
        display: inline-block;
        & img{

          border-radius: 2px;
        }
      }
      & .content{
        display: inline-block;
        font-size: 14px;
        margin-left:8px;
        & .title{
          margin:2px 0px 8px 0px;
          & .brand{
            display: inline-block;
            vertical-align: top;
            width:30px;
            height:18px;
            background:url("images/brand@2x.png");
            background-size: 30px 18px;
          }
          & .name{
            margin-left: 6px;
            font-size: 20px;
          }
        }
        & .description{
          margin-bottom:10px;
          font-size:12px;
          font-weight: 200;
          line-height: 12px;

        }
        & .support{
          & .icon{
            display: inline-block;
            width:14px;
            height:14px;
            vertical-align: top;
            background-size:14px 14px;
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
          & .text{
            font-size: 10px;
            line-height:12px;

            letter-spacing: 1px;
          }

        }
      }
      & .support-count{
        font-size:12px;
        position:absolute;
        bottom:18px;
        right:12px;
        padding:0 8px;
        height:24px;
        line-height: 24px;
        border-radius:14px;
        background: rgba(0,0,0,0.2);
      }
    }
    & .bulletin-wrapper{
      height:28px;
      line-height: 28px;
      padding:0 22px 0 12px;
      white-space: nowrap;//字数多的部分用...代替
      overflow: hidden;//
      text-overflow: ellipsis;//
      font-size: 12px;
      background: rgba(7,17,27,0.2);
      position: relative;
      & .bulletin-title{
        display: inline-block;
        width:22px;
        height:12px;
        vertical-align: top;
        margin-top:8px;
        background: url("images/bulletin@2x.png") no-repeat;
        background-size: 22px 12px;
      }
      & .bulletin-text{
        margin:0 4px;
        font-weight: 100;
        letter-spacing: 1px;
      }
      & i{
        position:absolute;
        right:5px;
        top:10px;
      }
    }
    & .background{
      position:absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      filter:blur(10px);
      & img{
        width: 100%;
        height: 100%;

      }
    }

    & .detail{//详情页的
      position:fixed;
      top: 0;
      left: 0;
      z-index: 98;
      width:100%;
      height: 100%;
      overflow:auto;
      background: rgba(7,17,27,0.8);
      &.fade-enter-active, &.fade-leave-active{
        opacity:1;
        left:0px;
        transition: all 1s;
      }
      &.fade-enter, &.fade-leave-to{
        opacity: 0;
        left:375px;


      }

      & .detail-wrapper{
        min-height: 100%;
        width: 100%;

        & .detail-main{
          margin-top: 64px;
          padding-bottom: 64px;
          & .name{
            line-height: 16px;
            text-align: center;
            font-size: 16px;
            font-weight: 700;
          }
          & .star-wrapper{
            margin-top: 18px;
            padding:2px 0px;
            text-align: center;
          }
          & .title{
            display: flex;
            width: 80%;
            margin:28px auto 24px auto;
            &.line{
              /*width:216px;
              height:2px;
              background:#fff;*/
              flex: 1;
              position: relative;
              top: -6px;
              border-bottom: 1px solid rgba(255,255,255,1);
            }
            &.text{
              padding:0 12px;
              font-size: 14px;
              font-weight: 700;
              margin:0 auto;
            }
          }
          & .supports{
            width:80%;
            margin:0 auto;
            & .support-item{
              padding:0 12px;
              margin-bottom: 12px;
              font-size: 0;
              &:last-child{
                margin-bottom: 0;
              }
              & .icon{
                height: 16px;
                width: 16px;
                display: inline-block;
                margin-right: 6px;
                background-size: 16px 16px;
                vertical-align: top;
                &.decrease{
                  background: url("images/decrease_1@2x.png");
                }
                &.discount{
                  background: url("images/discount_1@2x.png");
                }
                &.guarantee{
                  background: url("images/guarantee_1@2x.png");
                }
                &.invoice{
                  background: url("images/invoice_1@2x.png");
                }
                &.special{
                  background: url("images/special_1@2x.png");
                }
              }
              & .text{
                font-size: 12px;
                font-weight: 200;

                line-height: 12px;
              }
            }
          }
          & .bulletin{
            width:80%;
            margin: 0 auto;
            & .content{
              padding:0 auto;
              line-height: 24px;
              font-size: 12px;

            }
          }
        }
      }
      & .clearfix{
        display: inline-block;
        &:after{
          display: block;
          content: "";
          height: 0;
          line-height: 0;
          clear: both;
        }
      }
      & .detail-close{
        position: relative;
        width: 32px;
        height:32px;
        color:#fff;
        font-size: 32px;
        margin: -50px auto 0 auto;
        clear: both;
      }
    }


  }
  /*.aaa{
    transform: translateX(0);
  }*/

  /*.header{
  color:#fff;
   background:rgba(0,0,0,0.5);
   overflow:hidden;
   position:relative;

   width:100%;
 }



  .header  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;

    font-size: 0; !*为了去掉文字和图片的之间的间隙*!
  }


 .header  .content-wrapper .avatar {
   display: inline-block;
   position: absolute;
   top: 24px;
   left: 24px;
   border-radius:2px;
 }

 .header  .content-wrapper .avatar img{
         -webkit-border-radius: 2px;
         -moz-border-radius: 2px;
         border-radius: 2px;
 }

 .header  .content-wrapper .content {
   display: inline-block;
   font-size: 12px;

   margin-left: 8px;
 }
 .header  .content-wrapper .content .title{
         font-size:16px;
         margin-top:4px;
         margin-left:8px;
         font-weight:bold;
         line-height:36px;
 }
 .header  .content-wrapper .content .title .brand{
           display: inline-block;

           width:30px;
           height:18px;
           background:url("images/brand@2x.png");
           background-size:30px 18px;
 }
 .header  .content-wrapper .content .title .name{
           margin-left:6px;
 }

 .header  .content-wrapper .content .description{
         font-size:12px;
         font-weight:100;
         line-height:12px;
         margin-top:8px;
 }
 .header  .content-wrapper .content .support{}
 .header  .content-wrapper .content .support .icon{
           display: inline-block;
           width:12px;
           height:12px;
           vertical-align: top;
           background-size:12px 12px;
 }
 !*.header  .content-wrapper .content .support .icon.decrease{
             background: url("images/decrease_1@2x.png");
 }
 .header  .content-wrapper .content .support .discount{
             background: url("images/discount_1@2x.png");
 }
 .header  .content-wrapper .content .support .guarantee{
             background: url("images/guarantee_1@2x.png");
 }
 .header  .content-wrapper .content .support.invoice{
             background: url("images/invoice_1@2x.png");
 }
 .header  .content-wrapper .content .support.special{
             background: url("images/special_1@2x.png");
 }*!

 .header  .content-wrapper .content .support .text{
           font-size: 12px;
           line-height: 12px;
           vertical-align: top;
 }

 .header  .content-wrapper .support-count{
      font-size:12px;
       position: absolute;
       bottom: 18px;
       right:12px;
       padding:7px;
       color:#fff;
 }
 .header  .content-wrapper .support-count .count{
         background: rgba(0,0,0,0.2);
         font-size: 10px;
         font-weight: 200;
         line-height:12px;
         height:24px;
         line-height: 24px;

         border-radius: 12px;
 }
 .header  .content-wrapper .support-count i{
         margin-left:2px;
 }

 .header  .content-wrapper .bulletin-wrapper{
       height:28px;
       width:100%;
       padding:0 12px;
       white-space:nowrap;
       overflow:hidden;
       text-overflow:ellipsis;
       font-size:12px;
       background:red!*rgba(0,0,0,0.2)*!;
       position: absolute;
 }

 .header  .content-wrapper .bulletin-wrapper .bulletin-title{
         display: inline-block;
         width:22px;
         height:12px;
         vertical-align: top;
         margin-top:8px;
         background: url("images/bulletin@2x.png") no-repeat 22px 12px;
 }
 .header  .content-wrapper .bulletin-wrapper.bulletin-text{
         margin:0 4px;
 }


 .header .bulletin-wrapper{
     height:28px;
     width:100%;
     padding:0 12px;
     white-space:nowrap;
     overflow:hidden;
     text-overflow:ellipsis;
     font-size:12px;
     background:red!*rgba(0,0,0,0.2)*!;
     position: absolute;
     bottom:0;
 }
 .header .bulletin-wrapper .bulletin-title{
       display: inline-block;
       width:22px;
       height:12px;
       vertical-align: top;
       margin-top:8px;
       background: url("images/bulletin@2x.png") no-repeat 22px 12px;
 }
 .header .bulletin-wrapper .bulletin-text{
       margin:0 4px;
 }


 .header .background{
     position: absolute;
     left:0;
     right: 0;
     top: 0;
     width: 100%;
     height: 100%;
     z-index: -1;
     filter:blur(10px);
 }*/



</style>

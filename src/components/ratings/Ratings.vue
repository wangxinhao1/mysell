<template>
  <div class="rating" ref="ratingSwiper">
    <div>
      <div class="seller-rating">
        <div class="rating-left">
          <span class="rating-score">{{seller.score}}</span>
          <span class="rating-name">综合评分</span>
          <span class="high-other">高于其他商家{{seller.rankRate}}%</span>
        </div>
        <div class="rating-right">
          <div class="server">
            <span class="name">服务态度</span>
            <span class="star0">
              <star :score="seller.serviceScore" :width="12"></star>
            </span>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="server">
            <span class="name">服务态度</span>
            <span class="star0">
              <star :score="seller.foodScore" :width="12"></star>
            </span>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="server time">
            <span class="name">送达时间</span>
            <span class="score">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <div class="rating-pages">
        <div class="rating-item">
          <div class="item all" @click="getData(-1)">全部{{all}}</div>
          <div class="item satisfaction" @click="getData(0)">满意{{satisfaction}}</div>
          <div class="item unsatisfaction" @click="getData(1)">不满意{{unsatisfaction}}</div>
        </div>
        <div class="part-rating">
          <span class="right icon-check_circle" :class="{righted:flag}" @click="textType()"></span>
          <span class="content">只看有内容的评价</span>
        </div>
        <div class="rating-list">
          <ul>
            <li class="rating-list-item" v-for="rat in rating" v-show="isShow(rat.rateType,rat.text)">
              <img :src="rat.avatar" alt="">
              <div class="content">
                <div class="name">{{rat.username}}</div>
                <div class="starAndTime">
                  <star class="star" :score="rat.score" :width="10"></star>
                  <div class="deliveryTime" v-if="rat.deliveryTime!=''">{{rat.deliveryTime}}分钟送达</div>
                </div>
                <span class="time">{{rat.rateTime | myDate}}</span>
                <div class="rating-content">
                  <p class="content">{{rat.text}}</p>
                </div>
                <div class="vote-wrapper">
                  <i class="upOrDown" :class="thumbArr(rat.rateType)"></i>
                  <ul>
                    <li class="recommend" v-for="recommend in rat.recommend">{{recommend}}</li>
                  </ul>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
  import Star from '../star/Star.vue';
  import axios from 'axios';


  import BetterScroll from 'better-scroll';

  export default {
    data() {
      return {
        seller: [],
        rating: [],
        type: -1,
        /*allRating:[],
        satisRating:[],
        unsatisRating:[],
        hasTextRating:[],
        nowRating:[],
        nowpartRating:[],*/
        test: '',
//        iconFlag: false,
        flag: false


      }
    },
    components: {
      Star,
      BetterScroll
    },
    computed: {
      timeShow() {
        return this.rating.rateTime;
      },
      all() {
        let count = 0;
        this.rating.forEach(item => {
          count++;
        });
        return count;
      },
      satisfaction() {
        let count = 0;
        this.rating.forEach(item => {
          if (item.rateType == 0) {
            count++;
          }
        });
        return count;
      },
      unsatisfaction() {
        let count = 0;
        this.rating.forEach(item => {
          if (item.rateType == 1) {
            count++;
          }
        });
        return count;
      }

    },
    methods: {
      /*all1(){
        this.rating.forEach(res=>{
          this.allRating.push(res);
          this.nowRating=this.allRating;
        });
      },
      satisfation(){
        this.rating.forEach(res=>{
          if(res.rateType==0){
            this.satisRating.push(res);
            this.nowRating=this.satisRating;
          }
        });
      },
      unsatisfation(){
        this.rating.forEach(res=>{
          if(res.rateType==1){
            this.unsatisRating.push(res);
            this.nowRating=this.unsatisRating;
          }
        });
      },
      change(){
        if(this.flag){
          this.nowpartRating=this.nowRating;
        }else{
          this.nowRating.forEach(res=>{
            if(res.text!=''){
              this.hasTextRating.push(res);
              this.nowpartRating=this.hasTextRating;
            }

          });
        }
        this.flag=!this.flag;
      },*/
      getData(num) {
        if (num == -1) {
          this.type = num;
        } else if (num == 0) {
          this.type = num;
        } else if (num == 1) {
          this.type = num;
        }
      },
      textType() {
        this.flag = !this.flag;
        /*
                if(this.flag){
                  this.rating.forEach(res=> {
                    if (res.text != '') {
        //              this.flag = false;
                    }
                  }
                }*/
      },

      thumbArr(num) {
        let arr = ["icon-thumb_up", "icon-thumb_down"];
        if (num == 0) {
          return arr[0];
        } else {
          return arr[1];
        }

      },
      isShow(rateType, text) {
        console.log("ppp")
        if (this.flag && text == '') {
          return false;
        }
        if (this.type == -1) {
          return true;
        } else if (this.type == rateType) {
          return true;
        }
        return false;

      },


    },
    created() {
      console.log("iii");
      let that = this;
      axios.get("http://192.168.1.66:8080/api/seller").then(res => {
        that.seller = res.data.data;
      }).catch(err => {
        console.log(err);
      });
      axios.get("http://192.168.1.66:8080/api/ratings").then(res => {
        that.rating = res.data.data;
        console.log(that.rating);
        this.$nextTick(() => {
          this.ratingScroll = new BetterScroll(this.$refs.ratingSwiper, {click: true});
        });
      }).catch(err => {
        console.log(err);

      });
      console.log(this.nowRating + "<br>" + this.nowpartRating);


    },
    filters: {
      myDate(time) {
        let date = new Date(time);
        return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + " " + date.getHours()
          + ":" + date.getMinutes() + ":" + date.getSeconds();
      }
    }
  }
</script>

<style lang="less" rel="stylesheet/less">
  .rating {
    position: absolute;
    top: 175px;
    bottom: 46px;
    background: rgba(7, 17, 27, 0.1);
    width: 100%;
    height: auto;
    overflow: hidden;
    .seller-rating {
      background: rgba(255, 255, 255, 0.7);
      .rating-left {
        display: inline-block;
        width: 119px;
        margin: 18px 0;
        padding: 18px;
        text-align: center;
        box-sizing: border-box;
        border-right: 1px solid rgba(7, 17, 27, 0.2);
        .rating-score {
          display: block;
          font-size: 24px;
          color: rgb(255, 153, 0);
          line-height: 28px;
        }
        .rating-name {
          display: block;
          margin-top: 2px;
          font-size: 12px;
          color: rgb(7, 17, 27);
          line-height: 12px;
        }
        .high-other {
          display: block;
          font-size: 10px;
          color: rgba(7, 17, 27, 0.5);
          line-height: 14px;
          margin-top: 8px;
        }
      }
      .rating-right {
        display: inline-block;
        padding: 18px;
        width: 220px;
        font-size: 12px;
        color: rgb(7, 17, 27);
        line-height: 18px;
        float: right;
        .server {
          width: 100%;
          padding: 8px;
          .name {
            display: inline-block;
            font-size: 12px;
            color: rgb(7, 17, 27);
            line-height: 18px;
            margin-right: 12px;
          }
          .star1 {

            display: inline-block;

            margin-left: 12px;

          }
          .score {
            display: inline-block;
            font-size: 12px;
            line-height: 18px;
            color: rgb(147, 153, 159);
            margin-left: 12px;
          }

        }
      }
    }
    .rating-pages {
      margin-top: 18px;
      background: rgb(255, 255, 255);
      .rating-item {
        padding: 18px;
        width: 100%;
        .item {
          margin-right: 12px;

          font-size: 12px;
          display: inline-block;
          padding: 12px;
          text-align: center;
          line-height: 18px;
          &.all {
            background: rgba(0, 0, 255, 0.7);
          }
          &.satisfaction {
            background: rgba(0, 0, 255, 0.3);
          }
          &.unsatisfaction {
            background: rgba(0, 0, 255, 0.1);
          }

        }
      }
      .part-rating {
        padding: 18px;
        border-top: 1px solid rgba(7, 17, 27, 0.2);
        .right {
          width: 18px;
          height: 18px;
          color: rgba(240, 20, 0, 0.2);
          &.righted {
            color: rgba(240, 20, 0, 0.8);
          }
        }
        .content {
          font-size: 12px;
          color: rgba(240, 20, 0, 0.2);
          line-height: 18px;
        }
      }
      .rating-list {
        padding: 0 18px;
        .rating-list-item {
          padding: 18px 0;
          border-top: 1px solid rgba(7, 17, 27, 0.2);
          display: flex;
          & img {
            margin: 0 12px 0 0px;
            width: 28px;
            height: 28px;
            border-radius: 50%;
          }
          & .content {
            height: auto;
            flex: 1;
            .name {
              font-size: 10px;
              color: rgb(7, 17, 27);
              line-height: 12px;
            }
            .starAndTime {
              display: inline-block;
              .star {
                margin-top: 4px;
                padding: 0;
                float: left;
              }
              .deliveryTime {
                float: left;
                font-size: 10px;
                font-weight: 200;
                color: rgb(1477, 153, 159);
                line-height: 12px;
              }
            }
            .time {
              margin-top: -12px;
              float: right;
              font-size: 10px;
              font-weight: 200;
              color: rgb(147, 153, 159);
              line-height: 12px;
            }
            .rating-content {
              padding: 6px 0;
              .content {
                font-size: 12px;
                color: rgb(7, 17, 27);
                line-height: 18px;
              }
            }
            .vote-wrapper {
              .upOrDown {
                color: rgb(0, 160, 220);
                font-size: 12px;
                line-height: 16px;
                float: left;
                margin-right: 6px;
                margin-top: 8px;
              }
              ul {

                .recommend {
                  margin-top: 8px;
                  float: left;
                  display: inline-block;
                  margin-right: 8px;
                  padding: 6px;
                  border: 1px solid rgba(7, 17, 27, 0.1);
                  -webkit-border-radius: 1px;
                  -moz-border-radius: 1px;
                  border-radius: 1px;
                  font-size: 9px;
                  color: rgb(147, 153, 159);
                  line-height: 9px;
                }
              }
            }

            /*.name{
              font-size: 10px;
              color:rgb(7,17,27);
              line-height: 12px;

            }
            .star0{
              margin-top:4px;

              star{
                display: inline-block;
              }
            }
            .time{
              float: right;
              font-size: 10px;
              color:rgb(147,153,159);
              line-height: 12px;
            }

          */

          }
        }
      }
    }

  }
</style>

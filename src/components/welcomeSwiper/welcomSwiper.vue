<template>
    <swiper :options="swiperOption">
      <swiper-slide class="one">
        <h2>welcom</h2>
      </swiper-slide>
      <swiper-slide class="two">
        <div class="twoInner">
          <router-link to="/main">
            立即体验
          </router-link>
        </div>
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
      <div class="sec">
        <span class="sec-count" ref="loveyou">3</span>
      </div>
    </swiper>


</template>

<script>
  import {swiper,swiperSlide} from 'vue-awesome-swiper';
  export default{
    data(){
      return {
        swiperOption:{
          autoplayStopOnLast:true,
          autoplay:4000,
          pagination:'swiper-pagination',
          paginationClickable:true,
          autoplayDisableOnInteraction:false

        }
      }
    },
    mounted(){
      this.secCount();
      console.log();
    },
    components:{
      swiper,swiperSlide
    },
    methods:{
      secCount(){
        let that = this;
        console.log(this.$refs.loveyou);
        let a=parseInt(this.$refs.loveyou.innerHTML);
        let t=setInterval(function(){
          that.$refs.loveyou.innerHTML=a--;
          console.log(a);
          if(!a){
            clearInterval(t);
          }
        },1000);


      }
    }
  }
</script>

<style>
  .swiper-container {
    height: 100%;
    color: #ffffff;
    text-align: center;
    position: relative;
    background: #000;
  }
  .swiper-wrapper h2{
    font-size:26px;

  }
  .one{
    background: lightblue;
  }
  .two
  {
    background: yellowgreen;
  }
  .one h2{
    width:100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .two .twoInner{
    width: 100%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }
  .two .twoInner a{
    margin-top: 30px;
    display: inline-block;
    color: green;
    padding:10px 30px;
    border:1px solid green;
  }
  .sec{
    width:40px;
    height: 40px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    background: rgba(255,255,255,0.2);
    position: absolute;
    right:10px;
    top:10px;
  }
  .sec-count{
    color:#fff;
    font-size:24px;
    width:100%;
    height: 100%;
    text-align: center;
    line-height: 40px;
  }
</style>

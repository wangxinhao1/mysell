<template>
    <div class="star">
      <span class="star-item" v-for="item in itemClass" :class="item" :style="big"></span>
    </div>

</template>

<script>
  const LENGTH=5;
  export default {
    data(){
      return{
        big:{}
      }
    },
    props:['score','width'],
    created(){

      /*console.log(this.score);*/
      this.big={width:this.width+"px",height:this.width+"px",marginRight:this.width+"px"}
    },
    computed:{
      itemClass(){
        let result=[];
        let intege=parseInt(this.score);
        let decimal=this.score-intege;
        for(let i=0;i<intege;i++){
          result.push("on");
        }
        if(decimal>=0.5){
          result.push("half");
        }
        while(result.length<LENGTH){
          result.push("off");
        }
        return result;
      }
    }
  }
</script>

<style>
  .star{
    display: inline-block;
    font-size: 0;
  }
  .star .star-item{
    display: inline-block;
    background-repeat: no-repeat;

    background-size:100%;
  }
  .star .star-item.on{
    background-image:url("images/star48_on@2x.png");
  }
  .star .star-item.half{
    background-image: url("images/star48_half@2x.png");
  }
  .star .star-item.off{
    background-image: url("images/star48_off@2x.png");
  }
  .star .star-item:last-child{
    margin-right: 0;
  }
</style>

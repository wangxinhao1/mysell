<template>
    <div>
      <my-header :seller="seller"></my-header>
      <div class="tabs">
        <div class="tab-item">
          <router-link to="/main/goods">商品</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/main/ratings">评价</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/main/seller">商家</router-link>
        </div>
      </div>
      <div class="tab-item-list">
        <router-view></router-view>
      </div>



    </div>

</template>

<script>
  import Header from '../header/Header.vue';
  import axios from 'axios';
  export default {
    name: 'app',
    components: {
      myHeader:Header
    },
    data(){
      return {
        seller:null
      }
    },
    created(){
      let that=this;
      axios.get("http://192.168.1.66:8080/api/seller").then(res=>{
        console.log(res);
        this.seller=res.data.data;
      }).catch(err=>{
        console.log(err);
      });
    }
  }

   /* /!*axios.get("http://localhost:8080/api/seller").then(function(){

  }).catch();*!/


    data(){
      return {
        seller:"",
        /!*goods:'',*!/
      }
    },
    created(){
      this.getData();
        /!*this.getGoods()*!/

    },
    methods:{
      getData(){
        this.$ajax('/api/seller').then((data)=>{
          if(data.data.errno==0){
            this.seller=data.data.data;

            console.log(this.seller);
          }
        }).catch(function(err){

        })
      },
      /!*getGoods(){
        this.$ajax('/api/goods').then((data)=>{
          if(data.data.errno==0){
            this.goods=data.data.data;
            console.log(this.goods);
          }
        }).catch((err)=>{
          console.log(err);
        })
      }*!/

    }
  }
*/
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
  }
  .tabs{
    width:100%;
    height:40px;
    background:#eee;
    border-bottom: 0.08em solid rgba(7,17,27,0.2);

  }
  .tabs .tab-item{
    width:33.33%;
    height:100%;
    float:left;
    font-size:14px;
    color:rgba(7,17,27,1);
    line-height:40px;
    text-align: center;
  }
  .router-link-active{
    color:rgba(240,20,20,1);
  }
</style>

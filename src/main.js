
import Vue from 'vue';
import App from './App.vue';


import VueRouter from 'vue-router';
import VueSwiper from 'vue-awesome-swiper';
import welcomSwiper from './components/welcomeSwiper/welcomSwiper.vue';
import './assets/css/common/style.css';
import './assets/css/common/reset.css';


import Main from './components/main/Main.vue';
import Goods from './components/goods/Goods.vue';
import Ratings from './components/ratings/Ratings.vue';
import Seller from './components/sellers/Seller.vue';




Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(VueSwiper);

const router =new VueRouter({
  routes:[
    {path:'/',component:welcomSwiper},

    {path:'/main',component:Main,
      children:[
      {path:'goods',component:Goods},
      {path:'ratings',component:Ratings},
      {path:'seller',component:Seller}
    ]}
    // {path:'/',redirect:'/goods'},

  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router

});

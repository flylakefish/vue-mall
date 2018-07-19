// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import {Button, Col, Row, Search, Swipe, SwipeItem, Lazyload, List, Field, NavBar,Tabs,Tab} from 'vant'

Vue.use(Button).use(Col).use(Row).use(Search).use(Swipe)
.use(SwipeItem).use(Lazyload).use(List).use(NavBar).use(Field)
.use(Tabs).use(Tab);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

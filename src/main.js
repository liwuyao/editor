// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import webConfig from '../static/webconfig.js'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css' // Ensure you are using css-loader
import vcolorpicker from 'vcolorpicker'
 
Vue.use(Vuetify)

Vue.config.productionTip = false;
Vue.use(webConfig);
Vue.use(ElementUI);
Vue.use(vcolorpicker)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

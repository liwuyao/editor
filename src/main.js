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

import axios from 'axios'
import Qs from 'qs'
 
Vue.use(Vuetify)

Vue.config.productionTip = false;
Vue.use(webConfig);
Vue.use(ElementUI);
Vue.use(vcolorpicker);
Vue.prototype.axios = axios;
Vue.prototype.qs = Qs;

/* eslint-disable no-new */
Vue.mixin({
  data() {
    return {
    	staticConfig:{
    		stationId:'',
    	}
    }
  },
  methods: {
        fromPost(url,data,success,err){
        		var send = Qs.stringify(data)
        		this.axios.post(url, data,{
					headers: {
			            'Content-Type': 'application/x-www-form-urlencoded'
			          }
					})
					.then(function (response) {
					   success(response)
					})
					.catch(function (error) {
					    err(error)
					});
        },
        upload(url,data,success,err){
        		this.axios.post(url, data,{
						 headers: {
				            'Content-Type': 'content-type: multipart/form-data'
				          }
					})
				  .then(function (response) {
				    success(response)
				  })
				  .catch(function (error) {
				    err(error)
				  });
        },
        get(url,data,success,err){
        		this.axios.get(url, {
				    params: data
				  })
				  .then(function(res){
				  	success(response)
				  })
				  .catch(function (error) {
				    err(error)
				  });
	    }
  },
  created() {
  }
})

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

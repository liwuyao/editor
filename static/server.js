//服务文件
import axios from 'axios'
import Qs from 'qs'

export default {
    install(Vue, options) {
        Vue.prototype.https = {
        	fromPost:function(url,data){
        		var send = Qs.stringify(data)
        		this.axios.post(url, data,{
					headers: {
			            'Content-Type': 'application/x-www-form-urlencoded'
			          }
					})
					.then(function (response) {
					    console.log(response);
					})
					.catch(function (error) {
					    console.log(error);
					});
        	}
        }
       }
   }
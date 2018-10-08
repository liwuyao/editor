const fontList = require('font-list');

export default {
    install(Vue, options) {
        Vue.prototype.getMyWeb = {
        	stationId:'',//站点id
			stationMsg:function(){//从本地获取站点id
						  	var data = window.localStorage.getItem('EDITORSTATIONMSG');
						  			data = JSON.parse(data);
						  	return data;
					},
        	objectSetVal:function(val,old){//复制对象
        		for(var i in old){
					if(typeof(old[i]) == 'object' && !Array.isArray(old[i])){
						if(!val[i]){
							val[i] = {};
						}
						this.objectSetVal(val[i],old[i])
		 			}else{
		 				val[i] = old[i];
		 			}
				}
        	},
        	transStyle:function (num){
  				var index = num.indexOf('px');
  				var result = Number(num.slice(0,index));
  				return result;
  			},
  			recordArr:function(arr,data){
  				var newArr = [];
  				for(let item of data){
  					var obj = {};
  					this.objectSetVal(obj,item);
  					newArr.push(obj)
  				}
  				arr.push(newArr);
				if(arr.length>5){
					arr.splice(0,1)
				}
  			}
        }
       }
   }
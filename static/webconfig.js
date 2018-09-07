
export default {
    install(Vue, options) {
        Vue.prototype.getMyWeb = {
        	objectSetVal:function(val,old){
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
        	}
        }
       }
   }
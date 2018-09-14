const fontList = require('font-list');

export default {
    install(Vue, options) {
        Vue.prototype.getMyWeb = {
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
  			draw:function(elm){
  				var oBox = elm;
				var a=0;b=0;
				
				oBox.onmousedown=function  (ev) {
					var oEvent = ev || event;
					var X=oEvent.clientX;
					var Y=oEvent.clientY;
					var oBoxW=oBox.offsetWidth;
					var oBoxH=oBox.offsetHeight;
					var oBoxL=oBox.offsetLeft;
					
					if (X<(oBox.offsetLeft+1)) {
						a='left';
					}else if (X>(oBox.offsetLeft+oBox.offsetWidth-1)) {	
						a='right';
					}
					if (Y<(oBox.offsetTop+1)) {
						a='top';
					}else if (Y>(oBox.offsetTop+oBoxH-1)) {
						a='bottom';
					}
					document.onmousemove=function  (ev) {
						var oEvent = ev || event;
						var XX=oEvent.clientX;
						var YY=oEvent.clientY;
						
						if (a=='right') {
							oBox.style.width=oBoxW+(XX-X)+'px';
						}	
						else if (a=='left') {
							oBox.style.width=oBoxW+(X-XX)+'px';
							oBox.style.left=XX-X+oBoxL-1+'px';
						}
						if (a=='top') {
							oBox.style.height=oBoxH+(Y-YY)+'px';
							oBox.style.top=YY+'px';
						}
						else if (a=='bottom') {
							oBox.style.height=oBoxH+(YY-Y)+'px';
						}
					};
					document.onmouseup=function  () {
						document.onmousedown=null;
						document.onmousemove=null;
					};
					
				};
  			},
  			getSystemFont:function(t){
  				  if (t == "") {return ""};
				    var f = "Copyright © 心のsky Group";
				    var s = document.createElement("span");
				    s.style.fontSize = '72px';
				    s.innerHTML = f;
				    var b = document.getElementsByTagName("body")[0];
				    b.appendChild(s);
				    s.style.fontFamily = f;
				    var w = s.offsetWidth;
				    var h = s.offsetHeight;
				    s.style.fontFamily = t + ',' + f;
				    var r =((s.offsetWidth != w) || (s.offsetHeight != h));
				    b.removeChild(s);
				    return r?"存在":"不存在";  	
  			}
        }
       }
   }
import Vue from 'vue'
import Vuex from 'vuex'
import moduleBtn from './btns.js'
import editorFrom from './editor-from.js'
import elements from './elements.js'
import moduleText from './text.js'
import moduleImg from './img.js'
Vue.use(Vuex)
/*
 * dragType拖拽类型，创建拖拽，编辑器
 * dragStatu 拖拽状态
 * dragPageMsg 拖拽信息，开始拖拽的x,y
 * hideScaleBox 隐藏放缩框
 */
export default new Vuex.Store({
  state: {
    dragType: '',
    dragStatu: '',
    dragPageMsg:{
    	pageX:'',
    	pageY:''
    },
    hideScaleBox:false,
    childMsg:[],
    record:[],
  },
  mutations: {
    changeClientKey(state,key) {
      state.queryClientKey = key;
    },
    changeDragType(state,type){
    	state.dragType = type
    },
    changeDragStatu(state,statu){
    	state.dragStatu = statu
    },
    setStartPageX(state,data){
    	state.dragPageMsg.pageX = data.pageX
    	state.dragPageMsg.pageY = data.pageY
    },
    changeHideScaleBox(state,statu){
    	state.hideScaleBox = statu;
    },
    saveRecord(state,data){
    	recordArr(state.record,data);
    }
  },
  modules: {
    btn: moduleBtn,
    editorFrom: editorFrom,
    elements: elements,
    text:moduleText,
    img:moduleImg
  }
})

function recordArr(arr,data){
			var newArr = [];
  				for(let item of data){
  					var obj = {};
  					objectSetVal(obj,item);
  					newArr.push(obj)
  				}
  				arr.push(newArr);
				if(arr.length>5){
					arr.splice(0,1)
				}
		}
function objectSetVal(val,old){
			for(var i in old){
					if(typeof(old[i]) == 'object' && !Array.isArray(old[i])){
						if(!val[i]){
							val[i] = {};
						}
						objectSetVal(val[i],old[i])
		 			}else{
		 				val[i] = old[i];
		 			}
				}
}
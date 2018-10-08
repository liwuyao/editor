import Vue from 'vue'
import Vuex from 'vuex'
import moduleBtn from './btns.js'
import editorFrom from './editor-from.js'
import elements from './elements.js'
import moduleText from './text.js'
import moduleImg from './img.js'
import moduleFrom from './from.js'
Vue.use(Vuex)
/*
 * dragType拖拽类型，创建拖拽，编辑器
 * dragStatu 拖拽状态
 * dragPageMsg 拖拽信息，开始拖拽的x,y
 * hideScaleBox 隐藏放缩框
 * record 记录操作，用以撤销
 * recovery 记录撤销，用以恢复
 * editorMenuMsg 编辑器菜单信息
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
    recovery:[],
    editorMenuMsg:{
    	status:false,//菜单状态
    	elmMsg:{},//组件信息
    	left:'',
    	top:''
    },
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
//  	console.log(state.record)
    },
    saveRecovery(state,data){
    	if(!data){
    		state.recovery = []
    	}else{
    		recordArr(state.recovery,data)
    	}
    },
    changeEditorMenu(state,data){
    	for(var i in data){
    		state.editorMenuMsg[i] = data[i]
    	}
    }
  },
  modules: {
    btn: moduleBtn,
    editorFrom: editorFrom,
    elements: elements,
    text:moduleText,
    img:moduleImg,
    from:moduleFrom
  }
})

function recordArr(arr,data){
			var newArr = [];
  				for(let item of data){
  					var obj = {};
  					objectSetVal(obj,item);
  					newArr.push(obj)
  				}
  				if(arr.length == 0){
    				arr.push(newArr);
  				}else{
  				    arr.splice(0,0,newArr)
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
function prepend(arr, item) {
	console.log(item);
    return [item].concat(arr);
}
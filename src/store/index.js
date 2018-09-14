import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './module.js'
import moduleBtn from './btns.js'
import editorFrom from './editor-from.js'
import elements from './elements.js'
import moduleText from './text.js'

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
    hideScaleBox:false
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
    }
  },
  modules: {
    a: moduleA,
    btn: moduleBtn,
    editorFrom: editorFrom,
    elements: elements,
    text:moduleText
  }
})

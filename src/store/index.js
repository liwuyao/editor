import Vue from 'vue'
import Vuex from 'vuex'
import moduleA from './module.js'
import moduleBtn from './btn.js'
import editorFrom from './editor-from.js'
import elements from './elements.js'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    clientKeyIndex: 0,
    queryClientKey:'',
    dragType: '',
    dragPageMsg:{
    	pageX:'',
    	pageY:''
    }
  },
  mutations: {
    changeClientKey(state,key) {
      state.queryClientKey = key;
    },
    changeDragType(state,type){
    	state.dragType = type
    },
    setStartPageX(state,data){
    	state.dragPageMsg.pageX = data.pageX
    	state.dragPageMsg.pageY = data.pageY
    }
  },
  modules: {
    a: moduleA,
    btn: moduleBtn,
    editorFrom: editorFrom,
    elements: elements
  }
})

export default{
  state: {
  	msg:{},
  	set: {
  		count:'',
  		index:'',
  		msg:{},
  	}
  },
  mutations: {
    setEditorFrom(state,data) {
      state.set.index = data.index;
      state.set.msg = data.msg;
      state.set.count = data.count;;
    },
    editorFromMsg(state,msg){
    	state.msg = msg;
    }
  }
}
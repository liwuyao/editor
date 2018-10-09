
<script>
	import srbutton from '../button/button'
	import srtext from '../text/sr-text'
	import srimage from '../image/sr-image'
	import srswiper from '../image/sr-swiper'
	import srfrom from './demo'
	var dragBox = {
		template:`
			<div class="draw-box" :draggable="drag" @mousedown="startDrag">
				<slot></slot>
			</div>
		`,
		props:['dragStatu','msg'],
		watch:{
			dragStatu:function(){
				if(this.dragStatu == false){
					this.drag = false
				}
			}
		},
//		render: function (createElement) {
//		  return createElement('h1', this.blogTitle)
//		},
		data(){
			return{
				drag:false
			}
		},
		methods:{
			startDrag(){
						this.drag = true;
						this.$store.commit('changeHideScaleBox',true);
					}
			}
	}	
	export default {
	  props: ['msg'],
	  components:{
	  	srbutton,srtext,dragBox,srimage,srswiper,srfrom
	  },
	  computed:{
	  	styles:function(){
	  		var data = {
	  			left: this.msg.props.msg.styles.left,
	  			top: this.msg.props.msg.styles.top,
	  			'z-index': this.msg.props.msg.styles['z-index']
	  		}
	  		return data
	  	}
	  },
	  watch:{
	  	 '$store.state.editorFrom.msg':function(){	
		  	this.currentIndex = this.$store.state.editorFrom.msg.index;
		  	if(this.currentIndex == this.selfIndex){
		  		this.start = true
		  	}else{
		  		this.start = false
		  	}
		  }
	  },
	  created:function(){
	  	this.selfIndex = this.msg.index;
	  	this.start = true;
	  	this.getMyWeb.objectSetVal(this.selfMsg,this.msg)
	  },
	  data(){
	  	return{
	  		outBox: true,
	  		selfIndex:'',
	  		currentIndex:'',
	  		start:false,
	  		selfMsg:{},
	  		dragStatu:false,
	  	}
	  },
	  render: function(createElement) { // h 为 createElement 函数，接受三个参数
	  		var _this = this;
	  		var getsShowBox = this.$store.state.hideScaleBox;
	  		var showBox = '';
	  		if(this.msg.isScale){
	  			if(this.currentIndex == this.selfIndex || this.start){
		  			if(getsShowBox){
		  				showBox = true
		  			}
		  		}else{
		  			showBox = false
		  		}
	  		}
	  		var dragMsg;
	  		   if(showBox){
	  		   	 dragMsg = [
                    	createElement(this.msg.name,{
		                    	props:this.msg.props.msg,
		                    }),
		                createElement('div',{
		                    	'class':'drag-left',
		                    	style:{
		                    		height: this.getMyWeb.transStyle(this.msg.props.msg.styles.height) + 20 + 'px'
		                    	}
		                    },[
		                    	createElement('div',{
			                    	style:{
			                    		height:'100%',
			                    		width:'100&',
			                    		position: 'relative'
			                    	},
			                    	on:{
			                    		mousedown:function(event){
			                    			event.stopPropagation();
			                    			_this.dragStatu = false;
			                    			_this.$store.commit('changeDragStatu',_this.dragStatu);
			                    			var scaleData = {
			                    				pageX:event.pageX,
			                    				pageY:event.pageY,
			                    			}
											var currentWidth = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.width)
											var currentLeft = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.left)
			          						document.body.onmousemove=function(e){
			          							var changX = e.pageX - scaleData.pageX;
			          							var nowX = currentWidth - changX;
			          								if(nowX >= 375){
			          									nowX = 375
			          								}
			          							var nowLeft = currentLeft + changX;
			          							var data = {
															count: +new Date,
															index: _this.msg.index,
															msg:{
																styles:{
																	width:nowX + 'px',
																	left:nowLeft + 'px'
																}
															}
														}
												_this.$store.commit('setEditorFrom',data)
			          						}
			          						document.body.onmouseup=function(e){
			          							document.body.onmousemove = null;
			          							document.body.onmouseup = null;
			          						}
			                    		}
			                    	}
			                    },[
			                    	createElement('div',{
			                    		'class':'circle-y',
				                    	style:{
				                    		top:'-4px',
				                    		cursor: 'se-resize'
				                    	},
				                    	on:{
			                    		mousedown:function(event){
			                    			event.stopPropagation();
			                    			_this.dragStatu = false;
			                    			_this.$store.commit('changeDragStatu',_this.dragStatu);
			                    			var scaleData = {
			                    				pageX:event.pageX,
			                    				pageY:event.pageY,
			                    			}
											var currentHeight = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.height)
											var currentTop= _this.getMyWeb.transStyle(_this.msg.props.msg.styles.top)
											var currentWidth = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.width)
											var currentLeft = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.left)
			          						document.body.onmousemove=function(e){
			          								var changX = e.pageX - scaleData.pageX;
					          						var nowX = currentWidth - changX;
					          								if(nowX >= 375){
					          									nowX = 375
					          								}
			          							var nowLeft = currentLeft + changX;
			          							var changY = e.pageY - scaleData.pageY;
			          							var nowY = currentHeight - changY;
			          							var nowTop = currentTop + changY;
			          							var data = {
															count: +new Date,
															index: _this.msg.index,
															msg:{
																styles:{
																	height:nowY + 'px',
																	top:nowTop + 'px',
																	width:nowX + 'px',
																	left:nowLeft + 'px'
																}
															}
														}
												_this.$store.commit('setEditorFrom',data)
			          						}
			          						document.body.onmouseup=function(e){
			          							document.body.onmousemove = null;
			          							document.body.onmouseup = null;
			          						}
			                    		}
			                    	}
				                    }),
				                    createElement('div',{
				                    	'class':'circle-y',
				                    	style:{
				              				top:'50%',
											transform: 'translate(-50%,-50%)',
				                    	}
				                    }),
				                    createElement('div',{
			                    		'class':'circle-y',
				                    	style:{
				                    		bottom:'-4px',
				                    		cursor: 'ne-resize'
				                    	},
				                    	on:{
			                    		mousedown:function(event){
			                    			event.stopPropagation();
			                    			_this.dragStatu = false;
			                    			_this.$store.commit('changeDragStatu',_this.dragStatu);
			                    			var scaleData = {
			                    				pageX:event.pageX,
			                    				pageY:event.pageY,
			                    			}
											var currentHeight = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.height)
											var currentTop= _this.getMyWeb.transStyle(_this.msg.props.msg.styles.top)
											var currentWidth = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.width)
											var currentLeft = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.left)
			          						document.body.onmousemove=function(e){
			          								var changX = e.pageX - scaleData.pageX;
					          						var nowX = currentWidth - changX;
					          								if(nowX >= 375){
					          									nowX = 375
					          								}
			          							var nowLeft = currentLeft + changX;
			          							var changY = e.pageY - scaleData.pageY;
			          							var nowY = currentHeight + changY;
			          							var data = {
															count: +new Date,
															index: _this.msg.index,
															msg:{
																styles:{
																	height:nowY + 'px',
																	width:nowX + 'px',
																	left:nowLeft + 'px'
																}
															}
														}
												_this.$store.commit('setEditorFrom',data)
			          						}
			          						document.body.onmouseup=function(e){
			          							document.body.onmousemove = null;
			          							document.body.onmouseup = null;
			          						}
			                    		}
			                    	}
				                    }),
			                    ]),
		                    ]),
		                     createElement('div',{
		                    	'class':'drag-right',
		                    	style:{
		                    		height: this.getMyWeb.transStyle(this.msg.props.msg.styles.height) + 20 + 'px'
		                    	}
		                    },[
		                    	createElement('div',{
			                    	style:{
			                    		height:'100%',
			                    		width:'100&',
			                    		position: 'relative'
			                    	},
			                    	on:{
			                    		mousedown:function(event){
			                    			event.stopPropagation();
			                    			_this.dragStatu = false;
			                    			_this.$store.commit('changeDragStatu',_this.dragStatu);
			                    			var scaleData = {
			                    				pageX:event.pageX,
			                    				pageY:event.pageY,
			                    			}
											var currentWidth = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.width)
											var currentLeft = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.left)
			          						document.body.onmousemove=function(e){
			          							var changX = e.pageX - scaleData.pageX;
			          							var nowX = currentWidth + changX;
			          								if(nowX >= 375){
			          									nowX = 375
			          								}
			          							var data = {
															count: +new Date,
															index: _this.msg.index,
															msg:{
																styles:{
																	width:nowX + 'px',
																}
															}
														}
												_this.$store.commit('setEditorFrom',data)
			          						}
			          						document.body.onmouseup=function(e){
			          							document.body.onmousemove = null;
			          							document.body.onmouseup = null;
			          						}
			                    		}
			                    	}
			                    },[
			                    	createElement('div',{
			                    		'class':'circle-y',
				                    	style:{
				                    		top:'-4px',
				                    		cursor: 'ne-resize'
				                    	},
				                    	on:{
			                    		mousedown:function(event){
			                    			event.stopPropagation();
			                    			_this.dragStatu = false;
			                    			_this.$store.commit('changeDragStatu',_this.dragStatu);
			                    			var scaleData = {			            
			                    				pageX:event.pageX,
			                    				pageY:event.pageY,
			                    			}
											var currentHeight = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.height)
											var currentTop= _this.getMyWeb.transStyle(_this.msg.props.msg.styles.top)
											var currentWidth = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.width)
											var currentLeft = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.left)
			          						document.body.onmousemove=function(e){
			          							var changX = e.pageX - scaleData.pageX;
			          							var nowX = currentWidth + changX;
			          								if(nowX >= 375){
			          									nowX = 375
			          								}
			          							var changY = e.pageY - scaleData.pageY;
			          							var nowY = currentHeight - changY;
			          							var nowTop = currentTop + changY;
			          							var data = {
															count: +new Date,
															index: _this.msg.index,
															msg:{
																styles:{
																	height:nowY + 'px',
																	top:nowTop + 'px',
																	width:nowX + 'px',
																}
															}
														}
												_this.$store.commit('setEditorFrom',data)
			          						}
			          						document.body.onmouseup=function(e){
			          							document.body.onmousemove = null;
			          							document.body.onmouseup = null;
			          						}
			                    		}
			                    	}
				                    }),
				                    createElement('div',{
				                    	'class':'circle-y',
				                    	style:{
				              				top:'50%',
											transform: 'translate(-50%,-50%)',
				                    	}
				                    }),
				                    createElement('div',{
			                    		'class':'circle-y',
				                    	style:{
				                    		bottom:'-4px',
				                    		cursor: 'se-resize'
				                    	},
				                    	on:{
			                    		mousedown:function(event){
			                    			event.stopPropagation();
			                    			_this.dragStatu = false;
			                    			_this.$store.commit('changeDragStatu',_this.dragStatu);
			                    			var scaleData = {
			                    				pageX:event.pageX,
			                    				pageY:event.pageY,
			                    			}
											var currentHeight = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.height)
											var currentTop= _this.getMyWeb.transStyle(_this.msg.props.msg.styles.top)
											var currentWidth = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.width)
											var currentLeft = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.left)
			          						document.body.onmousemove=function(e){
			          							var changX = e.pageX - scaleData.pageX;
			          							var nowX = currentWidth + changX;
			          								if(nowX >= 375){
			          									nowX = 375
			          								}
			          							var changY = e.pageY - scaleData.pageY;
			          							var nowY = currentHeight + changY;
			          							var data = {
															count: +new Date,
															index: _this.msg.index,
															msg:{
																styles:{
																	height:nowY + 'px',
																	width:nowX + 'px',
																}
															}
														}
												_this.$store.commit('setEditorFrom',data)
			          						}
			          						document.body.onmouseup=function(e){
			          							document.body.onmousemove = null;
			          							document.body.onmouseup = null;
			          						}
			                    		}
			                    	}
				                    }),
			                    ]),
		                    ]),
		                     createElement('div',{
		                    	'class':'drag-top',
		                    	style:{
		                    		width:this.getMyWeb.transStyle(this.msg.props.msg.styles.width) + 10 + 'px'
		                    	}
		                    },[
		                    	createElement('div',{
			                    	style:{
			                    		height:'100%',
			                    		width:'100&',
			                    		position: 'relative'
			                    	},
			                    	on:{
			                    		mousedown:function(event){
			                    			event.stopPropagation();
			                    			_this.dragStatu = false;
			                    			_this.$store.commit('changeDragStatu',_this.dragStatu);
			                    			var scaleData = {
			                    				statu:true,
			                    				pageX:event.pageX,
			                    				pageY:event.pageY,
			                    				type:'left'
			                    			}
											var currentHeight = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.height)
											var currentTop= _this.getMyWeb.transStyle(_this.msg.props.msg.styles.top)
			          						document.body.onmousemove=function(e){
			          							var changY = e.pageY - scaleData.pageY;
			          							var nowY = currentHeight - changY;
			          							var nowTop = currentTop + changY;
			          							var data = {
															count: +new Date,
															index: _this.msg.index,
															msg:{
																styles:{
																	height:nowY + 'px',
																	top:nowTop + 'px'
																}
															}
														}
												_this.$store.commit('setEditorFrom',data)
			          						}
			          						document.body.onmouseup=function(e){
			          							document.body.onmousemove = null;
			          							document.body.onmouseup = null;
			          						}
			                    		}
			                    	}
			                    },[
				                    createElement('div',{
				                    	'class':'circle-y',
				                    	style:{
				              				top:'50%',
											transform: 'translate(-50%,-50%)',
				                    	}
				                    }),
			                    ]),
		                    ]),
		                     createElement('div',{
		                    	'class':'drag-bottom',
		                    	style:{
		                    		width:this.getMyWeb.transStyle(this.msg.props.msg.styles.width) + 10 + 'px'
		                    	}
		                    },[
		                    	createElement('div',{
			                    	style:{
			                    		height:'100%',
			                    		width:'100&',
			                    		position: 'relative'
			                    	},
			                    	on:{
			                    		mousedown:function(event){
			                    			event.stopPropagation();
			                    			_this.dragStatu = false;
			                    			_this.$store.commit('changeDragStatu',_this.dragStatu);
			                    			var scaleData = {
			                    				statu:true,
			                    				pageX:event.pageX,
			                    				pageY:event.pageY,
			                    				type:'left'
			                    			}
											var currentHeight = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.height)
											var currentTop= _this.getMyWeb.transStyle(_this.msg.props.msg.styles.top)
			          						document.body.onmousemove=function(e){
			          							var changY = e.pageY - scaleData.pageY;
			          							var nowY = currentHeight + changY;
			          							var data = {
															count: +new Date,
															index: _this.msg.index,
															msg:{
																styles:{
																	height:nowY + 'px',
																}
															}
														}
												_this.$store.commit('setEditorFrom',data)
			          						}
			          						document.body.onmouseup=function(e){
			          							document.body.onmousemove = null;
			          							document.body.onmouseup = null;
			          						}
			                    		}
			                    	}
			                    },[
				                    createElement('div',{
				                    	'class':'circle-y',
				                    	style:{
				              				top:'50%',
											transform: 'translate(-50%,-50%)',
				                    	}
				                    }),
			                    ]),
		                    ]),
                    	]
	  		   }else{
	  		   	dragMsg = [
	  		   		createElement(this.msg.name,{
		                    	props:this.msg.props.msg
		            }),
	  		   	]
	  		   }
            return createElement('div',{
            	 'class':'editor-click',
            	  style:_this.styles,
            	  on:{
            	  	mousedown:function(){
            	  		_this.dragStatu = true;
						if(_this.dragStatu){
							var data = {
								pageX:event.pageX,
								pageY:event.pageY
							}
							_this.$store.commit('editorFromMsg',_this.msg);
							 _this.$store.commit('changeDragType','dragElm');
							 _this.$store.commit('changeDragStatu',_this.dragStatu);
							_this.$store.commit('setStartPageX',data);
							}
            	  	},
            	  	contextmenu:function(e){//打开菜单栏
            	  		var e = e || event;
            	  		e.stopPropagation();
            	  		e.preventDefault();
            	  		var oldLeft = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.left);
            	  		var oldTop = _this.getMyWeb.transStyle(_this.msg.props.msg.styles.top);
            	  		var left = e.offsetX + oldLeft; //当前菜单栏left
            	  		var top = e.offsetY + oldTop;//当前菜单栏top
            	  		var data = {
            	  			status:true,
            	  			elmMsg:_this.msg,
            	  			left: left,
            	  			top:top
            	  		}
            	  		_this.$store.commit('changeEditorMenu',data);
            	  	}
            	  }
				 },
				[
                createElement('dragBox',{
                		props:{
                			dragStatu:_this.dragStatu,
                			msg:_this.msg
                		}
                    },
                     dragMsg
                    ),
				]
            )
       },
       
       methods:{
       	modifyMsg(){;
       	}
       }
	}
</script>

<style scoped>
	.editor-click{
		/*background: orangered;
		border-radius: ;*/
		display: inline-block;
		position: absolute;
		cursor: move;
	}
	.draw-box{
		display: inline-block;
	    position: relative
	}
	.drag-left{
		position: absolute;
		left: -10px;
		top: -10px;
		height: 100%;
		background: orangered;
		width: 2px;
		cursor: w-resize;
	}
	.drag-right{
		position: absolute;
		right: -10px;
		top: -10px;
		height: 100%;
		background: orangered;
		width: 2px;
		cursor: w-resize;
	}
	.circle-y{
		position: absolute;
		width:8px;
		height:8px;
		border-radius: 50%;
		border: 1px solid orange;
		background: white;
		left: 50%;
		transform: translateX(-50%);
	}
	.drag-top{
		position: absolute;
		top: -10px;
		left: -5px;
		background: orangered;
		height: 2px;
		cursor: s-resize;
	}
	.drag-bottom{
		position: absolute;
		bottom: -10px;
		left: -5px;
		background: orangered;
		height: 2px;
		cursor: s-resize;
	}
</style>
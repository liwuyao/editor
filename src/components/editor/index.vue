<template>
  <div class="editor-page">
<!--  	头部-->;
		<header style="padding: 10px;border-bottom: 1px solid gainsboro">
			<h4>编辑器</h4>
		</header>
<!--  	选择组件-->
  	<div class="editor-page-content">
  		<div class="frame demo">
	  		<div class="demo-right">
	  			<el-tabs type="border-card" stretch style="border: none;box-shadow: none;">
					  <el-tab-pane label="模块" style="padding: 0;">
					  	<el-collapse v-model="activeNames" @change="handleChange">
							  <el-collapse-item v-for="(item, index) in demoMsg" :title="item.name" :name="index" style="padding: 0;" :key="index">
				  				<div class="demo-component-box" :style="demoComponentBoxStyle(item.demos)">
				  					<div style="display: inline-block;width: 364px;overflow: hidden;">
				  						<div class="demo-component-drag" draggable = 'true' v-for="demos of item.demos" v-on:dragstart="demoDrag($event,demos)">
				  								<div style="width:100%;height:54px;display: flex;flex-direction: column;justify-content: space-between;margin-top: 17px;">
				  									<i :class="demos.icon" style="line-height: 30px;"></i>
				  								  <p>{{demos.name}}</p>
				  								</div>
				  					  </div>
				  					</div>
				  				</div>
							  </el-collapse-item>
							</el-collapse>
					  </el-tab-pane>
					  <el-tab-pane label="页面">
					  	<p style="padding: 10px 0;text-align: center;">正在开发中</p>
					  </el-tab-pane>
					</el-tabs>
	  		</div>
	  	</div>
<!--	  	编辑器-->
	  	<div class="frame editor">
	  			<div style="width: 375px;margin: 0 auto;">
		  				<header class="editor-header">首页</header>
			  		  <div style="display: inline-block;"  @drop="editorDragOver($event)" @dragover="allowDrop($event)"
			  		  	@click="editorClick($event)">
			  		  	<editor :childMsg=childMsg></editor>
			  		  </div>
	  			</div>
	  	</div>
	  	<div class="frame editor-from">
	  		<div class="editor-handle">
	  			<div style="width: 100%;text-align: center;position: absolute;top: 50%;transform: translateY(-50%);">
	  				<span>撤销</span>
	  			</div>
	  		</div>
	  		<div style="flex: 1;padding: 10px;">
	  			<editorfrom></editorfrom>
	  		</div>
	  	</div>
  	</div>
<!--  	<order-btn :status="status"></order-btn>-->
  </div>
</template>

<script>
import editor from './editor'
import editorfrom from './editor-from'
import demobox from './demo-box'
export default {
  name: 'HelloWorld',
  components:{
  	editor,editorfrom,demobox
  },
  watch:{
	  	'$store.state.editorFrom.set.count':function(){;
	  		var getMsg = this.$store.state.editorFrom.set.msg;
	  		var index = this.$store.state.editorFrom.set.index;
				this.getMyWeb.objectSetVal(this.childMsg[index].props.msg,getMsg);
	  	}
	},
		/*
  		 * demoBtn:选择模板种类的按钮
  		 * demoBtnActive: 当前模板种类选择名称
  		 * demoDragMsg：开始拖拽模板记录的位置信息
  		 * startChooseElm：记录要创建组件的选择信息
  		 */
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      activeNames:0,
      childMsg:[],
      demoBtnActive: '',
      demoDragMsg:{
      	left:'',
      	top:''
      },
      startChooseElm:'',
      demoMsg:[
      	{
      		name:'常用',
      		demos:[
      			{
		      		icon:'iconfont icon-demo-anniu',
		      		name:'按钮',
		      		type:'btn',
		      		elm:'vbutton'
		      	},
		      	{
		      		icon:'iconfont icon-wenben',
		      		name:'文本',
		      		type:'text',
		      		elm:'vtextarea'
		      	},
		      	{
		      		icon:'iconfont icon-demo-anniu',
		      		name:'按钮',
		      		type:'btn',
		      		elm:'vbutton'
		      	},
		      	{
		      		icon:'iconfont icon-wenben',
		      		name:'文本',
		      		type:'text',
		      		elm:'vtextarea'
		      	},
		      	{
		      		icon:'iconfont icon-demo-anniu',
		      		name:'按钮',
		      		type:'btn',
		      		elm:'vbutton'
		      	},
		      	{
		      		icon:'iconfont icon-wenben',
		      		name:'文本',
		      		type:'text',
		      		elm:'vtextarea'
		      	},
      		]
      	}
      ],
    }
  },
  computed: {
    // 计算属性的 getter
  },
  methods:{
  	test(e){
  		console.log(e.target)
  	},
//	手风琴函数
  	handleChange(val) {
        console.log(val);
    },
//  监听全局点击事件
	editorClick(e){
		var id = e.target.id;
		if(id == 'editorBox'){
			this.$store.commit('changeHideScaleBox',false);
		}
	},
//	编辑盒子鼠标下落事件
  	demoDrag(ev,data){
  		this.demoDragMsg.left = ev.offsetX;
  		this.demoDragMsg.top = ev.offsetY;
  		this.$store.commit('changeDragType','creatElm');
  		this.startChooseElm = data;
  		this.$store.commit('changeDragStatu',true);
  	},
  	allowDrop(ev){
			ev.preventDefault();
		},
  	editorDragOver(event){
  		var type = this.$store.state.dragType;
  				//		光标位置记录位置
  		var cursorX = event.offsetX;
			var cursorY = event.offsetY;
			var dragStatu = this.$store.state.dragStatu
  		if(type == 'creatElm' && dragStatu){
					var elmX = cursorX - this.demoDragMsg.left;
					var elmY = cursorY - this.demoDragMsg.top;
					var index = this.childMsg.length;
					var elmName = this.startChooseElm.elm;
//					元素数据基础类型
					var data = new Object;
						 var getMSg = this.$store.state[this.startChooseElm.type].elmMsg[elmName].creatMsg;
//							赋值函数
						 this.getMyWeb.objectSetVal(data,getMSg)
							data.index = index;
							if(elmX<0){
								elmX = 0
							}
							data.props.msg.styles.top = elmY + 'px';
					    this.childMsg.push(data);
//					    创建编辑input
							this.$store.commit('editorFromMsg',data);
  		}else if(type == 'dragElm' && dragStatu){
  			var oldPage = this.$store.state.dragPageMsg
  			var ElmMsg = this.$store.state.editorFrom.msg;
  			var	oldElmMsgIndex = this.childMsg.indexOf(this.$store.state.editorFrom.msg);
  			var oldLeft = this.getMyWeb.transStyle(ElmMsg.props.msg.styles.left);
  			var oldTop = this.getMyWeb.transStyle(ElmMsg.props.msg.styles.top);
  			var changeX = event.pageX - oldPage.pageX;
  		  var changeY = event.pageY - oldPage.pageY;
//		   拖拽限制
			var limiX = oldLeft + changeX + this.getMyWeb.transStyle(ElmMsg.props.msg.styles.width);
			var resultX;
			var resultY;
				if(limiX>375){
					resultX = 375 - this.getMyWeb.transStyle(ElmMsg.props.msg.styles.width)
				}else if(oldLeft + changeX < 0){
					resultX = 0
				}else{
					resultX = oldLeft + changeX
				}
				if(oldTop + changeY < 0){
					resultY = 0;
				}else{
					resultY = oldTop + changeY
				}
  		  var currentLeft = resultX + 'px';
  		  var currentTop = resultY + 'px';
//		    重新赋值top,left
  		  		ElmMsg.props.msg.styles.left = currentLeft;
  		  		ElmMsg.props.msg.styles.top = currentTop;
  		  		this.childMsg[oldElmMsgIndex] = ElmMsg;
//			function transStyle(num){
//				var index = num.indexOf('px');
//				var result = Number(num.slice(0,index));
//				return result;
//			}
  		}
  	},
//	监听编辑器鼠标移动
		editorMove(e){
//			组件放缩
			var scaleStatu = this.$store.state.scale.statu;
			if(scaleStatu){
				console.log(e.pageX)
			}
		},
//		监听编辑器鼠标down
		editorDown(e){
			var name = e.target.className;
		},
//		监听编辑器鼠标up
		editorUp(e){
			this.$store.commit('changeScale',{statu:false})
		},
  	demoComponentBoxStyle(item){
  		var len = Math.ceil(item.length/4);
  		var height = len*90 + 'px';
  		return 'height:' + height;
  	},
//	保存信息，并翻译信息
  	save(){
  		var elements = this.$store.state.elements.elmMsg;
  		var data = {
  			html:'',
  			data:{},
  		}
  		var htmls = '';
  		var datas = {};
  		for(var item of this.childMsg){
  			var index = this.childMsg.indexOf(item);
  			var name = item.name + index;
  			for(var i in elements){
  				var spliceHtml = ''
  				if(item.name == i){
  					spliceHtml = elements[i].htmlHead + name + elements[i].htmlFoot; 
  				}
  				htmls += spliceHtml;
  				datas[name] = item.props.msg.styles
  			}
  		}
  		data.html = htmls;
  		data.data = datas;
  		console.log(data);
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.editor-page{
		display: flex;
		height: 100%;
		width: 100%;
		flex-direction: column;
	}
	.editor-page-content{
		flex: 1;
		display: flex;
		flex-direction:row;
		background: #edecee;
	}
	.frame{
		flex: 1;
	}
	.frame:nth-child(2){
		border-right: 1px solid gainsboro;
		border-left: 1px solid gainsboro;
		overflow: auto;
	}
/*	滚动条整体部分*/
	.editor::-webkit-scrollbar    
	{  
	  width: 5px;  
	  height:10px;    	
	  background-color:#b5b1b1;
	
	}  
/*	scroll轨道背景*/
	.editor::-webkit-scrollbar-track       
	{  
	  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
	  border-radius: 10px; 
	  background-color:#b5b1b1;       
	}
/*	滚动条中能上下移动的小块*/
	.editor::-webkit-scrollbar-thumb 
	{  
	  border-radius: 10px;  
	  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
	  background-color:black;
	} 
	.editor-header{
		background: black;
		width: 375px;
		font-size: 18px;
		font-weight: bolder;
		text-align: center;
		padding: 10px 0;
		color: white;
	}
	.demo{
		display: flex;
		justify-content: space-between;
	}
	.demo .demo-left{
		width: 50px;
		background: white;
	}
	.demo .demo-left div{
		text-align: center;
		width: 100%;
		padding: 10px 0;
		cursor: pointer;
	}
	.demoActive{
		color: #2589ff;
	}
	.demo .demo-right{
		background: white;
		height: 100%;
		width: 360px;
	}
	.demo-component-box{
		width: 100%;
		overflow: hidden;
		border-bottom: 1px solid gainsboro;
		border-top: 1px solid gainsboro;
	}
	.demo-component-drag{
		width: 90px;
		height: 90px;
		float: left;
		border-right: 1px solid gainsboro;
		border-bottom: 1px solid gainsboro;
		text-align: center;
		cursor: pointer;
	}
	.demo-component-drag:hover{
		color: #2589FF;
	}
	.demo-component-drag .iconfont{
		font-size: 30px;
	}
/*	编辑器表单*/
	.editor-from{
		display: flex;
	}
	.editor-from .editor-handle{
		width: 60px;
		height: 100%;
		position: relative;
	}
</style>

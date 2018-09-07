<template>
  <div class="editor-page">
<!--  	头部-->;
		<header style="padding: 10px;border-bottom: 1px solid gainsboro">
			<h4>编辑器</h4>
		</header>
<!--  	选择组件-->
  	<div class="editor-page-content">
  		<div class="frame demo">
	  		<div class="demo-left">
	  			<div v-for="item in demoBtn" :class="{demoActive: demoBtnActive == item }" @click="demoBtnActive = item">{{item}}</div>
	  		</div>
	  		<div class="demo-right">
	  			<!--<demobox :demoMsg="demoMsg"></demobox>-->
	  			<!--常用组件-->
	  			<div v-for="item of demoMsg">
	  				<div style="padding: 10px;border-top:1px solid gainsboro;">{{item.name}}</div>
	  				<div class="demo-component-box" :style="demoComponentBoxStyle(item.demos)">
	  					<div style="display: inline-block;width: 364px;overflow: hidden;">
	  						<div class="demo-component-drag" draggable = 'true' v-for="demos of item.demos" v-on:dragstart="demoDrag($event,demos)">
	  								<div style="width:100%;height:54px;display: flex;flex-direction: column;justify-content: space-between;margin-top: 17px;">
	  									<i :class="demos.icon"></i>
	  								  <p>{{demos.name}}</p>
	  								</div>
	  					  </div>
	  					</div>
	  				</div>
	  			</div>
	  		</div>
	  	</div>
<!--	  	编辑器-->
	  	<div class="frame editor">
	  			<div style="width: 375px;margin: 0 auto;">
		  				<header class="editor-header">首页</header>
			  		  <div style="display: inline-block;"  @drop="editorDragOver($event)" @dragover="allowDrop($event)">
			  		  	<editor :childMsg=childMsg></editor>
			  		  </div>
	  			</div>
	  	</div>
	  	<div class="frame">
	  		<editorfrom></editorfrom>
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
      childMsg:[],
      demoBtn:['文字','按钮','图片'],
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
		      		elm:'vbutton'
		      	},
		      	{
		      		icon:'iconfont icon-demo-anniu',
		      		name:'文本',
		      		elm:'vbutton'
		      	},
		      	{
		      		icon:'iconfont icon-demo-anniu',
		      		name:'按钮'
		      	},
		      	{
		      		icon:'iconfont icon-demo-anniu',
		      		name:'按钮'
		      	},
		      	{
		      		icon:'iconfont icon-demo-anniu',
		      		name:'按钮'
		      	}
      		]
      	}
      ],
    }
  },
  computed: {
    // 计算属性的 getter
  },
  methods:{
//	编辑盒子鼠标下落事件
  	demoDrag(ev,data){
  		this.demoDragMsg.left = ev.offsetX;
  		this.demoDragMsg.top = ev.offsetY;
  		this.$store.commit('changeDragType','creatElm');
  		this.startChooseElm = data;
  	},
  	allowDrop(ev){
			ev.preventDefault();
		},
  	editorDragOver(event){
  		var type = this.$store.state.dragType;
  				//		光标位置记录位置
  		var cursorX = event.offsetX;
			var cursorY = event.offsetY;
  		if(type == 'creatElm'){
					var elmX = cursorX - this.demoDragMsg.left;
					var elmY = cursorY - this.demoDragMsg.top;
					var index = this.childMsg.length;
					var elmName = this.startChooseElm.elm;
//					元素数据基础类型
					var data = new Object;
						 var getMSg = this.$store.state.elements.elmMsg[elmName].creatMsg;
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
  		}else if(type == 'dragElm'){
  			var oldPage = this.$store.state.dragPageMsg
  			var ElmMsg = this.$store.state.editorFrom.msg;
  			var	oldElmMsgIndex = this.childMsg.indexOf(this.$store.state.editorFrom.msg);
  			var oldLeft = transStyle(ElmMsg.props.msg.styles.left);
  			var oldTop = transStyle(ElmMsg.props.msg.styles.top);
  			var changeX = event.pageX - oldPage.pageX;
  		  var changeY = event.pageY - oldPage.pageY;
//		   拖拽限制
			var limiX = oldLeft + changeX + transStyle(ElmMsg.props.msg.styles.width);
			var resultX;
			var resultY;
				if(limiX>375){
					resultX = 375 - transStyle(ElmMsg.props.msg.styles.width)
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
  			function transStyle(num){
  				var index = num.indexOf('px');
  				var result = Number(num.slice(0,index));
  				return result;
  			}
  		}
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
		padding: 20px 0;
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
</style>

<template>
  <div class="editor-page">
<!--  	头部-->
		<vheadr></vheadr>
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
			  		  <div style="display: inline-block;position: relative;height: 667px;overflow: auto;"  @drop="editorDragOver($event,'drag')" @dragover="allowDrop($event)"
			  		  	@click="editorClick($event)" @scroll="pageScroll" id="editorScrollBox">
			  		  	<editor :childMsg=childMsg :defaultMsg=editorDefaultMsg></editor>
			<!--  		  	菜单栏-->
								<div id="editor-menu" v-if="editorMenuStatu" :style="editorMenuStyle">
									<div class="editor-menu-botton" @click="deleteElm()">删除</div>
									<div class="editor-menu-botton" @click="copyElm()">复制</div>
									<div class="editor-menu-botton" @click="elmSetTop()">置顶</div>
									<div class="editor-menu-botton" @click="elmUp()">移至上一层</div>
									<div class="editor-menu-botton" style="border: none;" @click="elmDown()">移至下一层</div>
								</div>
			  		  </div>
	  			</div>
	  	</div>
	  	<div class="frame editor-from">
	  		<div class="editor-handle">
	  			<div style="width: 100%;text-align: center;position: absolute;top: 50%;transform: translateY(-50%);">
	  				<div @click="save()" class="editor-handle-btn">
	  					<div class="editor-handle-btn-text">保存</div><i class="iconfont icon-baocun"></i>
	  				</div>
	  				<div @click="editorBack()" style="margin-top: 10px;" class="editor-handle-btn">
	  					<div class="editor-handle-btn-text">撤销</div><i class="iconfont icon-daohangchexiao"></i>
	  				</div>
	  				<div @click="editorRecovery()" style="margin-top: 10px;" class="editor-handle-btn">
	  					<div class="editor-handle-btn-text">恢复</div><i class="iconfont icon-qianjin-kong" style="font-size: 18px;"></i>
	  				</div>
	  				<div style="margin-top: 10px;"  class="editor-handle-btn">
	  					<div class="editor-handle-btn-text" style="padding: 0;">页长</div>
	  					<div style="display: flex;flex-direction: column;">
		  					<div @mousedown="shorteningPage()" id="shorteningPage">
		  						<i class="iconfont icon-jjian-" style="font-size: 18px;"></i>
		  					</div>
		  					<div style="font-size: 12px;margin: 5px 0;">
		  						<!--{{editorDefaultMsg.pageLength}}-->
		  						<input type="text" :value="editorDefaultMsg.pageLength" @blur="pageLengthInput($event)" style="width: 30px;border: 1px solid gainsboro;text-align: center;padding: 2px 0;"/>
		  					</div>
		  					<div @mousedown="stretchPage()" id="stretchPage">
		  						<i class="iconfont icon-jjia-" style="font-size: 18px;"></i>
		  					</div>
		  				</div>
	  				</div>
	  			</div>
	  		</div>
	  		<div style="flex: 1;padding: 10px;overflow: auto;">
	  			<editorfrom></editorfrom>
	  		</div>
	  	</div>
  	</div>
<!--  	<order-btn :status="status"></order-btn>-->
<!--		<create-form :isShowDialog="dialogFormVisible" v-on:childByValue="childByValue"></create-form>-->
  </div>
</template>

<script>
import editor from './editor'
import editorfrom from './editor-from'
import demobox from './demo-box'
import vheadr from './header'
import createForm from './header'
export default {
  name: 'HelloWorld',
  components:{
  	editor,editorfrom,demobox,vheadr,createForm
  },
  watch:{
	  	'$store.state.editorFrom.set.count':function(){
//	  		this.recordSteep = 0;
	  		var getMsg = this.$store.state.editorFrom.set.msg;
	  		var index = this.$store.state.editorFrom.set.index;
				this.getMyWeb.objectSetVal(this.childMsg[index].props.msg,getMsg);
				if(getMsg.styles){
					for(var i in getMsg.styles){
						if(i !== 'left' && i !== 'width' && i !== 'top' && i !=='height'){
							this.$store.commit('saveRecord',this.childMsg);
						}
					}
				}else{
					this.$store.commit('saveRecord',this.childMsg);
				}
	  	}
	},
		/*
  		 * demoBtn:选择模板种类的按钮
  		 * demoBtnActive: 当前模板种类选择名称
  		 * demoDragMsg：开始拖拽模板记录的位置信息
  		 * startChooseElm：记录要创建组件的选择信息
  		 * recordSteep:撤销步数
  		 * recoverySteep：恢复步数
  		 * dialogFormVisible 表单弹框
  		 * editorMenuStatu 编辑器菜单状态
  		 * editorMenuStyle  编辑器菜单样式
  		 * pageLength 页面长度
  		 * editorDefaultMsg
  		 */
  data () {
    return {
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
		      		elm:'srbutton'
		      	},
		      	{
		      		icon:'iconfont icon-wenben',
		      		name:'文本',
		      		type:'text',
		      		elm:'srtext'
		      	},
		      	{
		      		icon:'iconfont icon-tupian',
		      		name:'图片',
		      		type:'img',
		      		elm:'srimage'
		      	},
		      	{
		      		icon:'iconfont icon-xiangce',
		      		name:'轮播',
		      		type:'img',
		      		elm:'srswiper'
		      	},
		      	{
		      		icon:'iconfont icon-demo-anniu',
		      		name:'表单',
		      		type:'from',
		      		elm:'srfrom'
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
      recordSteep:0,
      recoverySteep:0,
      editorMenuStatus:false,
      editorMenuStyle:'',
      pageLength:667,
      editorDefaultMsg:{
      	pageLength:667,
      }
      
    }
  },
  created:function(){
//	测试站点
//  this.getMyWeb.stationId = '5baf3452a17b731cdcb22539';
	  this.getMyWeb.stationId  = this.getMyWeb.stationMsg().id;
  },
  computed: {
//    编辑器菜单栏状态
		editorMenuStatu:function(){
			var msg = this.$store.state.editorMenuMsg;
//					console
			var statu = msg.status;
			var styles = "left:"+ msg.left + "px;top:" + msg.top + 'px';
			this.editorMenuStyle = styles
			return statu;
		}
  },
  methods:{
//	手风琴函数
  	handleChange(val) {
        console.log(val);
    },
//  监听全局点击事件
	editorClick(e){
//		隐藏拉伸框
		var id = e.target.id;
		if(id == 'editorBox'){
			this.$store.commit('changeHideScaleBox',false);
		}
//		********隐藏编辑菜单栏*****************
		var data = {
				status:false
			}
			this.$store.commit('changeEditorMenu',data)
	},
	pageScroll(){//页面滚动
		
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
  	editorDragOver(event,creatType){
  		var type = this.$store.state.dragType;
  				//		光标位置记录位置
  		if(creatType == 'drag'){
  			var cursorX = event.offsetX;
			  var cursorY = event.offsetY;
  		}
			var dragStatu = this.$store.state.dragStatu;
  		if(type == 'creatElm' && dragStatu){//开始创建
					var index = this.childMsg.length;
					var elmName = this.startChooseElm.elm;
//					元素数据基础类型
					var data = new Object;
						 var getMSg = this.$store.state[this.startChooseElm.type].elmMsg[elmName].creatMsg;
//							赋值函数
						 this.getMyWeb.objectSetVal(data,getMSg)
							data.index = index;
							data.props.msg.styles['z-index'] = String(index);
							if(creatType == 'drag'){
								var elmX = cursorX - this.demoDragMsg.left;
						    var elmY = cursorY - this.demoDragMsg.top;
								if(elmX<0){
									elmX = 0
								}
								data.props.msg.styles.top = elmY + 'px';
							}
							if(creatType == 'click'){
								data.props.msg.styles.top = 0 + 'px';
							}
					    this.childMsg.push(data);
//					    记录操作
					    this.$store.commit('saveRecord',this.childMsg);
//					    this.recordSteep = 0;
//					    创建编辑input
							this.$store.commit('editorFromMsg',data);
  		}else if(type == 'dragElm' && dragStatu){//创建后的位移
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
//					记录操作
				this.$store.commit('saveRecord',this.childMsg);
//				console.log(this.$store.state.record)
				this.recordSteep = 0;
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
//  撤销
		editorBack(){
			this.recordSteep +=1;
			var len = this.$store.state.record.length -1;
			if(len-this.recordSteep >= 0){
				this.childMsg = this.$store.state.record[this.recordSteep];
        this.$store.commit('saveRecord',this.childMsg);
        this.recordSteep += 1
			}else{
				this.childMsg=[];
			}
		},	
//		恢复
    editorRecovery(){
			this.recordSteep -=1;
			if(this.recordSteep <0){
				this.recordSteep = 0;
			}
			var len = this.$store.state.record.length -1;
			if(this.recordSteep == 1){
				this.$store.commit('saveRecovery',false);
			}
			if(len -this.recordSteep >= 0){
				this.childMsg = this.$store.state.record[this.recordSteep];
			}else{
				this.childMsg=[];
			}
    },
//	保存信息，并翻译信息
  	save(){
			var id = this.getMyWeb.stationId;
			var data = {
				stationId:id,
				filename:'index.vue',
				filePath:'pages/index',
				components:this.childMsg
			}
				this.axios.post('/station/page/',data)
				.then((res)=>{
					console.log(res)
				})
			
  	},
//	菜单栏
		deleteElm(){//删除组件
			var msg = this.$store.state.editorMenuMsg.elmMsg;
			var index = msg.index;
			for(var item of this.childMsg){
				if(item.index == index){
						var i = this.childMsg.indexOf(item)
						this.childMsg.splice(i,1);
				}
			}
			this.childMsg.forEach(function(item,index){
				item.index = index;
			})
			var data = {
				status:false
			}
			this.$store.commit('changeEditorMenu',data);
		},
		copyElm(){//复制组件
			var newElm = {};
			var msg = this.$store.state.editorMenuMsg.elmMsg;
			var index = this.childMsg.length;
			var oldTop = this.getMyWeb.transStyle(msg.props.msg.styles.top);
			this.getMyWeb.objectSetVal(newElm,msg);
			newElm.index = index;
			newElm.props.msg.styles.top = oldTop + 40 + 'px';
			this.childMsg.push(newElm);
			var data = {
				status:false
			}
			this.$store.commit('changeEditorMenu',data)
		},
		elmUp(){//组件向上移一层
			var msg = this.$store.state.editorMenuMsg.elmMsg;
					for(var item of this.childMsg){
						if(item.index == msg.index){
							var newIndex = item.props.msg.styles['z-index']*1 + 1
							item.props.msg.styles['z-index'] = String(newIndex);
						}
					}
					console.log(this.childMsg)
					var data = {
						status:false
					}
					this.$store.commit('changeEditorMenu',data)
		},
		elmDown(){//组件向下移一层
			var msg = this.$store.state.editorMenuMsg.elmMsg;
					for(var item of this.childMsg){
						if(item.index == msg.index){
							var newIndex = item.props.msg.styles['z-index']*1 - 1
							item.props.msg.styles['z-index'] = String(newIndex);
						}
					}
					console.log(this.childMsg)
					var data = {
						status:false
					}
					this.$store.commit('changeEditorMenu',data)
		},
		elmSetTop(){
			var msg = this.$store.state.editorMenuMsg.elmMsg;
			var bestIndex = 0;
			for(var item of this.childMsg){
				var num = item.props.msg.styles['z-index']*1;
						if(num>bestIndex){
							bestIndex = num;
						}
			}
					for(var item of this.childMsg){
						if(item.index == msg.index){
							var newIndex = bestIndex + 1;
							item.props.msg.styles['z-index'] = String(newIndex);
						}
					}
					console.log(this.childMsg)
					var data = {
						status:false
					}
					this.$store.commit('changeEditorMenu',data)
		},
		pageLengthInput(e){
			var val = e.target.value;
			if(val <= 667){
				e.target.value = 667;
				this.editorDefaultMsg.pageLength = 667;
				return
			}else{
				this.editorDefaultMsg.pageLength = Number(val);
			}
		},
		stretchPage(){//加长页面
			var elm = document.getElementById('editorScrollBox');
			var timer = setInterval(()=>{
					this.editorDefaultMsg.pageLength += 1;
					elm.scrollTop = this.editorDefaultMsg.pageLength - 667
			},100)
			document.getElementById('stretchPage').onmouseup=function(){
				clearInterval(timer);
			}
		},
		shorteningPage(){//缩短页面
			var elm = document.getElementById('editorScrollBox');
			if(this.editorDefaultMsg.pageLength <= 667) return;
			var timer = setInterval(()=>{
					this.editorDefaultMsg.pageLength -= 1;
					elm.scrollTop = this.editorDefaultMsg.pageLength - 667;
					if(this.editorDefaultMsg.pageLength <= 667){
						clearInterval(timer);
					}
			},100)
			document.getElementById('shorteningPage').onmouseup=function(){
				clearInterval(timer);
			}
		},
//	表单弹框
		childByValue(childValue) {
        // childValue就是子组件传过来的值
        this.dialogFormVisible = childValue
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
/*	菜单栏css*/
	#editor-menu{
		position: absolute;
		top: 0;
		left: 0;
		background: white;
		width: 150px;
		height: 202px;
		text-align: center;
		border: 1px solid gainsboro;
		border-radius:3px ;
		z-index: 2000;
	}
	.editor-menu-botton{
		height: 40px;
		line-height: 40px;
		border-bottom: 1px solid gainsboro;
		cursor: pointer;
	}
	.editor-menu-botton:hover{
		background: #2589FF;
		color: white;
	}
/*	编辑器操作按钮*/
  .editor-handle-btn{
  	display: flex;
  }
  .editor-handle-btn:hover{
  	color: #2196F3;
  }
 	.editor-handle-btn-text{
 		padding-top: 2px;
		font-size: 12px;
		color: #B5B1B1;
		padding-right:5px;
		line-height: 14px; 
	}
</style>

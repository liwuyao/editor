<template>
	<div class="editor-input-component">
		<div class="editor-from-input-header">
			<i class="iconfont icon-biaoqian" style="font-size: 20px;float: left;"></i>
			<div style="display: inline-block;height: 100%;height: 23px;float: left;">
				颜色
			</div>
		</div>
		<div class="editor-color-box editor-from-input-content">
			<el-radio-group v-model="activeCheck" size="small">
		      <el-radio-button label="文字"></el-radio-button>
		      <el-radio-button label="背景"></el-radio-button>
		      <el-radio-button label="边框"></el-radio-button>
		    </el-radio-group>
		    <div class="editor-color-content" v-if="activeCheck == '文字'">
				<div style="font-size: 12px;">文字颜色</div>
				<div class="checke-box">
					<colorPicker v-model="textColor" v-on:change="setTxtColor()"/>
				</div>
			</div>
		    <div class="editor-color-content" v-if="activeCheck == '背景'">
		    	<div style="font-size: 12px;">背景颜色</div>
				<div class="checke-box">
					<colorPicker v-model="backgroundColor" v-on:change="setBacColor()"/>
				</div>
				<div style="font-size: 12px;margin-top: 5px;">透明度</div>
				<el-slider v-model="a_background" style="width: 200px;margin-left: 8px;" v-on:change="setBacColor()"></el-slider>
			</div>
			<div class="editor-color-content" v-if="activeCheck == '边框'">
		    	<div style="font-size: 12px;">边框颜色</div>
				<div class="checke-box">
					<colorPicker v-model="borderColor" v-on:change="setBorderColor()" />
				</div>
				<div style="font-size: 12px;margin-top: 5px;">透明度</div>
				<el-slider v-model="a_border" style="width: 200px;margin-left: 8px;" v-on:change="setBorderColor()" ></el-slider>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props:['msg'],
		watch:{
			'msg.index':function(){
				this.textColor = this.msg.props.msg.styles.color;
				this.backgroundColor = this.getColor(this.msg.props.msg.styles.background);
				this.borderColor = this.getColor(this.msg.props.msg.styles['border-color']);
				this.getOpacity('background',this.backgroundColor);
				this.getOpacity('border',this.borderColor);
				this.activeCheck = '文字';
			}
		},
		data(){
			return{
				value:'',
				textColor: '',
				backgroundColor:'409EFF',
        		borderColor: '',
        		activeCheck: '文字',
        		a_background: 0,
        		a_border:0
			}
		},
		created: function(){
			this.textColor = this.msg.props.msg.styles.color;
			this.backgroundColor = this.getColor(this.msg.props.msg.styles.background);
			this.borderColor = this.getColor(this.msg.props.msg.styles['border-color']);
			this.getOpacity('background',this.backgroundColor);
			this.getOpacity('border',this.borderColor);
		},
		methods:{
			setTxtColor(){
				var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							color:this.textColor
						}
					}
				}
				this.$store.commit('setEditorFrom',data)
			},
			setBacColor(){
				var color =this.backgroundColor.colorRgb() +',' + this.a_background/100 + ')';
				var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							background:color
						}
					}
				}
				this.$store.commit('setEditorFrom',data)
			},
			setBorderColor(){
				var color =this.borderColor.colorRgb() +',' + this.a_border/100 + ')'
				var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							'border-color':color
						}
					}
				}
				this.$store.commit('setEditorFrom',data)
			},
			handleClick(tab, event) {
		        console.log(tab, event);
		    },
		    getOpacity(type,old){
		    	var len = old.length;
		    	var val = Number(old.charAt(len-2))*100;
		    	if(type == 'background'){
		    		this.a_background = val
		    	}else if(type == 'border'){
		    		this.a_border = val
		    	}
		    },
		    getColor(data){
		    	var index = 0;
		    	for(var i = 0;i<data.length;i++){
		    		if(data.charAt(i) == ','){
		    			index = i;
		    		}
		    	} 
		    	var _string = "rgb(" + data.slice(5,index) + ")";
		    	var res = _string.colorHex()
		    	return res;
		    }
		}
	}
</script>

<style scoped>
	.editor-color-box{
		width: 300px;
/*		justify-content: space-around;*/
	}
	.editor-color-box .editor-color-content{
		flex: 1;
/*		line-height: 40px;*/
/*		display: flex;*/
		margin: 20px 0;
	}
	.checke-box{
		display: inline-block;
/*		border: 1px solid #2589FF;*/
		height: 17px;
		width: 214px;
		margin-top: 10px;
	}
</style>
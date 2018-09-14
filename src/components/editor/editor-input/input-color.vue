<template>
	<div class="editor-input-component">
		<div class="editor-from-input-header">
			<i class="iconfont icon-biaoqian" style="font-size: 20px;float: left;"></i>
			<div style="display: inline-block;height: 100%;height: 23px;float: left;">
				颜色
			</div>
		</div>
		<div class="editor-color-box editor-from-input-content">
			<div class="editor-color-content">
				<span>字体</span>
				<el-color-picker v-model="textColor" v-on:change="setTxtColor()"></el-color-picker>
			</div>
			<div class="editor-color-content">
				<span>背景</span>
				<el-color-picker v-model="backgroundColor" show-alpha v-on:change="setBacColor()"></el-color-picker>
			</div>
			<div class="editor-color-content">
				<span>边框</span>
				<el-color-picker v-model="borderColor" @change="setBorderColor()" show-alpha></el-color-picker>
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
				this.backgroundColor = this.msg.props.msg.styles.background;
				this.borderColor = this.msg.props.msg.styles['border-color'];
			}
		},
		data(){
			return{
				value:'',
				textColor: '',
				backgroundColor:'409EFF',
        		borderColor: '',
			}
		},
		created: function(){
			this.textColor = this.msg.props.msg.styles.color;
			this.backgroundColor = this.msg.props.msg.styles.background;
			this.borderColor = this.msg.props.msg.styles['border-color'];
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
				var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							background:this.backgroundColor
						}
					}
				}
				this.$store.commit('setEditorFrom',data)
			},
			setBorderColor(){
				var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							'border-color':this.borderColor
						}
					}
				}
				this.$store.commit('setEditorFrom',data)
			}
		}
	}
</script>

<style scoped>
	.editor-color-box{
		width: 300px;
		display: flex;
/*		justify-content: space-around;*/
	}
	.editor-color-box .editor-color-content{
		flex: 1;
		line-height: 40px;
		display: flex;
	}
</style>
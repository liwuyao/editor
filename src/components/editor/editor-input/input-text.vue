<template>
	<div class="editor-input-component">
		<div class="editor-from-input-header">
			<i class="iconfont icon-biaoqian" style="font-size: 20px;float: left;"></i>
			<div style="display: inline-block;height: 100%;height: 23px;float: left;">
				内容
			</div>
		</div>
		<div class="editor-input-text-box editor-from-input-content">
		   	<el-input
			  type="textarea"
			  :rows="2"
			  placeholder="请输入内容"
			  @change="set()"
			  v-model="value">
			</el-input>
		</div>
	</div>
</template>

<script>
	export default {
		props:['msg'],
		watch:{
			'msg.index':function(){
				this.value = this.msg.props.msg.content.mainText;
			}
		},
		data(){
			return{
				value:''
			}
		},
		created: function(){
			this.value = this.msg.props.msg.content.mainText
		},
		methods:{
			set(){
				var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						content:{
							mainText:this.value
						}
					}
				}
				this.$store.commit('setEditorFrom',data)
			}
		}
	}
</script>

<style scoped>
	.editor-input-text-box{
		display: flex;
		line-height: 40px;
		margin-bottom:5px ;
	}
	.editor-input-text-box input{
		height: 30px !important;
	}
</style>
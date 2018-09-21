<<template>
	<div class="editor-input-component">
		<div class="editor-from-input-header">
			<i class="iconfont icon-biaoqian" style="font-size: 20px;float: left;"></i>
			<div style="display: inline-block;height: 100%;height: 23px;float: left;">
				大小
			</div>
		</div>
		<div class="editor-input-size-box editor-from-input-content">
			<div>
				<span style="margin-right: 10px;">宽</span><el-input-number v-model="width" @change="changeWidth" size="mini" style="width: 100px;" :min="0" :max="375"></el-input-number>
			</div>
			<div>
				<span style="margin-right: 10px;">高</span><el-input-number v-model="height" @change="changeHeight" size="mini" style="width: 100px;" :min="0" :max="375"></el-input-number>
			</div>
	    </div>
	</div>
</template>

<script>
	export default {
		props:['msg'],
		watch:{
			'msg.index':function(){
				this.width = this.getMyWeb.transStyle(this.msg.props.msg.styles.width)
				this.height = this.getMyWeb.transStyle(this.msg.props.msg.styles.height)
			},
			'msg.props.msg.styles.width':function(){
				this.width = this.getMyWeb.transStyle(this.msg.props.msg.styles.width)
			},
			'msg.props.msg.styles.height':function(){
				this.height = this.getMyWeb.transStyle(this.msg.props.msg.styles.height)
			}
		},
		data(){
			return{
				height:'',
				width:''
			}
		},
		created: function(){
			this.width = this.getMyWeb.transStyle(this.msg.props.msg.styles.width)
			this.height = this.getMyWeb.transStyle(this.msg.props.msg.styles.height)
		},
		methods:{
//			set(){
//				var data = {
//					count: +new Date,
//					index: this.msg.index,
//					msg:{
//						content:{
//							name:this.value
//						}
//					}
//				}
//				this.$store.commit('setEditorFrom',data)
//			},
			changeWidth(){
				var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							width:this.width + 'px'
						}
					}
				}
				this.$store.commit('setEditorFrom',data)
			},
			changeHeight(){
				var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							height:this.height + 'px'
						}
					}
				}
				this.$store.commit('setEditorFrom',data)
			}
		}
	}
</script>

<style scoped>
	.editor-input-size-box{
		display: flex;
		line-height: 40px;
		justify-content: space-between;
	}
	/*.editor-input-size-box input{
		height: 30px !important;
	}*/
</style>
<<template>
	<div class="editor-input-component">
		<!--<div class="editor-input-name-box">
			<span style="margin-right: 10px;font-weight: bolder;">名称</span>
		    <el-input v-on:blur="set()" v-model="value" style="width: 150px;" size="small"></el-input>
		</div>-->
		<div class="editor-from-input-header">
			<i class="iconfont icon-biaoqian" style="font-size: 20px;float: left;"></i>
			<div style="display: inline-block;height: 100%;height: 23px;float: left;">
				名称
			</div>
		</div>
		<div class="editor-input-name-box editor-from-input-content">
				<el-input v-on:blur="set()" v-model="value" style="width: 100%;" size="small"></el-input>
	    </div>
	</div>
</template>

<script>
	export default {
		props:['msg'],
		watch:{
			'msg.index':function(){
				this.value = this.msg.props.msg.content.name;
			}
		},
		data(){
			return{
				value:''
			}
		},
		created: function(){
			this.value = this.msg.props.msg.content.name
		},
		methods:{
			set(){
				var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						content:{
							name:this.value
						}
					}
				}
				this.$store.commit('setEditorFrom',data)
			}
		}
	}
</script>

<style scoped>
	.editor-input-name-box{
		display: flex;
		line-height: 40px;
	}
	.editor-input-name-box input{
		height: 30px !important;
	}
</style>
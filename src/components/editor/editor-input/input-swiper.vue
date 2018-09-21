<<template>
	<div class="editor-input-component">
		<!--<div class="editor-input-name-box">
			<span style="margin-right: 10px;font-weight: bolder;">名称</span>
		    <el-input v-on:blur="set()" v-model="value" style="width: 150px;" size="small"></el-input>
		</div>-->
		<div class="editor-from-input-header">
			<i class="iconfont icon-biaoqian" style="font-size: 20px;float: left;"></i>
			<div style="display: inline-block;height: 100%;height: 23px;float: left;">
				轮播
			</div>
		</div>
		<div class="editor-from-input-content">
			<div style="display: flex;flex-wrap: wrap;padding: 0 6px;">
				<div class="img-box" v-for="(item,index) in imgs" :key="index">
					 <v-img
		              :src="item.src"
		              height="125"
		              contain
		              class="grey darken-4"
		            ></v-img>
				</div>
			</div>
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
				value:'',
				imgs:[],
			}
		},
		created: function(){
//			this.value = this.msg.props.msg.content.name
			this.imgs = this.msg.props.msg.imgUrls
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
	.img-box{
		width: 130px;
		height: 130px;
		margin: 2px;
		overflow: hidden;
/*		background: black;*/
	}
	.img-box img{
		margin: auto 0;
		width: 100%;
	}
</style>
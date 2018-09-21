<<template>
	<div class="editor-input-component">
		<div class="editor-from-input-header">
			<i class="iconfont icon-biaoqian" style="font-size: 20px;float: left;"></i>
			<div style="display: inline-block;height: 100%;height: 23px;float: left;">
				图片
			</div>
		</div>
		<div class="editor-from-input-content" style="padding: 10px;">
			<div class="up-img" @click="upImg()">
				<img :src="src" v-if="isImg" style="width: 100%;"/>
				<div class="icon" v-if="!isImg">
					<i class="el-icon-plus"></i>
				</div>
			</div>
	    </div>
	    <gallery :isShow="isShow" v-on:imgSrc="getImg"></gallery>
	</div>
</template>

<script>
import gallery from './gallery';

	export default {
		props:['msg'],
		components:{
			gallery
		},
		computed:{
			imgSrc:function(){
				
			}
		},
		watch:{
			'msg.index':function(){
				this.src = this.msg.props.msg.src;
			}
		},
		data(){
			return{
				value:'',
				isImg:false,
				src:'',
				isShow:''
			}
		},
		created: function(){
			if(this.msg.props.msg.src){
				this.isImg = true;
			}
			this.src = this.msg.props.msg.src
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
			},
			upImg(){
//				var _input = document.createElement('input');
//					_input.type = 'file';
//					_input.accept = 'image/jpeg,image/png';
//					var _this = this;
//					_input.onchange = function(e){
////						console.log(window.URL.createObjectURL(e.target.files[0])); 
//						_this.isImg = true;
//						_this.src = window.URL.createObjectURL(e.target.files[0])
//						var data = {
//							count: +new Date,
//							index: _this.msg.index,
//							msg:{
//								src: _this.src
//							}
//						}
//						_this.$store.commit('setEditorFrom',data)
//					}
//					_input.click();
					this.isShow = +new Date()
			},
			getImg(data){
				console.log(data)
				this.src = data.src
				var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						src: this.src
					}
				}
				this.$store.commit('setEditorFrom',data)
			}
		}
	}
</script>

<style scoped>
	/*.editor-input-name-box{
		display: flex;
		line-height: 40px;
	}
	.editor-input-name-box input{
		height: 30px !important;
	}*/
	.up-img{
		border: 1px solid gainsboro;
		font-size: 20px;
		cursor: pointer;
	}
	.icon{
		text-align: center;
		width: 100%;
		height: 100px;
		line-height: 100px;
	}
	/*.up-img i{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}*/
	.up-img:hover{
		font-size: 25px;
	}
</style>
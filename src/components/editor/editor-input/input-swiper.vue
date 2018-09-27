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
				<div class="img-box" v-for="(item,index) in imgs" :key="index" @click="openGallery(index)">
					 <v-img
		              :src="item.src"
		              height="125"
		              contain
		              class="grey darken-4"
		            style="height: 100%;"></v-img>
		            <div class="img-cover" v-if="index != 0">
		            	<div style="width: 100%;height: 100%;position: relative;color: white;">
		            		<i class="iconfont icon-shanchu img-delete" @click.stop="deleteImg(item.src)"></i>
		            	</div>
		            </div>
				</div>
				<div class="img-box">
					<div style="width: 100%;height: 100%;position: relative;border: 1px solid gainsboro;" class="add-img" @click.stop="addImg()">
						<i class="el-icon-plus add-icon"></i>
					</div>
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
		watch:{
			'msg.index':function(){
				this.imgs = this.msg.props.msg.imgUrls
			},
			'msg.props.msg.imgUrls':function(){
				this.imgs = this.msg.props.msg.imgUrls
			}
		},
		data(){
			return{
				value:'',
				imgs:[],
				isShow:'',
				imgIndex:'',
				type:''
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
			},
			openGallery(index){
				this.isShow = +new Date();
				this.imgIndex = index;
				this.type = 'modify';
			},
			getImg(img){
				var images = [];
					for(var item of this.imgs){
						var obj = {
							src:item.src
						}
						images.push(obj)
					}
					if(this.type == 'modify'){
						images[this.imgIndex].src = img.src
					}else if(this.type == 'get'){
						var newImg = {
							src: img.src
						}
						images.push(newImg)
					}
				var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						imgUrls:images
					}
				}
				this.$store.commit('setEditorFrom',data)
			},
			deleteImg(img){
				var images = [];
					for(var item of this.imgs){
						var obj = {
							src:item.src
						}
						images.push(obj)
					}
					var current = {
						src:img
					}
					var index = images.indexOf(current);
						images.splice(index,1);
						var data = {
							count: +new Date,
							index: this.msg.index,
							msg:{
								imgUrls:images
							}
						}
					this.$store.commit('setEditorFrom',data)
			},
			addImg(){
				this.isShow = +new Date();
				this.type = 'get';
//				var images = [];
//					for(var item of this.imgs){
//						var obj = {
//							src:item.src
//						}
//						images.push(obj)
//					}
//					var current = {
//						src:img
//					}
//					var index = images.indexOf(current);
//						images.splice(index,1);
//						var data = {
//							count: +new Date,
//							index: this.msg.index,
//							msg:{
//								imgUrls:images
//							}
//						}
//					this.$store.commit('setEditorFrom',data)
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
		position: relative;
		cursor: pointer;
	}
	.img-box img{
		margin: auto 0;
		width: 100%;
	}
	.img-box:hover .img-cover{
		display: block;
	}
	.img-cover{
		width: 100%;
		height: 100%;
		position: absolute;
		left: 0;
		top: 0;
		display: none;
		background: rgba(0,0,0,0.5);
	}
	.img-cover .img-delete{
		position: absolute;
		right: 5px;
		top: 5px;
	}
	.img-delete:hover{
		transform: scale(1.2,1.2);
	}
	.add-img .add-icon{
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%);
	}
	.add-img:hover{
		border: 1px solid #2589FF !important;
	}
	.add-img:hover .add-icon{
		transform: translate(-50%,-50%) scale(1.2,1.2);
	}
</style>
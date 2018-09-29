<<template>
	<div class="editor-input-component">
		<div class="editor-from-input-header">
			<i class="iconfont icon-biaoqian" style="font-size: 20px;float: left;"></i>
			<div style="display: inline-block;height: 100%;height: 23px;float: left;">
				字体
			</div>
		</div>
		<div class="editor-from-input-content">
		    <div class="editor-input-text-box">
		    	<span style="margin-right: 5px;">大小</span>
		    	<el-input-number v-model="size" @change="szie" size="mini" style="width: 90px;" :min="12" :max="30"></el-input-number>
			    <i class="iconfont icon-bold set-text-size" :class="{fontStyle: isBolder}" @click="bolder()"></i>
			    <i class="iconfont icon-qingxie set-text-size" :class="{fontStyle: isItalic}" @click="italic()"></i>
		    </div>
			<div class="editor-input-text-box" style="margin-top: 10px;" v-if="msg.name == 'srtextarea'">
				<span style="margin-right: 5px;">对齐</span>
				<el-radio-group v-model="textAline" size="mini" @change="changeAline">
			      <el-radio-button label="left">
			      	居左
			      </el-radio-button>
			      <el-radio-button label="center">
			      	居中
			      </el-radio-button>
			      <el-radio-button label="right">
			      	居右
			      </el-radio-button>
				</el-radio-group>
			</div>
			<div class="editor-input-text-box" style="margin-top: 10px;" v-if="msg.name == 'srtextarea'">
				<span style="margin-right: 5px;" @click="test()">字体</span>
				<el-select v-model="fontFamily" placeholder="请选择" size="mini" @change="changeFamily">
				    <el-option
				      v-for="item in options"
				      :key="item.value"
				      :label="item.label"
				      :value="item.value">
				    </el-option>
				</el-select>
			</div>
			<div class="editor-input-text-box" style="margin-top: 10px;" v-if="msg.type !== 'btn'">
		    	<span style="margin-right: 5px;">行高</span>
		    	<el-input-number v-model="lineH" @change="lineHeight" size="mini" style="width: 90px;" :min="12"></el-input-number>
		    </div>
		</div>
	</div>
</template>

<script>
	export default {
		props:['msg'],
		watch:{
			'msg.index':function(){				
				this.size = this.getMyWeb.transStyle(this.msg.props.msg.styles['font-size']);
				if(this.msg.type !== 'btn'){
					this.lineH = this.getMyWeb.transStyle(this.msg.props.msg.styles['line-height']);
				}
				this.textAline = this.msg.props.msg.styles['text-align'];
				this.fontFamily = this.msg.props.msg.styles['font-family'];
				if(this.msg.props.msg.styles['font-weight'] == 'bolder'){
					this.isBolder = true
				}else{
					this.isBolder = false
				}
				if(this.msg.props.msg.styles['font-style'] == 'italic'){
					this.isItalic = true
				}else{
					this.isItalic = false
				}
			}
		},
		data(){
			return{
				size:14,
				lineH:14,
				isBolder:false,
				isItalic:false,
				fontFamily:'',
				textAline:'',
				options: [
				 		{
				         value: '宋体',
				          label: '宋体'
				        }, 
				        {
				          value: '黑体',
				          label: '黑体'
				        },
				        {
				         value: '微软雅黑',
				          label: '微软雅黑'
				        }, 
				        {
				          value: '微软正黑体',
				          label: '微软正黑体'
				        },
				        {
				         value: '楷体',
				          label: '楷体'
				        }, 
				        {
				          value: '新宋体',
				          label: '新宋体'
				        },
				        {
				         value: '仿宋',
				          label: '楷体'
				        }, 
				        {
				          value: '幼圆',
				          label: '幼圆'
				        },
				        {
				          value: '隶书',
				          label: '隶书'
				        },
				         {
				          value: '华文彩云',
				          label: '华文彩云'
				        },
			        ]
			}
		},
		created: function(){
			this.size = this.getMyWeb.transStyle(this.msg.props.msg.styles['font-size']);
			if(this.msg.type !== 'btn'){
				this.lineH = this.getMyWeb.transStyle(this.msg.props.msg.styles['line-height']);
			}
			this.textAline = this.msg.props.msg.styles['text-align'];
			this.fontFamily = this.msg.props.msg.styles['font-family'];
			if(this.msg.props.msg.styles['font-weight'] == 'bolder'){
					this.isBolder = true
				}else{
					this.isBolder = false
				}
			if(this.msg.props.msg.styles['font-style'] == 'italic'){
					this.isItalic = true
				}else{
					this.isItalic = false
				}
		},
		methods:{
			test(){
				console.log(this.getMyWeb.getSystemFont('宋体'))
			},
		   szie() {
		        var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							'font-size':this.size + 'px'
						}
					}
				}
		        this.$store.commit('setEditorFrom',data)
		   },
//		   加粗
		   bolder(){
		   	 var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							'font-weight':''
						}
					}
				}
			   	this.isBolder = !this.isBolder;
			   	if(this.isBolder){
			   		data.msg.styles['font-weight'] = 'bolder'
			   	}else{
			   		data.msg.styles['font-weight'] = '100'
			   	}
			   	this.$store.commit('setEditorFrom',data)
		   },
//		   倾斜
		   italic(){
		   	var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							'font-weight':''
						}
					}
				}
		   	this.isItalic = !this.isItalic;
		   	if(this.isItalic){
			   		data.msg.styles['font-style'] = 'italic'
			   	}else{
			   		data.msg.styles['font-style'] = 'normal'
			   	}
			   	this.$store.commit('setEditorFrom',data)
		   },
//		   对齐
		  changeAline(){
		  		var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							'text-align':this.textAline
						}
					}
				}
		        this.$store.commit('setEditorFrom',data)
		  },
//		  换字体
		  changeFamily(){
		  	var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							'font-family':this.fontFamily
						}
					}
				}
		        this.$store.commit('setEditorFrom',data)
		  },
		  lineHeight(){
		  	var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							'line-height':this.lineH + 'px'
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
		line-height: 28px;
	}
	.set-text-size{
		font-size: 20px !important;
		margin-left: 5px;
		color: gainsboro;
	}
	.fontStyle{
		color: black;
	}
</style>
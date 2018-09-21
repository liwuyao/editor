<template>
	<div class="gallery-dailog">
		<v-app>
			<v-dialog
		      v-model="dialogVisible"
		      width="800"
		    >
		      <v-card>
		        <v-card-title
		          class="headline  lighten-2 imghead"
		          primary-title
		        >
		         	<div style="width: 100%;display: flex;justify-content: space-between;">
		         		 <span>相册</span>  <i class="el-icon-close" @click="dialogVisible = false" style="cursor: pointer;"></i>
		         	</div>
		        </v-card-title>
				<div style="height: 400px;">
					<el-tabs v-model="activeName2" type="card" @tab-click="handleClick" style="height: 100%;">
					    <el-tab-pane label="私人相册" name="first">
					    	<div class="imgs-box">
					    		<div  class="imgs-content">
						    		<div class="imgs" v-for="item in imgs" @click="chooseImg(item)">
						    			<!--<img src="http://pic22.nipic.com/20120725/10144263_134513457178_2.jpg" style="width: 100%;"/>-->
						    			<div class="activeImg" v-if="item == currentImg"></div>
						    			<v-card>
								            <v-img
								              :src="item.src"
								              height="100"
								              contain
								              class="grey darken-4"
								            ></v-img>
								            <div class="imgs-text">{{item.info}}</div>
								        </v-card>
						    		</div>
						    	</div>
					    	</div>
					    </el-tab-pane>
					    <el-tab-pane label="动漫卡通" name="second">动漫卡通</el-tab-pane>
					    <el-tab-pane label="特色风景" name="third">特色风景</el-tab-pane>
					    <el-tab-pane label="唯美人物" name="fourth">唯美人物</el-tab-pane>
					</el-tabs>
				</div>
		        <v-divider></v-divider>
		
		        <v-card-actions>
		          <v-spacer></v-spacer>
		          <v-btn
		            color="primary"
		            flat
		            @click="confirm()"
		          >
		           	确定
		          </v-btn>
		        </v-card-actions>
		      </v-card>
		    </v-dialog>
		</v-app>
	</div>
</template>

<script>
//	import vueWaterfallEasy from 'vue-waterfall-easy/src/vue-waterfall-easy/vue-waterfall-easy.vue'
	export default{
		props:['isShow'],
		watch:{
			isShow:function(){
				this.dialogVisible = true;
			}
		},
		data() {
	      return {
	        dialogVisible: false,
	        dialog: false,
	        radio5:'人物',
	        activeName2:'first',
	        currentImg:'',
	        imgs:[
		      	{
		      		src:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'http://img1.3lian.com/img013/v4/7/d/4.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'http://img3.3lian.com/2013/c4/95/d/18.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'http://img1.3lian.com/img013/v4/7/d/4.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'http://img3.3lian.com/2013/c4/95/d/18.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'http://img1.3lian.com/img013/v4/7/d/4.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'http://img3.3lian.com/2013/c4/95/d/18.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'http://img1.3lian.com/img013/v4/7/d/4.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'http://img3.3lian.com/2013/c4/95/d/18.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'http://img3.3lian.com/2013/c4/95/d/18.jpg',
		      		info:'小测试'
		      	},
		      	{
		      		src:'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg',
		      		info:'小测试'
		      	},
		      ]
	      };
		},
		components: {
		 },
	    methods: {
	      handleClose(done) {
	        done();
//	        this.$confirm('确认关闭？')
//	          .then(_ => {
//	            done();
//	          })
//	          .catch(_ => {});
	     },
	      handleClick(tab, event) {
//	        console.log(tab, event);
	      },
		  chooseImg(img){
		  	console.log(img)
		  	this.currentImg = img;
		  	this.$store.commit('setGalleryImg',img.src)
		  },
		  confirm(){
		  	this.$emit('imgSrc',this.currentImg)
		  	this.dialogVisible = false 
		  }
	    }
	}
</script>

<style>
	.gallery-box{
		width: 100%;
		border: 1px solid gainsboro;
	}
	.imghead{
		padding: 10px 16px !important;
	}
	.imgs{
		width: 100px;
		margin: 6px;
		height: 139px;
		position: relative;
		float: left;
		cursor: pointer;
	}
	.imgs-text{
		font-size: 14px;
		text-align: center;
		padding: 8px 0;
	}
	.activeImg{
		position: absolute;
		width: 102px;
		height: 140px;
		left: -1px;
		top: -1px;
		border: 1px solid #2589FF;
	}
	.imgs-content{
		width: 100%;
		padding: 0 5px;
		overflow: hidden;
	}
	.imgs-box{
		width: 100%;
		height: 344px;
		overflow: auto;
	}
	/*	滚动条整体部分*/
	.imgs-box::-webkit-scrollbar    
	{  
	  width: 5px;  
	  height:10px;    	
	  background-color:#b5b1b1;
	
	}  
/*	scroll轨道背景*/
	.imgs-box::-webkit-scrollbar-track       
	{  
	  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
	  border-radius: 10px; 
	  background-color:#b5b1b1;       
	}
/*	滚动条中能上下移动的小块*/
	.imgs-box::-webkit-scrollbar-thumb 
	{  
	  border-radius: 10px;  
	  -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
	  background-color:black;
	} 
</style>
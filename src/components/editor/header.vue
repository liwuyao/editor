<template>
	<div>
		<header class="header-container">
			<div style="display: inline-block;height: 100%;line-height: 100%;">编辑器</div>
			<div style="display: inline-block;">
					<v-btn color="info" @click="dialogVisible = true">创建</v-btn>
					<v-btn color="info" @click="preview()">预览</v-btn>
			</div>
	<!--			<button @click="preview()">预览</button>-->
		</header>
		<el-dialog
		  title="创建站点"
		  :visible.sync="dialogVisible"
		  width="30%"
		  :before-close="handleClose">
		 	<el-form label-position="left" label-width="80px">
			  <el-form-item label="商户ID">
			    <el-input v-model="creatStationMsg.merchantId"></el-input>
			  </el-form-item>
			  <el-form-item label="站点名称">
			    <el-input v-model="creatStationMsg.stationName"></el-input>
			  </el-form-item>
			</el-form>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="dialogVisible = false">取 消</el-button>
		    <el-button type="primary" @click="creatElment()">确 定</el-button>
		  </span>
		</el-dialog>
	</div>

</template>
<script>
	export default{
		data(){
			return{
				dialogVisible:false,
				creatStationMsg:{
					merchantId:'123',
					stationName:''
				}
			}
		},
		methods:{
				//		预览
			preview(){
//				var id = this.getMyWeb.stationMsg().id;
//				console.log(id)
				var _url = '/station/view/h5/' + this.getMyWeb.stationId;
				var win = window.open('./static/preview.html');
				this.axios.get(_url)
				.then((res)=>{
//				  window.open('http://192.168.201.167'+ res.data.data);
				  win.document.getElementById('jump').dataset.url = 'http://192.168.201.167:8080'+ res.data.data
				}).catch((res)=>{
				  console.log(res)
				})
			},
//			创建弹框关闭前
			handleClose(done){
				done();
			},
			//	创建站点
			creatElment(){
				var isStop = false;
				for(var i in this.creatStationMsg){
					if(!this.creatStationMsg[i]){
						isStop = true;
					}
				}
				if(isStop){
					this.$message({
	          message: '请填写完',
	          type: 'warning'
	        });
	        return
				}
				var data = this.qs.stringify(this.creatStationMsg);
				this.axios.post('/station/', data,{
					 headers: {
	            'Content-Type': 'application/x-www-form-urlencoded'
	          }
				})
			  .then((res)=>{
			    if(res.status == 200){
			    	this.$message({
		          message: '站点创建成功',
		          type: 'success'
		       });
		        window.localStorage.setItem('EDITORSTATIONMSG',JSON.stringify(res.data.data));
		        this.getMyWeb.stationId = res.data.data;
		        this.dialogVisible = false
			    }
			  })
			  .catch(function (error) {
			    console.log(error);
			  });
			},
		}
	}
</script>

<style scoped>
	.header-container{
		padding: 15px 10px;
		border-bottom: 1px solid gainsboro;
		display: flex;
		justify-content: space-between;
	}
	.info{
		background: #2196f3 !important;
	}
</style>
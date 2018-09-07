

<script>
	import vbutton from '../button/button'
	var dragElm = {
		template:`
			<div draggable="true" style="display:inline-block"></div>
		`
	}
	export default{
		props:["demoMsg"],
		components:{
			vbutton,dragElm
		},
		render: function(createElement) {//为 createElement 函数，接受三个参数
						var _this
			            return createElement('div',{
			            	style:{
									width: '100%',
									height: '100%',
									display: 'flex'
								},
							},
							this.demoMsg.map(function(component) {
			                    return createElement('div',
			                    	{
				                    	style:{
				                    		margin: "10px"
				                    	},
				                    	on:{
				                    	  mousedown:function(event){
				                    	  	event.target.draggable = 'true'
				                    	  }
				                    	}
			                    	},
			                    	[createElement(component.name)]
			                    )
			               })
			            )
			 },
		methods:{
			drag(event){
				console.log(event)
			}
		}
	}
</script>

<style>
</style>
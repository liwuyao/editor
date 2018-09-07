
<script>
	import vbutton from '../button/button'
	export default {
	  props: ['msg'],
	  components:{
	  	vbutton
	  },
	  render: function(createElement) { // h 为 createElement 函数，接受三个参数
	  		var _this = this;
            return createElement('div',{
            	style: {
				    display:'inline-block'
				  },
				on:{
					click:function(event){
					},
					mousedown:function(event){
						var data = {
							pageX:event.pageX,
							pageY:event.pageY
						}
						_this.$store.commit('editorFromMsg',_this.msg);
				       	 event.target.draggable = 'true';
						 _this.$store.commit('changeDragType','dragElm')
						_this.$store.commit('setStartPageX',data)
					}
				  },
				},
				[ 
				createElement(this.msg.name,{
                    	props:this.msg.props.msg
                    })
				]
            )
       },
       methods:{
       	modifyMsg(){;
       	}
       }
	}
</script>

<style>
</style>
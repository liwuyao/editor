
<script>
//	import button1 from './button'
	import demo from './demo';
	export default {
	  props: ['styles','inputs'],
	  data(){
	  	return{
	  		data:{
	  			input:[]
	  		},
	  	}
	  },
	  components:{
	  	demo
	  },
	  watch:{
	  	'$store.state.editorFrom.msg':function(){
//	  		this.data = this.$store.state.editorFrom.msg
////	  		this.data = this.$store.state.editorFrom.msg;
	  	}
	  },
	  render: function(createElement) {// h 为 createElement 函数，接受三个参数
	  		var _this = this;
	  		console.log(this.inputs)
            return createElement('div',{
            	style: _this.styles,
				},
				_this.inputs.map(function(component) {
                    return createElement(component.name)
               })
            )
        }
	}
</script>

<style>
</style>
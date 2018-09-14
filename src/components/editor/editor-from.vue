
<script>
//	import button1 from './button'
	import inputcolor from './editor-input/input-color';
	import inputbackground from './editor-input/input-background';
	import inputname from './editor-input/input-name';
	import inputfont from './editor-input/input-font';
	import inputtext from './editor-input/input-text';
	import inputsize from './editor-input/input-size';
	export default {
	  props: ['childMsg'],
	  data(){
	  	return{
	  		data:{
	  			input:[]
	  		},
	  	}
	  },
	  components:{
	  	inputcolor,inputbackground,inputname,inputfont,inputtext,inputsize
	  },
	  watch:{
	  	'$store.state.editorFrom.msg':function(){
	  		this.data = this.$store.state.editorFrom.msg
//	  		this.data = this.$store.state.editorFrom.msg;
	  	}
	  },
	  render: function(createElement) {// h 为 createElement 函数，接受三个参数
	  		var _this = this;
            return createElement('div',{
            	style: {
				    width: '100%',
				    height: '100%',
				  },
				},
				_this.data.input.map(function(component) {
                    return createElement(component.name,{
                    	props:{
                    		msg:_this.data
                    	}
                    })
               })
            )
        }
	}
</script>

<style>
</style>
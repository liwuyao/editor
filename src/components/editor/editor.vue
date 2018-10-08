
<script>
//	import button1 from './button'
	import click from './click'
	export default {
	  props: ['defaultMsg','childMsg'],
	  components:{
	  	click
	  },
	  render: function(createElement) { // h 为 createElement 函数，接受三个参数
            return createElement('div',{
            	style: {
				    width: '375px',
				    height: this.defaultMsg.pageLength + 'px',
				    background: 'white',
				    position:'relative',
				    overflow:'hidden'
				  },
				attrs: {
				    id: 'editorBox'
				  },
				},
				this.childMsg.map(function(component) {
                    return createElement('click',{
                    	props:{
                    		msg:component
                    	}
                    })
               })
            )
        }
	}
</script>

<style>
</style>
<template>
  <div>
    <div class="default-textarea" :style="style">
    	{{mainText}}
    </div>
  </div>
</template>

<script>
export default {
  props: ['content','styles'],
	computed:{
		style:function(){
			var style = ''
			var data = this.styles;
				for(var i in data){
					var item = i + ':' + data[i] + ';';
					style += item;
				}
			return style;
		},
		mainText:function(){
			return this.content.mainText
		}
	},
  created:function(){
  	console.log(this.styles)
  },
  data(){
  	return{
  	}
  }
}
</script>

<style>
.default-textarea{
	border: 1px solid gainsboro;
}
</style>

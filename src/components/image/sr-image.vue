<template>
  <div>
    <div :style="style">
     	<img :src="src"/>
    </div>
  </div>
</template>

<script>
export default {
  props: ['src','styles'],
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
		name:function(){
			return this.content.name
		}
	},
  data(){
  	return{
  	}
  }
}
</script>

<style scoped>
	img{
		width: 100%;
		height: 100%;
	}
</style>

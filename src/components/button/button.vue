<template>
  <div>
    <button :style="style" class="default-btn">{{name}}</button>
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

<style>
.card {
  padding: 10px;
}
.default-btn{
	border: 1px solid blue;
	display: inline-block;
	border-radius: 3px;
	background: whitesmoke;
}
</style>

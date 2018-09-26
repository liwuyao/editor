<template>
	<div :style="style">
		 <v-carousel>
		    <v-carousel-item
		      v-for="(item,i) in imgUrls"
		      :key="i"
		      :src="item.src"
		    ></v-carousel-item>
		 </v-carousel>
	</div>
</template>

<script>
	export default{
	props: ['styles','imgUrls'],
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
	},
//	created:function(){
//		this.items = this.imgUrls;
//		console.log(this.items)
//	},
	data () {
      return {
//      items: [
//        {
//          src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'
//        },
//        {
//          src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'
//        },
//        {
//          src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'
//        },
//        {
//          src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'
//        }
//      ]
      }
    }
  }
</script>

<style>
</style>
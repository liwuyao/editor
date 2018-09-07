<template>
	<div>
		<span>字体颜色：</span><input type="" name="" id="" v-on:blur="setColor()" v-model="value"/>
	</div>
</template>

<script>
	export default {
		props:['msg'],
		watch:{
			'msg.index':function(){
				this.value = this.msg.props.msg.styles.color;
			}
		},
		data(){
			return{
				value:''
			}
		},
		created: function(){
			this.value = this.msg.props.msg.styles.color
		},
		methods:{
			setColor(){
				var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							color:this.value
						}
					}
				}
				this.$store.commit('setEditorFrom',data)
			}
		}
	}
</script>

<style>
</style>
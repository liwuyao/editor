<template>
	<div>
		<span>背景颜色：</span><input type="" name="" id="" v-on:blur="setColor()" v-model="value"/>
	</div>
</template>

<script>
	export default {
		props:['msg'],
		watch:{
			'msg.index':function(){
				this.value = this.msg.props.msg.styles.background;
			}
		},
		data(){
			return{
				value:''
			}
		},
		created: function(){
			this.value = this.msg.props.msg.styles.background
		},
		methods:{
			setColor(){
				var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						styles:{
							background:this.value
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
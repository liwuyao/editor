<template>
	<div>
		小测试
	</div>
</template>

<script>
	export default{
		props:['inputs'],
		created:function(){
			console.log(this.inputs)
		}
	}
</script>

<style>
</style>
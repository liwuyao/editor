<<template>
	<div>
		<span>修改文字：</span><input type="" name="" id="" v-on:blur="set()" v-model="value"/>
	</div>
</template>

<script>
	export default {
		props:['msg'],
		watch:{
			'msg.index':function(){
				this.value = this.msg.props.msg.content.mainText;
			}
		},
		data(){
			return{
				value:''
			}
		},
		created: function(){
			this.value = this.msg.props.msg.content.mainText
		},
		methods:{
			set(){
				var data = {
					count: +new Date,
					index: this.msg.index,
					msg:{
						content:{
							mainText:this.value
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
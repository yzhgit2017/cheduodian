<template>
	<div>
		<header1 v-bind:title="title">
			<template v-slot:navRightBtn>
				<label style="font-size: 0.32rem;color: #FF620C;" @click="aa()">哈哈</label>
			</template>
		</header1>
	</div>
</template>

<script>
	import header1 from '@/components/header1'
	export default{
		data(){
			return {
				title: '测试'
			}
		},
		components:{header1},
		methods:{
			aa: function(){
				alert(1)
			}
		}
	}
</script>

<style scoped>
	
</style>
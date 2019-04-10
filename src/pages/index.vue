<template>
	<div class="container">
		<div class="qidong"></div>
	</div>
</template>

<script>
	export default{
		name: 'index',
		data(){
			return {

			}
		},
		mounted(){
			var _this = this
			setTimeout(function(){
				_this.$router.push("/login");
			},2000)
		}
	}
</script>

<style scoped>
    .container{
    	height: 100%;
    }
	.container .qidong{
		height: 100%;
		background: url('../assets/images/qidong.png') no-repeat;
		background-size: cover;
	}
</style>
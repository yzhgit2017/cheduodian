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
			const that = this;
			if(localStorage.getItem("myToken")){
				setTimeout(function(){
					that.$router.push("/homePage");
				},2000)
			}else{
				setTimeout(function(){
					that.$router.push("/login");
				},2000)
			}
		}
	}
</script>

<style scoped>
    .container{
    	height: 100%;
    	overflow-y: scroll;
    }
	.container .qidong{
		height: 100%;
		background: url('../assets/images/qidong.png') no-repeat;
		background-size: 100% 100%;
	}
</style>
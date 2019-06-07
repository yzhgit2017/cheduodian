<template>
	<div class="tishiContainer1">{{message}}</div>
</template>

<script>
	export default{
		props: {
			message: String,
		},
		data(){
			return {

			}
		},
	}
</script>

<style scoped>
	.tishiContainer1{
		background: rgba(0,0,0,0.8);
	    color: #fff;
	    padding: 0.15rem 0.3rem;
	    border-radius: 0.05rem;
	    font-size: 0.30rem;
	    position: fixed;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	}
</style>
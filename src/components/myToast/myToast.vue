<template>
	<div class="tishiContainer" ref="tishiContainer">
		<div class="mask"></div>
		<div class="container">
			<img src="../../assets/images/toastClose.png" class="toastClose" @click="close()">
			<p class="toastImg">
				<img src="../../assets/images/toastSuccess.png" v-if="typeName == 'success'">
				<img src="../../assets/images/toastWarning.png" v-else-if="typeName == 'warning'">
				<img src="../../assets/images/toastError.png" v-else="typeName == 'error'">
			</p>
			<p class="toastText">{{message}}</p>
		</div>
	</div>
</template>

<script>
	export default{
		props: {
			message: String,
		    typeName: {
		        type: String,
		        default: ''
		    },
		},
		data(){
			return {

			}
		},
		methods: {
			close: function(){
				this.$refs.tishiContainer.parentNode.removeChild(this.$refs.tishiContainer)
			}
		}
	}
</script>

<style scoped>
	.tishiContainer{
		position: fixed;
		z-index: 99999;
		background: rgba(0,0,0,0.5);
		color: #fff;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	.mask{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	.container{
	    width: 3.65rem;
	    height: 2.08rem;
	    position: absolute;
	    background: #fff;
	    border-radius: 0.1rem;
	    margin: auto;
	    top: 0;
	    left: 0;
	    bottom: 0;
	    right: 0;
	    display: -webkit-box;
	    display: flex;
	    -webkit-justify-content: center;
	    justify-content: center;
	    -webkit-align-items: center;
	    align-items: center;
	    flex-direction: column;
	    -webkit-flex-direction: column;
	}
	.toastClose {
	    position: absolute;
	    width: 0.16rem;
	    height: 0.16rem;
	    top: 0.16rem;
	    right: 0.16rem;
	}
	.toastImg{
		text-align: center;
	}
	.toastImg img{
		width: 0.76rem;
		height: 0.76rem;
	}
	.toastText {
	    font-size: 0.32rem;
	    line-height: 0.48rem;
	    color: #000;
	    text-align: center;
	    padding: 0 0.32rem;
	}
</style>
<template>
	<div class="personal_topbar">
		<div class="container">
			<div class="left_arrow" @click="goBack()">
				<img src="../assets/images/left_arrow.png">
			</div>
			<div class="title">{{title}}</div>			
			<div class="right_arrow"><slot name="navRightBtn"></slot></div>
		</div>

	</div>
</template>

<script>
	export default{
		name: "header1",
		data(){
			return {

			}
		},
		props:['title'],
		methods:{
			goBack: function(){
				this.$router.goBack();
			}
		}
	}
</script>

<style scoped>
	.personal_topbar{
		height: 0.88rem;
	    background: #fff;
	    border-bottom: 1px solid #ddd;
	    box-sizing: border-box;
	    padding: 0 0.32rem;
	    position: fixed;
	    z-index: 999;
	    top: 0;
	    width: 100%;
	}
	.personal_topbar .container {
	    width: 100%;
	    height: 100%;
	    position: relative;
	}
	.personal_topbar .left_arrow {
	    float: left;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-pack: center;
	    -ms-flex-pack: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    height: 100%;
	    z-index: 9;
	    position: relative;
	}
	.personal_topbar .left_arrow img {
	    width: 0.16rem;
	    height: 0.29rem;
	}
	.personal_topbar .title {
	    line-height: 0.88rem;
	    height: 100%;
	    font-size: 0.36rem;
	    font-weight: bold;
	    text-align: center;
	    position: absolute;
	    width: 100%;
	}
	.personal_topbar .right_arrow {
	    float: right;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-pack: center;
	    -ms-flex-pack: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    height: 100%;
	    position: relative;
	    z-index: 9;
	}
</style>
<template>
	<div class="container">
		<header1 v-bind:title="title"></header1>
		<div class="hehight"></div>
		<p class="zhuxcehao"><input type="text" placeholder="请输入账号" v-model="zhanghao" /></p>
		<p class="zhuxcehao"><input type="password" placeholder="请输入密码" v-model="psw" /></p>
		<p class="zhuxcehao"><input type="password" placeholder="请确认密码" v-model="pswrepeat" /></p>
		<p class="chaxunl zhucela" @click="next()">下一步</p>
	</div>
</template>

<script>
	import header1 from '@/components/header1'
	export default{
		name: 'register',
		data(){
			return {
				title: '注册',
				zhanghao: '',
				psw: '',
				pswrepeat: '',
			}
		},
		components: {header1},
		mounted(){
			
		},
		methods: {
			next: function(){
				if(this.zhanghao.trim() == ''){
					this.$myToast({
						message: '用户名不能为空',
						type: 'warning'
					})
					return false
				}else if(this.zhanghao.trim().length < 8){
					this.$myToast({
						message: '用户名不能少于8个字符',
						type: 'warning'
					})
					return false
				}else if(this.psw.trim() == ''){
					this.$myToast({
						message: '密码不能为空',
						type: 'warning'
					})
					return false
				}else if(this.psw.trim().length < 8){
					this.$myToast({
						message: '密码不能少于8个字符',
						type: 'warning'
					})
					return false
				}else if(this.psw.trim() != this.pswrepeat.trim()){
					this.$myToast({
						message: '两次密码不一致',
						type: 'warning'
					})
					return false
				}else{
					const that = this;
					this.$fetchPost('/cdd_registered',{login_account: this.zhanghao,password: this.psw,repassword: this.pswrepeat}).then(function(res){
						console.log(res)
						if(res.code == 0){
							that.$myToast({
								message: res.msg,
								type: 'warning'
							})
						};
						if(res.code == 1){
							that.$myToast({
								message: "注册成功，请完善个人信息",
								type: 'success'
							})
							localStorage.setItem("myToken",res.data.token);
							var data = {
								mturl: '',
								qturl: '',
								storeName: '',
								fuzeren: '',
								tel: '',
								province: '',
								cityText: '城市',
								cityId: '',
								marketText: '二手车市场',
								marketId: '',
								address: ''
							}
							that.$store.commit("registerMsg/init",data)
							setTimeout(function(){
								that.$router.push({path: '/personalMsg'})
							},1000)
						}
					})
				}
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100%;
		overflow-y: scroll;
		position: relative;
	}
	.hehight{
		height: 0.88rem;
	}
	.zhuxcehao {
	    line-height: 0.89rem;
	    border-bottom: 1px solid #EFEFEF;
	    background: #FFFFFF;
	}
	.zhuxcehao input {
	    display: block;
	    line-height: 0.89rem;
	    padding: 0 0.32rem;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	}
	.chaxunl {
	    width: 100%;
	    background: #FF620C;
	    line-height: 0.9rem;
	    text-align: center;
	    border-radius: 0.45rem;
	    margin-top: 0.4rem;
	}
	.zhucela {
	    width: 6.84rem;
	    margin: auto;
	    margin-top: 0.7rem;
	    font-size: 0.32rem;
	    color: #FFFFFF;
	}
</style>
<template>
	<div class="container">
		<div class="register_head">
			<img src="../assets/images/top.png">
		</div>
		<form class="register_form">
	        <p class="write_input"><img src="../assets/images/shouji.png" class="shoujiIcon" /><input type="text" name="" placeholder="账号" v-model="username"></p>
	        <p class="write_input"><img src="../assets/images/mima.png" class="mimaIcon" /><input type="password" name="" placeholder="密 码" v-model="password"></p>
	        <p class="login_anniu" id="login_btn" @click="login()">登录</p>
	        <p style="margin-bottom: 0.3rem;overflow: hidden;"><span class="toget_pwd">忘记密码</span><span class="to_register">立即注册</span></p>
	    </form>
	</div>
</template>

<script>
	export default{
		name: 'login',
		data(){
			return {
				username: '',
				password: ''
			}
		},
		methods:{
			login: function(){
				var _this = this;
				this.$fetchPost('/cdd_login',{login_account: this.username, password: this.password}).then(function(res){
					console.log(res)
					localStorage.setItem('myImg',res.data.img);
					localStorage.setItem('myLevelName',res.data.level_name);
					localStorage.setItem('myProvinceId',res.data.province_id);
					localStorage.setItem('myRoomCityId',res.data.room_city);
					localStorage.setItem('myRoomCity',res.data.room_city_name);
					localStorage.setItem('myShopName',res.data.shop_name);
					localStorage.setItem('myToken',res.data.token);
					localStorage.setItem('myUserName',res.data.user_name);
					localStorage.setItem('myUserTel',res.data.user_tel);
					localStorage.setItem('myUserTelSta',res.data.user_tel_sta);
					_this.$router.push("/homePage");
				})
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100%;
	}
	.register_head img{
		width: 100%;
	}
	.register_form {
	    width: 6.86rem;
	    margin: 0 auto;
	    margin-top: .5rem;
	}
	.register_form p.write_input {
	    height: .98rem;
	    line-height: .98rem;
	    border: 1px solid #EFEFEF;
	    border-radius: .45rem;
	    margin-bottom: .4rem;
	    display: flex;
	    -webkit-display: flex;
	    align-items: center;
	    -webkit-align-items: center;
	}
	.register_form p input {
	    width: 5.54rem;
	    height: .92rem;
	    line-height: .92rem;
	    text-indent: 1em;
	    font-size: .3rem;
	    background: none;
	}
	.register_form p.write_input .shoujiIcon{
		width: 0.25rem;
		height: 0.33rem;
		margin-left: .4rem;
	}
	.register_form p.write_input .mimaIcon{
		width: 0.29rem;
		height: 0.34rem;
		margin-left: .4rem;
	}
	.login_anniu {
	    display: inline-block;
	    width: 6.86rem;
	    height: .9rem;
	    border-radius: .45rem;
	    background: #FF620C;
	    text-align: center;
	    line-height: .9rem;
	    color: #fff;
	    font-size: .32rem;
	    margin-top: .6rem;
	    letter-spacing: .1rem;
	}
	.toget_pwd {
	    color: #333;
	    font-size: .28rem;
	    display: inline-block;
	    margin-top: .4rem;
	    text-indent: 1em;
	    float: left;
	}
	.to_register {
	    float: right;
	    margin-top: .4rem;
	    color: #FF620C;
	    font-size: .28rem;
	}
</style>
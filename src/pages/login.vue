<template>
	<div class="container">
		<div class="register_head">
			<img src="../assets/images/top.png">
		</div>
		<form class="register_form">
	        <p class="write_input"><img src="../assets/images/shouji.png" class="shoujiIcon" /><input type="text" name="" placeholder="账号" v-model="username"></p>
	        <p class="write_input"><img src="../assets/images/mima.png" class="mimaIcon" /><input type="password" name="" placeholder="密 码" v-model="password"></p>
	        <p class="login_anniu" id="login_btn" @click="login()">登录</p>
	        <p style="margin-bottom: 0.3rem;overflow: hidden;"><span class="toget_pwd" @click="zhaomima()">忘记密码</span><span class="to_register" @click="zhuce()">立即注册</span></p>
	    </form>
	    <!--弹出-->
		<div class="half" v-show="bodaShow"></div>
	  	<div class="dialog" v-show="bodaShow">
		    <p class="tantit1">提示<i class="icon iconfont icon-cuowu guanbi" @click="quxiao()"></i></p>
		   	<p class="xzhifu xzhifu1" style="text-align: center;">请直接联系客服</p>
			<p class="xzhifu" style="text-align: center;">0539-8321998</p>
		    <p class="putong"><span class="xquxiao" @click="quxiao()">取消</span><a href="javascript:;" @click="call()" style="display: block;width: 50%;height: 100%;float: left;">拨打</a></p>
	  	</div>
		<!--弹出-->	
	</div>
</template>

<script>
	export default{
		name: 'login',
		data(){
			return {
				username: '',
				password: '',
				bodaShow: false,
			}
		},
		mounted(){
			
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
			},
			quxiao: function(){
				this.bodaShow = false;
			},
			zhaomima: function(){
				this.bodaShow = true;
			},
			call: function(){
				window.location.href = "tel: 0539-8321998";
			},
			zhuce: function(){
				this.$router.push("register");
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100%;
		overflow-y: scroll;
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
	.half {
	    width: 100%;
	    height: 100%;
	    background-color: rgba(0,0,0,0.3);
	    position: fixed;
	    top: 0;
	    left: 0;
	    z-index: 99999;
	}
	.dialog {
	    width: 5.92rem;
	    height: 4.26rem;
	    position: fixed;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    top: 0;
	    margin: auto;
	    z-index: 99999;
	    border-radius: 0.1rem;
	    background: #FFFFFF;
	    overflow: hidden;
	}
	.tantit1 {
	    line-height: 0.86rem;
	    height: 0.86rem;
	    font-size: 0.3rem;
	    color: #000000;
	    padding: 0 0.41rem;
	    background: #EEEFF0;
	    border-top-left-radius: 0.1rem;
	    border-top-right-radius: 0.1rem;
	}
	.xzhifu {
	    padding: 0 0.45rem;
	    font-size: 0.28rem;
	    color: #000000;
	    line-height: 0.48rem;
	}
	.xzhifu1 {
	    padding-top: 0.7rem;
	}
	.guanbi {
	    float: right;
	    font-size: 0.4rem !important;
	    color: #666666;
	}
	.putong {
	    overflow: hidden;
	    background: #FF620C;
	    width: 100%;
	    height: 0.86rem;
	    line-height: 0.86rem;
	    text-align: center;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    border-bottom-right-radius: 0.1rem;
	    border-bottom-left-radius: 0.1rem;
	}
	.xquxiao {
	    width: 50%;
	    height: 100%;
	    float: left;
	    background: #FFFFFF;
	    border-bottom-left-radius: 0.1rem;
	    font-size: 0.3rem;
	    color: #8A8F9B;
	    border-top: 1px solid #EFEFEF;
	    box-sizing: border-box;
	}
	.putong a {
	    color: #FFFFFF;
	    font-size: 0.3rem;
	}
</style>
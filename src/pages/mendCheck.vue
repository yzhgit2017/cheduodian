<template>
	<div class="container" :style="{ height: wrapperHeight + 'px' }">
		<header1 v-bind:title="title"></header1>
		<div class="pad"></div>
		<div class="qiutit">维保查询<span>{{payDuobi}}</span>多币/次</div>
		<div class="vinpai">
			<p class="vinpinput">
				<input id="upload_file" @change="choicePic()" type="file" style="display: none;"/>
				<input class="input1" type="text" v-model="vin" placeholder="请输入VIN码或拍照识别"/>
		        <i class="icon iconfont icon-xiangji-tianchong xiangji" @click="getVin()"></i>
			</p>
			<p class="dangri">当日20点之后查询维保记录将在次日通知</p>
			<p class="chaxunl" @click="chaxun()">立即查询</p>
		</div>
		<div class="qiutit" @click="goDetails()">查询历史<label class="xmore">更多查询记录<i class="icon iconfont icon-youjiantou"></i></label></div>
		<div class="chahis">
			<div class="chaji" v-for="(item,index) in jiluData">
				<p class="chatit">{{item.manufacturer}}<span>{{item.status_name}}</span></p>
				<p class="chacon1">{{item.vin_code_name}}</p>
				<p class="chatime">
					{{item.ctimes}}
					<template v-if="item.status_name == '查询成功'">
						<a v-if="item.type == 1" @click="kanbaogao(1,item.id)">查看报告</a>
						<a v-else @click="kanbaogao(2,item.wap_url)">查看报告</a>
					</template>
				    <span v-else>{{item.money_status_name}}</span>
				</p>
			</div>
		</div>
		<div class="vinLoadTishi" v-show="vinshibie">
			<div class="content">
				<img src="../assets/images/loading.gif" class="shibieLoading"/>
				<p>正在识别中</p>
			</div>
		</div>
		<div class="dialogW" v-show="dialogW">
			<div class="dialog">
			    <p class="tantit1">提示<i class="icon iconfont icon-cuowu guanbi" @click="dialogClose()"></i></p>
			   	<p class="xzhifu xzhifu1">支付多币：10多币</p>
				<p class="xzhifu">VIN码：{{vin}}</p>
			    <p class="putong"><span class="xquxiao" @click="dialogClose()">取消</span><a class="vinsearch" @click="realCheck()">查询</a></p>
		  	</div>
		</div>
	</div>
</template>

<script>
	import header1 from '@/components/header1'
	export default{
		name: 'mendCheck',
		data(){
			return {
				title: '维保查询',
				wrapperHeight: '',
				payDuobi: 1,
				token: localStorage.getItem("myToken"),
				vin: '',
				vinshibie: false,
				dialogW: false,
				jiluData: []
			}
		},
		components:{header1},
		mounted(){
			this.wrapperHeight = document.documentElement.clientHeight;
			this.chaduobi();
			this.chaxunjilu();
		},
		methods:{
			chaduobi: function(){
				var that = this;
				this.$axios.post(this.$http + '/GetProductPricing',{token: this.token,keys:"inquire_money"}).then(function(res){
					console.log(res)
					if(res.data.code == 1){
						that.payDuobi = res.data.data.money;
					}
					
				})
			},
			chaxunjilu: function(){
				var that = this;
				this.$axios.post(this.$http + '/CarInquireList',{token: this.token,pagenum: 2,page: 1}).then(function(res){
					console.log(res)
					if(res.data.code == 1){
						that.jiluData = res.data.data.data;
					}
					
				})
			},
			getVin: function(){
				document.getElementById("upload_file").click();
			},
			choicePic: function(){
				const cfile = event.target.files[0];
				console.log(cfile)
				const that = this;
				if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(cfile.name)){
			        alert("图片类型必须是.gif,jpeg,jpg,png中的一种")
		        }else{
		        	var reader = new FileReader();
                    reader.onload = function () {
                    	var base64url = this.result;

	                	var data = {token: that.token,imgs:base64url,type:1};
	                	that.vinshibie = true;
	                	that.$axios.post(that.$http + '/Base64CarVinCode',data).then(function(res){
							console.log(res)
							that.vinshibie = false;
							if(res.data.code == 0){
	                			that.$myToast({
									message: res.data.msg,
									type: 'warning'
								})
	                		}
	                		if(res.data.code == 1){
	                			that.$myToast({
									message: '识别成功',
									type: 'success'
								})
								that.vin = res.data.data.vin;
	                		}
							
						})
	                }
	                reader.readAsDataURL(cfile);
		        }
			},
			chaxun: function(){
				if(this.vin == ''){
					this.$myToast({
						message: '请输入vin码进行查询',
						type: 'warning'
					})
				}else{
					this.dialogW = true;
				}
			},
			dialogClose: function(){
				this.dialogW = false;
			},
			realCheck: function(){
				var that = this;
				this.$axios.post(this.$http + '/SurplusMoney',{token: this.token,keys:"inquire_money",money:that.payDuobi}).then(function(res){
					console.log(res)
					if(res.data.code == 1){
						that.$axios.post(that.$http + '/CpCarInquire',{token: that.token,vin_code: that.vin}).then(function(res){
							console.log(res)
							if(res.data.code == 1){
								that.$myToast({
									message: '查询成功',
									type: 'success'
								})
								that.chaxunjilu();
							}else{
								that.$myToast({
									message: res.data.msg,
									type: 'warning'
								})
								that.chaxunjilu();
							}
							
						})
					}else{
						that.$myToast({
							message: res.data.msg,
							type: 'warning'
						})
					}
					
				})
			},
			kanbaogao: function(type,url){
				if(type == 1){

				}else{
					window.location.href = url;
				}
			},
			goDetails: function(){
				this.$router.push("/checkRecord");
			}
		}
	}
</script>

<style scoped>
	.container{
		background: #f2f2f2;
	}
	.pad{
		height: 0.88rem;
	}
	.qiutit {
		font-size: 0.28rem;
		color: #8A8F9B;
		height: 0.87rem;
		line-height: 0.87rem;
		padding-left: 0.33rem;
		background: #EEEFF0;
	}
	.vinpai {
	    background: #FFFFFF;
	    padding: 0.32rem;
	}
	.vinpinput {
	    position: relative;
	}
	.vinpinput .input1 {
	    width: 100%;
	    border: 1px solid #8A8F9B;
	    border-radius: 0.49rem;
	    box-sizing: border-box;
	    height: 0.98rem;
	    padding: 0 0.56rem;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    padding-right: 1.2rem;
	}
	.xiangji {
	    color: #999999;
	    position: absolute;
	    right: 0.46rem;
	    top: 0.27rem;
	    font-size: 0.38rem !important;
	}
	.dangri {
	    font-size: 0.24rem;
	    color: #8A8F9B;
	    padding-left: 0.4rem;
	    margin-top: 0.3rem;
	}
	.chaxunl {
	    width: 100%;
	    background: #FF620C;
	    line-height: 0.9rem;
	    text-align: center;
	    border-radius: 0.45rem;
	    margin-top: 0.4rem;
	    font-size: 0.32rem;
        color: #FFFFFF;
	}
	.xmore {
	    float: right;
	    color: #8A8F9B;
	    font-size: 0.28rem;
	    margin-right: 0.32rem;
	}
	.vinLoadTishi {
	    position: fixed;
	    background: rgba(0,0,0,0.2);
	    z-index: 999;
	    height: 100%;
	    width: 100%;
	    top: 0;
	    left: 0;
	}
	.vinLoadTishi .content {
	    width: 3rem;
	    border-radius: 5px;
	    background: rgba(0,0,0,0.8);
	    position: absolute;
	    left: 50%;
	    top: 50%;
	    transform: translate3d(-50%,-50%,0);
	    -webkit-transform: translate3d(-50%,-50%,0);
	}
	.vinLoadTishi .content .shibieLoading {
	    width: 0.48rem;
	    height: 0.48rem;
	    padding: 0.3rem 0;
	    display: block;
	    margin: auto;
	}
	.vinLoadTishi .content p {
	    text-align: center;
	    font-size: 0.14rem;
	    color: #fff;
	    padding-bottom: 0.3rem;
	}
	.dialogW{
		position: fixed;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 999;
		background-color: rgba(0,0,0,0.3);
	}
	.dialog {
	    width: 5.92rem;
	    height: 4.26rem;
	    border-radius: 0.1rem;
	    background: #FFFFFF;
	    position: absolute;
	    top: 50%;
	    left: 50%;
	    transform: translate(-50%,-50%);
	    -webkit-transform: translate(-50%,-50%);
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
	.putong {
	    overflow: hidden;
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
	    display: block;
	    width: 50%;
	    float: right;
	    background: #FF620C;
	    height: 100%;
	}
	.putong a {
	    color: #FFFFFF;
	    font-size: 0.3rem;
	}
	.guanbi {
	    float: right;
	    font-size: 0.4rem !important;
	    color: #666666;
	}
	.chahis {
	    background: #FFFFFF;
	}
	.chaji {
	    margin-left: 0.33rem;
	    border-bottom: 1px solid #EFEFEF;
	    padding-bottom: 0.35rem;
	}
	.chatit {
	    font-size: 0.3rem;
	    color: #333333;
	    line-height: 0.8rem;
	    font-weight: bold;
	    margin-top: 0.15rem;
	    height: 0.8rem;
	}
	.chatit span {
	    font-size: 0.26rem;
	    color: #9A9A9A;
	    float: right;
	    margin-right: 0.58rem;
	    font-weight: normal;
	}
	.chacon1 {
	    font-size: 0.28rem;
	    color: #333333;
	}
	.chatime {
	    font-size: 0.26rem;
	    color: #8A8F9B;
	    margin-top: 0.15rem;
	    position: relative;
	}
	.chatime a {
	    float: right;
	    width: 1.4rem;
	    height: 0.46rem;
	    line-height: 0.46rem;
	    border: 1px solid #FF620C;
	    border-radius: 0.23rem;
	    text-align: center;
	    font-size: 0.22rem;
	    color: #FF620C;
	    position: absolute;
	    right: 0.33rem;
	    bottom: 0.1rem;
	}
	.chatime span {
	    width: 1.4rem;
	    text-align: center;
	    font-size: 0.28rem;
	    color: #000000;
	    position: absolute;
	    right: 0.33rem;
	    bottom: 0.1rem;
	}
</style>
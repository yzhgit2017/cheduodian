<template>
	<div class="container">
		<div class="header">
			<img src="../assets/images/leftArrow.png" class="leftArrow" @click="goBack()">
			<img src="../assets/images/detailsShareIcon.png" class="shareIcon">
		</div>
		<dl class="minicar">
			<dt>
				<div class="swiper-container swiper-details">
	                <div class="swiper-wrapper">
	                    <div class="swiper-slide" v-for="(item,index) in data.photos" @click="imgAllScreen(index)"><img :src="http + item"></div>
	                </div>
	                <label class="kucunbianhaoDetails">{{data.id}}</label>
	            </div>
			</dt>
			<dd>
				<p class="minitit">{{data.carname}}</p>
				<p class="minicon">
				    <span class="minijia">
					    <span v-if="data.wholesale == 1">{{data.wholesale_money}}</span>
					    <span v-else>{{data.money}}</span><span>万</span>
					</span>
				    <span style="float: right;">
				    	<template v-for="(item,index) in data.typename">
				    		<span class="zhaospan zhaobg1" v-if="item == '急售'">急售</span>
				            <span class="zhaospan zhaobg2" v-else>{{item}}</span>
				    	</template>			        
				    </span>
				</p>
			</dd>
		</dl>
		<div class="qiutit">基本信息</div>
		<ul class="jibenul">
			<li style="width: 30%;"><span>{{data.gear_box}}</span>变速箱</li>						
			<li style="width: 20%;"><span>{{data.pailiang}}</span>排量</li>
			<li style="width: 30%;"><span><label>{{data.driven_distance}}</label>万公里</span>里程</li>
			<li style="width: 20%;"><span>{{data.boarding_time}}</span>上牌日期</li>
		</ul>
		<ul class="jibenul juben1">
			<li style="width: 30%;"><span>{{data.city}}</span>归属城市</li>
			<li style="width: 60%;"><span>{{data.name}}</span>所属市场</li>
		</ul>
		<div class="qiutit">车辆状况</div>
		<div style="font-size: 0.28rem;padding-top: 0.6rem;text-align: center;"><span>车况评级:</span><span>{{data.car_score}}</span>分</div>
		<div id="myCanvas">
		    <div class="chekuangbiaoji" v-for="(item,index) in data.carcondition" :style="item.car_style"></div>
		</div>
		<div class="choice_chekuang" style="padding-bottom: 0.6rem;">
			<div class="item">
				<div class="color" style="background: #fff;border: 1px solid #999;box-sizing: border-box;" id="penqi"></div>
				<p>正常</p>
			</div>
			<div class="item">
				<div class="color" style="background: #4FC473;"></div>
				<p>喷漆</p>
			</div>
			<div class="item">
				<div class="color" style="background: #FCC022;"></div>
				<p>钣金</p>
			</div>
			<div class="item">
				<div class="color" style="background: #FF2F2F;"></div>
				<p>事故</p>
			</div>
		</div>
		<div class="qiutit">车辆描述</div>
		<div class="maintiao">{{data.content}}</div>
		<div class="qiutit">车辆图片</div>
		<ul class="carimg1">
			<li v-for="(item,index) in data.photos" @click="imgAllScreen(index)"><img :src="http + item"></li>
		</ul>
		<div class="qiutit">联系方式</div>
		<div class="waijian">
			<p class="weibotime">{{data.shop_name}}</p> 
			<p class="weibotime">联系方式<span class="zuijintime">{{data.user_tel}}</span></p>
			<p class="weibotime">联系地址<span class="zuijintime">{{data.address}}</span></p>
		</div>
		<div class="hehight"></div>
		<div class="xfabu" v-if="afrom == 'myCollection'"><span class="shouig" style="width: 100%;background: none;color: #ffffff;" @click="lianxi(data.user_tel)">联系卖家</span></div>
		<div v-else-if="afrom == 'myVehicle'"></div>
		<div class="xfabu" v-else><span class="shouig" :class="[shoucang == '0'?'':'sc']" @click="shoucangfuc()"><span class="icon iconfont icon-star"></span>收藏</span><span class="shouig" @click="lianxi(data.user_tel)">联系卖家</span></div>
		<lianxi @call="pcall" @callClose="pcallClose" @weilianxi="pweilianxi" @yilianxi="pyilianxi" @seeClose="pseeClose" :halfShow="phalfShow" :bodaShow="pbodaShow" :lianxiShow="plianxiShow" :seeShow="pseeShow" :carid="carid" :phoneNum="pphoneNum"></lianxi>
	</div>
</template>

<script>
	import Swiper from 'static/js/swiper.js'
	import lianxi from '@/components/lianxi'
	export default{
		name: 'vehicleDetails',
		data(){
			return {
				token: localStorage.getItem('myToken'),
				data: '',
				http: this.$http,
				swiper1: '',
				shoucang: '',
				shoucangdianji: true,
				imgData: '',
				afrom: '',
				carid: '',
                qxscShow: false,
                phalfShow: false,
                pbodaShow: false,
                plianxiShow: false,
                pseeShow: false,
                pphoneNum: ''
			}
		},
		mounted(){
			
		},
		activated(){
			this.loadData();		
		},
		deactivated(){
			this.data = '';
			this.shoucang = '';
			this.shoucangdianji = true;
			this.imgData = '';
		},
		components:{lianxi},
		methods:{
			loadData: function(){
				this.afrom = this.$route.query.from;
				this.carid = this.$route.query.id;
				var data = {token: this.token, carid: this.$route.query.id};
				var _this = this;
				this.$fetchPost('/getCarDetil',data).then(function(res){
					console.log(res)
					_this.data = res.data;
					_this.imgData = res.data.photos;
					_this.shoucang = res.data.is_coll;		
				})
			},
			lunbo1: function(){
				this.swiper1 = new Swiper('.swiper-details', {
		            loop:true,
		        });
			},
			
			goBack: function(){
				this.$router.goBack();
			},
			imgAllScreen: function(index){
				let _index = parseInt(index)
				// event.preventDefault();
				// event.stopPropagation();
				this.$swiperImgZoom({
					data: this.imgData,
					index: _index
				})
			},
			shoucangfuc: function(){
				let that = this;
				if(this.shoucangdianji){
					this.shoucangdianji = false;
					if(this.shoucang == 1){
						var data = {token: this.token, carid: this.$route.query.id};
						this.$fetchPost('/doCollection',data).then(function(res){
							console.log(res)
							if(res.code == 1){
								that.$myToast({
									message: '取消成功',
									type: 'success'
								})
							};
							that.shoucang = 0;
							that.shoucangdianji = true;	
						})
					}
					if(this.shoucang == 0){
						var data = {token: this.token, carid: this.$route.query.id};
						this.$fetchPost('/doCollection',data).then(function(res){
							console.log(res)
							if(res.code == 1){
								that.$myToast({
									message: '收藏成功',
									type: 'success'
								})
							};
							that.shoucang = 1;
							that.shoucangdianji = true;			
						})
					}
				}
				
			},
			lianxi: function(tel){
				this.pphoneNum = tel;
		    	this.phalfShow = true;
		    	this.pbodaShow = true;
			},
			pcall: function(){
		    	this.pbodaShow = false;
		    	this.plianxiShow = false;
		    },
		    pcallClose: function(){
		    	this.phalfShow = false;
		    	this.pbodaShow = false;
		    },
		    pweilianxi: function(){
		    	this.phalfShow = false;
				this.plianxiShow = false;
		    },
		    pyilianxi: function(){
		    	this.plianxiShow = false;
				this.pseeShow = true;
		    },
		    pseeClose: function(){
		    	this.pseeShow = false;
				this.phalfShow = false;
		    }
		},
		beforeUpdate: function(){
			if(this.swiper1 != ''){
				this.swiper1.destroy(true);  
			}
		},
		updated: function(){
			console.log("updated")
			this.lunbo1();
			
		}
	}
</script>

<style scoped>
    @import '../../static/css/swiper.css';
    p{
    	font-size: .24rem;
    }
    .container{
    	height: 100%;
    	overflow: scroll;
    }
	.header{
		height: 0.88rem;
		display: flex;
		justify-content: space-between;
		align-items: center;
		-webkit-display: flex;
		-webkit-justify-content: space-between;
		-webkit-align-items: center;
		background: rgba(0,0,0,0.5);
		position: fixed;
		width: 100%;
		top: 0;
		left: 0;
		padding: 0 0.32rem;
		box-sizing: border-box;
		z-index: 999;
	}
	.leftArrow{
		width: 0.16rem;
		height: 0.29rem;
	}
	.shareIcon{
		width: 0.34rem;
		height: 0.34rem;
	}
	.minicar{
		padding-bottom: 0.2rem;
	}
	.minicar dd {
	    padding: 0 0.32rem;
	}
	.minicar dt{
		height: 5.63rem;
		overflow: hidden;
	}
	.swiper-details {
	    height: 100%;
	    padding-bottom: 0;
	}
	.swiper-details .swiper-slide img {
	    width: 100%;
	    height: 100%;
	}
	.kucunbianhaoDetails {
	    position: absolute;
	    font-size: 0.14rem;
	    color: #fff;
	    bottom: 0;
	    right: 0;
	    background: rgba(0,0,0,0.5);
	    padding: 0.03rem 0.08rem;
	    border-top-left-radius: 2px;
	    z-index: 11;
	}
	.minitit {
	    font-size: 0.36rem;
	    color: #000000;
	    font-weight: bold;
	    margin-top: 0.25rem;
	}
	.minijia {
	    font-size: 0.48rem;
	    font-weight: bold;
	    color: #FF2F2F;
	}
	.minijia span{
		font-size: 0.3rem;
	}
	.zhaospan {
	    float: right;
	    font-size: 0.2rem;
	    width: 0.73rem;
	    line-height: 0.43rem;
	    color: #FFFFFF;
	    text-align: center;
	    margin-right: 0.1rem;
	    margin-top: 0.2rem;
	    border-radius: 2px;
	}
	.zhaobg1 {
	    background: #FF2F2F;
	}
	.zhaobg2 {
	    background: #FF620C;
	}
	.qiutit {
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    height: 0.87rem;
	    line-height: 0.87rem;
	    padding-left: 0.33rem;
	    background: #EEEFF0;
	}
	.jibenul {
	    padding: 0.2rem 0.32rem;
	    overflow: hidden;
	}
	.jibenul li {
	    float: left;
	    width: 25%;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	}
	.jibenul li span {
	    display: block;
	    font-size: 0.34rem;
	    color: #000000;
	    margin-bottom: 0.1rem;
	}
	#myCanvas{
		width: 320px;
		height: 402px;
		position: relative;
		left: 50%;
		margin-left: -160px;
		background: url("../assets/images/paomiantu.png") no-repeat;
		background-size: 100% 100%;
	}
	.chekuangbiaoji {
	    position: absolute;
	    width: 20px;
	    height: 20px;
	    border-radius: 100%;
	}
	.choice_chekuang {
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
	}
	.choice_chekuang .item {
	    margin: 0 0.3rem;
	}
	.choice_chekuang .item .color {
	    width: 0.68rem;
	    height: 0.68rem;
	}
	.choice_chekuang .item p {
	    font-size: 0.24rem;
	    color: #8A8F9B;
	    text-align: center;
	    line-height: 0.48rem;
	}
	.maintiao {
	    padding: 0.4rem 0.3rem;
	    font-size: 0.26rem;
	    color: #000000;
	    background: #FFFFFF;
	    line-height: 0.48rem;
	}
	.carimg1 li img {
	    width: 100%;
	}
	.weibotime {
	    font-size: 0.3rem;
	    color: #333333;
	    padding: 0 0.33rem;
	    line-height: 0.88rem;
	    height: 0.88rem;
	}
	.zuijintime {
	    float: right;
	    color: #8A8F9B;
	    font-size: 0.28rem;
	}
	.hehight {
	    height: 0.88rem;
	}
	.xfabu {
	    width: 100%;
	    background: #FF620C;
	    text-align: center;
	    height: 0.98rem;
	    line-height: 0.98rem;
	    position: fixed;
	    bottom: 0;
	    z-index: 9;
	}
	.shouig {
	    float: left;
	    width: 50%;
	    text-align: center;
	    font-size: 0.3rem;
	    color: #FFFFFF;
	    height: 100%;
	}
	.shouig:first-child {
	    background: #FFFFFF;
	    color: #000000;
	}
	.shouig .iconfont {
	    margin-right: 0.1rem;
	}
	.shouig.sc {
	    color: #FF620C;
	}
	.checkImg {
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	    z-index: 9999;
	    background: #000;
	    transform: scale(0);
	    -webkit-transform: scale(0);
	    transition: all 0.2s ease 0;
	    -webkit-transition: all 0.2s ease 0;
	}
	.checkImg.active {
	    transform: scale(1);
	    -webkit-transform: scale(1);
	}
	.checkImg .mask {
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	}
	.swiper-check .swiper-slide img{
		width: 100%;
	}
	.swiper-check{
		height: 100%;
	}
	.swiper-check .swiper-wrapper{
		height: 100%;
	}
	.swiper-check .swiper-wrapper .swiper-slide{
		display: flex;
		align-items: center;
		justify-content: center;
		-webkit-display: flex;
		-webkit-align-items: center;
		-webkit-justify-content: center;
		overflow: hidden;
	}
</style>
<style>
	#swiper-check .swiper-pagination-bullets .swiper-pagination-bullet {
	    width: 0.2rem;
	    height: 0.2rem;
	    border: none;
	    background: #fff;
	    opacity: 0.5;
	    display: inline-block;
	    border-radius: 100%;
	    margin: 0 4px;
	}
	#swiper-check .swiper-pagination-bullets .swiper-pagination-bullet-active {
	    background: #fff;
	    opacity: 1;
	}
	#swiper-check .swiper-pagination-bullets {
	    bottom: 0.5rem;

	}
</style>
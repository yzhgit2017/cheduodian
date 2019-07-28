<template>
	<div class="componentContainer" :style="{ height: wrapperHeight + 'px' }">
		<div class="index_nav">
	        <div class="container">
	            <p class="city" id="choiceCity">
	                <span>{{city}}</span>
	                <!-- <label class="arrow"></label> -->
	            </p>
	            <!-- <div class="message" id="Notify"></i><label>99+</label></div> -->
	        </div>
	    </div>
	    <div class="index_content">
	        <div class="banner"><img src="../assets/images/banner.png"></div>
	        <div class="menu_container">
	            <div class="index_search">
	                <span class="searchIcon"></span>
	                <form action="" @submit="search()" style="margin:0;display: inherit;"><input type="search" name="" placeholder="搜索品牌/车型/年款" v-model="searchContent"></form>
	            </div>
	            <div class="menu_list">
	                <ul>
	                    <li @click="goCityVehicle()">	                
                            <div class="menu_img"><img src="../assets/images/bscy.png"></div>
                            <p class="menu_text">本市车源</p>                  
	                    </li>
	                    <li @click="goPublishVehicle()">
                            <div class="menu_img"><img src="../assets/images/cyfb.png"></div>
                            <p class="menu_text">车源发布</p>
	                    </li>
	                    <li @click="goSeekVehicle()">	               
                            <div class="menu_img"><img src="../assets/images/dkqg.png"></div>
                            <p class="menu_text">代客求购</p>	                       
	                    </li>
	                    <li @click="goMendCheck()">
                            <div class="menu_img"><img src="../assets/images/wbcx.png"></div>
                            <p class="menu_text">维保查询</p>
	                    </li>
	                    <li @click="goActiveCenter()">
                            <div class="menu_img"><img src="../assets/images/hdzx.png"></div>
                            <p class="menu_text">活动中心</p>
	                    </li>
	                    <li @click="goWholesaleVehicle()">
                            <div class="menu_img"><img src="../assets/images/pfcy.png"></div>
                            <p class="menu_text">批发车源</p>
	                    </li>
	                </ul>
	            </div>
	            <div class="index_swiper">
		            <div class="swiper-container swiper-index">
		                <div class="swiper-wrapper">
		                    <div class="swiper-slide" v-for="(item,index) in adData" :key="index"><img :src="http + item.img"></div>
		                </div>
		            </div>
		            <div class="dotContainer"><span class="dot" v-for="(item,index) in adData" :key="index" v-bind:class="[dotIndex == index ? 'active' : '']"></span></div>
		        </div>
	        </div>
	        <footer-bar :footerActive="currentPage"></footer-bar>
	    </div>
	</div>
</template>

<script>
	import Swiper from 'static/js/swiper.js'
	import footerBar from '../components/footer'
	export default{
		name:'homePage',
		data(){
			return {
				currentPage:"shouye",
				wrapperHeight: 0,
				city: localStorage.getItem("myRoomCity"),
				token: localStorage.getItem("myToken"),
				adData: [],
				http: this.$http,
				searchContent: '',
				mySwiper: '',
				dotIndex: 0
			}
		},
		components:{footerBar},
		mounted(){
			this.getBanner();
			this.wrapperHeight = document.documentElement.clientHeight;
		},
		methods:{
			getBanner: function(){
				const that = this;
				this.$axios.post(this.$http + "/getBanner",{token: this.token,num: 5}).then(res => {
					console.log(res)
					if(res.data.code == 1){
						that.adData = res.data.data;
						that.$nextTick(function(){
							that.lunbo()
						})
					}
				})
			},
			lunbo: function(){
				const that = this;
				this.mySwiper = new Swiper('.swiper-index', {
		            loop:true,
		            on: {
		            	slideChange: function(){
					      	console.log(that.mySwiper.realIndex)
					      	if(that.mySwiper.realIndex == undefined){
					      		that.dotIndex = 0;
					      	}else{
					      		that.dotIndex = that.mySwiper.realIndex;
					      	}
					      	
					    },
		            }
		        });
			},
			search: function () {
				this.$store.commit('vehicleList/init');
				this.$store.commit('vehicleList/changeSearch',{searchContent: this.searchContent});
				this.$store.commit('vehicleList/changePAC',{provinceId: localStorage.getItem('myProvinceId'),cityText: localStorage.getItem('myRoomCity'),cityId: localStorage.getItem('myRoomCityId')})
				this.$router.push("/findVehicle/cityVehicle");
			},
			goCityVehicle: function(){
				this.$store.commit('vehicleList/init')
				this.$store.commit('vehicleList/changePAC',{provinceId: localStorage.getItem('myProvinceId'),cityText: localStorage.getItem('myRoomCity'),cityId: localStorage.getItem('myRoomCityId')})
				this.$router.push("/findVehicle/cityVehicle");
			},
			goWholesaleVehicle: function(){
				this.$store.commit('vehicleList/init')
				this.$store.commit('vehicleList/changePAC',{provinceId: 0,cityText: '全国',cityId: 0})
				this.$router.push("/findVehicle/wholesaleVehicle");
			},
			goMendCheck: function () {
				this.$router.push("/mendCheck");
			},
			goActiveCenter: function () {
				this.$router.push("/activeCenter");
			},
			goSeekVehicle: function () {
				this.$router.push("/seekVehicle");
			},
			goPublishVehicle: function(){
				const data = {
					fengmian: '',
					photos: [],
					brandName: '',
					brandId: '',
					seriesName: '',
					seriesId: '',
					specName: '',
					specId: '',
					colorName: '',
					colorId: '',
					val: '',
					id: '',
					marketName: '',
					marketId: '',
					vin: '',
					pailiang: '',
					licheng: '',
					car_color_id: [],
					car_des: [],
					car_style: [],
					car_parts_id: [],
					car_color: [],
					car_condition_id: [],
					pointNum: 0,
					pointData: [],
					chekuangMs: '',
					minPriceV: '',
					pifa: 1,
					pifajia: '',
					yt: '',
					dateText: '',
					p_unit: 'L'
				}
				this.$store.commit('publishCondition/init',data)
				this.$store.commit('vehicleList/changePAC',{provinceId: localStorage.getItem('myProvinceId'),cityText: localStorage.getItem('myRoomCity'),cityId: localStorage.getItem('myRoomCityId')})
				this.$router.push({path: '/publishVehicle', query: {from: 'homePage'}});
			}		
		}
	}
</script>

<style scoped>
    @import '../../static/css/swiper.css';
    #choiceCity{
    	font-size: .24rem;
    }
	.componentContainer{
		height: 100%;
		position: relative;
		overflow-y: scroll;
	}
	.index_nav{
	    position: fixed;
	    height: 0.9rem;
	    padding: 0 0.38rem;
	    width: 100%;
	    box-sizing: border-box;
	    z-index: 999;
	}
	.index_nav .container{
	    height: 100%;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-pack: space-between;
	    -ms-flex-pack: space-between;
	    -webkit-justify-content: space-between;
	    justify-content: space-between;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	}
	.index_nav .container .city span{
	    font-size: 0.3rem;
	    color: #fff;
	}
	.index_nav .container .city .arrow{
	    display: inline-block;
	    width: 0.2rem;
	    height: 0.1rem;
	    background: url("../assets/images/down_arrow.png") no-repeat;
	    background-size: 100% 100%;
	    vertical-align: middle;
	}
	.index_nav .container .message{
	    position: relative;
	    width: 0.4rem;
	    height: 0.3rem;
	    background: url("../assets/images/mesIcon.png") no-repeat;
	    background-size: 100% 100%;
	}
	.index_nav .container .message label{
	    font-size: 0.18rem;
	    border-radius: 0.2rem;
	    position: absolute;
	    right: 0;
	    top: -0.15rem;
	    display: inline-block;
	    color: #fff;
	    background: #FF2F2F;
	    height: 0.29rem;
	    text-align: center;
	    line-height: 0.29rem;
	    padding: 0 0.07rem;
	    transform: translateX(50%);
	    -webkit-transform: translateX(50%);
	}
	.index_content{
	    height: 100%;
	    padding-bottom: 0.98rem;
	    box-sizing: border-box;
	    background: #fff;
	    overflow-y: scroll;
	}
	.index_content.active{
		padding-bottom: 0;
	}
	.index_content .banner{
	    height: 4.5rem;
	    position: relative;
	}
	.index_content .banner img{
	    width: 100%;
	    height: 100%;
	}
	.index_content .banner .user{
	    position: absolute;
	    color: #fff;
	    font-size: 0.3rem;
	    top: 1.97rem;
	    left: 0.38rem;
	    letter-spacing:0.07rem;
	}
	.index_content .banner .user label{
	    font-size: 0.6rem;
	    font-weight: bold;
	}
	.menu_container{
	    position: relative;
	}
	.menu_list{
	    padding: 0 0.38rem;
	    box-sizing: border-box;
	    padding-top: 0.95rem;
	}
	.menu_list ul{
	    overflow: hidden;
	}
	.menu_list ul li{
	    width: 33.33%;
	    float: left;
	    margin-top: 0.2rem;
	}
	.menu_img{
	    width: 0.86rem;
	    height: 0.86rem;
	    margin: 0 auto;
	    line-height: 0.86rem;
	}
	.menu_img img{
	    width: 100%;
	    height: 100%;
	}
	.menu_text{
	    text-align: center;
	    font-size: 0.26rem;
	    line-height: .72rem;
	    color: #8A8F9B;
	}
	.index_search{
	    width: 6.74rem;
	    height: 1rem;
	    position: absolute;
	    top: -0.5rem;
	    left: 50%;
	    margin-left: -3.37rem;
	    border-radius: 0.5rem;
	    background: #fff;
	    box-shadow:0px 5px 9px 1px rgba(218,218,218,0.5);
	    padding: 0 0.48rem;
	    box-sizing: border-box;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	}
	.index_search .searchIcon{
	    display: inline-block;
	    width: 0.22rem;
	    height: 0.24rem;
	    background: url("../assets/images/searchIcon.png") no-repeat;
	    background-size: 100% 100%;
	    margin-right: 0.2rem;
	}
	.index_search input{
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    width: 5rem;
	}
	.index_swiper{
	    width: 6.71rem;
	    height: 2.26rem;
	    margin: auto;
	    margin-top: 0.4rem;
	    margin-bottom: 0.7rem;
	    position: relative;
	}
	.swiper-index{
		height: 100%;
		padding-bottom: 0;
	}
	.swiper-slide{
		overflow: hidden;
	}
	.swiper-index .swiper-slide img{
	    width: 100%;
	    height: 100%;
	    display: block;
	}
	input[type=search]::-webkit-search-cancel-button{
	    -webkit-appearance: none;
	}
	.dotContainer{
		text-align: center;
		font-size: 0.28rem;
	    position: absolute;
	    bottom: 0.2rem;
	    width: 100%;
	    z-index: 99;
	}
	.dot{
		display: inline-block;
		width: 0.2rem;
	    height: 0.06rem;
	    border: 0;
	    background: rgba(255,255,255,0.3);
	    border-radius: 0.03rem;
	    margin: 0 4px;
	}
	.dot.active{
		background: rgba(255,255,255,1);
	}
</style>
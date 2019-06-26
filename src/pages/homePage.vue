<template>
	<div class="container">
		<div class="index_nav">
	        <div class="container">
	            <p class="city" id="choiceCity">
	                <span>北京</span>
	                <label class="arrow"></label>
	            </p>
	            <div class="message" id="Notify"></i><label>99+</label></div>
	        </div>
	    </div>
	    <div class="index_content">
	        <div class="banner"><img src="../assets/images/banner.png"></div>
	        <div class="menu_container">
	            <div class="index_search">
	                <span class="searchIcon"></span>
	                <input type="text" name="" placeholder="搜索品牌/车型/年款">
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
	                    <li>	               
                            <div class="menu_img"><img src="../assets/images/dkqg.png"></div>
                            <p class="menu_text">代客求购</p>	                       
	                    </li>
	                    <li>
	                        <a href="mendCheck.html">
	                            <div class="menu_img"><img src="../assets/images/wbcx.png"></div>
	                            <p class="menu_text">维保查询</p>
	                        </a>
	                    </li>
	                    <li>
	                        <a href="activeCenter.html">
	                            <div class="menu_img"><img src="../assets/images/hdzx.png"></div>
	                            <p class="menu_text">活动中心</p>
	                        </a>
	                    </li>
	                    <li @click="goWholesaleVehicle()">
                            <div class="menu_img"><img src="../assets/images/pfcy.png"></div>
                            <p class="menu_text">批发车源</p>
	                    </li>
	                </ul>
	            </div>
	            <div class="index_swiper" id="swiperIndex">
		            <div class="swiper-container swiper-index">
		                <div class="swiper-wrapper">
		                    <div class="swiper-slide"><a href=""><img src="../assets/images/lbt1.png"></a></div>
		                    <div class="swiper-slide"><a href=""><img src="../assets/images/lbt1.png"></a></div>
		                </div>
		                <!-- Add Pagination -->
		                <div class="swiper-pagination"></div>
		            </div>
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
			}
		},
		components:{footerBar},
		mounted(){
			this.lunbo();
		},
		methods:{
			lunbo: function(){
				var swiper = new Swiper('.swiper-index', {
		            loop:true,
		            pagination: {
		                el: '.swiper-pagination',
		            },
		        });
			},
			goCityVehicle: function(){
				this.$store.commit('vehicleList/init')
				this.$router.push("/findVehicle/cityVehicle");
				this.$store.commit('vehicleList/changePAC',{provinceId: localStorage.getItem('myProvinceId'),cityText: localStorage.getItem('myRoomCity'),cityId: localStorage.getItem('myRoomCityId')})
			},
			goWholesaleVehicle: function(){
				this.$store.commit('vehicleList/init')
				this.$store.commit('vehicleList/changePAC',{provinceId: 0,cityText: '全国',cityId: 0})
				this.$router.push("/findVehicle/wholesaleVehicle");
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
				that.$router.push({path: '/publishVehicle', query: {from: 'homePage'}});
			}		
		}
	}
</script>

<style scoped>
    @import '../../static/css/swiper.css';
    #choiceCity{
    	font-size: .24rem;
    }
	.container{
		height: 100%;
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
	}
	#swiperIndex{
	    width: 100%;
	    height: 100%;
	    padding-bottom: 0;
	}
	.swiper-index .swiper-slide a{
	    display: block;
	    width: 100%;
	    height: 100%;
	}
	.swiper-index .swiper-slide a img{
	    width: 100%;
	    height: 100%;
	}
</style>

<style>
	#swiperIndex .swiper-pagination-bullet{
	    width: 0.2rem;
	    height: 0.06rem;
	    border: 0;
	    background: rgba(255,255,255,0.3);
	    border-radius: 0.03rem;
	}
	#swiperIndex .swiper-pagination-bullet-active{
	    background: rgba(255,255,255,1);
	}
</style>
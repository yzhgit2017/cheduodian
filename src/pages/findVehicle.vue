<template>
	<div class="container">
		<header2></header2>
		<div class="ershouche_list_content">
			<div class="dis"></div>
			<div class="selection_list">
	        	<router-link class="selection_item" :to="{path: 'vehicleType', query: {from: 'findVehicle'}}"><span class="span1">车源</span><span class="span2"></span></router-link>
	        	<router-link class="selection_item" :to="{path: 'choiceBrand', query: {from: 'findVehicle'}}"><span class="span1">品牌</span><span class="span2"></span></router-link>
	        	<router-link class="selection_item" :to="{path: 'coty', query: {from: 'findVehicle'}}"><span class="span1">车龄</span><span class="span2"></span></router-link>
	        	<router-link class="selection_item" :to="{path: 'filterPrice', query: {from: 'findVehicle'}}"><span class="span1">价格</span><span class="span2"></span></router-link>
	        	<span class="selection_item" @click="showOrderList()" id="order_btn" v-bind:class="[xuanzhuan=='xuanzhuan'?'active':'']"><span class="span1">排序</span><span class="span2"></span></span>
			</div>
			<transition name="order">
				<div class="order_container" v-show="show">
					<div class="bg"></div>
					<ul>
						<li class="order_item" @click="paixu(1)">车况最好</li>
						<li class="order_item" @click="paixu(2)">价格最低</li>
						<li class="order_item" @click="paixu(3)">价格最高</li>
						<li class="order_item" @click="paixu(4)">车龄最短</li>
						<li class="order_item" @click="paixu(5)">里程最小</li>
						<li class="order_item" @click="paixu(6)">最近上架</li>
					</ul>
				</div>
			</transition>
			<div class="ershouche_list_wrapper">
			    <div id="ershouche_list_wrapper" @scroll="loadMore()">
					<ul class="ershouche_list" id="ershouche_list" style="position: relative;">
						<li v-for="(item,index) in items">							
							<div class="card_list_item_content">
								<div class="iw"><img :src="item.imgUrl"></div>
								<div class="des">
									<p class="p1">{{item.title}}</p>
									<p class="p2">{{item.des}}</p>
									<div class="p3">
										<p><label class="bg1">可调</label><label class="bg2">急售</label></p>
										<div class="state">车况:100</div>
									</div>
									<div class="p4">
										<div class="price"><span>25.00</span>万</div>
										<div class="lianxi">联系卖家</div>
									</div>
								</div>
							</div>							
						</li>					
					</ul>
					<div id="unsatisfactory">
						<p>没有满意的车？发布求购，<br>车源自己来找你</p>
						<a href="">去求购试试</a>
					</div>
				</div>

				<div id="loadMoreContainerW">
					<div id="loadMoreContainer">
						<span v-show="!loading">上拉加载更多</span>
						<img v-show="loading" src="../assets/images/loading.gif">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
    import { mapState } from 'vuex'
    import header2 from '@/components/header2'
	export default{
		data(){
			return{
				show: false,
				xuanzhuan: "",
				items:[
					{
						"imgUrl":require("@/assets/images/carimg1.png"),
						"title":"奥迪2016款 Q5 TFSI技术型",
						"des":"2016.01 / 3万公里 / 山东临沂"
					},
					{
						"imgUrl":require("@/assets/images/carimg1.png"),
						"title":"奥迪2016款 Q5 TFSI技术型",
						"des":"2016.01 / 3万公里 / 山东临沂"
					},
					{
						"imgUrl":require("@/assets/images/carimg1.png"),
						"title":"奥迪2016款 Q5 TFSI技术型",
						"des":"2016.01 / 3万公里 / 山东临沂"
					},
					{
						"imgUrl":require("@/assets/images/carimg1.png"),
						"title":"奥迪2016款 Q5 TFSI技术型",
						"des":"2016.01 / 3万公里 / 山东临沂"
					},
					{
						"imgUrl":require("@/assets/images/carimg1.png"),
						"title":"奥迪2016款 Q5 TFSI技术型",
						"des":"2016.01 / 3万公里 / 山东临沂"
					},
				],
				once:true,
				lmh:"",
				LoadMore:true,
				tl:150,
				loading:false
			}
		},
		mounted(){
			console.log(this.data.data)
		},
		computed: mapState({
		   data: state => state.vehicleList,
		}),
		components:{header2},
		methods:{
			showOrderList: function(){
				this.show = !this.show;
				if(this.xuanzhuan == ""){
					this.xuanzhuan = "xuanzhuan";
				}else{
					this.xuanzhuan = ""
				}
			},
			paixu: function(id){
				this.$store.commit('vehicleList/changeSort',id);
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100%;
	}
	.ershouche_list_content{
	    padding-top: 0.88rem;
	    height: 100%;
	    box-sizing: border-box;
	    background: #fff;
	    position: relative;
	    overflow: hidden;
	}
	.ershouche_list_content .dis {
	    height: 0.2rem;
	    background: #eeeff0;
	    z-index: 99;
	    position: relative;
	}
	.selection_list{
	    height: 0.76rem;
	    background: #fff;
	    position: relative;
	    border-bottom: 1px solid #EFEFEF;
	    box-sizing: border-box;
	    z-index: 99;
	}
	.selection_list .selection_item{
	    width: 20%;
	    height: 100%;
	    display: block;
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
	}
	.selection_list .selection_item .span1{
	    font-size: 0.28rem;
	    line-height: 0.3rem;
	    color: #000;
	}
	.selection_list .selection_item .span2{
	    width: 0.16rem;
	    height: 0.1rem;
	    background: url("../assets/images/xiaosanjiao.png") no-repeat;
	    background-size: 100% 100%;
	    margin-left: 0.1rem;
	}
	.selection_list .selection_item.active .span2{
	   
	    -webkit-transform: rotateZ(180deg);
	    transform: rotateZ(180deg);
	    
	}
	.selection_list .selection_item.active{
		transition: all 30s linear 0;
	    -webkit-transition: all 30s linear 0;
	}
	.order_container{
	    position: fixed;
	    width: 100%;
	    height: calc(100% - 1.84rem);
	    z-index: 9;
	}
	.order_container .bg{
	    width: 100%;
	    height: 100%;
	    background: rgba(0,0,0,0.3);
	}
	.order_container ul{
	    position: absolute;
	    width: 100%;
	    top: 0;
	}
	.order_container li{
	    height: 0.89rem;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    line-height: 0.89rem;
	    font-size: 0.28rem;
	    color: #000;
	    background: #fff;
	}
	.order-enter-active, .order-leave-active {
	    transition: transform .2s;
	    -webkit-transition: transform .2s;
	}
	.order-enter, .order-leave-to {
	    transform: translateY(-100%);
	    -webkit-transform: translateY(-100%);
	}
	.ershouche_list_wrapper{
	    position: relative;
	    width: 100%;
	    height: calc(100% - 0.96rem);   
	}
	#ershouche_list_wrapper{
	    position: absolute;
	    height: 100%;
	    width: 100%;
	    top: 0;
	    overflow-y: scroll;
	    z-index: 1;   
	}
	.ershouche_list{
	    background: #fff;
	    margin-top: -1px;
	}
	.ershouche_list li{
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	}
	.ershouche_list li .card_list_item_content{
	    border: 0;
	    padding-top: 0.32rem;
	    border-top: 1px solid #efefef;
	}
	.card_list_item_content{
	    overflow: hidden;
	    padding-bottom: 0.32rem;
	    border-bottom: 1px solid #EFEFEF;
	}
	.card_list_item_content .iw{
	    float: left;
	    width: 3.2rem;
	    height: 2.4rem;
	}
	.card_list_item_content .iw img{
	    width: 100%;
	    height: 100%;
	}
	.card_list_item_content .des{
	    width: 3.34rem;
	    float: right;
	}
	.card_list_item_content .des .p1{
	    font-size: 0.32rem;
	    color: #000;
	    line-height: 0.42rem;
	}
	.card_list_item_content .des .p2{
	    color: #8A8F9B;
	    font-size: 0.22rem;
	}
	.card_list_item_content .des .p3{
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
	    margin-top: 0.1rem;
	}
	.card_list_item_content .des .p3 p{
		display: inherit;
	}
	.card_list_item_content .des .p3 label{
	    padding: 0.03rem 0.18rem;
	    display: inline-block;
	    color: #fff;
	    border-radius: 2px;
	    margin-right: 5px;
	    font-size: 0.22rem;
	}
	.card_list_item_content .des .p3 label.bg1{
	    background: #FF620C;
	}
	.card_list_item_content .des .p3 label.bg2{
	    background: #FF2F2F;
	}
	.card_list_item_content .des .p3 .state{
	    color: #8A8F9B;
	    font-size: 0.22rem;
	}
	.card_list_item_content .des .p4{
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
	    margin-top: 0.1rem;
	}
	.card_list_item_content .des .p4 .price{
	    color: #FF2F2F;
	    font-size: 0.24rem;
	}
	.card_list_item_content .des .p4 .price span{
	    font-size: 0.38rem;
	}
	.card_list_item_content .des .p4 .lianxi{
	    width: 1.4rem;
	    height: 0.46rem;
	    border-radius: 0.23rem;
	    background: #FF620C;
	    color: #fff;
	    font-size: 0.22rem;
	    text-align: center;
	    line-height: 0.46rem;
	}
	#unsatisfactory{
	    padding-top: 0.48rem;
	    padding-bottom: 0.48rem;
	    display: none;
	    background: #fff;
	}
	#unsatisfactory p{
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    line-height: 0.48rem;
	    text-align: center;
	}
	#unsatisfactory a{
	    display: block;
	    width: 1.61rem;
	    height: 0.46rem;
	    border-radius: 0.24rem;
	    color: #fff;
	    font-size: 0.22rem;
	    text-align: center;
	    line-height: 0.46rem;
	    margin: auto;
	    background: #FF620C;
	    margin-top: 0.24rem;
	}
	#loadMoreContainerW{
	    position: absolute;
	    top: 0;
	    left: 0;
	    height: 100%;
	    width: 100%;
	    background: rgba(0,0,0,0.3);
	    display: none;
	}
	#loadMoreContainer{
	    position: absolute;
	    height: 0.88rem;
	    width: 100%;
	    bottom: 0;
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
	#loadMoreContainer img{
	    width: 0.32rem;
	    height: 0.32rem;
	}
	#loadMoreContainer span{
	    color: #fff;
	    font-size: 0.24rem;
	}
</style>
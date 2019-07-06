<template>
	<div class="container">
		<header2></header2>
		
		<div class="ershouche_list_content">
		    <div style="height: 0.88rem;"></div>
			<div class="dis"></div>
			<div class="selection_list">
	        	<router-link class="selection_item" :to="{path: '/vehicleType', query: {from: 'findVehicle'}}" v-html="cheyuan"></router-link>
	        	<router-link class="selection_item" :to="{path: '/choiceBrand', query: {from: 'findVehicle'}}" v-html="pinpai"></router-link>
	        	<router-link class="selection_item" :to="{path: '/coty', query: {from: 'findVehicle'}}" v-html="cheling"></router-link>
	        	<router-link class="selection_item" :to="{path: '/filterPrice', query: {from: 'findVehicle'}}" v-html="jiage"></router-link>
	        	<span class="selection_item" @click="showOrderList()" id="order_btn" v-bind:class="[xuanzhuan=='xuanzhuan'?'active':'']" v-html="paixu1">{{paixu1}}</span>
			</div>
			<transition name="order">
				<div class="order_container" v-show="show">
					<div class="bg"></div>
					<ul>
						<li class="order_item" @click="paixu(1,'车况最好')">车况最好</li>
						<li class="order_item" @click="paixu(2,'价格最低')">价格最低</li>
						<li class="order_item" @click="paixu(3,'价格最高')">价格最高</li>
						<li class="order_item" @click="paixu(4,'车龄最短')">车龄最短</li>
						<li class="order_item" @click="paixu(5,'里程最小')">里程最小</li>
						<li class="order_item" @click="paixu(6,'最近上架')">最近上架</li>
					</ul>
				</div>
			</transition>
	    	<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
		        <mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore" :autoFill="false">
		        	<div slot="top" class="mint-loadmore-top">
			            <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
			            <span v-show="topStatus === 'loading'">
				            <mt-spinner type="snake"></mt-spinner>
				        </span>
			        </div>
					<ul class="ershouche_list" id="ershouche_list">
						<li v-for="(item,index) in vehicleData" @click="goDetails(item.id)">							
							<div class="card_list_item_content">
								<div class="iw"><img :src="http + item.img"></div>
								<div class="des">
									<p class="p1">{{item.carname}}</p>
									<p class="p2">{{item.boarding_time}} / {{item.driven_distance}} 万公里 / {{item.city}}</p>
									<div class="p3">
										<p>
										    <template v-for="(subitem,index) in item.typename">
											    <label class="bg1" v-if="subitem != '急售'">{{subitem}}</label>
											    <label class="bg2" v-if="subitem == '急售'">{{subitem}}</label>
											</template>
										</p>
										<div class="state">车况:{{item.car_score}}</div>
									</div>
									<div class="p4">
										<div class="price"><span>{{item.wholesale_money}}</span>万</div>
										<div class="lianxi" @click="call(item.id,item.usertel)">联系卖家</div>
									</div>
								</div>
							</div>							
						</li>					
					</ul>
					<div id="unsatisfactory" v-show="publishSeek">
						<p>没有满意的车？发布求购，<br>车源自己来找你</p>
						<a href="">去求购试试</a>
					</div>
					<div slot="bottom" class="mint-loadmore-bottom">
			            <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
			            <span v-show="bottomStatus === 'loading'">
				            <mt-spinner type="snake"></mt-spinner>
				        </span>
			        </div>
				</mt-loadmore>
			</div>		
		</div>
		<lianxi @call="pcall" @callClose="pcallClose" @weilianxi="pweilianxi" @yilianxi="pyilianxi" @seeClose="pseeClose" :halfShow="phalfShow" :bodaShow="pbodaShow" :lianxiShow="plianxiShow" :seeShow="pseeShow" :carid="carid" :phoneNum="pphoneNum"></lianxi>
	</div>
</template>

<script>
    import header2 from '@/components/header2'
    import lianxi from '@/components/lianxi'
	export default{
		name: 'findVehicle',
		data(){
			return{
				token: localStorage.getItem('myToken'),
				http: this.$http,
				show: false,
				xuanzhuan: "",
				vehicleData: [],
				once: true,
				lmh: "",
				LoadMore: true,
				tl: 150,
				loading: false,
				allLoaded: false,
                bottomStatus: '',
                wrapperHeight: 0,
                topStatus: '',
		        translate: 0,
		        moveTranslate: 0,
		        page: 1,
		        pagenum: 15,
		        publishSeek: false,
		        st: 0,
		        cheyuan: '<span class="span1">车源</span><span class="span2"></span>',
		        pinpai: '<span class="span1">品牌</span><span class="span2"></span>',
		        cheling: '<span class="span1">车龄</span><span class="span2"></span>',
		        jiage: '<span class="span1">价格</span><span class="span2"></span>',
		        paixu1: '<span class="span1">排序</span><span class="span2"></span>',
		        carid: '',
                qxscShow: false,
                phalfShow: false,
                pbodaShow: false,
                plianxiShow: false,
                pseeShow: false,
                pphoneNum: ''
			}
		},
		created(){
			var _this = this;
			console.log("创建",this.filterData.data)
			var data = this.requestData(this.filterData.data.sort.id)
			if(this.$route.params.from == 'wholesaleVehicle'){
				this.$fetchPost('/wholCarSource',data).then(function(res){
					console.log(res)
					_this.vehicleData = res.data.data;
					// _this.$refs.loadmore.onTopLoaded();
					if(res.data.total < _this.pagenum){
						_this.publishSeek = true;
						_this.allLoaded = true;
					}
					
				})
			}
            //改变筛选项的说明文字
			let initData = this.filterData.data;
			if(initData.cartype.text != ''){
				this.cheyuan = '<span class="span3">'+ initData.cartype.text +'</span>'
			}
			let brandText = '';
			if(initData.brand.id == ''){
				
			}else if(initData.brand.id == 0){
				brandText = '不限';
			}else{
				brandText = initData.brand.text;
			};
			if(initData.series.id == '' || initData.series.id == 0){
				
			}else{
				brandText += '-' + initData.series.text;
			};
			if(initData.spec.id == '' || initData.spec.id == 0){

			}else{
				brandText += '-' + initData.spec.text;
			};
			
			if(brandText != ''){
				console.log(brandText)
				this.pinpai = '<span class="span3">'+ brandText +'</span>'
			}
			if(initData.age != ''){
				this.cheling = '<span class="span3">'+ initData.age +'</span>'
			}
			if(initData.price != ''){
				this.jiage = '<span class="span3">'+ initData.price +'</span>'
			}
			if(initData.sort.text != ''){
				this.paixu1 = '<span class="span3">'+ initData.sort.text +'</span>'
			}
		},
		mounted(){
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.offsetTop;	
		},
		activated(){
            this.$refs.wrapper.scrollTop = this.st;
		},
		deactivated(){

		},
		beforeRouteLeave (to, from, next){
			console.log(to)
		    if(to.name == "vehicleDetails" || to.name == "jubao"){
		    	from.meta.keepAlive = true;
		    }else{
		    	from.meta.keepAlive = false;
		    }
		    next();
		},
		computed: {
		    filterData(){
		   	    return this.$store.state.vehicleList
		    }
		},
		components:{header2,lianxi},
		methods:{
			showOrderList: function(){
				this.show = !this.show;
				if(this.xuanzhuan == ""){
					this.xuanzhuan = "xuanzhuan";
				}else{
					this.xuanzhuan = ""
				}
			},
			paixu: function(id,text){
				this.$store.commit('vehicleList/changeSort',{sortId: id, sortName: text});
				this.paixu1 = '<span class="span3">'+ text +'</span>'
				var _this = this;
				var data = this.requestData(id)
				if(this.$route.params.from == 'wholesaleVehicle'){
					this.$fetchPost('/wholCarSource',data).then(function(res){
						console.log(res)
						_this.vehicleData = res.data.data;
						_this.$refs.loadmore.onTopLoaded();
						if(res.data.total < _this.pagenum){
							_this.publishSeek = true;
							_this.allLoaded = true;
						}
						_this.show = !_this.show;
					})
				}
			},
			handleBottomChange(status) {
		        this.bottomStatus = status;
		    },
		    loadBottom() {
		        var _this = this;
				var data = this.requestData(this.filterData.data.sort.id)
				if(this.$route.params.from == 'wholesaleVehicle'){
					this.$fetchPost('/wholCarSource',data).then(function(res){
						console.log(res)
						if(res.data.total < _this.pagenum){
							_this.vehicleData = _this.vehicleData.concat(res.data.data);
							_this.$refs.loadmore.onBottomLoaded();
							_this.publishSeek = true;
							_this.allLoaded = true;
						}else{
							if(_this.vehicleData.length < res.data.total){
								_this.vehicleData = _this.vehicleData.concat(res.data.data);
							    _this.$refs.loadmore.onBottomLoaded();
							}else{
								_this.publishSeek = true;
								_this.allLoaded = true;
								_this.$refs.loadmore.onBottomLoaded();
							}
						}									
					})
				}
				this.page++;
				
		    },
		    handleTopChange(status) {
		        this.moveTranslate = 1;
		        this.topStatus = status;
		    },
		    translateChange(translate) {
		        const translateNum = +translate;
		        this.translate = translateNum.toFixed(2);
		        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
		    },
		    loadTop() {
		        var _this = this;
		        this.publishSeek = false;
				var data = this.requestData(this.filterData.data.sort.id)
				if(this.$route.params.from == 'wholesaleVehicle'){
					this.$fetchPost('/wholCarSource',data).then(function(res){
						console.log(res)
						_this.vehicleData = res.data.data;
						_this.$refs.loadmore.onTopLoaded();
						if(res.data.total < _this.pagenum){
							_this.publishSeek = true;
							_this.allLoaded = true;
						}
						
					})
				}
		    },
		    goDetails: function(id){
		    	this.st = this.$refs.wrapper.scrollTop;
		    	this.$router.push({path: '/vehicleDetails', query: {from: 'findVehicle',id: id}})
		    },
		    requestData: function(sort){
		    	var data = {
					token: this.token,
					province: this.filterData.data.province,
					search: this.filterData.data.search,
					city: this.filterData.data.city.id,
					market: this.filterData.data.market.id,
					brand: this.filterData.data.brand.id,
					series: this.filterData.data.series.id,
					spec: this.filterData.data.spec.id,
					minage: this.filterData.data.minage,
					maxage: this.filterData.data.maxage,
					minprice: this.filterData.data.minprice,
					maxprice: this.filterData.data.maxprice,
					minmileage: this.filterData.data.minmileage,
					maxmileage: this.filterData.data.maxmileage,
					transmissioncase: this.filterData.data.transmissioncase.id,
					mindisplacement: this.filterData.data.mindisplacement,
					maxdisplacement: this.filterData.data.maxdisplacement,
					color: this.filterData.data.color.id,
					cartype: this.filterData.data.cartype.id,
					sort: sort,
					page: 1,
					pagenum: this.pagenum
				}
				return data
		    },
		    call: function(id,tel){
		    	this.st = this.$refs.wrapper.scrollTop;
		    	event.stopPropagation();
		    	this.carid = id;
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
		}
	}
</script>

<style scoped>
	.container{
		height: 100%;
	}
	.ershouche_list_content{
	    /*margin-top: 0.88rem;
	    height: calc(100% - 0.88rem);*/
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
	.page-loadmore-wrapper{
		overflow: scroll;
	}
	#ershouche_list_wrapper{
	    position: relative;
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
	.mint-spinner {
	    display: inline-block;
	    vertical-align: middle;
	}
	.mint-loadmore-bottom span{
	    display: inline-block;
        transition: .2s linear;
        vertical-align: middle;
        font-size: 0.44rem;
	}
	.mint-loadmore-bottom span.is-rotate{
		transform: rotate(180deg);
	}
	.mint-loadmore-top span{
	    display: inline-block;
        transition: .2s linear;
        vertical-align: middle;
        font-size: 0.44rem;
	}
	.mint-loadmore-top span.is-rotate{
		transform: rotate(180deg);
	}
</style>

<style>
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
	.selection_list .selection_item .span3 {
	    white-space: nowrap;
	    overflow: hidden;
	    text-overflow: ellipsis;
	    font-size: 0.28rem;
	    line-height: 0.3rem;
	    color: #000;
	    text-align: center;
	}
</style>
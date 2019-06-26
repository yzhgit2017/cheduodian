<template>
	<div>
		<header1 v-bind:title="title"></header1>
		<div class="pad"></div>
		<div class="record_tab sc">
			<div class="item sc" v-bind:class="[state == 1 ? 'active' : '']" @click="choice(1)">在售</div>
			<div class="item sc" v-bind:class="[state == 2 ? 'active' : '']" @click="choice(2)">已售</div>
			<div class="item sc" v-bind:class="[state == 3 ? 'active' : '']" @click="choice(3)">下架</div>
		</div>
		<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore" :autoFill="false">
	        	<div slot="top" class="mint-loadmore-top">
		            <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
		            <span v-show="topStatus === 'loading'">
			            <mt-spinner type="snake"></mt-spinner>
			        </span>
		        </div>
				<ul class="record_list global_ul_list" ref="list">
					<li v-for="(item,index) in myVehicleData" v-bind:key="item.id" @click="goDetails(item.id)">
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
									<div class="lianxi">设为急售</div>
								</div>
							</div>
						</div>
						<div class="caozuo cy" v-if="state == 1">
							<div class="del" @click="tiaojia(item.id)">调价</div>
							<div class="del" @click="xiajia(item.id)">下架</div>
							<div class="del" @click="chengjiao(item.id)">成交</div>
							<div class="del" @click="bianji(item.id)">编辑</div>
						</div>
						<div class="caozuo cy" v-if="state == 2" style="webkit-justify-content: flex-end;justify-content: flex-end;">
							<div class="del" @click="del(item.id)">删除</div>
						</div>
						<div class="caozuo cy" v-if="state == 3">
							<div class="del" @click="tiaojia(item.id)">调价</div>
							<div class="del" @click="del(item.id)">删除</div>
							<div class="del" @click="shangjia(item.id)">上架</div>
							<div class="del" @click="bianji(item.id)">编辑</div>
						</div>
					</li>	
				</ul>
				<!-- <div class="global_bottom_tishi">
					<p>暂无更多数据</p>
				</div> -->
				<div slot="bottom" class="mint-loadmore-bottom">
		            <span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">↑</span>
		            <span v-show="bottomStatus === 'loading'">
			            <mt-spinner type="snake"></mt-spinner>
			        </span>
		        </div>
			</mt-loadmore>
		</div>
		<div class="half" v-show="halfShow"></div>
	  	<div class="dialog" v-show="newPriceShow">
		    <p class="tantit1">请输入价格<i class="icon iconfont icon-cuowu guanbi" @click="tiaojiaClose()"></i></p>
		   	<div class="myMiddleText"><p class="editPrice"><input type="text" name="" placeholder="请输入最新价格" style="font-size: 0.26rem;text-align: center;width: 2rem;" v-model="newPrice"><label style="color: #000;font-size: 0.26rem;">万元</label></p></div>
		    <p class="putong"><span class="xquxiao" @click="tiaojiaClose()">取消</span><a href="javascript:;" @click="tiaojiaConfirm()">确定</a></p>
	  	</div>
	  	<div class="dialog" v-show="downPriceShow">
		    <p class="tantit1">请输入价格<i class="icon iconfont icon-cuowu guanbi" @click="chengjiaoClose()"></i></p>
		   	<div class="myMiddleText"><p class="editPrice"><input type="text" name="" placeholder="请输入成交价格" style="font-size: 0.26rem;text-align: center;width: 2rem;" v-model="downPrice"><label style="color: #000;font-size: 0.26rem;">万元</label></p></div>
		    <p class="putong"><span class="xquxiao" @click="chengjiaoClose()">取消</span><a href="javascript:;" @click="chengjiaoConfirm()">确定</a></p>
	  	</div>
	  	<div class="dialog" v-show="xiajiaShow">
		    <p class="tantit1">提示<i class="icon iconfont icon-cuowu guanbi" @click="xiajiaClose()"></i></p>
		   	<div class="myMiddleText"><p style="font-size: 0.3rem;color: #000;">是否确定下架？</p></div>
		    <p class="putong"><span class="xquxiao" @click="xiajiaClose()">取消</span><a href="javascript:;" @click="xiajiaConfirm()">确定</a></p>
	  	</div>
	  	<div class="dialog" v-show="shangjiaShow">
		    <p class="tantit1">提示<i class="icon iconfont icon-cuowu guanbi" @click="shangjiaClose()"></i></p>
		   	<div class="myMiddleText"><p style="font-size: 0.3rem;color: #000;">是否确定上架？</p></div>
		    <p class="putong"><span class="xquxiao" @click="shangjiaClose()">取消</span><a href="javascript:;" @click="shangjiaConfirm()">确定</a></p>
	  	</div>
	  	<div class="dialog" v-show="delShow">
		    <p class="tantit1">提示<i class="icon iconfont icon-cuowu guanbi"></i></p>
		   	<div class="myMiddleText"><p style="font-size: 0.3rem;color: #000;">是否确定删除？</p></div>
		    <p class="putong"><span class="xquxiao">取消</span><a href="javascript:;" onclick="shanchuConfirm()">确定</a></p>
	  	</div>
	  	<div class="dialog" v-show="duobiShow">
		    <p class="tantit1">提示<i class="icon iconfont icon-cuowu guanbi"></i></p>
		   	<div class="myMiddleText"><p style="font-size: 0.3rem;color: #000;">多币不足</p></div>
		    <p class="putong bzguanbi" style="font-size:0.3rem;color: #fff;background: #FF620C">确定</p>
	  	</div>
	</div>
</template>

<script>
    import header1 from '@/components/header1'
	export default{
		name: 'myVehicle',
		data(){
			return {
				title: '我的车源',
				myVehicleData: [],
				topStatus: '',
		        wrapperHeight: 0,
		        translate: 0,
		        moveTranslate: 0,
		        allLoaded: false,
                bottomStatus: '',
                token: localStorage.getItem('myToken'),
                page: 1,
                pagenum: 15,
                http: this.$http,
                state: 1,
                st: 0,
                halfShow: false,
                newPriceShow: false,
                downPriceShow: false,
                xiajiaShow: false,
                shangjiaShow: false,
                delShow: false,
                duobiShow: false,
                newPrice: '',
                downPrice: '',
                carid: ''
			}
		},
		components:{header1},
		mounted(){
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.offsetTop;	
		},
		activated(){
            this.$refs.wrapper.scrollTop = this.st;
		},
		deactivated(){

		},
		created() {
			const that = this;
	        const data = this.requestData(1);
	        this.$fetchPost('/getPersonalCardata',data).then(function(res){
				console.log(res)
				if(res.code == 1){
					that.myVehicleData = res.data.data;
					if(res.data.total < that.pagenum){
						that.allLoaded = true;
					}
				}
			})
	    },
		methods: {
		    translateChange(translate) {
		        const translateNum = +translate;
		        this.translate = translateNum.toFixed(2);
		        this.moveTranslate = (1 + translateNum / 70).toFixed(2);
		    },
		    handleTopChange(status) {
		        this.moveTranslate = 1;
		        this.topStatus = status;
		    },
		    handleBottomChange(status) {
		        this.bottomStatus = status;
		    },
		    loadTop() {
		    	this.page = 1;
		    	const that = this;
	            const data = this.requestData(this.state);
	            this.$fetchPost('/getPersonalCardata',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						that.myVehicleData = res.data.data;
						if(res.data.total < that.pagenum){
							that.allLoaded = true;
						}
					}
					that.$refs.loadmore.onTopLoaded();
				})
		    },
		    loadBottom() {
		    	this.page++;
		    	const that = this;
	            const data = this.requestData(this.state);
	            this.$fetchPost('/getPersonalCardata',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						if(res.data.total < that.pagenum){
							that.allLoaded = true;
						}else{
							that.myVehicleData = that.myVehicleData.concat(res.data.data);
						}
					}
					that.$refs.loadmore.onBottomLoaded()
				})
		    },
		    requestData: function(type) {
		    	var data = {
					token: this.token,
					type: type,
					search: '',
					province: '',
					city: '',
					market: '',
					brand: '',
					series: '',
					spec: '',
					minage: '',
					maxage: '',
					minprice: '',
					maxprice: '',
					minmileage: '',
					maxmileage: '',
					transmissioncase: '',
					mindisplacement: '',
					maxdisplacement: '',
					color: '',
					cartype: '',
					page: this.page,
					pagenum: this.pagenum
				};
				return data
		    },
		    choice: function(bs){
		    	this.state = bs;
		    	this.myVehicleData = [];
		    	this.shuaxinData(bs);
		    },
		    shuaxinData: function(type){
		    	const that = this;
		        const data = this.requestData(type);
		        this.$fetchPost('/getPersonalCardata',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						that.myVehicleData = res.data.data;
						if(res.data.total < that.pagenum){
							that.allLoaded = true;
						}
					}	
				})
		    },
		    goDetails: function(id){
		    	this.st = this.$refs.wrapper.scrollTop;
		    	this.$router.push("/vehicleDetails/"+ id +"")
		    },
            xiugaiData: function(){
            	this.page = 1;
		    	const that = this;
	            const data = this.requestData(this.state);
	            // console.log(that.$refs.list.parentNode.style)
	            // that.$refs.list.parentNode.style.transform = "translate3d(0px, 50px, 0px)";
	            this.$fetchPost('/getPersonalCardata',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						that.myVehicleData = res.data.data;
						if(res.data.total < that.pagenum){
							that.allLoaded = true;
						}
					}
					if(res.code == 0){
						that.myVehicleData = [];
					}
					that.$refs.loadmore.onTopLoaded();
				})
            },
		    tiaojia: function(id){
		    	event.stopPropagation();
		    	this.halfShow = true;
		    	this.newPriceShow = true;
		    	this.carid = id;
		    },
		    tiaojiaClose: function(){
		    	this.halfShow = false;
		    	this.newPriceShow = false;
		    },
		    tiaojiaConfirm: function(){
		    	this.$store.commit('vehicleList/changeLoadingState',true);
		    	const that = this;
		    	this.$fetchPost('/CarSourceMoney',{token: this.token,gid: this.carid,money: this.newPrice}).then(function(res){
					console.log(res)
					if(res.code == 1){
						that.$store.commit('vehicleList/changeLoadingState',false);
						that.halfShow = false;
		    	        that.newPriceShow = false;
						that.$myToast({
							message: '成功',
							type: 'success'
						})
						that.xiugaiData();
					}else{
						that.$myToast({
							message: res.msg,
							type: 'error'
						})
					}
				})
		    },
		    chengjiao: function(id){
		    	event.stopPropagation();
		    	this.halfShow = true;
		    	this.downPriceShow = true;
		    	this.carid = id;
		    },
		    chengjiaoClose: function(){
		    	this.halfShow = false;
		    	this.downPriceShow = false;
		    },
		    chengjiaoConfirm: function(){
		    	this.$store.commit('vehicleList/changeLoadingState',true);
		    	const that = this;
		    	this.$fetchPost('/CarSourceEnd',{token: this.token,gid: this.carid,money: this.downPrice}).then(function(res){
					console.log(res)
					if(res.code == 1){
						that.$store.commit('vehicleList/changeLoadingState',false);
						that.halfShow = false;
		    	        that.downPriceShow = false;
						that.$myToast({
							message: '成功',
							type: 'success'
						})
						that.xiugaiData();
					}else{
						that.$myToast({
							message: res.msg,
							type: 'error'
						})
					}
				})
		    },
		    xiajia: function(id){
		    	event.stopPropagation();
		    	this.halfShow = true;
		    	this.xiajiaShow = true;
		    	this.carid = id;
		    },
		    xiajiaClose: function(){
		    	this.halfShow = false;
		    	this.xiajiaShow = false;
		    },
		    xiajiaConfirm: function(){
		    	this.$store.commit('vehicleList/changeLoadingState',true);
		    	const that = this;
		    	this.$fetchPost('/CarSourceDown',{token: this.token,gid: this.carid,type: 2}).then(function(res){
					console.log(res)
					if(res.code == 1){
						that.$store.commit('vehicleList/changeLoadingState',false);
						that.halfShow = false;
		    	        that.xiajiaShow = false;
						that.$myToast({
							message: '成功',
							type: 'success'
						})
						that.xiugaiData();
					}else{
						that.$myToast({
							message: res.msg,
							type: 'error'
						})
					}
				})
		    },
		    shangjia: function(id){
		    	event.stopPropagation();
		    	this.halfShow = true;
		    	this.shangjiaShow = true;
		    	this.carid = id;
		    },
		    shangjiaClose: function(){
		    	this.halfShow = false;
		    	this.shangjiaShow = false;
		    },
		    shangjiaConfirm: function(){
		    	this.$store.commit('vehicleList/changeLoadingState',true);
		    	const that = this;
		    	this.$fetchPost('/CarSourceDown',{token: this.token,gid: this.carid,type: 1}).then(function(res){
					console.log(res)
					if(res.code == 1){
						that.$store.commit('vehicleList/changeLoadingState',false);
						that.halfShow = false;
		    	        that.shangjiaShow = false;
						that.$myToast({
							message: '成功',
							type: 'success'
						})
						that.xiugaiData();
					}else{
						that.$myToast({
							message: res.msg,
							type: 'error'
						})
					}
				})
		    },
		    bianji: function(id){
		    	event.stopPropagation();
		    	const that = this;
		    	this.$fetchGet('/editCarSource',{params: {token: this.token,gid: id}}).then(function(res){
					console.log(res)
					if(res.code == 1){
						const car_color_id = [];
						const car_des = [];
						const car_style = [];
						const car_parts_id = [];
						const car_color = [];
						const car_condition_id = [];
						for(let index in res.data.car_condition){
							car_color_id.push(res.data.car_condition[index].car_color_id);
							car_des.push(res.data.car_condition[index].car_des);
							car_style.push(res.data.car_condition[index].car_style);
							car_parts_id.push(res.data.car_condition[index].car_parts_id);
							car_color.push(res.data.car_condition[index].car_color);
							car_condition_id.push(res.data.car_condition[index].id);
						}
						const data = {
							fengmian: res.data.car_info.img,
							photos: res.data.car_info.photos,
							brandName: res.data.car_info.model_name,
							brandId: res.data.car_info.model_id,
							seriesName: '',
							seriesId: res.data.car_info.series_id,
							specName: '',
							specId: res.data.car_info.model_id,
							colorName: res.data.car_info.color_name,
							colorId: res.data.car_info.color_id,
							val: res.data.car_info.gearbox_name,
							id: res.data.car_info.gearbox,
							marketName: res.data.car_info.market_name,
							marketId: res.data.car_info.market_id,
							vin: res.data.car_info.vin_code,
							pailiang: res.data.car_info.pailiang,
							licheng: res.data.car_info.driven_distance,
							car_color_id: car_color_id,
							car_des: car_des,
							car_style: car_style,
							car_parts_id: car_parts_id,
							car_color: car_color,
							car_condition_id: car_condition_id,
							pointNum: 0,
							pointData: car_style,
							chekuangMs: res.data.car_info.content,
							minPriceV: res.data.car_info.money,
							pifa: res.data.car_info.wholesale,
							pifajia: res.data.car_info.wholesale_money,
							yt: res.data.car_info.uses,
							dateText: res.data.car_info.boarding_time,
							p_unit: res.data.car_info.p_unit
						}
						that.$store.commit('publishCondition/init',data);
						that.$router.push({path: '/publishVehicle', query: {from: 'myVehicle',id: id}});
					}else{
						
					}
				})
		    }
		}
	}
</script>

<style scoped>
	.pad{
		height: 0.88rem;
	}
	.record_tab {
	    height: 0.76rem;
	    background: #fff;
	    position: relative;
	}
	.record_tab .item {
	    float: left;
	    width: 50%;
	    line-height: 0.76rem;
	    font-size: 0.28rem;
	    color: #000;
	    text-align: center;
	    position: relative;
	}
	.record_tab .item.sc {
	    width: 33.33%;
	}
	.record_tab .item.active {
	    color: #FF620C;
	}
	.record_tab .item.active::after {
	    content: "";
	    width: 0.46rem;
	    height: 4px;
	    background: #FF620C;
	    border-radius: 2px;
	    position: absolute;
	    bottom: 0;
	    left: 50%;
	    margin-left: -0.23rem;
	}
	.record_list li {
	    padding: 0.32rem;
	    position: relative;
	    background: #fff;
	    margin-top: 0.2rem;
	    overflow: hidden;
	}
	.card_list_item_content {
	    overflow: hidden;
	    padding-bottom: 0.32rem;
	    border-bottom: 1px solid #EFEFEF;
	}
	.record_list .caozuo {
	    height: 0.46rem;
	    margin-top: 0.32rem;
	}
	.record_list .caozuo.cy {
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
	.record_list .caozuo .del {
	    width: 1.4rem;
	    height: 0.46rem;
	    border-radius: 0.23rem;
	    border: 1px solid #8A8F9B;
	    box-sizing: border-box;
	    color: #8A8F9B;
	    font-size: 0.22rem;
	    float: right;
	    margin-left: 0.2rem;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    -webkit-box-pack: center;
	    -ms-flex-pack: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	}
	.card_list_item_content .iw {
	    float: left;
	    width: 3.1rem;
	    height: 2.4rem;
	    position: relative;
	}
	.card_list_item_content .iw img {
	    width: 100%;
	    height: 100%;
	}
	.card_list_item_content .des {
	    width: 3.24rem;
	    float: right;
	}
	.card_list_item_content .des .p1 {
	    font-size: 0.32rem;
	    color: #000;
	    line-height: 0.42rem;
	}
	.card_list_item_content .des .p2 {
	    color: #8A8F9B;
	    font-size: 0.22rem;
	}
	.card_list_item_content .des .p3 {
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
	.card_list_item_content .des .p3 label {
	    width: 0.73rem;
	    line-height: 0.43rem;
	    text-align: center;
	    display: inline-block;
	    color: #fff;
	    border-radius: 2px;
	    margin-right: 5px;
	    font-size: 0.22rem;
	}
	.card_list_item_content .des .p3 label.bg1 {
	    background: #FF620C;
	}
	.card_list_item_content .des .p3 .state {
	    color: #8A8F9B;
	    font-size: 0.22rem;
	}
	.card_list_item_content .des .p4 {
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
	.card_list_item_content .des .p4 .price {
	    color: #FF2F2F;
	    font-size: 0.24rem;
	}
	.card_list_item_content .des .p4 .price span {
	    font-size: 0.38rem;
	}
	.card_list_item_content .des .p4 .lianxi {
	    width: 1.4rem;
	    height: 0.46rem;
	    border-radius: 0.23rem;
	    background: #FF620C;
	    color: #fff;
	    font-size: 0.22rem;
	    text-align: center;
	    line-height: 0.46rem;
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
	.guanbi {
	    float: right;
	    font-size: 0.4rem !important;
	    color: #666666;
	}
	.myMiddleText {
	    height: 2.54rem;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    -webkit-box-pack: center;
	    -ms-flex-pack: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	}
	.myMiddleText .editPrice {
	    width: 4rem;
	    height: 0.8rem;
	    border-radius: 0.4rem;
	    box-sizing: border-box;
	    background: none;
	    border: 1px solid rgba(138,143,155,1);
	    text-align: center;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    -webkit-box-pack: center;
	    -ms-flex-pack: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	}
	.putong{
		overflow: hidden;
	    width: 100%;
	    height: 0.86rem;
	    line-height: 0.86rem;
	    text-align: center;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	}
	.putong .xquxiao{
		width: 50%;
	    height: 100%;
	    float: left;
	    background: #FFFFFF;
	    font-size: 0.3rem;
	    color: #8A8F9B;
	    border-top: 1px solid #EFEFEF;
	    box-sizing: border-box;
	}
	.putong a{
		width: 50%;
	    height: 100%;
	    float: left;
	    background: #FF620C;
		color: #FFFFFF;
        font-size: 0.3rem;
	}
	/*pull style*/
	.page-loadmore-wrapper{
		background: #f2f2f2;
		overflow-y: scroll;
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
	/*pull style*/
</style>
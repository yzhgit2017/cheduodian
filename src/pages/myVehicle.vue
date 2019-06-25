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
				<ul class="record_list global_ul_list">
					<li v-for="(item,index) in myVehicleData">
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
						<div class="caozuo cy">
							<div class="del tiaojia">调价</div>
							<div class="del xiajia">下架</div>
							<div class="del chengjiao">成交</div>
							<div class="del bianji">编辑</div>
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
                state: 1
			}
		},
		components:{header1},
		mounted(){
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.offsetTop;	
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
	            const data = this.requestData(this.bs);
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
	            const data = this.requestData(this.bs);
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
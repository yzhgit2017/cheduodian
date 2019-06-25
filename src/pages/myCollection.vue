<template>
	<div>
		<header1 v-bind:title="title"></header1>
		<div class="pad"></div>
		<div class="record_tab sc">
			<div class="item sc" style="width: 25%;" v-bind:class="[state == 0 ? 'active' : '']">未联系</div>
			<div class="item sc" style="width: 25%;" v-bind:class="[state == 3 ? 'active' : '']">已联系</div>
			<div class="item sc" style="width: 25%;" v-bind:class="[state == 1 ? 'active' : '']">已售</div>
			<div class="item sc" style="width: 25%;" v-bind:class="[state == 2 ? 'active' : '']">已下架</div>
		</div>
		<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore" :autoFill="false">
	        	<div slot="top" class="mint-loadmore-top">
		            <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
		            <span v-show="topStatus === 'loading'">
			            <mt-spinner type="snake"></mt-spinner>
			        </span>
		        </div>
				<ul class="global_ul_list" v-for="(item,index) in myCollectionData" v-bind:key="item.id">
					<div class="date">{{item.date}}</div>
					<ul class="record_list">
						<li style="margin-top:0;margin-bottom:0.2rem;" class="dateId_17" v-for="(subItem,index) in item.datalist" v-bind:key="subItem.id">
							<div class="card_list_item_content">
								<div class="iw">
									<img :src="http + subItem.img">
									<label class="kucunbianhao">{{subItem.id}}</label>
								</div>
								<div class="des">
									<p class="p1">{{subItem.carname}}</p>
									<p class="p2">{{subItem.boarding_time}} / {{subItem.driven_distance}} / {{subItem.city}}</p>
									<div class="p3">
										<p>
											<template v-for="(subsubitem,index) in subItem.typename">
											    <label class="bg1" v-if="subsubitem != '急售'">{{subsubitem}}</label>
											    <label class="bg2" v-if="subsubitem == '急售'">{{subsubitem}}</label>
											</template>
										</p>
										<div class="state">车况:{{subItem.car_score}}</div>
									</div>
									<div class="p4">
										<div class="price"><span>{{subItem.money}}</span>万</div>
										<div class="lianxi">联系卖家</div>
									</div>
								</div>
							</div>
							<div class="caozuo">
								<div class="del">取消收藏</div>
							</div>
						</li>
					</ul>
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
		name: 'myCollection',
		data(){
			return {
				title: '我的收藏',
				myCollectionData: [],
				topStatus: '',
		        wrapperHeight: 0,
		        translate: 0,
		        moveTranslate: 0,
		        allLoaded: false,
                bottomStatus: '',
                state: 0,
                token: localStorage.getItem('myToken'),
                page: 1,
                pagenum: 15,
                http: this.$http
			}
		},
		components:{header1},
		mounted(){
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.offsetTop;	
		},
		created() {
			const that = this;
	        const data = {token:this.token,type:this.state,page:this.page,pagenum:this.pagenum};
	        this.$fetchPost('/getCollectionList',data).then(function(res){
				console.log(res)
				if(res.code == 1){
					that.myCollectionData = res.list.data;
					if(res.list.total < that.pagenum){
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
	            const data = {token:this.token,type:this.state,page:this.page,pagenum:this.pagenum};
	            this.$fetchPost('/getCollectionList',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						that.myCollectionData = res.data.data;
						if(res.list.total < that.pagenum){
							that.allLoaded = true;
						}
					}
					that.$refs.loadmore.onTopLoaded();
				})
		    },
		    loadBottom() {
		    	this.page++;
		    	const that = this;
	            const data = {token:this.token,type:this.state,page:this.page,pagenum:this.pagenum};
	            this.$fetchPost('/getCollectionList',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						if(res.list.total < that.pagenum){
							that.allLoaded = true;
						}else{
							that.myCollectionData = that.myCollectionData.concat(res.data.data);
						}
					}
					that.$refs.loadmore.onBottomLoaded()
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
	.global_ul_list{
		position: relative;
	}
	.global_ul_list .date {
	    height: 0.85rem;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    line-height: 0.85rem;
	    font-size: 0.28rem;
	    color: #8A8F9B;
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
	.kucunbianhao {
	    position: absolute;
	    font-size: 0.14rem;
	    color: #fff;
	    bottom: 0;
	    right: 0;
	    background: rgba(0,0,0,0.5);
	    padding: 0.03rem 0.08rem;
	    border-top-left-radius: 2px;
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
	.card_list_item_content .des .p3 label.bg2 {
	    background: #FF2F2F;
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
    .record_list .caozuo {
	    height: 0.46rem;
	    margin-top: 0.32rem;
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
	.salesStatus {
	    color: #FFFEFE;
	    font-size: 0.26rem;
	    text-align: center;
	    background: #4FC473;
	    position: absolute;
	    width: 100px;
	    height: 20px;
	    top: 15px;
	    right: -25px;
	    line-height: 20px;
	    -ms-transform: rotateZ(45deg);
	    -moz-transform: rotateZ(45deg);
	    -webkit-transform: rotateZ(45deg);
	    -o-transform: rotateZ(45deg);
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
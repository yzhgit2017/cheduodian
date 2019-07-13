<template>
	<div>
		<header1 v-bind:title="title"></header1>
		<div class="pad"></div>
		<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore" :autoFill="false">
	        	<div slot="top" class="mint-loadmore-top">
		            <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
		            <span v-show="topStatus === 'loading'">
			            <mt-spinner type="snake"></mt-spinner>
			        </span>
		        </div>
				<ul class="record_list global_ul_list" v-for="(item,index) in activeData" :key="index">
					<div class="fuche" v-if="item.type == 1">
						<p class="fachebi">
							<span class="faspan1">{{item.title}}</span>
							<span class="chenum">{{item.total_num}}/{{item.sum_n_day}}</span>
							<img src="../assets/images/tishi1.png" class="tishi1">
							<template v-if="item.status == 0">
								<span class="weiwan yiwan2" v-if="item.total_num == item.sum_n_day">已完成</span>
								<span class="weiwan yiwan1" v-else>未完成</span>
							</template>
							<span class="weiwan yiwan2" v-else>已结束</span>
						</p>
						<p class="duofade">{{item.info}}</p>
						<p class="yifade">今日已发布车辆{{item.total_num}}次！<span class="yides">已得<span>{{item.total_money}}</span>多币</span></p>
					</div>
					<div class="fuche" v-if="item.type == 8">
						<p class="fachebi">
							<span class="faspan1">{{item.title}}</span>
							<span class="chenum">{{item.total_num}}/{{item.sum_n_day}}</span>
							<img src="../assets/images/tishi1.png" class="tishi1">
							<template v-if="item.status == 0">
								<span class="weiwan yiwan2" v-if="item.total_num == item.sum_n_day">已完成</span>
								<span class="weiwan yiwan1" v-else>未完成</span>
							</template>
							<span class="weiwan yiwan2" v-else>已结束</span>
						</p>
						<p class="duofade">{{item.info}}</p>
						<p class="yifade">今日已登录{{item.total_num}}次！<span class="yides">已得<span>{{item.total_money}}</span>多币</span></p>
					</div>
					<div class="fuche" v-if="item.type == 6">
						<p class="fachebi">
							<span class="faspan1">{{item.title}}</span>
							<span class="chenum">{{item.total_num}}/{{item.sum_n_day}}</span>
							<img src="../assets/images/tishi1.png" class="tishi1">
							<template v-if="item.status == 0">
								<span class="weiwan yiwan2" v-if="item.total_num == item.sum_n_day">已完成</span>
								<span class="weiwan yiwan1" v-else>未完成</span>
							</template>
							<span class="weiwan yiwan2" v-else>已结束</span>
						</p>
						<p class="duofade">{{item.info}}</p>
						<p class="yifade">今日已发布求购{{item.total_num}}次！<span class="yides">已得<span>{{item.total_money}}</span>多币</span></p>
					</div>
					<div class="fuche" v-if="item.type == 6">
						<p class="fachebi">
							<span class="faspan1">{{item.title}}</span>
							<span class="chenum">{{item.total_num}}/{{item.sum_n_day}}</span>
							<img src="../assets/images/tishi1.png" class="tishi1">
							<template v-if="item.status == 0">
								<span class="weiwan yiwan2" v-if="item.total_num == item.sum_n_day">已完成</span>
								<span class="weiwan yiwan1" v-else>未完成</span>
							</template>
							<span class="weiwan yiwan2" v-else>已结束</span>
						</p>
						<p class="duofade">{{item.info}}</p>
						<p class="yifade">今日已分享{{item.total_num}}次！<span class="yides">已得<span>{{item.total_money}}</span>多币</span></p>
					</div>
				</ul>
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

<script type="text/javascript">
	import header1 from '@/components/header1'
	export default{
		name: 'activeCenter',
		data(){
			return {
				title: '活动中心',
				activeData: [],
				topStatus: '',
		        wrapperHeight: 0,
		        translate: 0,
		        moveTranslate: 0,
		        allLoaded: false,
                bottomStatus: '',
                token: localStorage.getItem('myToken'),
                page: 1,
                pagenum: 15,
                city: localStorage.getItem('myRoomCityId')
			}
		},
		components:{header1},
		mounted(){
			console.log(document.documentElement.clientHeight,this.$refs.wrapper.offsetTop)
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.offsetTop;	
		},
		created() {
			const that = this;
	        const data = {token:this.token,page:this.page,pagenum:this.pagenum,city: this.city};
	        this.$fetchPost('/getActivity',data).then(function(res){
				console.log(res)
				if(res.code == 1){
					that.activeData = res.data.data;
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
	            const data = {token:this.token,page:this.page,pagenum:this.pagenum,city: this.city};
	            this.$fetchPost('/getActivity',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						that.activeData = res.data.data;
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
	            const data = {token:this.token,page:this.page,pagenum:this.pagenum,city: this.city};
	            this.$fetchPost('/getActivity',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						if(res.data.total < that.pagenum){
							that.allLoaded = true;
						}else{
							that.activeData = that.activeData.concat(res.data.data);
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
		position: relative;
	}
	.fuche {
	    padding: 0.5rem 0.32rem;
	    border-bottom: 0.2rem solid #EEEFF0;
	}
	.faspan1 {
	    font-size: 0.3rem;
	    color: #333333;
	    margin-right: 0.1rem;
	    font-weight: bold;
	}
	.chenum {
	    font-size: 0.3rem;
	    color: #A4A7B0;
	}
	.tishi1 {
	    width: 0.28rem;
	    height: 0.28rem;
	    vertical-align: middle;
	    margin-bottom: 0.08rem;
	    margin-left: 0.15rem;
	}
	.weiwan {
	    width: 0.89rem;
	    height: 0.37rem;
	    line-height: 0.37rem;
	    font-size: 0.24rem;
	    float: right;
	    color: #FFFFFF;
	    text-align: center;
	}
	.yiwan1 {
	    background: url(../assets/images/weiwan.png)no-repeat;
	    background-size: 100%;
	}
	.yiwan2 {
	    background: url(../assets/images/yiwan.png) no-repeat;
	    background-size: 100%;
	}
	.duofade {
	    font-size: 0.28rem;
	    color: #333333;
	    margin-top: 0.15rem;
	}
	.yifade {
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    margin-top: 0.3rem;
	}
	.yides {
	    font-size: 0.28rem;
	    color: #333333;
	    float: right;
	}
	.yides span {
	    color: #FF620C;
	}
	/*pull style*/
	.page-loadmore-wrapper{
		background: #ffffff;
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
<template>
	<div>
		<header1 v-bind:title="title">
			<template v-slot:navRightBtn>
				<label style="font-size: .32rem;color: #FF620C;" @click="publishSeek()">发布求购</label>
			</template>
		</header1>
		<div class="pad"></div>
		<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<mt-loadmore :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded" :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange" ref="loadmore" :autoFill="false">
	        	<div slot="top" class="mint-loadmore-top">
		            <span v-show="topStatus !== 'loading'" :class="{ 'is-rotate': topStatus === 'drop' }">↓</span>
		            <span v-show="topStatus === 'loading'">
			            <mt-spinner type="snake"></mt-spinner>
			        </span>
		        </div>
				<ul class="record_list global_ul_list">
					<div class="daidiv1" v-for="(item,index) in mySeekData">
					    <p class="daitit">{{item.showname}}</p>
					    <p class="daicon">年限：{{item.minyear}}至{{item.maxyear}}</p>
					    <p class="daicon">电话：{{item.custel}}</p>
					    <p class="daicon" style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;">备注：{{item.note}}</p>
					    <p class="daitime">{{item.ctime}}</p>
					    <div class="dainan mySeek">
					    	<span class="an1">结束</span>
					    	<span class="an1">编辑</span>
					    	<span class="an1">删除</span>
					    	<span class="an2">联系求购客户</span>
					    </div>
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

<script>
    import header1 from '@/components/header1'
	export default{
		name: 'mySeek',
		data(){
			return {
				title: '我的求购',
				mySeekData: [],
				topStatus: '',
		        wrapperHeight: 0,
		        translate: 0,
		        moveTranslate: 0,
		        allLoaded: false,
                bottomStatus: '',
                token: localStorage.getItem('myToken'),
                page: 1,
                pagenum: 15,
			}
		},
		components:{header1},
		mounted(){
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.offsetTop;	
		},
		created() {
			const that = this;
	        const data = {token:this.token,page:this.page,pagenum:this.pagenum};
	        this.$fetchPost('/setMyselfWanttobuy',data).then(function(res){
				console.log(res)
				if(res.code == 1){
					that.mySeekData = res.data.data;
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
	            const data = {token:this.token,page:this.page,pagenum:this.pagenum};
	            this.$fetchPost('/setMyselfWanttobuy',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						that.mySeekData = res.data.data;
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
	            const data = {token:this.token,page:this.page,pagenum:this.pagenum};
	            this.$fetchPost('/setMyselfWanttobuy',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						if(res.data.total < that.pagenum){
							that.allLoaded = true;
						}else{
							that.mySeekData = that.mySeekData.concat(res.data.data);
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
	.daidiv1 {
	    border-bottom: 0.2rem solid #f2f2f2;
	    background: #fff;
	    padding-top: 0.4rem;
	}
	.daitit {
	    font-size: 0.3rem;
	    color: #333333;
	    font-weight: bold;
	    margin-bottom: 0.2rem;
	}
	.daidiv1 p {
	    padding: 0 0.32rem;
	}
	.daicon {
	    font-size: 0.28rem;
	    color: #333333;
	    line-height: 0.52rem;
	}
	.daitime {
	    line-height: 0.52rem;
	    font-size: 0.24rem;
	    color: #8A8F9B;
	}
	.dainan {
	    line-height: 0.82rem;
	    border-top: 1px solid #EFEFEF;
	    height: 0.92rem;
	}
	.dainan.mySeek {
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
	    padding: 0 0.32rem;
	}
	.an1 {
	    width: 1.4rem;
	    height: 0.46rem;
	    line-height: 0.46rem;
	    text-align: center;
	    border-radius: 0.23rem;
	    border: 1px solid #8A8F9B;
	    font-size: 0.22rem;
	    color: #8A8F9B;
	    display: inline-block;
	    margin-left: 0.32rem;
	    vertical-align: middle;
	}
	.dainan.mySeek .an1 {
	    margin-left: 0;
	}
	.an2 {
	    width: 1.81rem;
	    height: 0.46rem;
	    line-height: 0.46rem;
	    background: #FF620C;
	    color: #FFFFFF;
	    font-size: 0.22rem;
	    display: inline-block;
	    text-align: center;
	    border-radius: 0.23rem;
	    margin-left: 0.15rem;
	    vertical-align: middle;
	    border: 1px solid #FF620C;
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
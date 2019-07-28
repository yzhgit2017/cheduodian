<template>
	<div class="container">
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
				<ul class="record_list global_ul_list" style="background: #ffffff;">
					<div class="chaji" v-for="(item,index) in jiluData">
						<p class="chatit">{{item.manufacturer}}<span>{{item.status_name}}</span></p>
						<p class="chacon1">{{item.vin_code_name}}</p>
						<p class="chatime">
							{{item.ctimes}}
							<template v-if="item.status_name == '查询成功'">
								<a v-if="item.type == 1" @click="kanbaogao(1,item.id)">查看报告</a>
								<a v-else @click="kanbaogao(2,item.wap_url)">查看报告</a>
							</template>
						    <span v-else>{{item.money_status_name}}</span>
						</p>
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
		name: 'checkRecord',
		data(){
			return {
				title: '查询记录',
				topStatus: '',
		        wrapperHeight: 0,
		        translate: 0,
		        moveTranslate: 0,
		        allLoaded: false,
                bottomStatus: '',
				token: localStorage.getItem("myToken"),
				jiluData: [],
				page: 1,
				pagenum: 15
			}
		},
		components:{header1},
		mounted(){
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.offsetTop;
		},
		created() {
			const that = this;
	        const data = {token: this.token,pagenum: this.pagenum,page: this.page};
	        this.$fetchPost('/CarInquireList',data).then(function(res){
				console.log(res)
				if(res.code == 1){
					that.jiluData = res.data.data;
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
	            this.$fetchPost('/CarInquireList',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						that.jiluData = res.data.data;
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
	            this.$fetchPost('/CarInquireList',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						if(res.data.total < that.pagenum){
							that.allLoaded = true;
						}else{
							that.jiluData = that.jiluData.concat(res.data.data);
						}
					}
					that.$refs.loadmore.onBottomLoaded()
				})
		    },
		    kanbaogao: function(type,url){
				if(type == 1){

				}else{
					window.location.href = url;
				}
			}
	    }
	}
</script>

<style scoped>
	.container{
		background: #f2f2f2;
	}
	.pad{
		height: 0.88rem;
	}
	.chaji {
	    margin-left: 0.33rem;
	    border-bottom: 1px solid #EFEFEF;
	    padding-bottom: 0.35rem;
	}
	.chatit {
	    font-size: 0.3rem;
	    color: #333333;
	    line-height: 0.8rem;
	    font-weight: bold;
	    padding-top: 0.15rem;
	    height: 0.8rem;
	}
	.chatit span {
	    font-size: 0.26rem;
	    color: #9A9A9A;
	    float: right;
	    margin-right: 0.58rem;
	    font-weight: normal;
	}
	.chacon1 {
	    font-size: 0.28rem;
	    color: #333333;
	}
	.chatime {
	    font-size: 0.26rem;
	    color: #8A8F9B;
	    margin-top: 0.15rem;
	    position: relative;
	}
	.chatime a {
	    float: right;
	    width: 1.4rem;
	    height: 0.46rem;
	    line-height: 0.46rem;
	    border: 1px solid #FF620C;
	    border-radius: 0.23rem;
	    text-align: center;
	    font-size: 0.22rem;
	    color: #FF620C;
	    position: absolute;
	    right: 0.33rem;
	    bottom: 0.1rem;
	}
	.chatime span {
	    width: 1.4rem;
	    text-align: center;
	    font-size: 0.28rem;
	    color: #000000;
	    position: absolute;
	    right: 0.33rem;
	    bottom: 0.1rem;
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
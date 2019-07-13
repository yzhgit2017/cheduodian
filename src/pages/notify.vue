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
				<ul class="record_list global_ul_list" v-for="(item,index) in newnotifyData" :key="index">
					<dl class="xitongtz" v-if="item.type == 1">
					    <dt v-if="item.isread == 1"><img src="../assets/images/hdzx.png" class="msgIcon"></dt>
					    <dt v-else><img src="../assets/images/msg5.png" class="msgIcon"></dt>
					    <dd><p class="xitit textColor">系统通知<span class="textColor">{{item.ctime}}</span></p><p class="xicons textColor">{{item.content}}</p><i class="icon iconfont icon-youjiantou youjian"></i></dd>
					</dl>
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
		name: 'notify',
		data(){
			return {
				title: '消息通知',
				notifyData: [],
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
			console.log(document.documentElement.clientHeight,this.$refs.wrapper.offsetTop)
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.offsetTop;	
		},
		computed:{
			newnotifyData(){
				for (let i = 0; i < this.notifyData.length; i++) {
					if(this.notifyData[i].content == null){
						this.notifyData[i].content = "空"
					}else{
						if(this.notifyData[i].content.length > 45){
							this.notifyData[i].content = this.notifyData[i].content.substring(0,45) + "...";
						}else{
							
						}
					}
				}
				return this.notifyData
			}
		},
		created() {
			const that = this;
	        const data = {token:this.token,page:this.page,pagenum:this.pagenum};
	        this.$fetchPost('/getPersonalMessageList',data).then(function(res){
				console.log(res)
				if(res.code == 1){
					that.notifyData = res.list.data;
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
	            const data = {token:this.token,page:this.page,pagenum:this.pagenum};
	            this.$fetchPost('/getPersonalMessageList',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						that.notifyData = res.list.data;
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
	            const data = {token:this.token,page:this.page,pagenum:this.pagenum};
	            this.$fetchPost('/getPersonalMessageList',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						if(res.list.total < that.pagenum){
							that.allLoaded = true;
						}else{
							that.notifyData = that.notifyData.concat(res.list.data);
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
	.xitongtz {
	    margin: 0 0.32rem;
	    border-bottom: 1px solid #EFEFEF;
	    overflow: hidden;
	    padding-bottom: 0.25rem;
	}
	.xitongtz dt {
	    float: left;
	    width: 1.02rem;
	    margin-top: 0.1rem;
	}
	.xitongtz dt img {
	    width: 1.02rem;
	    height: 1.02rem;
	    border-radius: 50%;
	    vertical-align: middle;
	}
	.xitongtz dd {
	    float: left;
	    width: 5.6rem;
	    margin-top: 0.4rem;
	    margin-left: 0.24rem;
	    position: relative;
	}
	.xitit {
	    font-size: 0.32rem;
	    color: #333333;
	}
	.xitit span {
	    font-size: 0.26rem;
	    color: #8A8F9B;
	    float: right;
	}
	.xicons {
	    width: 4.5rem;
	    font-size: 0.26rem;
	    color: #8A8F9B;
	    margin-top: 0.1rem;
	    line-height: 0.42rem;
	}
	.youjian {
	    color: #999999;
	    position: absolute;
	    right: 0;
	    bottom: 0.05rem;
	    font-size: 0.3rem;
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
<template>
	<div>
		<div class="half" v-show="shalfShow"></div>
		<div class="dialog lianxidialog" v-show="sbodaShow">
	        <p class="tantit1">提示<i class="icon iconfont icon-cuowu guanbi" @click="callClose()"></i></p>
	        <div class="myMiddleText"><p style="font-size: 0.3rem;color: #000;text-align: center;" class="msg">是否拨打</p></div>
	        <p class="putong"><span class="xquxiao" @click="callClose()">取消</span><a href="javascript:;" @click="call()">拨打</a></p>
	    </div>
	    <div class="dialog bodadialog" v-show="slianxiShow">
	        <p class="tantit1">提示<i class="icon iconfont icon-cuowu guanbi" @click="weilianxi()"></i></p>
	        <div class="myMiddleText"><p style="font-size: 0.3rem;color: #000;text-align: center;">是否联系了卖家？</p></div>
	        <p class="putong"><span class="xquxiao" @click="weilianxi()">未联系</span><a href="javascript:;" @click="yilianxi()">已联系</a></p>
	    </div>
	    <div class="dialog seedialog" v-show="sseeShow">
	        <p class="tantit1">提示<i class="icon iconfont icon-cuowu guanbi" @click="seeClose()"></i></p>
	        <div class="myMiddleText"><p style="font-size: 0.3rem;color: #000;text-align: center;">是否准备看车？</p></div>
	        <p class="putong"><span class="xquxiao" style="border-right: 1px solid #EFEFEF;" @click="jubao()">举报</span><span class="xquxiao" style="border-bottom-left-radius: 0;" @click="seeClose()">不看车</span><a href="javascript:;" class="do" @click="seeVehicle()">看车</a></p>
	    </div>
	</div>
</template>

<script>
	export default{
		name: 'lianxi',
		data(){
			return {
				shalfShow: false,
				sbodaShow: false,
				slianxiShow: false,
				sseeShow: false,
				token: localStorage.getItem('myToken'),
			}
		},
		props: ['halfShow','bodaShow','lianxiShow','seeShow','carid','phoneNum'],
		mounted(){
			
			
		},
		methods: {
			call: function(){
				const that = this;
				window.location.href = "tel: "+ this.phoneNum +"";
				setTimeout(function(){
					that.sbodaShow = false;
					that.slianxiShow = true;
					that.$emit("call")
				},1000);
			},
			callClose: function(){
				this.shalfShow = false;
				this.sbodaShow = false;
				this.$emit("callClose");
			},
			weilianxi: function(){
				this.shalfShow = false;
				this.slianxiShow = false;
				this.$emit("weilianxi");
			},
			yilianxi: function(){
				this.slianxiShow = false;
				this.sseeShow = true;
				this.$emit("yilianxi");
				this.$fetchPost('/doPhone',{token: this.token,carid: this.carid}).then(function(res){
					console.log(res)
					
				})
			},
			seeClose: function(){
				this.sseeShow = false;
				this.shalfShow = false;
				this.$emit("seeClose");
			},
			seeVehicle: function(){
				const that = this;
				this.$fetchPost('/doIntercollection',{token: this.token,carid: this.carid}).then(function(res){
					console.log(res)
					if(res.code == 1){
						that.$myToast({
							message: res.msg,
							type: 'success'
						})
						that.sseeShow = false;
				        that.shalfShow = false;
				        that.$emit("seeClose");
					}else{
						that.$myToast({
							message: res.msg,
							type: 'warning'
						})
					}
				})
			},
			jubao: function(){
				this.$router.push({path: '/jubao', query: {id: this.carid}})
			}
		},
		watch: {
			halfShow(){
				this.shalfShow = this.halfShow;
			},
			bodaShow(){
				this.sbodaShow = this.bodaShow;
			},
			lianxiShow(){
				this.slianxiShow = this.lianxiShow;
			},
			seeShow(){
				this.sseeShow = this.seeShow;
			}
		}
	}
</script>

<style scoped>
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
	.putong {
	    overflow: hidden;
	    background: #FF620C;
	    width: 100%;
	    height: 0.86rem;
	    line-height: 0.86rem;
	    text-align: center;
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    border-bottom-right-radius: 0.1rem;
	    border-bottom-left-radius: 0.1rem;
	}
	.xquxiao {
	    width: 50%;
	    height: 100%;
	    float: left;
	    background: #FFFFFF;
	    border-bottom-left-radius: 0.1rem;
	    font-size: 0.3rem;
	    color: #8A8F9B;
	    border-top: 1px solid #EFEFEF;
	    box-sizing: border-box;
	}
	.putong a {
	    color: #FFFFFF;
	    font-size: 0.3rem;
	}
	.seedialog .xquxiao {
	    width: 33.33%;
	}
	.putong .do {
	    float: left;
	    width: 33.33%;
	    height: 100%;
	    text-align: center;
	    line-height: 0.86rem;
	}
</style>
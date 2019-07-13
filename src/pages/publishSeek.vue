<template>
	<div>
		<header1 v-bind:title="title"></header1>
		<div class="pad"></div>
		<div class="thisqiu">
			<div class="qiutit">求购车辆信息</div>
			<div class="qiucon1" @click="choiceBrand()">车型<span style="float:right;"><span style="max-width: 4rem;display: inline-block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;vertical-align: middle;">{{brandText}}</span><i class="icon iconfont icon-youjiantou"></i></span></div>
			<div class="qiucon1" @click="choiceCoty()">年限<span style="float: right;"><span>{{cotyText}}</span><i class="icon iconfont icon-youjiantou"></i></span></div>
			<div class="qiucon1" @click="choiceColor()">颜色<span style="float: right;"><span>{{colorText}}</span><i class="icon iconfont icon-youjiantou"></i></span></div>
		</div>
		<div class="thisqiu">
			<div class="qiutit" style="padding: 0 0.33rem;">买车人信息<span style="float: right;">客户信息仅自己可见</span></span></div>
			<div class="qiucon1">客户姓名<input type="text" maxlength="10" placeholder="请输入客户姓名" v-model="cusName"  @blur="cusNameSave()"/></div>
			<div class="qiucon1">客户电话<input type="text" placeholder="请输入客户电话" v-model="cusTel" @blur="cusTelSave()"/></div>
		</div>
		<div class="qiutit">备注</div>
		<textarea class="qiutext" placeholder="请描述客户需求" v-model="beizhu" @blur="beizhuSave()"></textarea>
		<div class="qiutit">悬赏急求</div>
		<div class="xuanshang"><a class="xuan1" v-bind:class="[xsstate == 2 ? 'active' : '']" @click="jiqiu(2)">不悬赏</a><a class="xuan1" v-bind:class="[xsstate == 1 ? 'active' : '']" @click="jiqiu(1)">悬赏{{pay}}多币</a></div>
		<div class="qiutit"></div>
		<div class="xfabu" @click="fabuqiugou()">发布求购</div>
		<!--弹出-->
		<div class="half" v-show="halfShow"></div>
	  	<div class="dialog" v-show="tishiShow">
		    <p class="tantit1">提示<i class="icon iconfont icon-cuowu guanbi"></i></p>
		    <p class="tancon1">由于多币不足，无法发布悬赏急求！ 请选择普通发布！ </p>
		    <p class="putong" @click="putongfabu()">普通发布</p>
	  	</div>
		<!--弹出-->
	</div>
</template>

<script>
	import header1 from '@/components/header1'
	export default{
		name: 'seekDetails',
		data(){
			return {
				title: '求购详情',
				brandText: '请选择车型',
				cotyText: '请选择年限范围',
				colorText: '请选择颜色',
				cusName: '',
				cusTel: '',
				beizhu: '',
				xsstate: '',
				token: localStorage.getItem("myToken"),
				pay: '',
				globalId: '',
				halfShow: false,
				tishiShow: false
			}
		},
		components:{header1},
		computed: {
		    publishSeekData(){
		   	    return this.$store.state.publishSeekCondition
		    }
		},
		mounted(){
			let initData = this.publishSeekData.data;
			if(initData.brand.id == '' || initData.brand.id == 0){
				this.brandText = '请选择车型';
			}else{
				this.brandText = initData.brand.text;
			};
			if(initData.series.id == '' || initData.series.id == 0){
				
			}else{
				this.brandText += '-' + initData.series.text;
			};
			if(initData.spec.id == '' || initData.spec.id == 0){

			}else{
				this.brandText += '-' + initData.spec.text;
			};
			if(initData.age == '' || initData.age == 0){
				this.cotyText = '请选择年限范围';
			}else{
				this.cotyText = initData.age;
			};
			if(initData.color.id == '' || initData.color.id == 0){
				this.colorText = '请选择颜色';
			}else{
				this.colorText = initData.color.text;
			};
			this.cusName = initData.cusName;
			this.cusTel = initData.cusTel;
			this.beizhu = initData.beizhu;
		},
		methods: {
			chaduobi: function(){
				let that = this;
				this.$fetchPost('/GetProductPricing',{token: this.token,keys:"buying_money"}).then(function(res){
					console.log(res)
					if(res.code == 1){
						this.pay = parseInt(res.data.money);
					}
				})
			},
			choiceBrand: function(){
				this.$router.push({path: '/choiceBrand', query: {from: 'publishSeek'}})
			},
			choiceCoty: function(){
				this.$router.push({path: '/coty', query: {from: 'publishSeek'}})
			},
			choiceColor: function(){
				this.$router.push({path: '/choiceColor', query: {from: 'publishSeek'}})
			},
			cusNameSave: function(){
				this.$store.commit('publishSeekCondition/changeName',{cusName: this.cusName});
			},
			cusTelSave: function(){
				this.$store.commit('publishSeekCondition/changeTel',{cusTel: this.cusTel});
			},
			beizhuSave: function(){
				this.$store.commit('publishSeekCondition/changeBeizhu',{beizhu: this.beizhu});
			},
			jiqiu: function(state){
				this.xsstate = state;
				this.$store.commit('publishSeekCondition/changexsstate',{xsstate: this.xsstate});
			},
			fabuqiugou: function(){
				if(this.brandText == "请选择车型"){
					this.$myToast({
						message: '请选择车型',
						type: 'warning'
					})
					return false
				}else if(this.cotyText == "请选择年限范围"){
					this.$myToast({
						message: '请选择年限范围',
						type: 'warning'
					})
					return false
				}else if(this.cotyText == "请选择颜色"){
					this.$myToast({
						message: '请选择颜色',
						type: 'warning'
					})
					return false
				}else{
					if(this.xsstate == 2){
						this.faburequest();
					}else{
						const that = this;
						this.$fetchPost('/SurplusMoney',{token: this.token,keys:"buying_money",money: this.pay}).then(function(res){
							console.log(res)
							if(res.code == 1){
								that.faburequest()
							}
							if(res.code == 218){
								this.halfShow = true;
								this.tishiShow = true;
							}
							if(res.code == 0){
								that.$myToast({
									message: res.msg,
									type: 'warning'
								})
							}
						})
					}
				}
			},
			putongfabu: function(){
				this.faburequest();
				this.halfShow = false;
				this.tishiShow = false;
			},
			faburequest: function(){
				let data = {
					token: this.token,
					type: this.$route.query.type,
					id: this.globalId,
					brand_id: this.publishSeekData.data.brand.id,
					series_id: this.publishSeekData.data.series.id,
					model_id: this.publishSeekData.data.spec.id,
					color_id: this.publishSeekData.data.color.id,
					minyear: this.publishSeekData.data.minage,
					maxyear: this.publishSeekData.data.maxage,
					is_sale: this.xsstate,
					note: this.beizhu,
					status: 1,
					customer: this.cusName,
					custel: this.cusTel,
					city_code: localStorage.getItem('myRoomCityId')
				};
				let that = this;
				this.$fetchPost('/setWanttobuy',data).then(function(res){
					console.log(res)
					if(res.code == 1){
						that.$myToast({
							message: '发布成功',
							type: 'success'
						})
						setTimeout(function(){
							that.$router.goBack();
						},1000)
					}else{
						that.$myToast({
							message: res.msg,
							type: 'warning'
						})
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
	.qiutit {
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    height: 0.87rem;
	    line-height: 0.87rem;
	    padding-left: 0.33rem;
	    background: #EEEFF0;
	}
	.qiucon1 {
	    font-size: 0.28rem;
	    color: #000000;
	    line-height: 0.89rem;
	    border-bottom: 1px solid #EFEFEF;
	    padding: 0 0.31rem;
	    height: 0.89rem;
	    overflow: hidden;
	}
	.qiucon1 span i {
	    margin-left: 0.05rem;
	}
	.qiucon1 input {
	    float: right;
	    line-height: 0.86rem;
	    text-align: right;
	    margin-right: 0.32rem;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	}
	.qiutext {
	    width: 100%;
	    box-sizing: border-box;
	    padding: 0.29rem 0.32rem;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    border: 0;
        outline: none;
	}
	.xuanshang {
	    height: 1.32rem;
	    line-height: 1.32rem;
	    text-align: center;
	}
	.xuan1 {
	    border: 1px solid #FF620C;
	    color: #FF620C;
	    margin: 0 0.21rem;
	}
	.xuanshang a {
	    font-size: 0.32rem;
	    width: 2.38rem;
	    height: 0.72rem;
	    line-height: 0.7rem;
	    text-align: center;
	    display: inline-block;
	    box-sizing: border-box;
	    border-radius: 0.36rem;
	    vertical-align: middle;
	}
	.xuan1.active {
	    background: #FF620C;
	    color: #FFFFFF;
	}
	.xfabu {
	    width: 100%;
	    background: #FF620C;
	    text-align: center;
	    height: 0.98rem;
	    line-height: 0.98rem;
	    position: relative;
	    color: #FFFFFF;
        font-size: 0.32rem
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
	    color: #FFFFFF;
	    font-size: 0.3rem;
	}
</style>
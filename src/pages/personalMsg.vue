<template>
	<div class="container">
		<header1 v-bind:title="title"></header1>
		<div class="pad"></div>
		<div class="lanmu1">资质照片</div>
		<input type="file" name="" @change="mentoutu()" hidden ref="mentoufile">
		<input type="file" name="" @change="qitatu()" hidden ref="qitafile">
		<div class="upload">
			<div class="upload_item" @click="uploadMT()">
				<template v-if="mturl == ''">
					<div class="icon"><img src="../assets/images/xiangjiIcon.png"></div>
					<p class="desc">上传门头照片</p>
				</template>
				<img v-else :src="http + mturl" style="width: 100%;height: 100%;">
			</div>
			<div class="upload_item" @click="uploadQT()">
				<template v-if="qturl == ''">
					<div class="icon"><img src="../assets/images/xiangjiIcon.png"></div>
					<p class="desc">上传其他照片</p>
				</template>
				<img v-else :src="http + qturl" style="width: 100%;height: 100%;">
			</div>
		</div>
		<div class="lanmu1">店铺信息</div>
		<div class="store_msg_w">
			<div class="store_msg_item">
				<div class="msg_left">店铺名称</div>
				<input type="text" placeholder="请输入店铺名称" @blur="saveStoreName()" v-model="storeName" maxlength="20"/>
			</div>
			<div class="store_msg_item">
				<div class="msg_left">负责人</div>
				<input type="text" placeholder="请输入负责人姓名" @blur="saveFuzeren()" v-model="fuzeren" maxlength="20"/>
			</div>
			<div class="store_msg_item">
				<div class="msg_left">联系电话</div>
				<input type="text" placeholder="请输入联系电话" @blur="saveTel()" v-model="tel" />
			</div>
			<router-link :to="{path: 'choiceCity', query: {from: 'personalMsg'}}">
				<div class="store_msg_item">
					<div class="msg_left">选择城市</div>
					<div class="msg_right"><label>{{city}}</label><img src="../assets/images/right_arrow.png" class="right_arrow"></div>
				</div>
			</router-link>
			<div class="store_msg_item" @click="goChoiceMarket()">
				<div class="msg_left">选择市场</div>
				<div class="msg_right"><label>{{market}}</label><img src="../assets/images/right_arrow.png" class="right_arrow"></div>
			</div>
			<router-link :to="{path: 'addAddress'}">
				<div class="store_msg_item" style="border-bottom: 0;">
					<div class="msg_left">详细地址</div>
					<div class="msg_right"><label>{{address}}</label><img src="../assets/images/right_arrow.png" class="right_arrow"></div>
				</div>
			</router-link>
			<div class="per_msg_submit" @click="tijiao()">提交注册</div>
		</div>
	</div>
</template>

<script>
    import header1 from '@/components/header1'
	export default{
		name: 'personalMsg',
		data(){
			return {
				token: localStorage.getItem('myToken'),
				title: '个人资料',
				http: this.$http,
				mturl: '',
				qturl: '',
				storeName: '',
				fuzeren: '',
				tel: '',
				city: '',
				market: '',
				address: '',
			}
		},
		components: {header1},
		computed: {
		    personalMsgData(){
		   	    return this.$store.state.registerMsg
		    }
		},
		mounted(){
			console.log(this.personalMsgData)
			this.mturl = this.personalMsgData.data.mturl;
			this.qturl = this.personalMsgData.data.qturl;
			this.storeName = this.personalMsgData.data.storeName;
			this.fuzeren = this.personalMsgData.data.fuzeren;
			this.tel = this.personalMsgData.data.tel;
			this.city = this.personalMsgData.data.city.text;
			this.market = this.personalMsgData.data.market.text;
			this.address = this.personalMsgData.data.address;
		},
		methods: {
			uploadMT: function(){
				this.$refs.mentoufile.click();
			},
			mentoutu: function(){
				const that = this;
				const file = event.target.files[0];
				let formdata = new FormData();
                formdata.append("file",file);
                this.$fetchPost('/upImages',formdata).then(function(res){
					console.log(res)
					if(res.error == 0){
						that.mturl = res.url;
						// that.$store.dispatch("registerMsg/changemturl",{mturl: res.url})
						that.$store.commit("registerMsg/changemturl",{mturl: res.url})
					}
				})
			},
			uploadQT: function(){
				this.$refs.qitafile.click();
			},
			qitatu: function(){
				const that = this;
				const file = event.target.files[0];
				let formdata = new FormData();
                formdata.append("file",file);
                this.$fetchPost('/upImages',formdata).then(function(res){
					console.log(res)
					if(res.error == 0){
						that.qturl = res.url;
						that.$store.commit("registerMsg/changeqturl",{qturl: res.url})
					}
				})
			},
			goChoiceMarket: function () {
				if(this.city == "城市"){
					this.$myToast({
						message: '请选择城市',
						type: 'warning'
					})
				}else{
					this.$router.push({path: '/choiceMarket',query: {from: 'personalMsg'}});
				}
			},
			saveStoreName: function(){
				this.$store.commit("registerMsg/changeStoreName",{storeName: this.storeName.trim()})
			},
			saveFuzeren: function(){
				this.$store.commit("registerMsg/changeFuzeren",{fuzeren: this.fuzeren.trim()})
			},
			saveTel: function(){
				this.$store.commit("registerMsg/changeTel",{tel: this.tel.trim()})
			},
			tijiao: function(){
				const regExp = /^(86)?((13\d{9})|(15[0,1,2,3,5,6,7,8,9]\d{8})|(17[0,1,2,3,5,6,7,8,9]\d{8})|(19[0,1,2,3,5,6,7,8,9]\d{8})|(14[0,1,2,3,5,6,7,8,9]\d{8})|(18[0,1,2,3,5,6,7,8,9]\d{8}))$/;
				if(this.mturl == ''){
					this.$myToast({
						message: '请选择门头图片',
						type: 'warning'
					})
					return false
				}else if(this.storeName == ''){
					this.$myToast({
						message: '请输入店铺名称',
						type: 'warning'
					})
					return false
				}else if(this.fuzeren == ''){
					this.$myToast({
						message: '请输入负责人',
						type: 'warning'
					})
					return false
				}else if(this.tel == ''){
					this.$myToast({
						message: '请输入联系电话',
						type: 'warning'
					})
					return false
				}else if(!regExp.test(this.tel)){
					this.$myToast({
						message: '电话格式不正确',
						type: 'warning'
					})
		    	    return false;
				}else if(this.city == '城市'){
					this.$myToast({
						message: '请选择城市',
						type: 'warning'
					})
		    	    return false;
				}else if(this.market == '二手车市场'){
					this.$myToast({
						message: '请选择二手车市场',
						type: 'warning'
					})
		    	    return false;
				}else if(this.address == ''){
					this.$myToast({
						message: '请选择二手车市场',
						type: 'warning'
					})
		    	    return false;
				}else{
				    const data = {
				    	token: this.token,
				    	shop_name: this.storeName,
				    	user_name: this.fuzeren,
				    	img: this.mturl,
				    	photo: this.qturl,
				    	user_tel: this.tel,
				    	province_id: this.personalMsgData.data.province,
				    	room_city: this.personalMsgData.data.city.id,
				    	market: this.personalMsgData.data.market.id,
				    	address: this.personalMsgData.data.address
				    };
				    const that = this;
					this.$fetchPost('/cdd_eduser',data).then(function(res){
						console.log(res)
						if(res.code == 1){
							that.$myToast({
								message: res.msg,
								type: 'success'
							})
						};
						setTimeout(function(){
							that.$router.push({path: '/login'});
						},1000)			
					})
				}
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100%;
		overflow-y: scroll;
	}
	.pad{
		height: 0.88rem;
	}
	.lanmu1 {
	    height: 0.82rem;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    line-height: 0.82rem;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    background: #f2f2f2;
	}
	.upload {
	    padding: 0.32rem;
	    background: #fff;
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
	.upload_item {
	    width: 2.23rem;
	    height: 1.67rem;
	    background: #eee;
	    margin: 0 0.3rem;
	    position: relative;
	}
	.upload_item .icon {
	    margin-top: 0.25rem;
	    height: 0.6rem;
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
	.upload_item .icon img {
	    width: 0.44rem;
	    height: 0.37rem;
	}
	.upload_item p {
	    font-size: 0.22rem;
	    color: #000;
	    text-align: center;
	    line-height: 0.48rem;
	}
	.store_msg_w {
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    background: #fff;
	    padding-bottom: 0.6rem;
	}
	.store_msg_item {
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
	    padding: 0.3rem 0;
	    border-bottom: 1px solid #efefef;
	}
	.store_msg_item .msg_left {
	    font-size: 0.3rem;
	    line-height: 0.48rem;
	    color: #000;
	}
	.store_msg_item .msg_right {
	    font-size: 0.3rem;
	    line-height: 0.48rem;
	    color: #000;
	}
	.store_msg_item .msg_right label {
	    display: inline-block;
	    max-width: 4rem;
	}
	.store_msg_item .msg_right .right_arrow {
	    width: 0.15rem;
	    height: 0.28rem;
	    margin-left: 0.13rem;
	    vertical-align: middle;
	}
	.store_msg_item input {
	    font-size: 0.28rem;
	    color: #000;
	    text-align: right;
	}
	.per_msg_submit {
	    height: 0.9rem;
	    border-radius: 0.45rem;
	    line-height: 0.9rem;
	    text-align: center;
	    color: #fff;
	    background: #FF620C;
	    margin-top: 0.58rem;
	    font-size: 0.32rem;
	}
</style>
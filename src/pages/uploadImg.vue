<template>
	<div>
		<header1 v-bind:title="title">
			<template v-slot:navRightBtn>
				<label style="font-size: .32rem;color: #FF620C;" @click="save()">保存</label>
			</template>
		</header1>
		<div class="pad"></div>
		<div class="upload_img_content">
			<div class="title">最少上传六张图片</div>
			<input type="file" @change="uploadImg()" multiple name="" style="display: none;" ref="uploadFile">
			<div class="img_list">
			    <div class="iw fmiw" v-for="(item,index) in uploadImgData" :key="index" v-bind:class="[item.type == 1 ? 'active' : '']"  @touchstart="tsevent()" @touchend="teevent(index)">
			        <div class="uploadImgW"><img :src="http + item.url" class="carimg" style="height: 100%; opacity: 1;"></div>
			        <div class="fengmian"></div>
			        <img class="close" src="../assets/images/uic.png">
			    </div>
				<div class="upload_btn" @click="choiceImg()">
					<div class="icon"><img src="../assets/images/xiangjiIcon.png"></div>
					<p class="p1">上传图片</p>
					<p class="p2">({{uploadImgData.length}}/16)</p>
				</div>
				<div class="iw"></div>
			</div>
		</div>
		<div class="half" v-show="halfshow"></div>
	  	<div class="dialog" v-show="setshow">
		    <p class="tantit1">提示<i class="icon iconfont icon-cuowu guanbi" @click="close()"></i></p>
		   	<div class="myMiddleText"><p style="font-size: 0.3rem;color: #000;">{{tcText}}</p></div>
		    <p class="putong"><span class="xquxiao" @click="close()">取消</span><a href="javascript:;" @click="confirmSet()">确定</a></p>
	  	</div>
	</div>
</template>

<script>
    import header1 from '../components/header1'
	export default{
		name: 'uploadImg',
		data(){
			return {
				title: '上传图片',
				uploadImgData: ["../../static/images/car3.png","../../static/images/car4.png"],
				http: this.$http,
				num: 0,
				startTime: '',
				halfshow: false,
				setshow: false,
				imgIndex: 0,
				tcText: '',
				caozuo: '',
				fullsiu: ''
			}
		},
		components: { header1},
		methods: {
			choiceImg: function(){
				if(this.uploadImgData.length < 16){
					this.$refs.uploadFile.click();
				}else{
					this.$toast1({
						message: '最多上传16张图片'
					})
				}
			},
			uploadImg: function(){
				const cfiles = event.target.files;
				console.log(cfiles)
				const that = this;
				const xz = 16 - this.uploadImgData.length;
				this.num = 0;
				for (let i = 0; i < cfiles.length; i++) {
					if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(cfiles[i].name)){
				        alert("图片类型必须是.gif,jpeg,jpg,png中的一种")
			        }else{
			        	if(this.num < xz){
			        		let formdata = new FormData();
			                formdata.append("file",cfiles[i]);
			                this.$fetchPost('/upImages',formdata).then(function(res){
								console.log(res)
								if(res.error == 0){
									let item = {}
									item.url = res.url;
									if(that.uploadImgData.length == 0){
										item.type = 1;
									}else{
										item.type = 0;
									}
									that.uploadImgData.push(item);
								}
							})
							that.num++;
			        	}else{
			        		this.$toast1({
								message: '你选择的图片数量超出最大上传数'
							})
							return false
			        	}
			        	
			        }
				}
				
			},
			tsevent: function(){

				const time1 = new Date();
			    this.startTime = time1.getTime();
			},
			teevent: function(index){
				const time2 = new Date();
		        const endTime = time2.getTime();
		        this.imgIndex = index;
		        if(endTime - this.startTime > 500 && this.imgIndex != 0){
		        	this.setshow = true;
		        	this.halfshow = true;
		        	this.tcText = '是否设置此图片为封面？';
		        	this.caozuo = 'setfm';
		        }else{
		        	if(event.target.className == "close"){
		        		this.setshow = true;
				        this.halfshow = true;
						this.tcText = '是否删除此图片？';
				        this.caozuo = 'del'
		        	}else{
		        		this.fullsiu = this.uploadImgData[index].url;
			        	this.$singleImgZoom({
			        		url: this.http + this.fullsiu,
			        		index : index
			        	})		
		        	}
	        		        	
		        }
			},
			confirmSet: function(){
				if(this.caozuo == 'setfm'){
					for (let i = 0; i < this.uploadImgData.length; i++) {
	   					if(this.imgIndex == i){
	   						this.uploadImgData[i].type = 1;
	   					}else{
	   						this.uploadImgData[i].type = 0;
	   					}
	   				}
				}
   				if(this.caozuo == 'del'){
   					this.uploadImgData.splice(this.imgIndex,1);
   				}
   				this.halfshow = false;
   				this.setshow = false;
			},
			close: function(){
				this.halfshow = false;
   				this.setshow = false;
			},
			save: function(){
				if(this.uploadImgData.length < 6){
					this.$toast1({
						message: '最少上传6张图片'
					})
					return false;
				}
				let fengmian;
				let photos;
				for (let i = 0; i < this.uploadImgData.length; i++) {
   					if(this.uploadImgData[i].type == 1){
   						fengmian = this.uploadImgData[i].url;
   					}
   					photos.push(this.uploadImgData[i].url);
   				}
				this.$store.commit('publishCondition/uploadImg',{fengmian: fengmian, photos: photos});
			}
		}
	}
</script>

<style scoped>
	.pad{
		height: 0.88rem;
	}
	.upload_img_content .title {
	    height: 0.9rem;
	    line-height: 0.9rem;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    background: #eeeff0;
	}
	.upload_img_content .img_list {
	    padding: 0.25rem 0.32rem;
	    box-sizing: border-box;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-justify-content: space-between;
	    justify-content: space-between;
	    flex-wrap: wrap;
	    -webkit-display: wrap;
	}
	.upload_img_content .img_list .upload_btn {
	    width: 2.23rem;
	    height: 1.67rem;
	    background: #eee;
	}
	.upload_img_content .img_list .upload_btn .icon {
	    margin-top: 0.25rem;
	    height: 0.6rem;
	    display: -webkit-flex;
	    display: flex;  
	    -webkit-justify-content: center;
	    justify-content: center;
	    -webkit-align-items: center;
	    align-items: center;
	}
	.upload_img_content .img_list .upload_btn .icon img {
	    width: 0.44rem;
	    height: 0.37rem;
	}
	.upload_img_content .img_list .upload_btn .p1 {
	    font-size: 0.22rem;
	    color: #000;
	    text-align: center;
	    line-height: 0.3rem;
	}
	.upload_img_content .img_list .upload_btn .p2 {
	    color: #8A8F9B;
	    font-size: 0.22rem;
	    text-align: center;
	}
	.upload_img_content .img_list .iw {
	    width: 2.23rem;
	    height: 1.67rem;
	    position: relative;
	    margin-bottom: 0.06rem;
	}
	.uploadImgW {
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-justify-content: center;
	    justify-content: center;
	    -webkit-align-items: center;
	    align-items: center;
	    overflow: hidden;
	}
	.upload_img_content .img_list .iw .fengmian {
	    position: absolute;
	    width: 100%;
	    height: 100%;
	}
	.upload_img_content .img_list .iw .close {
	    width: 0.46rem;
	    height: 0.46rem;
	    position: absolute;
	    top: 0;
	    right: 0;
	    z-index: 9;
	}
	.upload_img_content .img_list .iw.active .fengmian {
	    background: url(../assets/images/fengmian.png) no-repeat;
	    background-size: 0.68rem 0.68rem;
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
	.checkImg{
		position: fixed;
		z-index: 99999;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.9);
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		-webkit-justify-content: center;
		-webkit-align-items: center;
		overflow: hidden;
	}
	.checkImg img{
		width: 100%;
		transition: all 0s linear 0s;
		position: absolute;
	}
</style>
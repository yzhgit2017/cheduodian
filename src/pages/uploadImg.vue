<template>
	<div>
		<header1 v-bind:title="title">
			<template v-slot:navRightBtn>
				<label style="font-size: .32rem;color: #FF620C;" @click="confirm()">保存</label>
			</template>
		</header1>
		<div class="pad"></div>
		<div class="upload_img_content">
			<div class="title">最少上传六张图片</div>
			<input type="file" @change="uploadImg()" multiple name="" style="display: none;" ref="uploadFile">
			<div class="img_list">
			    <div class="iw fmiw" v-for="(item,index) in uploadImgData" :key="index" v-bind:class="[item.type == 1 ? 'active' : '']">
			        <div class="uploadImgW"><img :src="http + item.url" class="carimg" style="height: 100%; opacity: 1;"></div>
			        <div class="fengmian"></div>
			        <img class="close" src="../assets/images/uic.png">
			    </div>
				<div class="upload_btn" @click="choiceImg()">
					<div class="icon"><img src="../assets/images/xiangjiIcon.png"></div>
					<p class="p1">上传图片</p>
					<p class="p2">(0/16)</p>
				</div>
				<div class="iw"></div>
			</div>
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
				uploadImgData: [],
				http: this.$http,
			}
		},
		components: { header1},
		methods: {
			choiceImg: function(){
				this.$refs.uploadFile.click();
			},
			uploadImg: function(){
				const cfiles = event.target.files;
				console.log(cfiles)
				const that = this;
				for (let i = 0; i < cfiles.length; i++) {
					if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(cfiles[i].name)){
				        alert("图片类型必须是.gif,jpeg,jpg,png中的一种")
			        }else{
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
			        }
				}
				
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
</style>
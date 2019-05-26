<template>
	<div class="container">
		<header1 v-bind:title="title">
			<template v-slot:navRightBtn>
				<label style="font-size: .32rem;color: #FF620C;" @click="confirm()">发布</label>
			</template>
		</header1>
		<div class="pad"></div>
		<div class="fabui">
			<div class="fadiv" @click="gouploadImg()"><img src="../assets/images/xiangji.png"/></div>
			<div class="swiper-container swiper-details">
                <div class="swiper-wrapper">
                    
                </div>
            </div>
		</div>
		<div class="qiutit">基本信息</div>
		<input type="file" name="" style="display: none;">
		<p class="weibotime">VIN码<span class="shuvin vin_i_w"><input type="text" placeholder="输入VIN码或选择图片识别"/><img src="../assets/images/xiangji1.png" class="xiangji1" /></span></p>
		<p class="weibotime">品牌型号<span class="shuvin"><span class="brandText">请选择</span><i class="icon iconfont icon-youjiantou"></i></span></p>
		<p class="weibotime">车身颜色<span class="shuvin"><span>请选择</span><i class="icon iconfont icon-youjiantou"></i></span></p>
		<p class="weibotime">排量<span class="shuvins"><input type="text" placeholder="请输入排量" /><select style="background: none;"><option>L</option><option>T</option></select></span></p>
		<p class="weibotime">上牌日期<span class="shuvin otcol"><span>请选择</span><i class="icon iconfont icon-youjiantou"></i></span></p>
		<p class="weibotime">行驶里程<span class="shuvins"><input type="text" placeholder="请输入公里数"/>万公里</span></p>
		<p class="weibotime">变速箱<span class="shuvin"><span>请选择</span><i class="icon iconfont icon-youjiantou"></i></span></p>
		<p class="weibotime">车辆用途<span class="shuvins"><small>非营运</small><small>营转非</small></span></p>
		<div class="qiutit">车况信息</div>
		<p class="chektit">请选择相应颜色后点击于车辆剖面图上</p>
		<div class="myCanvas" ref="myCanvas">
			<img src="../assets/images/paomiantu.png">
			<div style="position: absolute;width: 48px;height: 88px;top: 57px;left: 55px;" @touchstart="drawPoint('左前翼子板',1)"></div>
			<div style="position: absolute;width: 48px;height: 88px;top: 57px;right: 53px;" @touchstart="drawPoint('右前翼子板',2)"></div>
			<div style="position: absolute;width: 132px;height: 25px;top: 23px;left: 95px;" @touchstart="drawPoint('前保险杠',3)"></div>
			<div style="position: absolute;width: 126px;height: 25px;bottom: 30px;left: 98px;" @touchstart="drawPoint('后保险杠',4)"></div>
			<div style="position: absolute;width: 48px;height: 60px;top: 144px;left: 56px;" @touchstart="drawPoint('左前门',5)"></div>
			<div style="position: absolute;width: 48px;height: 60px;top: 203px;left: 56px;" @touchstart="drawPoint('左后门',6)"></div>
			<div style="position: absolute;width: 48px;height: 60px;top: 144px;right: 54px;" @touchstart="drawPoint('右前门',7)"></div>
			<div style="position: absolute;width: 48px;height: 60px;top: 203px;right: 54px;" @touchstart="drawPoint('右后门',8)"></div>
			<div style="position: absolute;width: 48px;height: 70px;top: 263px;left: 55px;" @touchstart="drawPoint('左后翼子板',9)"></div>
			<div style="position: absolute;width: 48px;height: 70px;top: 263px;right: 53px;" @touchstart="drawPoint('右后翼子板',10)"></div>
			<div style="position: absolute;width: 114px;height: 66px;top: 58px;right: 103px;" @touchstart="drawPoint('前引擎盖',11)"></div>
			<div style="position: absolute;width: 63px;height: 92px;top: 157px;right: 128px;" @touchstart="drawPoint('车顶',12)"></div>
			<div style="position: absolute;width: 114px;height: 54px;top: 279px;right: 102px;" @touchstart="drawPoint('后备箱盖',13)"></div>
			<div class="chekuangbiaoshi" v-for="(item,index) in pointData" :key="index" :style="{'left':item.x + 'px','top':item.y + 'px','background-color':item.color}"></div>
		</div>
		<div class="choice_chekuang">
			<div class="item">
				<div class="color" style="background: #4FC473;" @click="choiceColor('penqi')"></div>
				<p>喷漆</p>
			</div>
			<div class="item">
				<div class="color" style="background: #FCC022;" @click="choiceColor('banji')"></div>
				<p>钣金</p>
			</div>
			<div class="item">
				<div class="color" style="background: #FF2F2F;" @click="choiceColor('shigu')"></div>
				<p>事故</p>
			</div>
			<div class="item xiangpica">
				<div class="color" @click="choiceColor('xiangpica')"></div>
				<p>橡皮擦</p>
			</div>
		</div>
		<div class="tishi" v-show="tishiShow">{{tishiText}}</div>
		<p class="chektit">车况描述</p>
		<div class="desWrapper"><textarea placeholder="请输入车况描述"></textarea></div>
	    <div class="qiutit">销售信息</div>
	    <p class="weibotime">最低售价<span class="shuvins"><input type="text" placeholder="请输入价格" />万元</span></p>
	    <p class="weibotime">所属市场<span class="shuvin otcol"><span>请选择</span><i class="icon iconfont icon-youjiantou"></i></span></p>
	    <p class="weibotime">批发<span class="pifa active"><label class="radio"></label><label class="text">批发</label></span><span class="pifa"><label class="radio"></label><label class="text">不批发</label></span></p>
	    <p class="weibotime pifajia">批发价<span class="shuvins"><input type="text" placeholder="请输入价格" />万元</span></p>
	    <div style="height: 0.98rem;"></div>
	    <div class="publishButton">立即发车</div>
	</div>
</template>

<script>
    import header1 from '../components/header1'
	export default{
		name: 'publishVehicle',
		data(){
			return{
				title: '发布车辆',
				token: localStorage.getItem('myToken'),
				chekuangColor: '',
				tishiTimer: '',
				tishiText: '',
				tishiShow: false,
				pointData: []
			}
		},
		components: { header1},
		mounted(){

		},
		methods: {
			choiceColor: function(type){
				const that = this;
				if(type == "penqi"){
					this.chekuangColor = "#4FC473";
					this.tishiText = "颜色选择成功";
				}
				if(type == "banji"){
					this.chekuangColor = "#FCC022";
					this.tishiText = "颜色选择成功";
				}
				if(type == "shigu"){
					this.chekuangColor = "#FF2F2F";
					this.tishiText = "颜色选择成功";
				}
				if(type == "xiangpica"){
					this.chekuangColor = "";
					this.tishiText = "橡皮擦工具";
				}
				this.tishiShow = true;
				clearTimeout(that.tishiTimer);
				that.tishiTimer = setTimeout(function(){
					that.tishiShow = false;
				},500)
			},
			drawPoint: function(pot,desid){
				if(this.chekuangColor != ''){
					const ot = this.$refs.myCanvas.offsetTop;
					const ol = this.$refs.myCanvas.offsetLeft;
					const px = event.touches[0].pageX;
					const py = event.touches[0].pageY;
					const pl = px - ol - 10;
					const pt = py - ot - 10;
					const item = {};
					item.x = pl;
					item.y = pt;
					item.color = this.chekuangColor;
					this.pointData.push(item)
					
				}
			},
			gouploadImg: function(){
				this.$router.push("/uploadImg");
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100%;
		overflow: scroll;
	}
	.fabui{
		height: 5.63rem;
		overflow: hidden;
		background: url("../assets/images/findbg.png") no-repeat;
		background-size: cover;
		position: relative;
	}
	.pad{
		height: 0.88rem;
	}
	.fadiv {
	    width: 1.6rem;
	    height: 1.6rem;
	    text-align: center;
	    border-radius: 50%;
	    background: rgba(255,98,12,0.7);
	    position: absolute;
	    left: 0;
	    right: 0;
	    top: 0;
	    bottom: 0;
	    margin: auto;
	    z-index: 9;
	}
	.fadiv img {
	    width: .61rem;
	    height: .49rem;
	}
	.qiutit {
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    height: 0.87rem;
	    line-height: 0.87rem;
	    padding-left: 0.33rem;
	    background: #EEEFF0;
	}
	.weibotime {
	    font-size: 0.3rem;
	    color: #333333;
	    padding: 0 0.33rem;
	    line-height: 0.88rem;
	    height: 0.88rem;
	    border-bottom: 1px solid #EFEFEF;
        overflow: hidden;
	}
	.shuvin, .shuvins {
	    float: right;
	    display: flex;
	    display: -webkit-flex;
	    align-items: center;
	    -webkit-align-items: center;
	}
	.vin_i_w {
	    display: -webkit-flex;
	    display: flex;
	    align-items: center;
	    height: 100%;
	}
	.shuvin input {
	    font-size: 0.28rem;
	    color: #333;
	    width: 3.4rem;
	}
	.xiangji1 {
	    width: 0.32rem;
	    height: 0.26rem;
	}
	.brandText{
		max-width: 4rem;
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		vertical-align: middle;
	}
	.shuvin .icon-youjiantou {
	    color: #999999;
	    margin-left: 0.08rem;
	}
	.shuvins{
		height: 100%;
	}
	.shuvins input {
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    width: 1.8rem;
	    text-align: right;
	    margin-right: 0.1rem;
	}
	.shuvins select {
	    appearance: none;
	    -webkit-appearance: none;
	    border: 0;
	}
	input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
	    color: #8A8F9B;
	}
	input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	    color: #8A8F9B;
	}
	input::-moz-placeholder { /* Mozilla Firefox 19+ */
	    color: #8A8F9B;
	}
	input:-ms-input-placeholder { /* Internet Explorer 10-11 */
	    color: #8A8F9B;
	}
	.vin_i_w input::-webkit-input-placeholder { /* WebKit, Blink, Edge */
	    color: #333;
	}
	.vin_i_w input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
	    color: #333;
	}
	.vin_i_w input::-moz-placeholder { /* Mozilla Firefox 19+ */
	    color: #333;
	}
	.vin_i_w input:-ms-input-placeholder { /* Internet Explorer 10-11 */
	    color: #333;
	}
	.otcol {
	    color: #8A8F9B;
	}
	.shuvins small {
	    display: inline-block;
	    padding: 0 0.2rem;
	    height: 0.5rem;
	    line-height: 0.5rem;
	    box-sizing: border-box;
	    border: 1px solid #8A8F9B;
	    border-radius: 0.25rem;
	    color: #8A8F9B;
	    margin-left: 0.2rem;
	}
	.chektit {
	    font-size: 0.28rem;
	    color: #000000;
	    padding-top: 0.4rem;
	    text-align: center;
	}
	.myCanvas{
		width: 320px;
		height: 402px;
		position: relative;
		left: 50%;
		margin-left: -160px;
	}
	.choice_chekuang {
	    display: -webkit-flex;
	    display: flex;
	    -webkit-justify-content: center;
	    justify-content: center;
	    -webkit-align-items: center;
	    align-items: center;
	}
	.choice_chekuang .item {
	    margin: 0 0.3rem;
	}
	.choice_chekuang .item .color {
	    width: 0.68rem;
	    height: 0.68rem;
	}
	.choice_chekuang .item p {
	    font-size: 0.24rem;
	    color: #8A8F9B;
	    text-align: center;
	    line-height: 0.48rem;
	}
	.choice_chekuang .item.xiangpica .color {
	    background: url(../assets/images/xiangpica.png) no-repeat;
	    background-size: 100% 100%;
	}
	.tishi{
		position: fixed;
		width: 2.5rem;
	    height: 0.8rem;
	    line-height: 0.8rem;
		background: rgba(0,0,0,0.8);
		border-radius: 5px;
		text-align: center;
		color: #fff;
		font-size: 0.14rem;
		top: 50%;
		margin-top: -0.4rem;
		left: 50%;
		margin-left: -1.25rem;
	}
	.chekuangbiaoshi {
	    position: absolute;
	    width: 20px;
	    height: 20px;
	    border-radius: 100%;
	}
	.desWrapper{
		padding: 0 0.32rem;
	}
	textarea {
	    width: 100%;
	    height: 3rem;
	    box-sizing: border-box;
	    border: 1px solid #8A8F9B;
	    padding: 0.22rem 0.23rem;
	    border-radius: 0.06rem;
	    margin-bottom: 0.48rem;
	    margin-top: 0.3rem;
	    -webkit-appearance: none;
	}
	.weibotime .pifa {
	    float: right;
	    display: flex;
	    align-items: center;
	    -webkit-display: flex;
	    -webkit-align-items: center;
	}
	.weibotime .pifa .radio {
	    display: inline-block;
	    margin: 0 0.2rem;
	    width: 0.34rem;
	    height: 0.34rem;
	    background: url(../assets/images/dr.png) no-repeat;
	    background-size: 100% 100%;
	}
	.weibotime .pifa.active .radio {
	    background: url(../assets/images/drs.png) no-repeat;
	    background-size: 100% 100%;
	}
	.publishButton{
		width: 100%;
	    background: #FF620C;
	    text-align: center;
	    height: 0.98rem;
	    line-height: 0.98rem;
	    position: fixed;
	    bottom: 0;
	    z-index: 9;
	    color: #FFFFFF;
        font-size: 0.32rem;
	}
</style>
<template>
	<div class="container">
		<header1 v-bind:title="title">
			<template v-slot:navRightBtn>
				<label style="font-size: .32rem;color: #FF620C;" @click="lijifache()">发布</label>
			</template>
		</header1>
		<div class="pad"></div>
		<div class="fabui">
			<div class="fadiv" @click="gouploadImg()"><img src="../assets/images/xiangji.png"/></div>
			<div class="swiper-container swiper-details">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in photos"><img :src="http + item"></div>
                </div>
            </div>
		</div>
		<div class="qiutit">基本信息</div>
		<input type="file" name="" style="display: none;">
		<p class="weibotime">VIN码<span class="shuvin vin_i_w"><input type="text" placeholder="输入VIN码或选择图片识别" @blur="changeVin()" v-model="vinV"/><img src="../assets/images/xiangji1.png" class="xiangji1" /></span></p>
		<router-link :to="{path: 'choiceBrand', query: {from: 'publishVehicle'}}" class="weibotime">品牌型号<span class="shuvin"><span class="brandText">{{pinpai}}</span><i class="icon iconfont icon-youjiantou"></i></span></router-link>
		<router-link :to="{path: 'choiceColor', query: {from: 'publishVehicle'}}" class="weibotime">车身颜色<span class="shuvin"><span>{{colorText}}</span><i class="icon iconfont icon-youjiantou"></i></span></router-link>
		<p class="weibotime">排量<span class="shuvins"><input type="text" placeholder="请输入排量" @keyup="pailiang()" @blur="changePL()" v-model="pailiangV"/><select style="background: none;" v-model="p_unit" @change="plchange()"><option>L</option><option>T</option></select></span></p>
		<p class="weibotime">上牌日期<span class="shuvin otcol"><span @click="showPicker()">{{dateText}}</span><i class="icon iconfont icon-youjiantou"></i></span></p>
		<p class="weibotime">行驶里程<span class="shuvins"><input type="text" placeholder="请输入公里数" @keyup="licheng()" @blur="changeLC()" v-model="lichengV"/>万公里</span></p>
		<router-link :to="{path: 'biansuxiang', query: {from: 'publishVehicle'}}" class="weibotime">变速箱<span class="shuvin"><span>{{bsx}}</span><i class="icon iconfont icon-youjiantou"></i></span></router-link>
		<p class="weibotime">车辆用途<span class="shuvins"><small @click="choiceYt(1)" v-bind:class="[yt == 1 ? 'checked' : '']">非营运</small><small @click="choiceYt(2)" v-bind:class="[yt == 2 ? 'checked' : '']">营转非</small></span></p>
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
			<div class="chekuangbiaoshi" v-for="(item,index) in pointData" :key="index" :style="item" @touchstart="delPoint(index)"></div>
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
		<div class="desWrapper"><textarea placeholder="请输入车况描述" @blur="changeMs()" v-model="chekuangMs"></textarea></div>
	    <div class="qiutit">销售信息</div>
	    <p class="weibotime">最低售价<span class="shuvins"><input type="text" placeholder="请输入价格" @keyup="minPrice()" @blur="changeSHJ()" v-model="minPriceV"/>万元</span></p>
	    <p class="weibotime" @click="choiceMarket()">所属市场<span class="shuvin otcol"><span>{{marketText}}</span><i class="icon iconfont icon-youjiantou"></i></span></p>
	    <p class="weibotime">批发<span class="pifa" v-bind:class="[pifaV == 1 ? 'active' : '']"><label class="radio" @click="pifa(1)"></label><label class="text">批发</label></span><span class="pifa" v-bind:class="[pifaV == 2 ? 'active' : '']"><label class="radio" @click="pifa(2)"></label><label class="text">不批发</label></span></p>
	    <p class="weibotime pifajia" v-show="pifaV == 1">批发价<span class="shuvins"><input type="text" placeholder="请输入价格" @keyup="pfPrice()" @blur="changePF()" v-model="pifaPrice"/>万元</span></p>
	    <div style="height: 0.98rem;"></div>
	    <div class="publishButton" @click="lijifache()">立即发车</div>
	    <div class="myPicker" v-show="pickerShow">
	    	<div class="myPickerC">
	    		<div class="caozuo"><div class="cancel" @click="closePicker()">取消</div><div class="confirm" @click="choicePicker()">确定</div></div>
	    		<mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="3"></mt-picker>
	    	</div>
	    </div>
	    <!-- 发车弹窗 -->
	    <div class="myPopup" v-show="fachetan">
			<div class="container">
				<div class="section1">是否悬赏急售<i class="icon iconfont icon-cuowu guanbi" @click="guanbi()"></i></div>
				<div class="section2">
					<p class="p1">悬赏急售可大幅提高本车曝光率及帮卖动力！</p>
					<p class="p2">提示：</p>
					<p class="p2">1.每次悬赏急售，自动扣除2多币；</p>
					<p class="p2">2.若多币不足，请去活动中心领取后重新发布或普通发布!</p>
				</div>
				<div class="section3"><span class="xquxiao putongfabu" id="putongfabu">普通发布</span><a href="javascript:;" @click="xuanshangfabu()">悬赏发布</a></div>
			</div>
	  	</div>
	</div>
</template>

<script>
    import header1 from '../components/header1'

    import Swiper from 'static/js/swiper.js'

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    console.log(year,month)
   	const address = {};
    for (let i = 0; i < 10; i++) {
    	if(i == 0){
    		const curMonths = [];
    		for (let j = 0; j < month; j++) {
    			if(j < 9){
    				const _month = "0" + (j + 1);
    				curMonths.push(_month)
    			}else{
    				const _month = j + 1;
    				curMonths.push(_month.toString())
    			}
    		}
    		const _year = year;
    		_year.toString();
    		address[_year] = curMonths;
    	}else{
    		const _year = year - i;
    		_year.toString();
    		address[_year] = ["01","02","03","04","05","06","07","08","09","10","11","12"];
    	}
    }
    // console.log(Object.keys(address).reverse())
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
				pointData: [],
				pinpai: '请选择',
				colorText: '请选择',
				dateText: '请选择',
				pailiangV: '',
				lichengV: '',
				addressSlots: [
		          {
		            flex: 1,
		            divider: true,
		            content: '',
		            className: 'slot1'
		          },
		          {
		            flex: 2,
		            values: Object.keys(address).reverse(),
		            className: 'slot1',
		            textAlign: 'center'
		          }, {
		            flex: 1,
		            divider: true,
		            content: '年',
		            className: 'slot1'
		          }, {
		            flex: 2,
		            values: address[year],
		            className: 'slot1',
		            textAlign: 'center'
		          },{
		            flex: 1,
		            divider: true,
		            content: '月',
		            className: 'slot1'
		          },{
		            flex: 1,
		            divider: true,
		            content: '',
		            className: 'slot1'
		          }
		        ],
		        pickerShow: false,
		        shpyear: '',
		        shpmonth: '',
		        yt: '',
		        chekuangMs: '',
		        minPriceV: '',
		        marketText: '',
		        pifaV: 1,
		        fachetan: false,
		        token: localStorage.getItem('myToken'),
		        vinV: '',
		        colorId: '',
		        car_color_id: [],
				car_des: [],
				car_style: [],
				car_parts_id: [],
				car_color: [],
				car_condition_id: [],
				pointNum: 0,
				fengmian: '',
				photos: '',
				http: this.$http,
				brand_id: '',
				series_id: '',
				model_id: '',
				color_id: '',
				bsx: '',
				bsx_id: '',
				market_id: '',
				pifaPrice: '',
				p_unit: 'L',
			}
		},
		components: { header1},
		mounted(){
			this.loadData()

		},
		updated: function(){
			console.log("updated")
			this.lunbo1();
			
		},
		computed: {
		    publishData(){
		   	    return this.$store.state.publishCondition
		    }
		},
		methods: {
			loadData: function(){
				let initData = this.publishData.data;
				console.log(initData)
				let brandText = '';
				if(initData.brand.id == ''){
					
				}else if(initData.brand.id == 0){
					brandText = '不限';
				}else{
					brandText = initData.brand.text;
				};
				if(initData.series.id == '' || initData.series.id == 0){
					
				}else{
					brandText += '-' + initData.series.text;
				};
				if(initData.spec.id == '' || initData.spec.id == 0){

				}else{
					brandText += '-' + initData.spec.text;
				};
				if(brandText != ''){
					console.log(brandText)
					this.pinpai = brandText;
				}
				if(initData.color.id == '' || initData.color.id == 0){
					this.colorText = '请选择';
				}else{
					this.colorText = initData.color.text;
				};
				if(initData.market.text == ''){
					this.marketText = '请选择';
				}else{
					this.marketText = initData.market.text;
				};
				if(initData.transmissioncase.id == '' || initData.transmissioncase.id == 0){
					this.bsx = '不限';
				}else{
					this.bsx = initData.transmissioncase.text;
				};
				this.market_id = initData.market.id;
				this.bsx_id = initData.transmissioncase.id;
				this.brand_id = initData.brand.id;
				this.series_id = initData.series.id;
				this.model_id = initData.spec.id;
				this.color_id = initData.color.id;
				this.vinV = initData.vin;
				this.pailiangV = initData.pailiang;
				this.lichengV = initData.licheng;
				this.car_color_id = initData.car_color_id;
				this.car_des = initData.car_des;
				this.car_style = initData.car_style;
				this.car_parts_id = initData.car_parts_id;
				this.car_color = initData.car_color;
				this.car_condition_id = initData.car_condition_id;
				this.pointNum = initData.pointNum;
				this.pointData = initData.pointData;
				this.chekuangMs = initData.chekuangMs;
				this.minPriceV = initData.minPriceV;
				this.fengmian = initData.fengmian;
				this.photos = initData.photos;
				this.yt = initData.yt;
				this.pifaV = initData.pifa;
				this.pifaPrice = initData.pifajia;
				if(initData.dateText == ''){
					this.dateText = "请选择"
				}else{
					this.dateText = initData.dateText;
				}
				this.p_unit = initData.p_unit;
			},
			lunbo1: function(){
				this.swiper1 = new Swiper('.swiper-details', {
		            loop:true,
		        });
			},
			changeVin: function(){
				this.$store.commit("publishCondition/changeVin",{vin :this.vinV})
			},
			changePL: function(){
				this.$store.commit("publishCondition/changePL",{pailiang :this.pailiangV})
			},
			changeLC: function(){
				this.$store.commit("publishCondition/changeLC",{licheng :this.lichengV})
			},
			changeMs: function(){
				this.$store.commit("publishCondition/changeMs",{chekuangMs :this.chekuangMs})
			},
			changeSHJ: function(){
				this.$store.commit("publishCondition/changeSHJ",{minPriceV :this.minPriceV})
			},
			changePF: function(){
				this.$store.commit("publishCondition/changePF",{pifajia :this.pifaPrice})
			},
			choiceColor: function(type){
				const that = this;
				if(type == "penqi"){
					this.colorId = 1;
					this.chekuangColor = "#4FC473";
					this.tishiText = "颜色选择成功";
				}
				if(type == "banji"){
					this.colorId = 2;
					this.chekuangColor = "#FCC022";
					this.tishiText = "颜色选择成功";
				}
				if(type == "shigu"){
					this.colorId = 3;
					this.chekuangColor = "#FF2F2F";
					this.tishiText = "颜色选择成功";
				}
				if(type == "xiangpica"){
					this.colorId = '';
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
					const style = "left:"+ pl +"px;top:" + pt +"px;background-color:"+ this.chekuangColor +"";
					this.pointData.push(style);
					this.car_color_id.push(this.colorId);
					this.car_des.push(pot);
					this.car_style.push(style);
					this.car_parts_id.push(desid);
					this.car_color.push(this.chekuangColor);
					this.car_condition_id.push("point_"+ this.pointNum +"");
					this.pointNum++;
					this.$store.commit('publishCondition/changePoint',{pointData: this.pointData,car_color_id: this.car_color_id,car_des: this.car_des,car_style: this.car_style,car_parts_id: this.car_parts_id,car_color: this.car_color,car_condition_id: this.car_condition_id,pointNum: this.pointNum});
				}
			},
			delPoint: function(index){
				if(this.tishiText == "橡皮擦工具"){
					this.pointData.splice(index,1);
					this.car_color_id.splice(index,1);
					this.car_des.splice(index,1);
					this.car_style.splice(index,1);
					this.car_parts_id.splice(index,1);
					this.car_color.splice(index,1);
					this.car_condition_id.splice(index,1);
					this.$store.commit('publishCondition/changePoint',{pointData: this.pointData,car_color_id: this.car_color_id,car_des: this.car_des,car_style: this.car_style,car_parts_id: this.car_parts_id,car_color: this.car_color,car_condition_id: this.car_condition_id});
				}
			},
			gouploadImg: function(){
				this.$router.push("/uploadImg");
			},
			pailiang: function(){
				this.pailiangV = this.pailiangV.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符   
				this.pailiangV = this.pailiangV.replace(/^(\-)*(\d+)\.(\d).*$/,'$1$2.$3');//只能输入两个小数   
				if(this.pailiangV.indexOf(".")< 0 && this.pailiangV !=""){
				   //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
				   this.pailiangV = parseFloat(this.pailiangV);  
				}
			},
			onAddressChange(picker, values) {
		        picker.setSlotValues(1, address[values[0]]);
		        this.shpyear = values[0];
		        this.shpmonth = values[1];
		    },
		    showPicker: function(){
		    	this.pickerShow = true;
		    },
		    choicePicker: function(){
		    	console.log(this.shpyear,this.shpmonth)
		    	const date = this.shpyear + "-" + this.shpmonth;
		    	this.dateText = date;
		    	this.$store.commit('publishCondition/changeDate',{dateText: this.dateText});
		    	this.pickerShow = false;
		    },
		    licheng: function () {
		    	this.lichengV = this.lichengV.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符   
				this.lichengV = this.lichengV.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数   
				if(this.lichengV.indexOf(".")< 0 && this.lichengV !=""){
				   //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
				   this.lichengV = parseFloat(this.lichengV);  
				}  
		    },
		    choiceYt: function (bs) {
		    	this.yt = bs;
		    	this.$store.commit('publishCondition/changeYt',{yt: this.yt});
		    },
		    minPrice: function () {
		    	this.minPriceV = this.minPriceV.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符   
				this.minPriceV = this.minPriceV.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数   
				if(this.minPriceV.indexOf(".")< 0 && this.minPriceV !=""){
				   //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
				   this.minPriceV = parseFloat(this.minPriceV);  
				}
		    },
		    pfPrice: function(){
		    	this.pifaPrice = this.pifaPrice.replace(/[^\d.]/g,"");  //清除“数字”和“.”以外的字符   
				this.pifaPrice = this.pifaPrice.replace(/^(\-)*(\d+)\.(\d\d).*$/,'$1$2.$3');//只能输入两个小数   
				if(this.pifaPrice.indexOf(".")< 0 && this.pifaPrice !=""){
				   //以上已经过滤，此处控制的是如果没有小数点，首位不能为类似于 01、02的金额  
				   this.pifaPrice = parseFloat(this.pifaPrice);
				}
		    },
		    choiceMarket: function () {
		    	this.$store.commit('vehicleList/changePAC',{provinceId: localStorage.getItem('myProvinceId'),cityText: localStorage.getItem('myRoomCity'),cityId: localStorage.getItem('myRoomCityId')})
				this.$router.push({path: 'choiceMarket', query: {from: 'publishVehicle'}});
		    },
		    pifa: function (bs) {
		    	this.pifaV = bs;
		    	this.$store.commit('publishCondition/changePifa',{pifa: this.pifaV});
		    },
		    lijifache: function () {
		    	if(this.$route.query.from == 'myVehicle'){
		    		let data;
		    		let that = this;
					let _photos = '';
					for (let i = 0; i < that.photos.length; i++) {
						if(i == 0){
							_photos = _photos + that.photos[i];
						}else{
							_photos = _photos + ',' + that.photos[i]
						}
					}
					if(that.pointData.length == 0){
						data = {
							vin_code: that.vinV,
							token: that.token,
							img: that.fengmian,
							photos: _photos,
							brand_id: that.brand_id,
							series_id: that.series_id,
							model_id: that.model_id,
							color_id: that.color_id,
							boarding_time: that.dateText,
							driven_distance: that.lichengV,
							gearbox: that.bsx_id,
							uses: that.yt,
							content: that.chekuangMs,
							money: that.minPriceV,
							province_id: localStorage.getItem("myProvinceId"),
							room_city: localStorage.getItem("myRoomCityId"),
							market_id: that.market_id,
							wholesale: that.pifaV,
							wholesale_money: that.pifaPrice,
							pailiang: that.pailiangV,
							p_unit: that.p_unit,
							type: 5,
							gid: this.$route.query.id
						}
					}else{
						data = {
							vin_code: that.vinV,
							token: that.token,
							img: that.fengmian,
							photos: _photos,
							brand_id: that.brand_id,
							series_id: that.series_id,
							model_id: that.model_id,
							color_id: that.color_id,
							boarding_time: that.dateText,
							driven_distance: that.lichengV,
							gearbox: that.bsx_id,
							uses: that.yt,
							content: that.chekuangMs,
							money: that.minPriceV,
							province_id: localStorage.getItem("myProvinceId"),
							room_city: localStorage.getItem("myRoomCityId"),
							market_id: that.market_id,
							wholesale: that.pifaV,
							wholesale_money: that.pifaPrice,
							pailiang: that.pailiangV,
							p_unit: that.p_unit,
							type: 5,
							car_color_id: that.car_color_id,
							car_des: that.car_des,
							car_style: that.car_style,
							car_parts_id: that.car_parts_id,
							car_color: that.car_color,
							car_condition_id: this.publishData.data.car_condition_id,
							car_id: [this.$route.query.id],
							gid: this.$route.query.id
						}
						console.log(data)
					}
					that.$fetchPost('/updateCarSource',data).then(function(res){
						console.log(res)
						if(res.code == 1){
							that.$myToast({
								message: '编辑成功',
								type: 'success'
							})
						}
						if(res.code == 0){
							that.$myToast({
								message: res.msg,
								type: 'error'
							})
						}
					})
		    	}else{
		    		this.fachetan = true;
		    	}
		    	
		    },
		    guanbi: function () {
		    	this.fachetan = false;
		    },

		    xuanshangfabu: function () {
		    	var _this = this;
		    },
		    plchange: function () {
		    	this.$store.commit('publishCondition/changepunit',{p_unit: this.p_unit});
		    },
		    xuanshangfabu: function () {
		    	var that = this;
				this.$fetchPost('/SurplusMoney',{token: this.token,keys:"urgent_sale_money",money:2}).then(function(res){
					console.log(res)
				    if(res.code == 218){
				    	// 多币不足
				    }
					if(res.code == 1){
						// 多币充足
						let data;
						let _photos = '';
						for (let i = 0; i < that.photos.length; i++) {
							if(i == 0){
								_photos = _photos + that.photos[i];
							}else{
								_photos = _photos + ',' + that.photos[i]
							}
						}
						if(that.pointData.length == 0){
							data = {
								vin_code: that.vinV,
								token: that.token,
								img: that.fengmian,
								photos: _photos,
								brand_id: that.brand_id,
								series_id: that.series_id,
								model_id: that.model_id,
								color_id: that.color_id,
								boarding_time: that.dateText,
								driven_distance: that.lichengV,
								gearbox: that.bsx_id,
								uses: that.yt,
								content: that.chekuangMs,
								money: that.minPriceV,
								province_id: localStorage.getItem("myProvinceId"),
								room_city: localStorage.getItem("myRoomCityId"),
								market_id: that.market_id,
								wholesale: that.pifaV,
								wholesale_money: that.pifaPrice,
								pailiang: that.pailiangV,
								p_unit: that.p_unit,
								type: 5,
							}
						}else{
							data = {
								vin_code: that.vinV,
								token: that.token,
								img: that.fengmian,
								photos: _photos,
								brand_id: that.brand_id,
								series_id: that.series_id,
								model_id: that.model_id,
								color_id: that.color_id,
								boarding_time: that.dateText,
								driven_distance: that.lichengV,
								gearbox: that.bsx_id,
								uses: that.yt,
								content: that.chekuangMs,
								money: that.minPriceV,
								province_id: localStorage.getItem("myProvinceId"),
								room_city: localStorage.getItem("myRoomCityId"),
								market_id: that.market_id,
								wholesale: that.pifaV,
								wholesale_money: that.pifaPrice,
								pailiang: that.pailiangV,
								p_unit: that.p_unit,
								type: 5,
								car_color_id: that.car_color_id,
								car_des: that.car_des,
								car_style: that.car_style,
								car_parts_id: that.car_parts_id,
								car_color: that.car_color,
							}
							console.log(data)
						}
						that.$fetchPost('/setCarSource',data).then(function(res){
							console.log(res)
							if(res.code == 1){
								that.$myToast({
									message: '发布成功',
									type: 'success'
								})
							}
							if(res.code == 0){
								that.$myToast({
									message: res.msg,
									type: 'error'
								})
							}
						})
					}
				})
		    }
		}
	}
</script>

<style scoped>
    @import '../../static/css/swiper.css';
	.container{
		height: 100%;
		overflow: scroll;
	}
	.fabui{
		height: 5.63rem;
		overflow: hidden;
		background: url("../../static/images/findbg.png") no-repeat;
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
        display: block;
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
	.shuvins small.checked {
	    color: #FFFFFF;
	    background: #FF620C;
	    border-color: #FF620C;
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
	.myPicker{
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
		background: rgba(0,0,0,0.5);
		z-index: 999;
	}
	.myPickerC{
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.myPickerC .caozuo{
		height: 36px;
		width: 100%;
		display: flex;
		display: -webkit-flex;
		justify-content: space-between;
		-webkit-justify-content: space-between;
		align-items: center;
		-webkit-align-items: center;
		background: #ffffff;
		border-bottom: 1px solid #eaeaea;
		box-sizing: border-box;
	}
	.myPickerC .caozuo .cancel{
		font-size: 16px;
        font-weight: bold;
        color: #999999;
        margin-left: 20px;
	}
	.myPickerC .caozuo .confirm{
		font-size: 16px;
        font-weight: bold;
        color: #FF620C;
        margin-right: 20px;
	}
	.picker{
		background: #ffffff;
		padding-bottom: 36px;
	}
	.myPopup {
	    position: fixed;
	    height: 100%;
	    width: 100%;
	    top: 0;
	    left: 0;
	    background-color: rgba(0,0,0,0.3);
	    z-index: 99999;
	}
	.myPopup .container {
	    position: absolute;
	    width: 5.92rem;
	    height: auto;
	    left: 50%;
	    margin-left: -2.96rem;
	    top: 50%;
	    transform: translateY(-50%);
	    -ms-transform: translateY(-50%);
	    -moz-transform: translateY(-50%);
	    -webkit-transform: translateY(-50%);
	    -o-transform: translateY(-50%);
	    background: #fff;
	    border-radius: 0.1rem;
	    overflow: hidden;
	}
	.myPopup .container .section1 {
	    line-height: 0.86rem;
	    height: 0.86rem;
	    font-size: 0.3rem;
	    color: #000000;
	    padding: 0 0.41rem;
	    background: #EEEFF0;
	}
	.myPopup .container .section2 {
	    padding: 0.43rem 0.53rem;
	    box-sizing: border-box;
	    background: #fff;
	}
	.myPopup .container .section2 .p1 {
	    font-size: 0.3rem;
	    color: #FF620C;
	    line-height: 0.48rem;
	}
	.myPopup .container .section2 .p2 {
	    font-size: 0.3rem;
	    color: #000;
	    line-height: 0.48rem;
	}
	.myPopup .container .section3 {
	    width: 100%;
	    height: 0.86rem;
	    line-height: 0.86rem;
	    text-align: center;
	    overflow: hidden;
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
	.myPopup .container .section3 a {
	    color: #FFFFFF;
	    font-size: 0.3rem;
	    background: #FF620C;
	    width: 50%;
	    height: 100%;
	    text-align: center;
	    height: 0.86rem;
	    line-height: 0.86rem;
	    float: left;
	    border-top: 1px solid #FF620C;
	}
	.guanbi {
	    float: right;
	    font-size: 0.4rem !important;
	    color: #666666;
	}
	.swiper-details{
		height: 5.63rem;
	}
	.swiper-details .swiper-slide{
		display: flex;
		align-items: center;
		justify-content: center;
		-webkit-display: flex;
		-webkit-align-items: center;
		-webkit-justify-content: center;
		overflow: hidden;
	}
	.swiper-details .swiper-slide img{
		width: 100%;
	}
</style>
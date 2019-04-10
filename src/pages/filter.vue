<template>
	<div class="container">
		<header1 v-bind:title="title"></header1>
		<div style="background: #f2f2f2;width: 100%;height: 100%;position: absolute;top: 0;left: 0;"></div>
		<div class="pad"></div>
		<div class="shaixuans">  
			<div class="qiucon1">城市<span class="filterDes"><span>{{cityText}}</span><img src="../assets/images/right_arrow.png"></span></div>
			<router-link :to="{path: 'choiceMarket', query: {from: 'filter'}}" class="qiucon1">市场<span class="filterDes"><span>{{marketText}}</span><img src="../assets/images/right_arrow.png"></span></router-link>
			<router-link :to="{path: 'choiceBrand', query: {from: 'filter'}}" class="qiucon1">品牌<span class="filterDes"><span class="brandText">{{brandText}}</span><img src="../assets/images/right_arrow.png"></span></router-link>
			<router-link :to="{path: 'coty', query: {from: 'filter'}}" class="qiucon1">车龄<span class="filterDes"><span>{{cotyText}}</span><img src="../assets/images/right_arrow.png"></span></router-link>
			<router-link :to="{path: 'filterPrice', query: {from: 'filter'}}" class="qiucon1">价格<span class="filterDes"><span>{{priceText}}</span><img src="../assets/images/right_arrow.png"></span></router-link>
			<router-link :to="{path: 'filterMileage', query: {from: 'filter'}}" class="qiucon1">里程<span class="filterDes"><span>{{mileageText}}</span><img src="../assets/images/right_arrow.png"></span></router-link>
			<router-link :to="{path: 'biansuxiang', query: {from: 'filter'}}" class="qiucon1">变速箱<span class="filterDes"><span>{{biansuxiang}}</span><img src="../assets/images/right_arrow.png"></span></router-link>
			<router-link :to="{path: 'displacement', query: {from: 'filter'}}" class="qiucon1">排量<span class="filterDes"><span>{{pailiang}}</span><img src="../assets/images/right_arrow.png"></span></router-link>
			<div class="qiucon1">颜色<span class="filterDes"><span>{{colorText}}</span><img src="../assets/images/right_arrow.png"></span></div>
			<router-link :to="{path: 'vehicleType', query: {from: 'filter'}}" class="qiucon1">车源类型<span class="filterDes"><span>{{typeText}}</span><img src="../assets/images/right_arrow.png"></span></router-link>
		</div>
		<div class="xfabu"><span class="shouig">清空</span><span class="shouig">查看车源</span></div>
	</div>
</template>

<script>
    import { mapState } from 'vuex'
    import header1 from '../components/header1'
	export default{
		name: 'vehicleFilter',
		data(){
			return {
				title: '筛选',
				cityText: '',
				marketText: '',
				brandText: '',
				cotyText: '',
				priceText: '',
				mileageText: '',
				biansuxiang: '',
				pailiang: '',
				colorText: '',
				typeText: ''
			}
		},
		components: { header1 },
		computed: mapState({
		   data: state => state.filterCondition,
		}),
		mounted(){
			var initData = this.data.data;
			console.log(initData);
			if(initData.province == 0){
				this.cityText = '全国';
			}else{
				if(initData.city.text == ''){
					this.cityText = '不限';
				}else{
					this.cityText = initData.city.text;
				}
			};
			if(initData.market.text == ''){
				this.marketText = '不限';
			}else{
				this.marketText = initData.market.text;
			};
			if(initData.brand.id == '' || initData.brand.id == 0){
				this.brandText = '不限';
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
				this.cotyText = '不限';
			}else{
				this.cotyText = initData.age;
			};
			if(initData.price == '' || initData.price == 0){
				this.priceText = '不限';
			}else{
				this.priceText = initData.price;
			};
			if(initData.mileage == '' || initData.mileage == 0){
				this.mileageText = '不限';
			}else{
				this.mileageText = initData.mileage;
			};
			if(initData.transmissioncase.id == '' || initData.transmissioncase.id == 0){
				this.biansuxiang = '不限';
			}else{
				this.biansuxiang = initData.transmissioncase.text;
			};
			if(initData.displacement == '' || initData.displacement == 0){
				this.pailiang = '不限';
			}else{
				this.pailiang = initData.displacement;
			};
			if(initData.color.id == '' || initData.color.id == 0){
				this.colorText = '不限';
			}else{
				this.colorText = initData.color.text;
			};
			if(initData.cartype.id == '' || initData.cartype.id == 0){
				this.typeText = '不限';
			}else{
				this.typeText = initData.cartype.text;
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100%;
	}
	.pad{
		height: 0.88rem;
	}
	.qiucon1 {
	    font-size: 0.28rem;
	    color: #000000;
	    line-height: 0.89rem;
	    border-bottom: 1px solid #EFEFEF;
	    padding: 0 0.31rem;
	    height: 0.89rem;
	    overflow: hidden;
	    display: block;
	}
	.qiucon1 .filterDes {
	    float: right;
	    color: #8A8F9B;
	    font-size: 0.28rem;
	}
	.qiucon1 .filterDes .brandText {
		max-width: 4rem;
		display: inline-block;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		vertical-align: middle;
	}
	.qiucon1 .filterDes span {
		position: relative;
	}
	.qiucon1 .filterDes img{
		width: 0.15rem;
		height: 0.28rem;
		vertical-align: middle;
		margin-left: 0.15rem;
	}
	.shaixuans{
		background: #fff;
        position: relative;
	}
	.xfabu {
	    width: 100%;
	    background: #FF620C;
	    text-align: center;
	    height: 0.98rem;
	    line-height: 0.98rem;
	    position: fixed;
	    bottom: 0;
	}
	.shouig:first-child {
	    background: #FFFFFF;
	    color: #000000;
	}
	.shouig {
	    float: left;
	    width: 50%;
	    text-align: center;
	    font-size: 0.3rem;
	    color: #FFFFFF;
	    height: 100%;
	}
</style>
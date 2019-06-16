<template>
	<div class="container">
		<header1 v-bind:title="title"></header1>
		<div class="pad"></div>
		<div class="choice_page_wrapper">
			<div class="choice_history">
				<div class="letter">历史浏览</div>
				<div class="list_wrapper">
				    <div class="swiper-container">
				    	<div class="swiper-wrapper">
					    	
						</div>
				    </div>
					
				</div>
			</div>
			<div class="choice_all">
				<div class="letter">*</div>
				<div class="choice_item">不限</div>
			</div>
			<div class="letters_order_list">
				<div class="item" v-for="item in brandData" :key="item.id" :id="'section' + item.key">
				    <div class="letter" ref="letter">{{item.key}}</div>
				    <div class="list_wrapper">
				        <ul class="list">
				            <li class="choice_item" v-for="subItem in item.values" :key="subItem.id" @click="showSeries(subItem.id,subItem.name)">
				                <div class="logo"><img :src=" http + subItem.img"></div>
				                {{subItem.name}}
				            </li>
				        </ul>
				    </div>
				</div>
			</div>
			<div class="letters_list">
				<span @click="sectionLetter('#sectionHis')" class="sectionLetter">历</span>
			    <span @click="sectionLetter('#sectionAll')" class="sectionLetter">*</span>
				<span @click="sectionLetter('#sectionA')" class="sectionLetter">A</span>
				<span @click="sectionLetter('#sectionB')" class="sectionLetter">B</span>
				<span @click="sectionLetter('#sectionC')" class="sectionLetter">C</span>
				<span @click="sectionLetter('#sectionD')" class="sectionLetter">D</span>
				<span @click="sectionLetter('#sectionE')" class="sectionLetter">E</span>
				<span @click="sectionLetter('#sectionF')" class="sectionLetter">F</span>
				<span @click="sectionLetter('#sectionG')" class="sectionLetter">G</span>
				<span @click="sectionLetter('#sectionH')" class="sectionLetter">H</span>
				<span @click="sectionLetter('#sectionI')" class="sectionLetter">I</span>
				<span @click="sectionLetter('#sectionJ')" class="sectionLetter">J</span>
				<span @click="sectionLetter('#sectionK')" class="sectionLetter">K</span>
				<span @click="sectionLetter('#sectionL')" class="sectionLetter">L</span>
				<span @click="sectionLetter('#sectionM')" class="sectionLetter">M</span>
				<span @click="sectionLetter('#sectionN')" class="sectionLetter">N</span>
				<span @click="sectionLetter('#sectionO')" class="sectionLetter">O</span>
				<span @click="sectionLetter('#sectionP')" class="sectionLetter">P</span>
				<span @click="sectionLetter('#sectionQ')" class="sectionLetter">Q</span>
				<span @click="sectionLetter('#sectionR')" class="sectionLetter">R</span>
				<span @click="sectionLetter('#sectionS')" class="sectionLetter">S</span>
				<span @click="sectionLetter('#sectionT')" class="sectionLetter">T</span>
				<span @click="sectionLetter('#sectionU')" class="sectionLetter">U</span>
				<span @click="sectionLetter('#sectionV')" class="sectionLetter">V</span>
				<span @click="sectionLetter('#sectionW')" class="sectionLetter">W</span>
				<span @click="sectionLetter('#sectionX')" class="sectionLetter">X</span>
				<span @click="sectionLetter('#sectionY')" class="sectionLetter">Y</span>
				<span @click="sectionLetter('#sectionZ')" class="sectionLetter">Z</span>
			</div>
			<transition name="sub_list">
				<div class="choice_middle_container" v-if="seriesShow">
				    <div class="kongbai" @click="seriesHide()"></div>
					<div class="choice_middle_list">
						<div class="title">{{brandName}}</div>
						<div class="letter section_series">*</div>
						<div class="choice_middle_item section_series"><label class="label1">不限</label></div>
						<div class="middle_list">
							<div class="item" v-for="item in seriesData">
							    <div class="letter">{{item.key}}</div>
							    <div class="list_wrapper">
							        <ul>
							            <li class="choice_middle_item" v-for="subItem in item.values" :key="subItem.id" @click="showSpec(subItem.id,subItem.name)"><label class="label1">{{subItem.name}}</label><label class="label2">选车型</label></li>
							        </ul>
							    </div>
							</div>
						</div>
					</div>
				</div>
			</transition>
			<transition name="sub_list">
				<div class="choice_sub_list" v-if="specShow">
				    <div class="kongbai" @click="specHide()"></div>
				    <div class="choice_sub_list_c">
						<div class="sheng">{{seriesName}}</div>
						<div class="letter section_spec">*</div>
					    <div class="choice_all section_spec">不限</div>
						<div class="wrapper">					
							<div class="item" v-for="item in specData">
							    <div class="letter">{{item.key}}</div>
							    <div class="sub_list_wrapper">
							        <ul class="sub_list">
							            <li class="choice_sub_item" v-for="subItem in item.values" :key="subItem.id" @click="choiceSpec(subItem.id,subItem.name)" v-bind:class="[activeItem == subItem.id ? 'active' : '']"><span class="radioDefault"></span><span class="text">{{subItem.name}}</span></li>
							        </ul>
							    </div>
							</div>
						</div>
						<div class="btn_container" style="position: fixed;width: 6.75rem;">
							<div class="choice_cancel" @click="specHide()">取消选择</div>
							<div class="choice_choice" @click="confirm()">确定</div>
						</div>
					</div>
				</div>
			</transition>
		</div>
	</div>
</template>

<script>
    import Swiper from 'static/js/swiper.js'
    import header1 from '@/components/header1'
	export default{
		name: 'choiceBrand',
		data () {
			return {
				title: '选择品牌',
				token: localStorage.getItem('myToken'),
				http: 'http://nw.cheduodian.com',
				brandData: '',
				brandName: '',
				brandId: '',
				seriesShow: false,				
				seriesData: '',
				seriesName: '',
				seriesId: '',
				specShow: false,
				specData: '',
				specId: '',
				specName: '',
				activeItem: ''
			}
		},
		components: {header1},
		mounted(){
			this.loadBrand();
		},
		methods:{
			loadBrand: function(){
				var _this = this;
				this.$fetchPost('/getBrand',{token: this.token}).then(function(res){
					console.log(res)
					if(res.code == 1){
						_this.brandData = res.data;
					}
					
				})
			},
			sectionLetter: function(el){
				if(document.querySelector(el)){
					var ot = document.querySelector(el).offsetTop;
					var lh = this.$refs.letter[0].clientHeight;
					ot = ot - lh;
					document.querySelector('.choice_page_wrapper').scrollTop = ot;
				}
			},
			showSeries: function(id,name){
				this.seriesShow = !this.seriesShow;
				this.brandId = id;
				this.brandName = name;
				var _this = this;
				this.$fetchPost('/getSeries',{token: this.token, b_id: id}).then(function(res){
					console.log(res)
					if(res.code == 1){
						_this.seriesData = res.data;
					}
					
				})
			},
			seriesHide: function(){
				this.seriesShow = false;
			},
			showSpec: function(id,name){
				this.seriesName = name;
				this.seriesId = id;
				this.specShow = !this.specShow;
				var _this = this;
				this.$fetchPost('/getSpec',{token: this.token, s_id: id}).then(function(res){
					console.log(res)
					if(res.code == 1){
						_this.specData = res.data;
					}					
				})
			},
			specHide: function(){
				this.specShow = false;
			},
			choiceSpec: function(id,name){
				this.activeItem = id;
				this.specId = id;
				this.specName = name;
			},
			confirm: function(){
				if(this.$route.query.from == 'filter'){
					this.$store.commit('filterCondition/changeBrand',{brandId: this.brandId, brandName: this.brandName, seriesId: this.seriesId, seriesName: this.seriesName, specId: this.specId, specName: this.specName});
				}else if(this.$route.query.from == 'publishVehicle'){
					this.$store.commit('publishCondition/changeBrand',{brandId: this.brandId, brandName: this.brandName, seriesId: this.seriesId, seriesName: this.seriesName, specId: this.specId, specName: this.specName});
				}else{
					this.$store.commit('vehicleList/changeBrand',{brandId: this.brandId, brandName: this.brandName, seriesId: this.seriesId, seriesName: this.seriesName, specId: this.specId, specName: this.specName});
				}				
				this.$router.goBack();
			}
		}
	}
</script>

<style scoped>
	@import '../../static/css/swiper.css';
	.container{
		height: 100%;
	}
	.pad{
		height: 0.88rem;
	}
	.choice_page_wrapper{
		height: calc(100% - 0.88rem);
	    box-sizing: border-box;
	    overflow-y: scroll;
        -webkit-overflow-scrolling: touch;
        position: relative;
	}
	.choice_history .letter,.choice_all .letter {
	    height: 0.9rem;
	    line-height: 0.9rem;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    background: #f2f2f2;
	}
	.choice_history .list_wrapper {
	    background: #fff;
	    padding: 0.32rem;
	    overflow: scroll;
	}
	.swiper-container{
		width: 100%;
		height: 100%;
	}
	.choice_all .choice_item {
	    height: 0.9rem;
	    line-height: 0.9rem;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    background: #fff;
	    font-size: 0.28rem;
	    color: #000;
	}
	.letters_order_list .item .letter {
	    height: 0.9rem;
	    line-height: 0.9rem;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    background: #f2f2f2;
	}
	.letters_order_list .item .list_wrapper {
	    overflow: hidden;
	}
	.letters_order_list .item .list {
	    margin-top: -1px;
	}
	.letters_order_list .item .list li {
	    height: 0.9rem;
	    line-height: 0.9rem;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    background: #fff;
	    border-top: 1px solid #EFEFEF;
	    font-size: 0.28rem;
	    color: #000;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	}
	.letters_order_list .item .list li .logo {
	    width: 0.7rem;
	    height: 0.7rem;
	    display: inline-block;
	    margin-right: 0.2rem;
	}
	.letters_order_list .item .list li .logo img {
	    width: 100%;
	    height: 100%;
	}
	.letters_list {
	    position: fixed;
	    top: 1.5rem;
	    right: 0.21rem;
	}
	.letters_list .sectionLetter {
	    display: block;
	    font-size: 0.24rem;
	    color: #8A8F9B;
	    width: 0.23rem;
	    text-align: center;
	    margin-bottom: 0.05rem;
	}
	.choice_middle_container{
		position: fixed;
		width: 100%;
		height: calc(100% - 0.88rem);
		z-index: 99;
		bottom: 0;
	}
	.choice_middle_container .kongbai{
		width: 100%;
		height: 100%;
	}
	.choice_middle_list {
	    position: absolute;
	    height: 100%;
	    box-sizing: border-box;
	    width: 6.75rem;
	    top: 0rem;
	    right: 0;
	    box-shadow: -5px 6px 13px 1px rgba(163,163,163,0.4);
	    background: #fff;
	    overflow-y: scroll;
	    -webkit-overflow-scrolling: touch;
	}
	.choice_middle_list .title {
	    height: 0.9rem;
	    line-height: 0.9rem;
	    text-align: center;
	    font-size: 0.3rem;
	    color: #000;
	}
	.choice_middle_list .letter {
	    height: 0.9rem;
	    line-height: 0.9rem;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    background: #eeeff0;
	}
	.choice_middle_list .choice_middle_item {
	    height: 0.9rem;
	    line-height: 0.9rem;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    background: #fff;
	    border-top: 1px solid #EFEFEF;
	    font-size: 0.28rem;
	    color: #000;
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
	}
	.choice_middle_list .list_wrapper {
	    overflow: hidden;
	}
	.choice_middle_list .list_wrapper ul {
	    margin-top: -1px;
	}
	.choice_middle_list .choice_middle_item .label1 {
	    font-size: 0.28rem;
	    color: #000;
	}
	.choice_middle_list .choice_middle_item .label2 {
	    color: #8A8F9B;
	    font-size: 0.28rem;
	}
	.sub_list-enter-active, .sub_list-leave-active {
	    transition: transform .2s;
	    -webkit-transition: transform .2s;
	}
	.sub_list-enter, .sub_list-leave-to {
	    transform: translateX(100%);
	    -webkit-transform: translateX(100%);
	}
	.choice_sub_list{
		position: fixed;
		width: 100%;
		bottom: 0;
		height: calc(100% - 0.88rem);
		z-index: 99;
	}
	.choice_sub_list .kongbai{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
	}
	.choice_sub_list_c{
		width: 6.75rem;
		position: absolute;
		right: 0;
		height: 100%;
		background: #fff;
		-webkit-overflow-scrolling: touch;
	}
	.choice_sub_list_c .kongbai{
		width: 100%;
		height: 100%;
	}
	.choice_sub_list .sheng {
	    height: 0.9rem;
	    line-height: 0.9rem;
	    text-align: center;
	    font-size: 0.3rem;
	    color: #000;
	}
	.choice_sub_list .letter {
	    height: 0.9rem;
	    line-height: 0.9rem;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    background: #eeeff0;
	}
	.choice_sub_list .choice_all{
		font-size: 0.28rem;
		height: 0.9rem;
		line-height: 0.9rem;
		padding: 0 0.32rem;
		box-sizing: border-box;
	}
	.choice_sub_list .btn_container {
	    height: 0.98rem;
	    position: fixed;
	    bottom: 0;
	    width: 6.75rem;
	    background: #fff;
	}
	.choice_sub_list .btn_container .choice_cancel {
	    float: left;
	    width: 50%;
	    height: 100%;
	    line-height: 0.98rem;
	    text-align: center;
	    font-size: 0.3rem;
	    color: #000;
	}
	.choice_sub_list .btn_container .choice_choice {
	    float: left;
	    width: 50%;
	    height: 100%;
	    line-height: 0.98rem;
	    text-align: center;
	    color: #fff;
	    background: #FF620C;
	    font-size: 0.3rem;
	}
	.choice_sub_list .sub_list_wrapper {
	    overflow: hidden;
	}
	.choice_sub_list .sub_list_wrapper .sub_list {
	    margin-top: -1px;
	    padding-bottom: 0.2rem;
	}
	.choice_sub_list .choice_sub_item {
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    height: 0.9rem;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    border-top: 1px solid #EFEFEF;
	}
	.choice_sub_list .choice_sub_item .radioDefault {
	    width: 0.34rem;
	    height: 0.34rem;
	    background: url(../assets/images/dr.png) no-repeat;
	    background-size: 100% 100%;
	}
	.choice_sub_list .choice_sub_item.active .radioDefault {
	    background: url(../assets/images/drs.png) no-repeat;
	    background-size: 100% 100%;
	}
	.choice_sub_list .choice_sub_item .text {
	    font-size: 0.28rem;
	    color: #000;
	    margin-left: 0.2rem;
	}
</style>
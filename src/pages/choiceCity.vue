<template>
	<div class="container">
		<header1 v-bind:title="title"></header1>
		<div class="pad"></div>
		<div class="choice_page_wrapper">
			<div class="letters_order_list">
				<div class="item" id="sectionAll">
					<div class="letter">*</div>
					<div class="list_wrapper">
						<ul class="list">
							<li class="choice_item">全国</li>					
						</ul>
					</div>
				</div>
				<div class="item" v-for="item in provinceData" :id="'section'+item.key">
				    <div class="letter" ref="letter">{{item.key}}</div>
				    <div class="list_wrapper">
				        <ul class="list"><li class="choice_item" v-for="subItem in item.values" :key="subItem.id" @click="cityShow(subItem.id,subItem.text)">{{subItem.text}}</li></ul>
				    </div>
				</div>
			</div>
		</div>
		<div class="letters_list">
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
			<div class="choice_sub_list" v-show="cityListShow">
			    <div class="bg" @click="cityHide()"></div>
			    <div class="choice_sub_list_c">
					<div class="sheng">{{provinceName}}</div>
					<div class="kongxi"></div>
					<div class="sub_list_wrapper">
						<ul class="sub_list" id="sub_list" style="padding-bottom: 0;">
							<li class="choice_sub_item" v-for="item in cityData" :key="item.id" v-bind:class="[activeItem == item.id ? 'active' : '']" @click="choice(item.id,item.text)">
							    <span class="radioDefault"></span><span class="text">{{item.text}}</span>
							</li>
						</ul>
						<div style="height: 0.98rem;"></div>
					</div>
					
				</div>
				<div class="btn_container">
					<div class="choice_cancel" @click="cityHide()">取消选择</div>
					<div class="choice_choice" @click="confirm()">确定</div>
				</div>
			</div>
		</transition>	
	</div>
</template>

<script>
    import header1 from '../components/header1'
	export default{
		name: 'choiceCity',
		data(){
			return {
				title: '选择城市',
				provinceData: '',
				token: localStorage.getItem('myToken'),
				cityListShow: false,
				provinceName: '',
				provinceId: '',
				cityData: '',
				activeItem: '',
				cityId: '',
				cityName: ''
			}
		},
		components: {header1},
		mounted(){
			this.loadProvince();
		},
		methods: {
			loadProvince: function(){
				var _this = this;
				this.$fetchPost('/CarProvinceList',{token: this.token, type: 1}).then(function(res){
					console.log(res)
					if(res.code == 1){
						_this.provinceData = res.data;
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
			cityShow: function(id,name){
				this.cityListShow = !this.cityListShow;
				this.provinceId = id;
				this.provinceName = name;
				var _this = this;
				this.$fetchPost('/CarCitiesList',{token: this.token, id: id}).then(function(res){
					console.log(res)
					if(res.code == 1){
						_this.cityData = res.data;
					}
					
				})
			},
			cityHide: function(){
				this.cityListShow = false;
			},
			choice: function(id,name){
				this.cityId = id;
				this.cityName = name;
				this.activeItem = id;
			},
			confirm: function(){
				this.$store.commit('vehicleList/changeCity',{provinceId: this.provinceId, cityId: this.cityId, cityName: this.cityName});
				this.$router.goBack();
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
	.choice_page_wrapper{
		height: calc(100% - 0.88rem);
		overflow-y: scroll;
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
	.choice_sub_list {
		position: fixed;
		z-index: 99;
		width: 100%;
		height: calc(100% - 0.88rem);
		bottom: 0;	    
	}
	.choice_sub_list_c {
		position:absolute;
		width:6.75rem;
		-webkit-overflow-scrolling: touch;
		right: 0;
		height: 100%;
		background: #fff;
		box-shadow: -5px 6px 13px 1px rgba(163,163,163,0.4);
		overflow-y: scroll;
	}
	.choice_sub_list .sheng {
	    height: 0.9rem;
	    line-height: 0.9rem;
	    text-align: center;
	    font-size: 0.3rem;
	    color: #000;
	}
	.choice_sub_list .bg{
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
	}
	.choice_sub_list .kongxi {
	    height: 0.2rem;
	    background: #eeeff0;
	}
	.choice_sub_list .sub_list_wrapper {
	    overflow: hidden;
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
	.choice_sub_list .btn_container {
	    height: 0.98rem;
	    position: absolute;
	    bottom: 0;
	    width: 6.75rem;
	    right: 0;
	    background: #fff;
	}
	.choice_sub_list .choice_sub_item .radioDefault {
	    width: 0.34rem;
	    height: 0.34rem;
	    background: url(../assets/images/dr.png) no-repeat;
	    background-size: 100% 100%;
	}
	.choice_sub_list .choice_sub_item .text {
	    font-size: 0.28rem;
	    color: #000;
	    margin-left: 0.2rem;
	}
	.choice_sub_list .choice_sub_item.active .radioDefault {
	    background: url(../assets/images/drs.png) no-repeat;
	    background-size: 100% 100%;
	}
	.choice_sub_list .choice_sub_item.active .text {
	    color: #FF620C;
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
	.sub_list-enter-active, .sub_list-leave-active {
	    transition: transform .2s;
	    -webkit-transition: transform .2s;
	}
	.sub_list-enter, .sub_list-leave-to {
	    transform: translateX(100%);
	    -webkit-transform: translateX(100%);
	}
</style>
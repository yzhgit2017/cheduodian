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
							<li class="choice_item">不限</li>
						</ul>
					</div>
				</div>
				<div class="item" v-for="item in marketData" :id="'section' + item.key">
					<div class="letter" ref="letter">{{item.key}}</div>
					<div class="list_wrapper">
						<ul class="list">
							<li class="choice_item" @click="choice(subItem.id,subItem.text)" v-for="subItem in item.values" :key="subItem.id">{{subItem.text}}</li>
						</ul>
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
	</div>
</template>

<script>
    import { mapState } from 'vuex'
    import header1 from '../components/header1'
	export default {
		name: 'choiceMarket',
		data(){
			return {
				title: '选择市场',
				token: localStorage.getItem('myToken'),
				marketData: ''
			}
		},
		components: { header1 },
		mounted(){
			this.loadMarket();
		},
		computed: mapState({
		   data: state => state.vehicleList,
		}),
		methods:{
			loadMarket: function(){
				var _this = this;
				this.$fetchPost('/CarMarketList',{token: this.token, id: this.data.data.city.id}).then(function(res){
					console.log(res)
					if(res.code == 1){
						_this.marketData = res.data;
					}
					
				})
			},
			sectionLetter: function(el){
				if(document.querySelector(el)){
					var ot = document.querySelector(el).offsetTop;
					var lh = this.$refs.letter[0].clientHeight;
					ot = ot - lh;
					console.log(ot)
					document.querySelector('.choice_page_wrapper').scrollTop = ot;
				}
			},
			choice: function(id,name){
				if(this.$route.query.from == 'filter'){
					this.$store.commit('filterCondition/changeMarket',{marketId: id, marketName: name});
				}else{
					this.$store.commit('vehicleList/changeMarket',{marketId: id, marketName: name});
				}
				this.$router.goBack();
			}
		}
	}
</script>

<style scoped>
	.container {
		height: 100%;
	}
	.pad {
		height: 0.88rem;
	}
	.choice_page_wrapper {
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
</style>
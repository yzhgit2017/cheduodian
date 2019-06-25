<template>
	<div class="container">
		<header1 v-bind:title="title"></header1>
		<div class="pad"></div>
		<div class="biansuxiang">
			<range v-bind:unit="unit"></range>
			<div class="title">全部</div>
			<div class="biansu_item" @click="choice(0,0,'不限','')" v-bind:class="[activeItem == '' ? 'active' : '']"><label class="label1">不限</label><img src="../assets/images/bss.png"></div>
			<div class="title">车龄</div>
			<div class="range_list">
				<div class="biansu_item" v-for="(item,index) in cotyData" @click="choice(item.min,item.max,item.val,index)" v-bind:class="[activeItem == index ? 'active' : '']"><label class="label1">{{item.val}}</label><img src="../assets/images/bss.png"></div>
			</div>	
		</div>		
	</div>
</template>

<script>
    import header1 from '../components/header1'
    import range from '../components/range'
	export default{
		name: 'coty',
		data(){
			return{
				title: '车龄',
				unit: '年',
				token: localStorage.getItem('myToken'),
				cotyData: '',
				activeItem: ''
			}
		},
		components: { header1, range },
		mounted(){
			this.loadRange();
		},
		methods: {
			loadRange: function(){
				var _this = this;
				this.$fetchPost('/getCarAge',{token: this.token}).then(function(res){
					console.log(res)
					_this.cotyData = res.data;
				})
			},
			choice: function(min,max,val,index){
     			this.activeItem = index;
     			if(this.$route.query.from == 'filter'){
     				this.$store.commit('filterCondition/changeCoty',{min: min, max: max, val: val});
     			}else{
     				this.$store.commit('vehicleList/changeCoty',{min: min, max: max, val: val});
     			}
     			
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
	.biansuxiang{
		height: calc(100% - 0.88rem);
	}
	.biansuxiang .title {
	    height: 0.9rem;
	    line-height: 0.9rem;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    background: #eeeff0;
	}
	.biansuxiang .biansu_item {
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
	.biansuxiang .biansu_item.active .label1 {
	    color: #FF620C;
	}
	.biansuxiang .biansu_item.active img {
	    display: block;
	}
	.biansuxiang .biansu_item img {
	    width: 0.3rem;
	    height: 0.2rem;
	    display: none;
	}
</style>
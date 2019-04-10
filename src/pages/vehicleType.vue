<template>
	<div class="container">
		<header1 v-bind:title="title">
			<template v-slot:navRightBtn>
				<label style="font-size: .32rem;color: #FF620C;" @click="confirm()">确定</label>
			</template>
		</header1>
		<div class="car_color_content boxbg cheyuanliex">
			<div class="title">全部</div>
			<ul class="color_list">
				<li @click="checked(0)" data-id="0" class="typeItem" v-bind:class="[activeItem == '0' ? 'active' : '']">
					<span class="radioDefault"></span>
					<span class="text">不限</span>
				</li>
			</ul>
			<div class="title">车源类型</div>
			<ul class="color_list other_list">				
			    <li class="typeItem" v-for="item in data" :key="item.id" :data-id="item.id" v-bind:class="[activeItem == item.id ? 'active' : '']" @click="checked(item.id,item.car_source_type)"><span class="radioDefault"></span><span class="text">{{item.car_source_type}}</span></li>
			</ul>
		</div>
	</div>
</template>

<script>
    import header1 from '@/components/header1'
	export default{
		name: 'vehicleType',
		data(){
			return {
				title: '车源类型',
				data: '',
				token: localStorage.getItem("myToken"),
				activeItem: '',
				activeItemName: ''
			}
		},
		components:{header1},
		mounted(){
			this.loadData();
		},
		methods:{
			loadData: function(){
				var _this = this;
				this.$fetchPost('/getCarSourceType',{token: this.token}).then(function(res){
					console.log(res)
					_this.data = res.data;
				})
			},
			checked: function(id,name){
				this.activeItem = id;
				this.activeItemName = name;
			},
			confirm: function(){
				if(this.$route.query.from == 'filter'){
					this.$store.commit('filterCondition/changeType',{typeId: this.activeItem, typeName: this.activeItemName});				
				}else{
					this.$store.commit('vehicleList/changeType',{typeId: this.activeItem, typeName: this.activeItemName});
				}
				this.$router.goBack();
			}
		}
	}
</script>

<style scoped>
	.car_color_content {
	    height: 100%;
	    padding-top: 0.88rem;
	    box-sizing: border-box;
	    background: #fff;
	}
	.boxbg {
	    background: #EEEFF0;
	}
	.car_color_content .title {
	    height: 0.9rem;
	    line-height: 0.9rem;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    background: #eeeff0;
	}
	.car_color_content .color_list {
	    background: #fff;
	    padding-bottom: 0;
	}
	.car_color_content .color_list li {
	    height: 0.9rem;
	    background: #fff;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	    border-bottom: 1px solid #EFEFEF;
	}
	.car_color_content .color_list li .radioDefault {
	    width: 0.34rem;
	    height: 0.34rem;
	    background: url(../assets/images/dr.png) no-repeat;
	    background-size: 100% 100%;
	}
	.car_color_content .color_list li.active .radioDefault {
	    background: url(../assets/images/drs.png) no-repeat;
	    background-size: 100% 100%;
	}
	.car_color_content .color_list li .text {
	    font-size: 0.28rem;
	    color: #000;
	    margin-left: 0.2rem;
	    width: 1.5rem;
	}
</style>
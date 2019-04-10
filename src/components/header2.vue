<template>
	<div class="myCarSource_topbar">
		<div class="container">
			<div class="left_arrow" @click="goBack()">
				<img src="../assets/images/left_arrow.png">
			</div>
			<div class="search"><img src="../assets/images/searchIcon.png"><form action="" onsubmit="return false;" id="searchForm" style="margin:0;display: inherit;"><input type="search" name="" placeholder="搜索您要找的车辆" id="searchContent"></form></div>
			<div class="order" @click="goFilter()"><img src="../assets/images/orderIcon.png"></div>
			<div class="share" id="share_btn"><img src="../assets/images/shareIcon.png"></div>
		</div>
	</div>
</template>

<script>
    import { mapState } from 'vuex'
	export default{
		name: 'header2',
		data(){
			return {}
		},
		computed: mapState({
		   data: state => state.vehicleList,
		}),
		methods: {
			goBack: function(){
				this.$router.goBack();
			},
			goFilter: function(){
				this.$store.commit('filterCondition/init');
				this.$store.commit('filterCondition/filterAlive',{
					provinceId: this.data.data.province,
					cityId: this.data.data.city.id,
					cityText: this.data.data.city.text,
					marketId: this.data.data.market.id,
					marketText: this.data.data.market.text,
					carTypeId: this.data.data.cartype.id, 
					carTypeText: this.data.data.cartype.text, 
					brandText: this.data.data.brand.text, 
					brandId: this.data.data.brand.id, 
					seriesId: this.data.data.series.id, 
					seriesText: this.data.data.series.text, 
					specId: this.data.data.spec.id, 
					specText: this.data.data.spec.text, 
					minage: this.data.data.minage,
					maxage: this.data.data.maxage,
					age: this.data.data.age,
					minprice: this.data.data.minprice,
					maxprice: this.data.data.maxprice,
					price: this.data.data.price,
					sort: this.data.data.sort,
					minmileage: this.data.data.minmileage,
					maxmileage: this.data.data.maxmileage,
					mileage: this.data.data.mileage,
					transmissioncaseId: this.data.data.transmissioncase.id,
					transmissioncaseText: this.data.data.transmissioncase.text,
					mindisplacement: this.data.data.mindisplacement,
					maxdisplacement: this.data.data.maxdisplacement,
					displacement: this.data.data.displacement,
					colorId: this.data.data.color.id,
					colorText: this.data.data.color.text
				});
				this.$router.push('/filter');
			}
		}
	}
</script>

<style scoped>
	.myCarSource_topbar {
	    height: 0.88rem;
	    background: #fff;
	    border-bottom: 1px solid #ddd;
	    box-sizing: border-box;
	    padding: 0 0.32rem;
	    position: fixed;
	    z-index: 999;
	    top: 0;
	    width: 100%;
	}
	.myCarSource_topbar .container {
	    width: 100%;
	    height: 100%;
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
	.myCarSource_topbar .left_arrow {
	    width: 0.16rem;
	    height: 0.29rem;
	}
	.myCarSource_topbar .left_arrow img {
	    width: 100%;
	    height: 100%;
	    vertical-align: top;
	}
	.myCarSource_topbar .search {
	    width: 4.92rem;
	    height: 0.6rem;
	    border-radius: 0.3rem;
	    background: #F4F4F4;
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-pack: center;
	    -ms-flex-pack: center;
	    -webkit-justify-content: center;
	    justify-content: center;
	    -webkit-box-align: center;
	    -ms-flex-align: center;
	    -webkit-align-items: center;
	    align-items: center;
	}
	.myCarSource_topbar .search img {
	    width: 0.22rem;
	    height: 0.24rem;
	}
	.myCarSource_topbar .search input {
	    background: none;
	    margin-left: 0.1rem;
	}
	.myCarSource_topbar .order {
	    width: 0.4rem;
	    height: 0.34rem;
	}
	.myCarSource_topbar .order img {
	    width: 100%;
	    height: 100%;
	    vertical-align: top;
	}
	.myCarSource_topbar .share {
	    width: 0.44rem;
	    height: 0.40rem;
	}
	.myCarSource_topbar .share img {
	    width: 100%;
	    height: 100%;
	    vertical-align: top;
	}
</style>
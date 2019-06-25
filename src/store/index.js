import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const vehicleList = {
	namespaced: true,
	state: {
		loadingState: false,
		data: {
			search: '',
			search_id: '',
			province: '',
			city: {
				text: '',
				id: ''
			},
			market: {
				text: '',
				id: ''
			},
			brand: {
				text: '',
				id: ''
			},
			series: {
				text: '',
				id: ''
			},
			spec: {
				text: '',
				id: ''
			},
			minage: '',
			maxage: '',
			age: '',
			minprice: '',
			maxprice: '',
			price: '',
			minmileage: '',
			maxmileage: '',
			mileage: '',
			transmissioncase: {
				text: '',
				id: ''
			},
			mindisplacement: '',
			maxdisplacement: '',
			displacement: '',
			color: {
				text: '',
				id: ''
			},
			cartype: {
				text: '',
				id: ''
			},
			sort: {
				id: '',
				text: ''
			}
		}
	},
	mutations: {
		changeLoadingState(state,loadingState){
			console.log(loadingState)
			state.loadingState = loadingState;
		},
		init(state){
			state.data.province = '';
			state.data.city.text = '';
			state.data.city.id = '';
			state.data.cartype.id = '';
			state.data.cartype.text = '';
			state.data.brand.text = '';
			state.data.brand.id = '';
			state.data.series.text = '';
			state.data.series.id = '';
			state.data.spec.text = '';
			state.data.spec.id = '';
			state.data.province = '';
			state.data.city.text = '';
			state.data.city.id = '';
			state.data.minage = '';
			state.data.maxage = '';
			state.data.age = '';
			state.data.minprice = '';
			state.data.maxprice = '';
			state.data.price = '';
			state.data.market.text = '';
			state.data.market.id = '';
			state.data.sort.id = '';
			state.data.sort.text = '';
			state.data.minmileage = '';
			state.data.maxmileage = '';
			state.data.mileage = '';
			state.data.transmissioncase.text = '';
			state.data.transmissioncase.id = '';
			state.data.mindisplacement = '';
			state.data.maxdisplacement = '';
			state.data.displacement = '';
			state.data.color.text = '';
			state.data.color.id = '';
		},
		changePAC(state,params){
			state.data.province = params.provinceId;
			state.data.city.text = params.cityText;
			state.data.city.id = params.cityId;
		},
		changeType(state,params){
			state.data.cartype.id = params.typeId;
			state.data.cartype.text = params.typeName;
		},
		changeBrand(state,params){
			state.data.brand.text = params.brandName;
			state.data.brand.id = params.brandId;
			state.data.series.text = params.seriesName;
			state.data.series.id = params.seriesId;
			state.data.spec.text = params.specName;
			state.data.spec.id = params.specId;
		},
		changeCity(state,params){
			state.data.province = params.provinceId;
			state.data.city.text = params.cityName;
			state.data.city.id = params.cityId;
		},
		changeCoty(state,params){
			state.data.minage = params.min;
			state.data.maxage = params.max;
			state.data.age = params.val;
		},
		changePrice(state,params){
			state.data.minprice = params.min;
			state.data.maxprice = params.max;
			state.data.price = params.val;
		},
		changeMarket(state,params){
			state.data.market.text = params.marketName;
			state.data.market.id = params.marketId;
		},
		changeSort(state,params){
			state.data.sort.id = params.sortId;
			state.data.sort.text = params.sortText;
		},
		changeMileage(state,params){
			state.data.minmileage = params.min;
			state.data.maxmileage = params.max;
			state.data.mileage = params.val;
		},
		biansuxiang(state,params){
			state.data.transmissioncase.text = params.val;
			state.data.transmissioncase.id = params.id;
		},
		displacement(state,params){
			state.data.mindisplacement = params.min;
			state.data.maxdisplacement = params.max;
			state.data.displacement = params.val;
		},
		changeColor(state,params){
			state.data.color.text = params.colorName;
			state.data.color.id = params.colorId;
		}
	},
	actions: {},
	getters: {}
}

const filterCondition = {
	namespaced: true,
	state: {
		data: {
			province: '',
			city: {
				text: '',
				id: ''
			},
			market: {
				text: '',
				id: ''
			},
			brand: {
				text: '',
				id: ''
			},
			series: {
				text: '',
				id: ''
			},
			spec: {
				text: '',
				id: ''
			},
			minage: '',
			maxage: '',
			age: '',
			minprice: '',
			maxprice: '',
			price: '',
			minmileage: '',
			maxmileage: '',
			mileage: '',
			transmissioncase: {
				text: '',
				id: ''
			},
			mindisplacement: '',
			maxdisplacement: '',
			displacement: '',
			color: {
				text: '',
				id: ''
			},
			cartype: {
				text: '',
				id: ''
			},
		}
	},
	mutations: {
		init(state){
			state.data.province = '';
			state.data.city.text = '';
			state.data.city.id = '';
			state.data.market.text = '';
			state.data.market.id = '';
			state.data.brand.text = '';
			state.data.brand.id = '';
			state.data.series.text = '';
			state.data.series.id = '';
			state.data.spec.text = '';
			state.data.spec.id = '';
			state.data.minage = '';
			state.data.maxage = '';
			state.data.age = '';
			state.data.minprice = '';
			state.data.maxprice = '';
			state.data.price = '';
			state.data.minmileage = '';
			state.data.maxmileage = '';
			state.data.mileage = '';
			state.data.transmissioncase.text = '';
			state.data.transmissioncase.id = '';
			state.data.mindisplacement = '';
			state.data.maxdisplacement = '';
			state.data.displacement = '';
			state.data.color.id = '';
			state.data.color.text = '';
			state.data.cartype.text = '';
			state.data.cartype.id = '';
		},
		filterAlive(state,params){
			state.data.province = params.provinceId;
			state.data.city.text = params.cityText;
			state.data.city.id = params.cityId;
			state.data.market.text = params.marketText;
			state.data.market.id = params.marketId;
			state.data.brand.text = params.brandText;
			state.data.brand.id = params.brandId;
			state.data.series.text = params.seriesText;
			state.data.series.id = params.seriesId;
			state.data.spec.text = params.specText;
			state.data.spec.id = params.specId;
			state.data.minage = params.minage;
			state.data.maxage = params.maxage;
			state.data.age = params.age;
			state.data.minprice = params.minprice;
			state.data.maxprice = params.maxprice;
			state.data.price = params.price;
			state.data.minmileage = params.minmileage;
			state.data.maxmileage = params.maxmileage;
			state.data.mileage = params.mileage;
			state.data.transmissioncase.text = params.transmissioncaseText;
			state.data.transmissioncase.id = params.transmissioncaseId;
			state.data.mindisplacement = params.mindisplacement;
			state.data.maxdisplacement = params.maxdisplacement;
			state.data.displacement = params.displacement;
			state.data.color.id = params.colorId;
			state.data.color.text = params.colorText;
			state.data.cartype.text = params.carTypeText;
			state.data.cartype.id = params.carTypeId;
		},
		changeBrand(state,params){
			state.data.brand.text = params.brandName;
			state.data.brand.id = params.brandId;
			state.data.series.text = params.seriesName;
			state.data.series.id = params.seriesId;
			state.data.spec.text = params.specName;
			state.data.spec.id = params.specId;
		},
		changeType(state,params){
			state.data.cartype.id = params.typeId;
			state.data.cartype.text = params.typeName;
		},
		changeCity(state,params){
			state.data.province = params.provinceId;
			state.data.city.text = params.cityName;
			state.data.city.id = params.cityId;
		},
		changeCoty(state,params){
			state.data.minage = params.min;
			state.data.maxage = params.max;
			state.data.age = params.val;
		},
		changePrice(state,params){
			state.data.minprice = params.min;
			state.data.maxprice = params.max;
			state.data.price = params.val;
		},
		changeMarket(state,params){
			state.data.market.text = params.marketName;
			state.data.market.id = params.marketId;
		},
		changeMileage(state,params){
			state.data.minmileage = params.min;
			state.data.maxmileage = params.max;
			state.data.mileage = params.val;
		},
		biansuxiang(state,params){
			state.data.transmissioncase.text = params.val;
			state.data.transmissioncase.id = params.id;
		},
		displacement(state,params){
			state.data.mindisplacement = params.min;
			state.data.maxdisplacement = params.max;
			state.data.displacement = params.val;
		},
		changeColor(state,params){
			state.data.color.text = params.colorName;
			state.data.color.id = params.colorId;
		}
	},
	actions: {},
	getters: {}
}

const publishCondition = {
	namespaced: true,
	state: {
		data: {
			fengmian: '',
			photos: [],
			vin: '',
			pailiang: '',
			licheng: '',
			brand: {
				text: '',
				id: ''
			},
			series: {
				text: '',
				id: ''
			},
			spec: {
				text: '',
				id: ''
			},
			color: {
				text: '',
				id: ''
			},
			transmissioncase: {
				text: '',
				id: ''
			},
			market: {
				text: '',
				id: ''
			},
			car_color_id: [],
			car_des: [],
			car_style: [],
			car_parts_id: [],
			car_color: [],
			car_condition_id: [],
			pointNum: '',
			pointData: [],
			chekuangMs: '',
			minPriceV: '',
			pifa: 1,
			yt: '',
			dateText: '',
			p_unit: 'L'
		}
	},
	mutations: {
		init(state){
			state.data.fengmian = '';
			state.data.photos = [];
			state.data.brand.text = '';
			state.data.brand.id = '';
			state.data.series.text = '';
			state.data.series.id = '';
			state.data.spec.text = '';
			state.data.spec.id = '';
			state.data.color.text = '';
			state.data.color.id = '';
			state.data.transmissioncase.text = '';
			state.data.transmissioncase.id = '';
			state.data.market.text = '';
			state.data.market.id = '';
			state.data.car_color_id = [];
			state.data.car_des = [];
			state.data.car_style = [];
			state.data.car_parts_id = [];
			state.data.car_color = [];
			state.data.car_condition_id = [];
			state.data.pointNum = '';
			state.data.pointData = [];
			state.data.chekuangMs = '';
			state.data.minPriceV = '';
			state.data.uploadImgData = []
		},
		uploadImg(state,params){
			state.data.fengmian = params.fengmian;
			state.data.photos = params.photos;
		},
		changeBrand(state,params){
			state.data.brand.text = params.brandName;
			state.data.brand.id = params.brandId;
			state.data.series.text = params.seriesName;
			state.data.series.id = params.seriesId;
			state.data.spec.text = params.specName;
			state.data.spec.id = params.specId;
		},
		changeColor(state,params){
			state.data.color.text = params.colorName;
			state.data.color.id = params.colorId;
		},
		biansuxiang(state,params){
			state.data.transmissioncase.text = params.val;
			state.data.transmissioncase.id = params.id;
		},
		changeMarket(state,params){
			state.data.market.text = params.marketName;
			state.data.market.id = params.marketId;
		},
		changeVin(state,params){
			state.data.vin = params.vin;
		},
		changePL(state,params){
			state.data.pailiang = params.pailiang;
		},
		changeLC(state,params){
			state.data.licheng = params.licheng;
		},
		changePoint(state,params){
			state.data.car_color_id = params.car_color_id;
			state.data.car_des = params.car_des;
			state.data.car_style = params.car_style;
			state.data.car_parts_id = params.car_parts_id;
			state.data.car_color = params.car_color;
			state.data.car_condition_id = params.car_condition_id;
			state.data.pointNum = params.pointNum;
			state.data.pointData = params.pointData;
		},
		changeMs(state,params){
			state.data.chekuangMs = params.chekuangMs;
		},
		changeSHJ(state,params){
			state.data.minPriceV = params.minPriceV;
		},
		changePifa(state,params){
			state.data.pifa = params.pifa;
		},
		changeYt(state,params){
			state.data.yt = params.yt;
		},
		changeDate(state,params){
			state.data.dateText = params.dateText;
		},
		changepunit(state,params){
			state.data.p_unit = params.p_unit;
		}
	},
	actions: {},
	getters: {}
}

export default new Vuex.Store({
  modules: {
    vehicleList: vehicleList,
    filterCondition: filterCondition,
    publishCondition: publishCondition
  },
})

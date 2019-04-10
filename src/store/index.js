import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const vehicleList = {
	namespaced: true,
	state: {
		loadingState: false
	},
	mutations: {
		changeLoadingState(state,loadingState){
			console.log(loadingState)
			state.loadingState = loadingState;
		},
		init(state){
			Vue.set(state,'data',{
				search: '',
				search_id: '',
				province: localStorage.getItem("myProvinceId"),
				city: {
					text: localStorage.getItem("myRoomCity"),
					id: localStorage.getItem("myRoomCityId")
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
				sort: ''
			})
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
			state.data.sort = params;
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
		}
	},
	actions: {},
	getters: {}
}

const filterCondition = {
	namespaced: true,
	state: {},
	mutations: {
		init(state){
			Vue.set(state,'data',{
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
			})
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
		}
	},
	actions: {},
	getters: {}
}

export default new Vuex.Store({
  modules: {
    vehicleList: vehicleList,
    filterCondition: filterCondition
  },
})

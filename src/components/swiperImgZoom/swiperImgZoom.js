import Vue from 'vue';

//不加.default会报template or render in not define的错
const zoomConstructor = Vue.extend(require('./swiperImgZoom.vue').default);

let swiperImgZoom = function(options){
	let instance = new zoomConstructor();
	let vm = instance.$mount();
    let el = vm.$el;
    instance.data = options.data;
	instance.currentIndex = options.index;
	document.body.appendChild(el)
}

export default swiperImgZoom;
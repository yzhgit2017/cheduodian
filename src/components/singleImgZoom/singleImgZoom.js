import Vue from 'vue';

//不加.default会报template or render in not define的错
const zoomConstructor = Vue.extend(require('./singleImgZoom.vue').default);

let singleImgZoom = function(options){
	let instance = new zoomConstructor();
	let vm = instance.$mount();
    let el = vm.$el;
    instance.url = options.url;
	instance.imgIndex = options.index;
	document.body.appendChild(el)
}

export default singleImgZoom;
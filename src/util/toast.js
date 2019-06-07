import Vue from 'vue';

//不加.default会报template or render in not define的错
const ToastConstructor = Vue.extend(require('../components/toast.vue').default);

let removeDom = el => {
  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }
};

let Toast = function(options) {
	let instance = new ToastConstructor()
	let vm = instance.$mount()
  let el = vm.$el
  clearTimeout(instance.timer);
  instance.message = options.message;
  instance.typeName = options.type;
  document.body.appendChild(el)
  instance.timer = setTimeout(function() {
    removeDom(el)
  }, 2000)
}

export default Toast;
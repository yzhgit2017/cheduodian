import Vue from 'vue';

const ToastConstructor = Vue.extend(require('../components/toast1.vue').default);

let removeDom = el => {
  if (el.parentNode) {
    el.parentNode.removeChild(el);
  }
};

let Toast1 = function(options) {
  if(document.querySelector(".tishiContainer1")){
    
  }else{
    let instance = new ToastConstructor()
    let vm = instance.$mount()
    let el = vm.$el
    clearTimeout(instance.timer);
    instance.message = options.message;
    document.body.appendChild(el)
    instance.timer = setTimeout(function() {
      removeDom(el)
    }, 2000)
  }
	
}

export default Toast1;
<template>
  <div id="app">
  	<transition :name="transitionName">
        <router-view/>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
      transitionName: 'slide-left'
    }
  },
  watch: {
	  '$route' (to, from) {
	  	let isBack = this.$router.isBack
　　　　　　if(isBack) {
　　　　　　　　this.transitionName = 'slide-right'
　　　　　　} else {
　　　　　　       this.transitionName = 'slide-left'
　　　　　}
		console.log(this.transitionName)
　　    this.$router.isBack = false
	  }
	}
}
</script>

<style>
	#app{
		height: 100%;
	}
	.slide-left-enter-active, .slide-left-leave-active {
	  transition: -webkit-transform .2s;
	}
	.slide-left-enter, .slide-left-leave-to {
	  -webkit-transform: translateX(-100%);
	}
	.slide-right-enter-active, .slide-right-leave-active {
	  transition: -webkit-transform .2s;
	}
	.slide-right-enter, .slide-right-leave-to {
	  -webkit-transform: translateX(100%);
	}
</style>

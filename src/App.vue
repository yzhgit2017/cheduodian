<template>
  <div id="app">
    <img src="./assets/images/loading2.gif" v-show="loadingState" class="loadingImg">
  	<transition :name="transitionName">
  	    <template v-if="$route.meta.keepAlive">
	  	    <keep-alive>
	            <router-view></router-view>
	        </keep-alive>
        </template>
        <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>
  </div>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
	    name: 'App',
	    data () {
		    return {
		      transitionName: 'slide-left',
		      loadingState: false
		    }
	    },
	    computed: mapState({
	        data: state => state.vehicleList.loadingState,
	    }),
	    mounted(){
	    	
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
		    },
		    'data'(){
		    	this.loadingState = this.data;
		    }
		}
	}
</script>

<style>
	#app{
		
	}
	.loadingImg{
		position: fixed;
		width: 1rem;
		height: 1rem;
		top:50%;
		margin-top: -0.5rem;
		left: 50%;
		margin-left: -0.5rem;
		z-index: 99999;
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

<template>
	<div class="index_tabbar" id="index_tabbar">
        <div class="tab_item" v-bind:class="[footerActive == 'shouye' ? 'active' : '']">
            <router-link to="/homePage">
                <div class="iww"><div class="iw1"></div></div>
                <p class="text">首页</p>
            </router-link>
        </div>
        <div class="tab_item" v-bind:class="[footerActive == 'geren' ? 'active' : '']">
            <router-link to="/personalPage">
                <div class="iww"><div class="iw2"></div></div>
                <p class="text">我的</p>
            </router-link>
        </div>
    </div>
</template>

<script>
	export default{
		data(){
			return {
				"currentPage":""
			}
		},
		props:["footerActive"],
		mounted(){
			
		},
		methods:{
			
		}
	}
</script>

<style scoped>
	.index_tabbar{
	    height: 0.98rem;
	    position: fixed;
	    bottom: 0;
	    z-index: 999;
	    width: 100%;
	    box-shadow:0px -5px 5px 0px rgba(163,163,163,0.2);
	    background: #fff;
	}
	.index_tabbar.active{
		position: relative;
	}
	.index_tabbar .tab_item{
	    width: 50%;
	    box-sizing: border-box;
	    height: 100%;
	    text-align: center;
	    float: left;
	}
	.index_tabbar .tab_item:first-child{
	    border-right: 1px solid rgba(138,143,155,0.2);
	}
	.index_tabbar .tab_item .text{
	    color: #8A8F9B;
	    font-size: 0.2rem;
	    height: 0.28rem;
	    line-height: 0.28rem;
	}
	.index_tabbar .tab_item.active .text{
	    color: #FF620C;
	    
	}
	.index_tabbar .tab_item a{
	    display: block;
	    width: 100%;
	    height: 100%;
	}
	.index_tabbar .tab_item .iww{
	    margin-top: 0.1rem;
	    height: 0.5rem;
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
	.index_tabbar .tab_item .iww .iw1{
	    width: 0.5rem;
	    height: 0.42rem;
	    background: url("../assets/images/footercar.png") no-repeat;
	    background-size: 100% 100%;
	}
	.index_tabbar .tab_item.active .iw1{
	    background: url("../assets/images/footercaron.png") no-repeat;
	    background-size: 100% 100%;
	}
	.index_tabbar .tab_item .iww .iw2{
	    width: 0.4rem;
	    height: 0.4rem;
	    background: url("../assets/images/footerpersonal.png") no-repeat;
	    background-size: 100% 100%;
	}
	.index_tabbar .tab_item.active .iw2{
	    background: url("../assets/images/footerpersonalon.png") no-repeat;
	    background-size: 100% 100%;
	}
</style>


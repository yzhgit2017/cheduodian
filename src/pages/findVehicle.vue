<template>
	<div class="container">
		<div class="myCarSource_topbar">
			<div class="container">
				<div class="left_arrow" @click="goBack()">
					<img src="static/images/left_arrow.png">
				</div>
				<div class="search"><img src="static/images/searchIcon.png"><input type="text" name="" placeholder="搜索您要找的车辆"></div>
				<div class="order" id="filterVehicle" @click="goFilter()"><img src="static/images/orderIcon.png"></div>
				<div class="share" id="share_btn"><img src="static/images/shareIcon.png"></div>
			</div>
		</div>
		<div class="ershouche_list_content">
			<div class="dis"></div>
			<div class="selection_list">
	        	<a class="selection_item" href="vehicleType.html"><span class="span1">车源</span><span class="span2"></span></a>
	        	<a class="selection_item" href="choiceBrand.html"><span class="span1">品牌</span><span class="span2"></span></a>
	        	<a class="selection_item" href="coty.html"><span class="span1">车龄</span><span class="span2"></span></a>
	        	<a class="selection_item" href="filterPrice.html"><span class="span1">价格</span><span class="span2"></span></a>
	        	<span class="selection_item" @click="showOrderList()" id="order_btn" v-bind:class="[xuanzhuan=='xuanzhuan'?'active':'']"><span class="span1">排序</span><span class="span2"></span></span>
			</div>
			<transition name="order">
				<div class="order_container" v-show="show">
					<div class="bg"></div>
					<ul>
						<li class="order_item">车况最好</li>
						<li class="order_item">价格最低</li>
						<li class="order_item">价格最高</li>
						<li class="order_item">车龄最短</li>
						<li class="order_item">里程最小</li>
						<li class="order_item">最近上架</li>
					</ul>
				</div>
			</transition>
			<div class="ershouche_list_wrapper">
			    <div id="ershouche_list_wrapper" @scroll="loadMore()">
					<ul class="ershouche_list" id="ershouche_list" style="position: relative;">
						<li v-for="(item,index) in items">							
							<div class="card_list_item_content">
								<div class="iw"><img :src="item.imgUrl"></div>
								<div class="des">
									<p class="p1">{{item.title}}</p>
									<p class="p2">{{item.des}}</p>
									<div class="p3">
										<p><label class="bg1">可调</label><label class="bg2">急售</label></p>
										<div class="state">车况:100</div>
									</div>
									<div class="p4">
										<div class="price"><span>25.00</span>万</div>
										<div class="lianxi">联系卖家</div>
									</div>
								</div>
							</div>							
						</li>					
					</ul>
					<div id="unsatisfactory">
						<p>没有满意的车？发布求购，<br>车源自己来找你</p>
						<a href="">去求购试试</a>
					</div>
				</div>

				<div id="loadMoreContainerW">
					<div id="loadMoreContainer">
						<span v-show="!loading">上拉加载更多</span>
						<img v-show="loading" src="static/images/loading.gif">
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				show: false,
				xuanzhuan: "",
				items:[
					{
						"imgUrl":"static/images/carimg1.png",
						"title":"奥迪2016款 Q5 TFSI技术型",
						"des":"2016.01 / 3万公里 / 山东临沂"
					},
					{
						"imgUrl":"static/images/carimg1.png",
						"title":"奥迪2016款 Q5 TFSI技术型",
						"des":"2016.01 / 3万公里 / 山东临沂"
					},
					{
						"imgUrl":"static/images/carimg1.png",
						"title":"奥迪2016款 Q5 TFSI技术型",
						"des":"2016.01 / 3万公里 / 山东临沂"
					},
					{
						"imgUrl":"static/images/carimg1.png",
						"title":"奥迪2016款 Q5 TFSI技术型",
						"des":"2016.01 / 3万公里 / 山东临沂"
					},
					{
						"imgUrl":"static/images/carimg1.png",
						"title":"奥迪2016款 Q5 TFSI技术型",
						"des":"2016.01 / 3万公里 / 山东临沂"
					},
				],
				once:true,
				lmh:"",
				LoadMore:true,
				tl:150,
				loading:false
			}
		},
		mounted(){

		},
		methods:{
			showOrderList: function(){
				this.show = !this.show;
				if(this.xuanzhuan == ""){
					this.xuanzhuan = "xuanzhuan";
				}else{
					this.xuanzhuan = ""
				}
			},
			goFilter: function(){

			},
			goBack: function(){
				this.$router.goBack();
			},
			loadMore: function(){
				var _this = this;
				var el = document.querySelector("#ershouche_list_wrapper");
				var el2 = document.querySelector("#ershouche_list");
				var st = el.scrollTop;
				var ch = el.clientHeight;
				var sh = el.scrollHeight;
				var startX = 0, startY = 0; //触摸开始时手势横纵坐标 
				var oPosition = {}; //触点位置
				var l = 1;
				var ct;
				//获取触点位置
		        function touchPos(e){
		        	
		            var touches = e.changedTouches, l = touches.length, touch, tagX, tagY;
		            for (var i = 0; i < l; i++) {
		                touch = touches[i];
		                tagX = touch.clientX;
		                tagY = touch.clientY;
		            }
		            oPosition.x = tagX;
		            oPosition.y = tagY;
		            return oPosition;
		        }
		        //触摸开始
		        function touchStartFunc(e){
		            touchPos(e);
		            startX = oPosition.x;
		            startY = oPosition.y;
		            ct =  parseInt(el2.offsetTop);
		        }
		        //触摸移动 
		        function touchMoveFunc(e){
		            touchPos(e);
		            var moveX = oPosition.x - startX;
		            var moveY = oPosition.y - startY;
		            var _moveY = ct + moveY;
		            var _tl = _this.tl;
		            _moveY *= _tl/(_tl + Math.abs(_moveY));

		            if(moveY < 0){
		            	el2.style.transition = "all 0s linear";
		            	el2.style.webkitTransform = "translateY("+ _moveY +"px)";		        
		            }
		           
		            if(moveY < -40){
		            	console.log(_this.LoadMore)
		            	if(_this.LoadMore){
		            		_this.LoadMore = false;
		            		console.log("调用ajax");
		            		_this.loading = !_this.loading;
		            		var arr = _this.items;
		            		setTimeout(function(){
		            			for (var i = 0; i < 10; i++) {
		            				var data = {
		            					"imgUrl":"static/images/carimg1.png",
										"title":"奥迪2016款 Q5 TFSI技术型",
										"des":"2016.01 / 3万公里 / 山东临沂"
		            				}
		            				arr.push(data);
		            				
		            			};
		            			_this.items = arr;
		            			_this.LoadMore = true;
		            			el2.style.webkitTransform = "translateY(0px)";
		                        el2.style.transition = "-webkit-transform .2s ease-in-out"
		            			el.removeEventListener('touchstart', touchStartFunc);
			            		el.removeEventListener('touchend', touchEndFunc);
			            		el.removeEventListener('touchmove', touchMoveFunc);
			            		_this.once = true;
			            		_this.loading = !_this.loading;
			            		document.querySelector("#loadMoreContainerW").style.display = "none";
		            		},2000);

		            	}
		            }
		        }

		        // 触摸结束
		        function touchEndFunc(e){
		            touchPos(e);
		            var moveX = oPosition.x - startX;
		            var moveY = oPosition.y - startY;
		            el2.style.webkitTransform = "translateY(0px)";
		            el2.style.transition = "-webkit-transform .2s ease-in-out"
		        } 
		        console.log(st,ch,sh)
	        	if(st + ch > sh - 5){
	        		if(_this.once){
	        			_this.once = false;
						console.log("jianting");
			            document.querySelector("#loadMoreContainerW").style.display = "block";
						el.addEventListener('touchstart', touchStartFunc, false);        
		                el.addEventListener('touchend', touchEndFunc, false);
		                el.addEventListener('touchmove', touchMoveFunc, false);
		            }           	
				}
				
			}
		}
	}
</script>

<style scoped>
	.container{
		height: 100%;
	}
	.myCarSource_topbar{
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
	.myCarSource_topbar .container{
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
	.myCarSource_topbar .left_arrow{
	    width: 0.16rem;
	    height: 0.29rem;
	}
	.myCarSource_topbar .left_arrow img{
	    width: 100%;
	    height: 100%;
	    vertical-align: top;
	}
	.myCarSource_topbar .search{
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
	.myCarSource_topbar .search img{
	    width: 0.22rem;
	    height: 0.24rem;
	}
	.myCarSource_topbar .search input{
	    background: none;
	    margin-left: 0.1rem;
	}
	.myCarSource_topbar .order{
	    width: 0.4rem;
	    height: 0.34rem;
	}
	.myCarSource_topbar .order img{
	    width: 100%;
	    height: 100%;
	    vertical-align: top;
	}
	.myCarSource_topbar .share{
	    width: 0.44rem;
	    height: 0.40rem;
	}
	.myCarSource_topbar .share img{
	    width: 100%;
	    height: 100%;
	    vertical-align: top;
	}
	.ershouche_list_content{
	    padding-top: 0.88rem;
	    height: 100%;
	    box-sizing: border-box;
	    background: #fff;
	    position: relative;
	    overflow: hidden;
	}
	.ershouche_list_content .dis {
	    height: 0.2rem;
	    background: #eeeff0;
	    z-index: 9;
	    position: relative;
	}
	.selection_list{
	    height: 0.76rem;
	    background: #fff;
	    position: relative;
	    border-bottom: 1px solid #EFEFEF;
	    box-sizing: border-box;
	    z-index: 9;
	}
	.selection_list .selection_item{
	    width: 20%;
	    height: 100%;
	    display: block;
	    float: left;
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
	.selection_list .selection_item .span1{
	    font-size: 0.28rem;
	    line-height: 0.3rem;
	    color: #000;
	}
	.selection_list .selection_item .span2{
	    width: 0.16rem;
	    height: 0.1rem;
	    background: url("../../static/images/xiaosanjiao.png") no-repeat;
	    background-size: 100% 100%;
	    margin-left: 0.1rem;
	}
	.selection_list .selection_item.active .span2{
	   
	    -webkit-transform: rotateZ(180deg);
	    transform: rotateZ(180deg);
	    
	}
	.selection_list .selection_item.active{
		transition: all 30s linear 0;
	    -webkit-transition: all 30s linear 0;
	}
	.order_container{
	    position: fixed;
	    width: 100%;
	    height: calc(100% - 1.84rem);
	}
	.order_container .bg{
	    width: 100%;
	    height: 100%;
	    background: rgba(0,0,0,0.3);
	}
	.order_container ul{
	    position: absolute;
	    width: 100%;
	    top: 0;
	}
	.order_container li{
	    height: 0.89rem;
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    line-height: 0.89rem;
	    font-size: 0.28rem;
	    color: #000;
	    background: #fff;
	}
	.order-enter-active, .order-leave-active {
	    transition: all .2s;
	    -webkit-transition: all .2s;
	}
	.order-enter, .order-leave-to {
	    transform: translateY(-100%);
	    -webkit-transform: translateY(-100%);
	}
	.ershouche_list_wrapper{
	    position: relative;
	    width: 100%;
	    height: calc(100% - 0.96rem);   
	}
	#ershouche_list_wrapper{
	    position: absolute;
	    height: 100%;
	    width: 100%;
	    top: 0;
	    overflow-y: scroll;
	    z-index: 1;   
	}
	.ershouche_list{
	    background: #fff;
	    margin-top: -1px;
	}
	.ershouche_list li{
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	}
	.ershouche_list li .card_list_item_content{
	    border: 0;
	    padding-top: 0.32rem;
	    border-top: 1px solid #efefef;
	}
	.card_list_item_content{
	    overflow: hidden;
	    padding-bottom: 0.32rem;
	    border-bottom: 1px solid #EFEFEF;
	}
	.card_list_item_content .iw{
	    float: left;
	    width: 3.2rem;
	    height: 2.4rem;
	}
	.card_list_item_content .iw img{
	    width: 100%;
	    height: 100%;
	}
	.card_list_item_content .des{
	    width: 3.34rem;
	    float: right;
	}
	.card_list_item_content .des .p1{
	    font-size: 0.32rem;
	    color: #000;
	    line-height: 0.42rem;
	}
	.card_list_item_content .des .p2{
	    color: #8A8F9B;
	    font-size: 0.22rem;
	}
	.card_list_item_content .des .p3{
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
	    margin-top: 0.1rem;
	}
	.card_list_item_content .des .p3 p{
		display: inherit;
	}
	.card_list_item_content .des .p3 label{
	    padding: 0.03rem 0.18rem;
	    display: inline-block;
	    color: #fff;
	    border-radius: 2px;
	    margin-right: 5px;
	    font-size: 0.22rem;
	}
	.card_list_item_content .des .p3 label.bg1{
	    background: #FF620C;
	}
	.card_list_item_content .des .p3 label.bg2{
	    background: #FF2F2F;
	}
	.card_list_item_content .des .p3 .state{
	    color: #8A8F9B;
	    font-size: 0.22rem;
	}
	.card_list_item_content .des .p4{
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
	    margin-top: 0.1rem;
	}
	.card_list_item_content .des .p4 .price{
	    color: #FF2F2F;
	    font-size: 0.24rem;
	}
	.card_list_item_content .des .p4 .price span{
	    font-size: 0.38rem;
	}
	.card_list_item_content .des .p4 .lianxi{
	    width: 1.4rem;
	    height: 0.46rem;
	    border-radius: 0.23rem;
	    background: #FF620C;
	    color: #fff;
	    font-size: 0.22rem;
	    text-align: center;
	    line-height: 0.46rem;
	}
	#unsatisfactory{
	    padding-top: 0.48rem;
	    padding-bottom: 0.48rem;
	    display: none;
	    background: #fff;
	}
	#unsatisfactory p{
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    line-height: 0.48rem;
	    text-align: center;
	}
	#unsatisfactory a{
	    display: block;
	    width: 1.61rem;
	    height: 0.46rem;
	    border-radius: 0.24rem;
	    color: #fff;
	    font-size: 0.22rem;
	    text-align: center;
	    line-height: 0.46rem;
	    margin: auto;
	    background: #FF620C;
	    margin-top: 0.24rem;
	}
	#loadMoreContainerW{
	    position: absolute;
	    top: 0;
	    left: 0;
	    height: 100%;
	    width: 100%;
	    background: rgba(0,0,0,0.3);
	    display: none;
	}
	#loadMoreContainer{
	    position: absolute;
	    height: 0.88rem;
	    width: 100%;
	    bottom: 0;
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
	#loadMoreContainer img{
	    width: 0.32rem;
	    height: 0.32rem;
	}
	#loadMoreContainer span{
	    color: #fff;
	    font-size: 0.24rem;
	}
</style>
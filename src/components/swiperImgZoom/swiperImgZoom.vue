<template>
	<div class="checkImg active" ref="swiperZoomContainer">
		<div class="mask"></div>
		<div class="swiper-container swiper-check" id="swiper-check">
            <div class="swiper-wrapper" :style="{ width: wrapperWidth + 'px' }" id="swiper-check-wrapper">
                <div class="swiper-slide" :style="{ width: slideWidth + 'px' }" v-for="(item,index) in data" @click="closeAllScreen()"><img :src="http + item" @touchstart="scalestart(index)" @touchmove="scalemove(index)" @touchend="scaleend(index)" :id="'quanpingtu' + index" @load="imgLoad(index)"></div>
            </div>
            <div class="swiper-pagination"></div>
        </div>
	</div>
</template>

<script>
	export default{
		props: {
			data: '',
			currentIndex: ''
		},
		data(){
			return {
				http: this.$http,
				startPositions: '',
				changef: 1,
				fingerNum: '',
				endPositions: '',
				st: '',
				sl: '',
				cw: '',
				move: false,
				touchIndex: '',
				wrapperWidth: '',
				slideWidth: '',
				tx: 0,
				cl: 0,
				cx: '',
				tl: 150,
				ccw: '',
				imgData: []
			}
		},
		mounted(){

		},
		updated: function(){
			console.log(this.data)
			let iw = this.$refs.swiperZoomContainer.clientWidth;
			this.slideWidth = iw;
			this.wrapperWidth = this.data.length * iw;
			this.cw = iw;
		},
		methods: {
			
			scalestart: function(index){
				event.preventDefault();
				this.move = false;
				this.startPositions = event.targetTouches;
				this.touchIndex = index;
				let quanpingtu = "quanpingtu" + index;
				let ol = document.getElementById(quanpingtu).offsetLeft;
				let ot = document.getElementById(quanpingtu).offsetTop;
				let cw = document.getElementById(quanpingtu).clientWidth;
				this.sl = ol;
				this.st = ot;
				
				if(this.startPositions[1]){
					if(this.startPositions[1] == this.endPositions[1]){
						this.fingerNum = "one"
					}else{
						this.fingerNum = "two";
					}
				}else{
              		this.fingerNum = "one";
				}
                
                this.tx = this.cl;
			},
			scalemove: function(index){
				this.move = true;
				let quanpingtu = "quanpingtu" + index;
				if(this.fingerNum == "one"){
					let sx1 = this.startPositions[0].pageX;
					let sy1 = this.startPositions[0].pageY;
					let mx1 = event.targetTouches[0].pageX;
					let my1 = event.targetTouches[0].pageY;
					let cx = mx1 - sx1;
					this.cx = cx;
					let cy = my1 - sy1;
					let tx = this.tx;
					// 回弹
					if(index == 0 || index == this.data.length - 1){
                		cx *= this.tl/(this.tl + Math.abs(cx));
                	}
                    let cl = parseInt(cx) + parseInt(tx);               
                    let ccl = document.getElementById(quanpingtu).offsetLeft;
                    console.log(ccl)
                    if(ccl >= (this.ccw - this.cw)/2){
                    	document.getElementById("swiper-check-wrapper").style.transform = "translateX("+ cl +"px)";
                    	document.getElementById("swiper-check-wrapper").style.transition = "transform 0s linear 0s";
                    }else if(ccl < - (this.ccw - this.cw)/2){
                    	document.getElementById("swiper-check-wrapper").style.transform = "translateX("+ cl +"px)";
                    	document.getElementById("swiper-check-wrapper").style.transition = "transform 0s linear 0s";
                    }else{
                    	document.getElementById(quanpingtu).style.left = this.sl + cx + 'px';
                    	document.getElementById(quanpingtu).style.top = this.st + cy + 'px';
                    }		
				}else{
					let sx1 = this.startPositions[0].pageX;
					let sy1 = this.startPositions[0].pageY;
					let sx2 = this.startPositions[1].pageX;
					let sy2 = this.startPositions[1].pageY;
					let sdis = Math.sqrt(Math.pow(Math.abs(sx1 - sx2),2) + Math.pow(Math.abs(sy1 - sy2),2));
					let mx1 = event.targetTouches[0].pageX;
					let my1 = event.targetTouches[0].pageY;
					let mx2 = event.targetTouches[1].pageX;
					let my2 = event.targetTouches[1].pageY;
					let mdis = Math.sqrt(Math.pow(Math.abs(mx1 - mx2),2) + Math.pow(Math.abs(my1 - my2),2));
					
					if(mdis - sdis > 0){
						this.changef = this.changef + 0.1;
						document.getElementById(quanpingtu).style.transform = "scale("+ this.changef +")"
						
					}
					if(mdis - sdis < 0){
						if(this.changef < 0.8){

						}else{
							this.changef = this.changef - 0.1;
						    document.getElementById(quanpingtu).style.transform = "scale("+ this.changef +")"
						}
					}
					this.ccw = this.cw * this.changef;
				}
			},
			scaleend: function(index){
				this.endPositions = this.startPositions
				let quanpingtu = "quanpingtu" + index;
				if(this.changef < 0.8){
					this.changef = 1;
					document.getElementById(quanpingtu).style.transform = "scale(1)"
				}
				if(this.fingerNum == "one"){
					if(!this.move){
						this.$refs.swiperZoomContainer.parentNode.removeChild(this.$refs.swiperZoomContainer)
					}else{
						
						let cl;
						if(this.cx > 0){
							
							if(this.cx > this.slideWidth * .5){
								if(index == 0){
									cl = this.slideWidth * -index
								}else{
									cl = this.slideWidth * -(index - 1);
									this.changef = 1;
									this.ccw = this.cw;
									document.getElementById(quanpingtu).style.transform = "scale(1)";
									document.getElementById(quanpingtu).style.left = this.imgData[index].ol + 'px';
									document.getElementById(quanpingtu).style.top = this.imgData[index].ot + 'px';	
								}
							}else{
								cl = this.slideWidth * -index
								
							}
						}else{
							
							if(this.cx < -this.slideWidth * .5){
								if(index == this.data.length - 1){
									cl = this.slideWidth * -index
								}else{
									cl = this.slideWidth * -(index +  1);
									this.changef = 1;
									this.ccw = this.cw;
									document.getElementById(quanpingtu).style.transform = "scale(1)";
									document.getElementById(quanpingtu).style.left = this.imgData[index].ol + 'px';
									document.getElementById(quanpingtu).style.top = this.imgData[index].ot + 'px';
								}
							}else{
								cl = this.slideWidth * -index
								
							}
						}
						this.cl = cl;

						document.getElementById("swiper-check-wrapper").style.transform = "translateX("+ cl +"px)";
						document.getElementById("swiper-check-wrapper").style.transition = "transform 0.2s linear 0s";
					}
				}
			},
			imgLoad: function (index) {
				for (let i = 0; i < this.data.length; i++) {
					let quanpingtu = "quanpingtu" + i;
					let ol = document.getElementById(quanpingtu).offsetLeft;
					let ot = document.getElementById(quanpingtu).offsetTop;
					let item = {};
					item.ol = ol;
					item.ot = ot;
					this.imgData.push(item);
				}
			}
		}
	}
</script>

<style scoped>
   
	.checkImg {
	    position: fixed;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	    z-index: 9999;
	    background: #000;
	    transform: scale(0);
	    -webkit-transform: scale(0);
	    transition: all 0.2s ease 0;
	    -webkit-transition: all 0.2s ease 0;
	    overflow: hidden;
	}
	.checkImg.active {
	    transform: scale(1);
	    -webkit-transform: scale(1);
	}
	.checkImg .mask {
	    position: absolute;
	    width: 100%;
	    height: 100%;
	    top: 0;
	    left: 0;
	}
	.swiper-check .swiper-slide img{
		width: 100%;
		position: absolute;
	}
	.swiper-check{
		height: 100%;
	}
	.swiper-check .swiper-wrapper{
		height: 100%;
	}
	.swiper-check .swiper-wrapper .swiper-slide{
		float: left;
		display: flex;
		align-items: center;
		justify-content: center;
		-webkit-display: flex;
		-webkit-align-items: center;
		-webkit-justify-content: center;
		overflow: hidden;
		position: relative;
		height: 100%;
	}
	#swiper-check-wrapper{
		transition: transform 0s linear 0s;
	}
</style>

<style>
	#swiper-check .swiper-pagination-bullets .swiper-pagination-bullet {
	    width: 0.2rem;
	    height: 0.2rem;
	    border: none;
	    background: #fff;
	    opacity: 0.5;
	    display: inline-block;
	    border-radius: 100%;
	    margin: 0 4px;
	}
	#swiper-check .swiper-pagination-bullets .swiper-pagination-bullet-active {
	    background: #fff;
	    opacity: 1;
	}
	#swiper-check .swiper-pagination-bullets {
	    bottom: 0.5rem;

	}
</style>
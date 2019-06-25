<template>
	<div class="checkImg" ref="zoomContainer">
	    <img :src="url" @touchstart="scalestart()" @touchmove="scalemove()" @touchend="scaleend()" :id="'quanpingtu' + imgIndex">
	</div>
</template>

<script>
	export default{
		props: {
			url: '',
		    imgIndex: '',
		},
		data(){
			return {
				startPositions: '',
				changef: 1,
				fingerNum: '',
				endPositions: '',
				st: '',
				sl: '',
				move: false
			}
		},
		methods: {
			scalestart: function(){
				this.move = false;
				this.startPositions = event.targetTouches;
				let quanpingtu = "quanpingtu" + this.imgIndex;
				let ot = document.getElementById(quanpingtu).offsetTop;
				let ol = document.getElementById(quanpingtu).offsetLeft;
				this.st = ot;
				this.sl = ol;
				if(this.startPositions[1]){
					if(this.startPositions[1] == this.endPositions[1]){
						this.fingerNum = "one"
					}else{
						this.fingerNum = "two";
					}
				}else{
              		this.fingerNum = "one";
				}
			},
			scalemove: function(index){
				this.move = true;
				let quanpingtu = "quanpingtu" + this.imgIndex;
				if(this.fingerNum == "one"){
					let sx1 = this.startPositions[0].pageX;
					let sy1 = this.startPositions[0].pageY;
					let mx1 = event.targetTouches[0].pageX;
					let my1 = event.targetTouches[0].pageY;
					let cx = mx1 - sx1;
					let cy = my1 - sy1;
					document.getElementById(quanpingtu).style.left = cx + this.sl + 'px';
					document.getElementById(quanpingtu).style.top = cy + this.st + 'px';
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
				}
			},
			scaleend: function(index){
				this.endPositions = this.startPositions
				let quanpingtu = "quanpingtu" + this.imgIndex;
				if(this.changef < 0.8){
					this.changef = 1;
					document.getElementById(quanpingtu).style.transform = "scale(1)"
				}
				if(this.fingerNum == "one"){
					if(!this.move){
						this.$refs.zoomContainer.parentNode.removeChild(this.$refs.zoomContainer)
					}
				}
			},
		}
	}
</script>

<style scoped>
	.checkImg{
		position: fixed;
		z-index: 99999;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		background: rgba(0,0,0,0.9);
		display: flex;
		display: -webkit-flex;
		justify-content: center;
		align-items: center;
		-webkit-justify-content: center;
		-webkit-align-items: center;
		overflow: hidden;
	}
	.checkImg img{
		width: 100%;
		transition: all 0s linear 0s;
		position: absolute;
	}
</style>
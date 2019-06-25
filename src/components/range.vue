<template>
	<div class="cheziding">自定义&nbsp;&nbsp;&nbsp;&nbsp;<input type="text" v-model="startValue" @keyup="check_int_start()">&nbsp;-&nbsp;<input type="text" v-model="endValue" @keyup="check_int_end()"> {{unit}}<span>确定</span></div>
</template>

<script>
	export default{
		name: 'range',
		data(){
			return {
				startValue: '',
				endValue: ''
			}
		},
		props:['unit'],
		methods: {
			check_int_start: function(){
				this.startValue = this.startValue.replace(/\D/g,'');
			},
			check_int_end: function(){
				this.endValue = this.endValue.replace(/\D/g,'');
			}
		}
	}
</script>

<style scoped>
	.cheziding {
	    height: 0.89rem;
	    line-height: 0.89rem;
	    background: #FFFFFF;
	    padding: 0 0.32rem;
	    font-size: 0.28rem;
	    color: #000000;
	}
	.cheziding input {
	    width: 1.4rem;
	    line-height: 0.46rem;
	    border: 1px solid #8A8F9B;
	    border-radius: 0.32rem;
	    padding: 0 0.23rem;
	    box-sizing: border-box;
	    text-align: center;
	}
	.cheziding span {
	    font-size: 0.22rem;
	    color: #FF620C;
	    border: 1px solid #FF620C;
	    border-radius: 0.23rem;
	    float: right;
	    width: 1.4rem;
	    line-height: 0.46rem;
	    text-align: center;
	    margin-top: 0.18rem;
	}
</style>
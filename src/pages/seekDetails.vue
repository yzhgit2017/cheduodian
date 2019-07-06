<template>
	<div>
		<header1 v-bind:title="title"></header1>
		<div class="pad"></div>
		<div class="thisqiu">
			<div class="qiutit">求购车辆信息</div>
			<div class="qiucon1"><span style="color: #8A8F9B;">车型</span><span style="float:right;"><span style="color: #000;"></span></span></div>
			<div class="qiucon1"><span style="color: #8A8F9B;">年限</span><span style="float: right;"><span style="color: #000;"></span></span></div>
			<div class="qiucon1"><span style="color: #8A8F9B;">颜色</span><span style="float: right;"><span style="color: #000;"></span></span></div>
		</div>
		<div class="thisqiu">
			<div class="qiutit">买车人信息</div>
			<div class="qiucon1"><span style="color: #8A8F9B;">客户姓名</span><span style="color: #000;float: right;"></span></div>
			<div class="qiucon1"><span style="color: #8A8F9B;">客户电话</span><span style="color: #000;float: right;"></span></div>
		</div>
		<div class="qiutit">备注</div>
		<p style="color: #000;padding: 0.31rem;font-size: 0.28rem;line-height: 0.4rem;"></p>
		<div class="xfabu">联系买家</div>
	</div>
</template>

<script>
	import header1 from '@/components/header1'
	export default{
		name: 'seekDetails',
		data(){
			return {
				title: '求购详情',
			}
		},
		components:{header1},
	}
</script>

<style scoped>
	.pad{
		height: 0.88rem;
	}
	.qiutit {
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    height: 0.87rem;
	    line-height: 0.87rem;
	    padding-left: 0.33rem;
	    background: #EEEFF0;
	}
	.qiucon1 {
	    font-size: 0.28rem;
	    color: #000000;
	    line-height: 0.89rem;
	    border-bottom: 1px solid #EFEFEF;
	    padding: 0 0.31rem;
	    height: 0.89rem;
	    overflow: hidden;
	}
	.xfabu {
	    width: 100%;
	    background: #FF620C;
	    text-align: center;
	    height: 0.98rem;
	    line-height: 0.98rem;
	    position: fixed;
	    bottom: 0;
	    color: #FFFFFF;
        font-size: 0.32rem;
	}
</style>
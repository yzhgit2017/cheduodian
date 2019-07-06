<template>
	<div>
		<header1 v-bind:title="title"></header1>
		<div class="pad"></div>
		<div class="thisqiu">
			<div class="qiutit">求购车辆信息</div>
			<div class="qiucon1">车型<span style="float:right;"><span style="max-width: 4rem;display: inline-block;white-space: nowrap;overflow: hidden;text-overflow: ellipsis;vertical-align: middle;">请选择车型</span><i class="icon iconfont icon-youjiantou"></i></span></div>
			<div class="qiucon1">年限<span style="float: right;"><span>请选择年限范围</span><i class="icon iconfont icon-youjiantou"></i></span></div>
			<div class="qiucon1">颜色<span style="float: right;"><span>请选择颜色</span><i class="icon iconfont icon-youjiantou"></i></span></div>
		</div>
		<div class="thisqiu">
			<div class="qiutit" style="padding: 0 0.33rem;">买车人信息<span style="float: right;">客户信息仅自己可见</span></span></div>
			<div class="qiucon1">客户姓名<input type="text" maxlength="10" placeholder="请输入客户姓名"  onblur="cusNameSave(this)"/></div>
			<div class="qiucon1">客户电话<input type="text" placeholder="请输入客户电话" id="customerTel" onblur="cusTelSave(this)"/></div>
		</div>
		<div class="qiutit">备注</div>
		<textarea class="qiutext" placeholder="请描述客户需求" onblur="beizhuSave(this)"></textarea>
		<div class="qiutit">悬赏急求</div>
		<div class="xuanshang"><a class="xuan1 active" bs="2">不悬赏</a><a class="xuan1" bs="1">悬赏2多币</a></div>
		<div class="qiutit"></div>
		<div class="xfabu">发布求购</div>
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
	.qiucon1 span i {
	    margin-left: 0.05rem;
	}
	.qiucon1 input {
	    float: right;
	    line-height: 0.86rem;
	    text-align: right;
	    margin-right: 0.32rem;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	}
	.qiutext {
	    width: 100%;
	    box-sizing: border-box;
	    padding: 0.29rem 0.32rem;
	    font-size: 0.28rem;
	    color: #8A8F9B;
	    border: 0;
        outline: none;
	}
	.xuanshang {
	    height: 1.32rem;
	    line-height: 1.32rem;
	    text-align: center;
	}
	.xuan1 {
	    border: 1px solid #FF620C;
	    color: #FF620C;
	    margin: 0 0.21rem;
	}
	.xuanshang a {
	    font-size: 0.32rem;
	    width: 2.38rem;
	    height: 0.72rem;
	    line-height: 0.7rem;
	    text-align: center;
	    display: inline-block;
	    box-sizing: border-box;
	    border-radius: 0.36rem;
	    vertical-align: middle;
	}
	.xuan1.active {
	    background: #FF620C;
	    color: #FFFFFF;
	}
	.xfabu {
	    width: 100%;
	    background: #FF620C;
	    text-align: center;
	    height: 0.98rem;
	    line-height: 0.98rem;
	    position: relative;
	    color: #FFFFFF;
        font-size: 0.32rem
	}
</style>
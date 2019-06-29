<template>
	<div>
		<header1 v-bind:title="title"></header1>
		<div class="hehight"></div>
		<div class="qiutit">车辆状况</div>
		<div class="jubaocar">
			<div class="chejubao zhenshixing">
				<label>真实性:</label><p class="qingkuang aa"><span biaoshi="1">已售</span><span biaoshi="2">虚假</span><span biaoshi="3">无问题</span></p>
			</div>
			<div class="chejubao chekuang">
				<label>车况描述:</label><p class="qingkuang aa"><span biaoshi="1">不准确</span><span biaoshi="2">正常</span><span biaoshi="3">虚假</span></p>
			</div>
			<div class="chejubao jiage">
				<label>价格:</label><p class="qingkuang aa"><span biaoshi="1">偏高</span><span biaoshi="2">正常</span><span biaoshi="3">偏低</span></p>
			</div>
			<div class="chejubao">
				<label>其他:</label><p class="qingkuang"><textarea placeholder="请描述举报原因" class="qitayuanyin"></textarea></p>
			</div>
		</div>
		<div class="xfabu"><span class="shouig">取消</span><span class="shouig">提交</span></div>
	</div>
</template>

<script>
	import header1 from '@/components/header1'
	export default{
		name: 'jubao',
		data(){
			return {
				title: '车源举报',
			}
		},
		components:{header1},
	}
</script>

<style scoped>
	.hehight {
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
	.jubaocar {
	    line-height: 0.9rem;
	    padding-top: 0.15rem;
	}
	.chejubao {
	    line-height: 0.9rem;
	    padding: 0 0.32rem;
	    overflow: hidden;
	}
	.chejubao label {
	    float: left;
	    line-height: 0.9rem;
	    width: 1.5rem;
	    font-size: 0.3rem;
	    color: #000000;
	}
	.qingkuang {
	    float: left;
	    width: 5rem;
	}
	.qingkuang.aa{
		display: flex;
	    justify-content: space-between;
	    display: -webkit-flex;
	    -webkit-justify-content: space-between;
	    height: 0.9rem;
	    align-items: center;
	    -webkit-align-items: center;
	}
	.qingkuang span {
	    width: 1.46rem;
	    height: 0.46rem;
	    line-height: 0.46rem;
	    text-align: center;
	    display: inline-block;
	    border: 1px solid #8A8F9B;
	    font-size: 0.24rem;
	    border-radius: 0.23rem;
	}
	.qingkuang span.checked {
	    background: #FF620C;
	    border-color: #FF620C;
	    color: #FFFFFF;
	}
	.qingkuang textarea {
	    margin-top: 0.2rem;
	    font-size: 0.24rem;
	    color: #8A8F9B;
	    width: 4.85rem;
	    height: 2.5rem;
	    border: 1px solid #EFEFEF;
	    padding: 0.2rem 0.21rem;
	    box-sizing: border-box;
	    resize: none;
	}
	.xfabu {
	    width: 100%;
	    background: #FF620C;
	    text-align: center;
	    height: 0.98rem;
	    line-height: 0.98rem;
	    position: fixed;
	    bottom: 0;
	}
	.shouig {
	    float: left;
	    width: 50%;
	    text-align: center;
	    font-size: 0.3rem;
	    color: #FFFFFF;
	    height: 100%;
	}
	.shouig:first-child {
	    background: #FFFFFF;
	    color: #000000;
	}
</style>
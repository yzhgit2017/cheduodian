<template>
	<div>
		<header1 v-bind:title="title">
			<template v-slot:navRightBtn>
				<label style="font-size: .32rem;color: #FF620C;" @click="confirm()">保存</label>
			</template>
		</header1>
		<div class="pad"></div>
		<div class="addr_des_c" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
			<div class="addr_des_w">
				<div class="addr_des_container">
					<label>详细地址</label>
					<textarea placeholder="请输入详细地址信息、如道路，门牌号、小区、楼栋号、单元室等" v-model="addressValue"></textarea>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import header1 from '@/components/header1'
	export default{
		name: 'addAddress',
		data(){
			return {
				wrapperHeight: 0,
				addressValue: ''
			}
		},
		components:{header1},
		mounted(){
			this.wrapperHeight = document.documentElement.clientHeight - this.$refs.wrapper.offsetTop;	
		},
		methods: {
			confirm: function(){
				this.$store.commit('registerMsg/changeAddress',{addressValue: this.addressValue});
				this.$router.goBack();
			}
		}
	}
</script>

<style scoped>
	.pad{
		height: 0.88rem;
	}
	.addr_des_c {
	    height: 100%;
	    box-sizing: border-box;
	    background: #fff;
	}
	.addr_des_w {
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	}
	.addr_des_container {
	    display: -webkit-box;
	    display: -ms-flexbox;
	    display: -webkit-flex;
	    display: flex;
	    -webkit-box-pack: space-between;
	    -ms-flex-pack: space-between;
	    -webkit-justify-content: space-between;
	    justify-content: space-between;
	    padding-top: 0.39rem;
	    padding-bottom: 0.49rem;
	    border-bottom: 1px solid #F2F2F2;
	}
	.addr_des_container label {
	    font-size: 0.3rem;
	    line-height: 0.36rem;
	    color: #333;
	}
	.addr_des_container textarea {
	    flex: 1;
	    margin-left: 0.4rem;
	    resize: none;
	    color: #8A8F9B;
	    font-size: 0.28rem;
	    line-height: 0.48rem;
	}
	textarea {
	    -webkit-appearance: none;
	    border: 0;
	}
</style>
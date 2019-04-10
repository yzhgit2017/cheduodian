<template>
	<div class="personal_content">
        <div class="personal_head"><img src="../assets/images/personal_top.png"><p class="personal_title">个人中心</p></div>
        <div class="personal_menu">
            <div class="personal_card">
                <div class="touxiang"><img src="../assets/images/touxiang.png"></div>
                <p class="p1">大众二手车</p>
                <p class="p2">1561****123</p>
                <div class="bottom">
                    <div class="item">
                        <p class="text1">调度会员</p>
                        <p class="text2">商家状态</p>
                    </div>
                    <a class="item" href="myDuobi.html">
                        <p class="text1">10000</p>
                        <p class="text2">我的多币</p>
                    </a>
                </div>
            </div>
            <div class="personal_menu_list">
                <ul>
                    <li>
                        <a href="myVehicle.html">
                            <div class="personal_img_container"><div class="personal_menu_img" style="width: 0.46rem;height: 0.38rem;line-height: 0.38rem;"><img src="../assets/images/wdcy.png"></div></div>
                            <p class="personal_menu_text">我的车源</p>
                        </a>
                    </li>
                    <li>
                        <a href="mySeek.html">
                            <div class="personal_img_container"><div class="personal_menu_img" style="width: 0.49rem;height: 0.44rem;line-height: 0.44rem;"><img src="../assets/images/wdqg.png"></div></div>
                            <p class="personal_menu_text">我的求购</p>
                        </a>
                    </li>
                    <li>
                        <a href="personalRecord.html">
                            <div class="personal_img_container"><div class="personal_menu_img" style="width: 0.38rem;height: 0.43rem;line-height: 0.43rem;"><img src="../assets/images/lxjl.png"></div></div>
                            <p class="personal_menu_text">联系记录</p>
                        </a>
                    </li>
                    <li>
                        <a href="myCollection.html">
                            <div class="personal_img_container"><div class="personal_menu_img" style="width: 0.42rem;height: 0.39rem;line-height: 0.39rem;"><img src="../assets/images/sccy.png"></div></div>
                            <p class="personal_menu_text">收藏车源</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="personal_mydata">
            <div class="title">
                <div class="xian"></div>
                <div class="text"><span class="span1">数据一览</span><span class="span2"> · 我的数据</span></div>
            </div>
            <table border="1">
            	<tbody>
	                <tr>
	                    <td>
	                        <div class="text1">-</div>
	                        <div class="text2">在售</div>
	                    </td>
	                    <td>
	                        <div class="text1">24</div>
	                        <div class="text2">车辆查看</div>
	                    </td>
	                    <td>
	                        <div class="text1">4255</div>
	                        <div class="text2">联系车源</div>
	                    </td>
	                    <td style="border: 0;">
	                        <div class="text1">65</div>
	                        <div class="text2">已看车源</div>
	                    </td>
	                </tr>
	                <tr style="border: 0;">
	                    <td>
	                        <div class="text1">10000</div>
	                        <div class="text2">今日发车</div>
	                    </td>
	                    <td>
	                        <div class="text1">24</div>
	                        <div class="text2">今日查看</div>
	                    </td>
	                    <td>
	                        <div class="text1">4255</div>
	                        <div class="text2">今日联系</div>
	                    </td>
	                    <td style="border: 0;">
	                        <div class="text1">65</div>
	                        <div class="text2">本月看车</div>
	                    </td>
	                </tr>
	            </tbody>
            </table>
        </div>
        <div class="personal_logOff">
            <p class="btn">退出登录</p>
        </div>
        <footer-bar :footerActive="currentPage"></footer-bar>
    </div>
</template>

<script>
	import footerBar from '../components/footer'
	export default{
		data(){
			return {
				"currentPage":"geren"
			}
		},
		components:{footerBar},
		mounted(){

		},
		methods:{

		}
	}
</script>

<style scoped>
	.personal_content{
	    height: 100%;
	    padding-bottom: 0.98rem;
	    overflow-y: scroll;
	}
	.personal_head{
	    height: 3.32rem;
	    position: relative;
	}
	.personal_head img{
	    width: 100%;
	    height: 100%;
	}
	.personal_title{
	    position: absolute;
	    width: 100%;
	    color: #fff;
	    font-size: 0.36rem;
	    font-weight: bold;
	    top: 0.66rem;
	    text-align: center;
	}
	.personal_menu{
	    background: #fff;
	    position: relative;
	}
	.personal_menu_list{
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    padding-top: 2.8rem;
	    padding-bottom: 0.5rem;
	}
	.personal_menu_list ul{
	    overflow: hidden;
	}
	.personal_menu_list ul li{
	    float: left;
	    width: 25%;
	}
	.personal_menu_list ul li a{
	    display: block;
	    width: 100%;
	    height: 100%;
	}
	.personal_img_container{
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
	    height: 0.8rem;
	}
	.personal_menu_img img{
	    width: 100%;
	    height: 100%;
	}
	.personal_menu_text{
	    color: #8A8F9B;
	    font-size: 0.26rem;
	    line-height: 0.48rem;
	    text-align: center;
	}
	.personal_card{
	    position: absolute;
	    width: 6.86rem;
	    height: 3.76rem;
	    background: #fff;
	    box-shadow:0px 5px 9px 1px rgba(218,218,218,0.5);
	    border-radius:10px;
	    top: -1.56rem;
	    left: 50%;
	    margin-left: -3.43rem;
	}
	.personal_card .touxiang{
	    width: 1.48rem;
	    height: 1.48rem;
	    border-radius: 50%;
	    position: absolute;
	    top: -0.38rem;
	    left: 50%;
	    margin-left: -0.74rem;
	    overflow: hidden;
	}
	.personal_card .touxiang img{
	    width: 100%;
	    height: 100%;
	}
	.personal_card .p1{
	    font-size: 0.32rem;
	    line-height: 0.48rem;
	    color: #000;
	    text-align: center;
	    margin-top: 1.3rem;
	}
	.personal_card .p2{
	    color: #8A8F9B;
	    font-size: 0.26rem;
	    line-height: 0.48rem;
	    text-align: center;
	}
	.personal_card .bottom{
	    padding: 0 0.32rem;
	    box-sizing: border-box;
	    overflow: hidden;
	    margin-top: 0.2rem;
	}
	.personal_card .bottom .item{
	    width: 50%;
	    float: left;
	    box-sizing: border-box;
	}
	.personal_card .bottom .item:first-child{
	    border-right: 1px solid #EFEFEF;
	}
	.personal_card .bottom .item .text1{
	    color: #FF620C;
	    font-weight: bold;
	    font-size: 0.32rem;
	    line-height: 0.48rem;
	    text-align: center;
	}
	.personal_card .bottom .item .text2{
	    color: #8A8F9B;
	    font-size: 0.26rem;
	    line-height: 0.48rem;
	    text-align: center;
	}
	.personal_mydata{
	    padding: 0.32rem;
	    background: #fff;
	    margin-top: 0.2rem;
	}
	.personal_mydata .title{
	    line-height: 0.3rem;
	    height: 0.3rem;
	}
	.personal_mydata .title .xian{
	    float: left;
	    width: 4px;
	    height: 0.3rem;
	    border-radius: 2px;
	    background: #FF620C;
	}
	.personal_mydata .title .text{
	    float: left;
	    margin-left: 0.1rem;
	}
	.personal_mydata .title .text .span1{
	    font-size: 0.32rem;
	    color: #000;
	    float: left;
	}
	.personal_mydata .title .text .span2{
	    font-size: 0.26rem;
	    color: #8A8F9B;
	    float: left;
	}
	.personal_mydata table{
	    border-collapse: collapse;
	    border: 0;
	    width: 100%;
	    text-align: center;
	    margin-top: 0.35rem;
	}
	.personal_mydata table tr{
	    border-bottom: 1px solid rgba(239,239,239,1);
	}
	.personal_mydata table td{
		border: 0;
	    border-right: 1px solid rgba(239,239,239,1);
	}
	.personal_mydata table td .text1{
	    color: #FF620C;
	    font-size: 0.32rem;
	    line-height: 0.48rem;
	    text-align: center;
	}
	.personal_mydata table td .text2{
	    color: #8A8F9B;
	    font-size: 0.24rem;
	    line-height: 0.48rem;
	    text-align: center;
	}
	.personal_logOff{
	    background: #fff;
	    margin-top: 0.2rem;
	    padding: 0.32rem;
	}
	.personal_logOff .btn{
	    width: 100%;
	    height: 0.9rem;
	    box-sizing: border-box;
	    border: 1px solid #8A8F9B;
	    border-radius: 0.45rem;
	    line-height: 0.9rem;
	    text-align: center;
	    color: #8A8F9B;
	    font-size: 0.32rem;
	}
</style>